kmp 算法用于字符串匹配，查找字符串。
## 原理
### 时间复杂度
kmp 的过程只对模式串 (m)和主串 (n)进行一次遍历，因此时间复杂度只有 O(n+m)。
1. 遍历模式串，生成 next 数组，用于遍历主串时进行回退。
2. 遍历主串，根据 next 数组进行匹配。

### 前缀表
1. next 数组是一个前缀表。
2. 前缀表记录模式串“从开头到当前 index 的子串“的前缀和后缀相同的最长部分的长度（最长相同前后缀长）。即长度为 index 的前缀子串的最长相同前后缀长度，故称前缀表。
	1. 前缀：从第一个字母开始且不包含最后一个字母的子串。
	2. 后缀：到最后一个字母为止且不包含第一个字母的子串。
```
const partern = 'abcdabc'
const list = new Array(partern.length)
list[0]=0; // a，没有前后缀
list[1]=0; // ab，没有相同的前后缀
list[2]=0; // abc，没有相同的前后缀
list[3]=0; // abcd，没有相同的前后缀
list[4]=1; // abcda，相同的前后缀a
list[5]=2; // abcdab，相同的前后缀ab
list[6]=3; // abcdabc，相同的前后缀abc
```
3. 在匹配模式串时，指针 j 记录模式串准备和主串匹配的位置，假设 j=2，说明模式串的前两个字母‘ab’已经和主串匹配过了。这时，如果还匹配，那么 j 就指向下一个，如果 j>模式串的长度，说明匹配完成。
4. 如果不匹配，只是当前 j 位置不匹配，而前面的都匹配了，我们可以把匹配过的字符串利用起来，而不是又从头匹配。
5. 不匹配只说明 j 所指向的字符串不匹配，但是 j-1 之前的字符串都匹配了。所以我们只要切换 j 所指的字母，并且保证新的 j-1 仍匹配即可。
```
模式串：abcabdabe...
主串：abcabdabc...
这里我们假设已经匹配到字符e，这时e和主串的c是不匹配的，但说明主串c之前和e之前是相同的，都是abcabdab。
那么要移动到哪里可以保证仍和之前是相同的？只要保证模式串已经匹配的前缀，和主串已经匹配的后缀是相同的即可。
即，取模式串的ab...中的ab，和主串...ab中的ab，这样就可以利用之前匹配的结果，不用从头再来。也就是，原本不匹配，只能在模式串从头开始，但现在我们已经知道了主串有“abcabdab”，我们利用这个结果，从模式串的“ab”开始，而不是在模式串从头开始。
因为【主串已经匹配的字符串】=【模式串已经匹配的字符串】，所以我们从“保证模式串已经匹配的前缀，和主串已经匹配的后缀是相同的”，转变为“保证模式串已经匹配的前缀和模式串已经匹配的后缀是相同的”即可。
因此，利用之前计算的前缀和，就可以跳转到已经重复的位置。
注意这里的细节，是在不匹配位置的前一位，去确认最长相同前后缀。
```
6. 实现，一般将前缀表右移一位，并在 0 位补上-1，作为 next 数组。

## 实现
### 生成 next 数组
1. 核心思想是使用双指针+记录。
2. j 初始值为-1。
3. j+1（0） 为前缀指针，i（1） 为后缀指针，然后开始遍历字符串。
4. 0 位置为-1，其它位置通过 i 设置。
5. 匹配的过程其实也是一个 kmp，就是判断前缀子串和后缀子串是否相同。原理如下，j+1 和 i 指向字符串是否相同，如果相同，则都前进，如果不同 j+1 回退，直到相同或从头开始。这里，前缀就是模式串，因为它可以使用刚生成的前缀表，而后缀没有表可以使用，所以这里作为主串。
6. 为什么 next 要由前缀表减一，为什么 j 的初始值是-1。在-1 后，存在以下特点：
	1. 在不匹配时，可以直接使用 j，而不需要 j-1。
	2. 使用 j 跳转后，所到达的位置是已经匹配的位置，而不是已经匹配的位置的下一位，这样可以保证跳转时，前后缀仍是相同的（用 while 去判断）。
	3.  j 在+1 后就可以作为长度使用，在 i 位置记录最长相同前后缀长度 j+1。如果没有，则 j 可以直接作为长度使用。
### 使用 next 匹配
1. 遍历主串。
2. 使用 i 作为主串指针，使用 j+1 作为模式串指针（j 从-1 开始）。
3. 匹配过程和生成 next 数组类似，如果当前匹配，则移动 i 和 j，如果不匹配，则移动 j，j 为前缀的最后一个字母，所以 j+1 是新的待匹配字母。

## next 不减一
1. 可以看到 next 不减一就是前缀表的原理。
2. 不减一那么在后续算法中都要一些减一操作。
3. 因为加法比减法快，在加一和减一都可以的情况下，往往我们选择加法。
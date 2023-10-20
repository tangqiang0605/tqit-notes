## vscode 可视化操作
1. 切换分支
	1. GitGraph
	2. 状态栏
2. 
## 起步（本地变远程）

这里是将克隆的库删除远程又添加远程后。

发布master。可同步master。

其他分支可发步就发布，如果不可发布，在同步master之后，是有其他远程分支的，变基分支发布即可。

## 插件

gitlen 没有 gitgraph 可视化做的好

gitLen 是一个很厉害的插件、不会用。这是他的功能。（确实）

![image-20230111074948496](D:\tplmydata\tplmydoc\文档图片\image-20230111074948496.png)





## 功能

源代码管理储存库：没用，隐藏掉，它的功能下面都有。gitlen 会增加一项（控制台显示分支情况）。

![image-20230111002624526](D:\tplmydata\tplmydoc\文档图片\image-20230111002624526.png)

源代码管理

快捷方式：树（好）提交（不用）历史（好）刷新，git图（不用）

<img src="D:\tplmydata\tplmydoc\文档图片\image-20230111002412460.png" alt="image-20230111002412460" style="zoom:50%;" /> 

<img src="D:\tplmydata\tplmydoc\文档图片\image-20230110235533748.png" alt="image-20230110235533748" style="zoom: 50%;" /> 

状态栏：切换分支（好，方便）同步（拉取+推送，方便) git图（方便）

![image-20230111002844962](D:\tplmydata\tplmydoc\文档图片\image-20230111002844962.png)

标签：对commit使用。

![image-20230110235634007](D:\tplmydata\tplmydoc\文档图片\image-20230110235634007.png)

仓库：不太清楚有什么用，就是没什么用。仓库应该只有一个，多的可以删除。可以有多个仓库，但还是不要搞得太花的好。

![image-20230111002305781](D:\tplmydata\tplmydoc\文档图片\image-20230111002305781.png)

分支管理

后五个：创建分支（从当前分支的点），可以是分支的最新 commit 或者 head，head 可以是最新 commit 也可以不是，可以 checkout 到任意位置）。重命名。删除（只有未发布删除的分支在远程不留删除记录，废话。不能选当前分支）。发布（创建的新分支同步到远程。不用）

![image-20230111003121004](D:\tplmydata\tplmydoc\文档图片\image-20230111003121004.png)

更改

见名知意、不适用这里的ui。

![image-20230111080808042](D:\tplmydata\tplmydoc\文档图片\image-20230111080808042.png)

用同步即可。抓取功能也在上面了。

![image-20230111080940092](D:\tplmydata\tplmydoc\文档图片\image-20230111080940092.png)

抓取

会获取本地仓库和远程仓库所有区别。即本地分支如master，远程origin/master。本地dev，远程origin/dev。多了个“origin/"前缀。

![image-20230111091333080](D:\tplmydata\tplmydoc\文档图片\image-20230111091333080.png)

## 储存

![image-20230111000004248](D:\tplmydata\tplmydoc\文档图片\image-20230111000004248.png)

储存是一种不在commit记录里的提交。节点还是指向最新的commit。成功储存后跳回最新的commit，所以修改的源代码为空（存到了储存里）。

![image-20230111000214881](D:\tplmydata\tplmydoc\文档图片\image-20230111000214881.png)

储藏：对暂存的文件进行储藏。可以将需要储藏的暂存，不暂存的就不储藏（那切换别的分支会提示储藏）。

储藏（包含未追踪）：推荐使用这个，不用暂存。

应用是需要手动删除的，弹出是自动删除的。一般多个储存可以应用一下看看要哪个，而一般只有一个储存那直接弹出继续工作（这是比较常见的）应用的储存是不会消失的。

储存是任何分支、任何时候都可以拿来用的。（储存是全局的）如下。

储存是本地的，同步不包括储存。

![image-20230111001441625](D:\tplmydata\tplmydoc\文档图片\image-20230111001441625.png)

## 分支

当前分支的内容未保存，如果是同色，切换到其他分支仍在。

不同色则临时储存。并且切到其他分支时可以将内容更改成切来前修改的内容，不过一般还是不更改，保留切过来的这个分支原来的内容。等这边搞完，就去原来的，继续暂存的工作。

<img src="D:\tplmydata\tplmydoc\文档图片\image-20230110234334321.png" alt="image-20230110234334321" style="zoom:50%;" /><img src="D:\tplmydata\tplmydoc\文档图片\image-20230110234519463.png" alt="image-20230110234519463" style="zoom:50%;" />

回到原来的，暂存是在前面，右键暂存的，把它 pop 出来，然后继续工作，工作后 commit。

<img src="D:\tplmydata\tplmydoc\文档图片\image-20230110234848873.png" alt="image-20230110234848873" style="zoom:50%;" /><img src="D:\tplmydata\tplmydoc\文档图片\image-20230110235125820.png" alt="image-20230110235125820" style="zoom:50%;" />

分支应该是切到dev分支，合并当前新功能并上传到远程合并远程冲突，最后回到分支，合并dev的内容。

## 同步

同步是针对当前分支的，不对别人生效，要一个分支一个分支同步。

1. 没有origin表示未同步，跟了origin表示已同步。没有origin表示在远程不存在该分支。
1. ![image-20230111075747591](D:\tplmydata\tplmydoc\文档图片\image-20230111075747591.png)<img src="D:\tplmydata\tplmydoc\文档图片\image-20230111080610836.png" alt="image-20230111080610836" style="zoom:50%;" />

![image-20230110192518591](D:\tplmydata\tplmydoc\文档图片\image-20230110192518591.png)

同步时，远程和本地冲突，会在本地先解决冲突形成一个新commit，再提交到远程。所以同步应该不需要先拉再同步上去，直接同步即可。同步是拉取和推送的结合。

同步到远程仓库不需要提交信息。只是同步即可。

同步master错误。![image-20230110190933430](D:\tplmydata\tplmydoc\文档图片\image-20230110190933430.png)

原因：因为master从未上传到gitee上。master必须先于其他分支上传到gitee上。因为先上传的将作为默认分支。

解决：从默认分支新建一个master并设置为默认分支。



## 合并与冲突

不冲突合并

表示 dev 领先 master 一个分支，master 可以通过合并操作直接到达最新的提交。

<img src="D:\tplmydata\tplmydoc\文档图片\image-20230110180703498.png" alt="image-20230110180703498" style="zoom: 50%;" /> <img src="D:\tplmydata\tplmydoc\文档图片\image-20230110180731760.png" alt="image-20230110180731760" style="zoom:50%;" />

解决冲突（从简单到复杂）

![image-20230110182149539](D:\tplmydata\tplmydoc\文档图片\image-20230110182149539.png)

推荐合并编辑器。

合并分支会产生一个新的 commit。这个 commit 基于当前分支。

## 变基
变基就是因为基不一样，才有变基，所以一定存在冲突。

<img src="D:\tplmydata\tplmydoc\文档图片\image-20230111083451914.png" alt="image-20230111083451914" style="zoom:33%;" /> 

变基要把当前分支和被变基分支上的所有冲突解决掉。有这个提示是正常的。变基冲突信息不可改。将该分支以前的commit的内容修改使其成为master诞生的分支。试试能不能看树结构知道变基要修改解决冲突的commit？

变基中解决的冲突新增在master之上，最后dev成为master的前面。



![image-20230111083706611](D:\tplmydata\tplmydoc\文档图片\image-20230111083706611.png)

![image-20230111084635101](D:\tplmydata\tplmydoc\文档图片\image-20230111084635101.png)



## checkout

切换分支

切换某个commit

## 回滚

revert新建节点，节点的状态是revert状态。

revert的需要是自己的源。revert也可以是别人的，新建的节点会合并冲突。冲突如果你使用当前的，不改变原来的任何代码，那和不resert是没有区别的，不会让你提交，因为解决冲突后没有变化（本质是因为代码没有变化就没有commit）。

![image-20230111103748598](D:\tplmydata\tplmydoc\文档图片\image-20230111103748598.png)

cherrypick嫁接

将以前的commit拿过来作为新的commit。

比如一个分支里的commit，我在另一个分支拿来用作为新的commit。和resert有点像。


reset的三种模式：reset都是把以前的不要了，慎重。revert则是保存以前的，在以前的基础新建节点。和resert一样也可以跑到别人那里开始。

1. 轻微和soft，退回并将不同的地方作为修改。现在感觉不到区别。
2. ![image-20230111101822253](D:\tplmydata\tplmydoc\文档图片\image-20230111101822253.png)
3. hardreset，commit后把前面的都不要了。一开始也没有保留前面的修改而是直接读取以前的内容。

## 对分支右键

右键别人

![image-20230111111859390](D:\tplmydata\tplmydoc\文档图片\image-20230111111859390.png)一些操作：比如切换、重命名、删除、合并，变基、（都不用，在功能那里有了)unselect就是不显示咯。用这里比较方便。所以这里都没有什么用。

![image-20230111112058534](D:\tplmydata\tplmydoc\文档图片\image-20230111112058534.png)

右键自己，连unselect都不生效。

merge不知道有什么区别，直接用默认就好。合并如果没有冲突，评论是不能也不用改的。

![image-20230111115951523](D:\tplmydata\tplmydoc\文档图片\image-20230111115951523.png)

## 忽略

gitignore只能忽略未提交的，已提交不管用。

## 提交

amend修改本次commit（只对本地使用，不要对origin使用！）

![image-20230111132022755](D:\tplmydata\tplmydoc\文档图片\image-20230111132022755.png)

撤销上次提交（和reset差不多）

![image-20230111133417733](D:\tplmydata\tplmydoc\文档图片\image-20230111133417733.png)

提交时出现该界面

![image-20230111132311368](D:\tplmydata\tplmydoc\文档图片\image-20230111132311368.png)

写message然后叉掉，自动提交

直接叉掉，放弃提交

## 错误

1. 不要删除.git文件夹，我就这样把整个仓库搞没了，重新初始化后添加远程仓库、没反应。

2. you have not conclude youre 什么什么，你没有选一个分支，再选一下就好了。

3. 不行就重试一次
4. 认证服务timeout，再试一次。

## 建议

不要修改合并的message

## 命令

<img src="D:\tplmydata\tplmydoc\文档图片\image-20230111133814094.png" alt="image-20230111133814094" style="zoom: 50%;" />

<img src="D:\tplmydata\tplmydoc\文档图片\image-20230111133714607.png" alt="image-20230111133714607" style="zoom: 25%;" />

 

起步

git config --global user.name username

git config --global user.email useremail

git init

git clone originUrl

提交

git status

git add .

git commit -m "message"





## 游戏

### 其他

git commit --amend修改当前commit

### 新建

git commit创建提交

git branch branch-name创建新分支

git cherry-pick c1 c2从当前位置新建分支

git merge branch-name新建一个提交，接受branch-name分支的汇入与冲突解决。

git rebase branch-name将当前分支转到目标分支的前头。可能在目标分支上新建多个冲突解决提交。

git rebase -i 位置：在该位置新建分支，分支的提交来自原来的位置到该位置的所有提交。

git revert 位置：新建节点撤销该位置的内容。

git checkout -b branch-name新建并切换分支

### 移动head

git checkout 位置

git checkout -b branch-name新建并切换分支

git merge branch-name移动到前头

git rebase branch-name移动到前头

git branch -f 分支 位置：移动分支到某位置

git reset 位置，移动到此处且前头作废。

### 移动位置

绝对位置：分支名、commitID、HEAD

相对位置：绝对位置^，绝对位置\~，绝对位置\~\~，绝对位置\~n



head指向后是固定在指向的对象上的。提交是固定的，head指向提交，就一直是固定的。分支是移动的，head指向分支，分支又指向提交，head就指向提交，而head指向的提交随着分支的指向而改变。

## 实践

### 修改提交

1. amend修改最新提交
2. amend、rebase修改历史提交
3. amend、cherry-pick修改历史提交
4. reset修改历史提交，不会保留现在的提交。
5. revert修改历史提交，不会保留现在的提交。

### 同步

先fetch、后pull（可以是merge也可以是rebase，以本地为目前分支）最后push。

方法二推荐：git pull --rebase，将远程作为根，当前本地的作为前头。

### 合并dev

切到dev，将feature功能merge或者rebase上，合并后dev都在上，然后同步（参考上面，不用fetch，因为可以肯定肯定不一样），然后feature合并上dev（merge、rebase效果都一样，移动feature到dev处）




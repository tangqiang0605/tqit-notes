学习材料
[Site Unreachable](https://juejin.cn/post/7239502215890386981?searchId=202307231114067D287D237B2C71E5CC54)
[有否可能使用“AOT”预处理改进JS的“JIT”？ - 掘金](https://juejin.cn/post/7250383386183778341?searchId=202307231114067D287D237B2C71E5CC54)

名词：
本机代码：机器码
Interpreter：解释器

## AOT

## JVM JIT
虚拟机使用 jit 技术来将字节码编译为机器码。

## 为什么 JavaScript 需要即时编译（JIT）？
JavaScript 的特性（动态、强转等）使得 JavaScript 的学习变得简化，使编译变得困难，无法使用传统的静态编译器。

从书面上无法读取类型，只有运行时才知道值并通过值去得到类型并存储，这就是解释器的任务，但是性能没有静态编译器好。

完全使用 AOT（Ahead Of Time）方法编译器性能将很差，并且代码库将庞大且难以维护。因此需要解释器。但是，使用纯 JavaScript 解释器Interpreter会带来很高的性能损耗，因为我们只是将复杂性从编译时移动到运行时。

jit 就是在解释器加了监视器提高性能。

## JavaScript JIT
JavaScript 引擎中使用 jit 将频繁执行的代码段进行优化并编译成机器码。

JavaScript jit 的原理是使用监视器根据代码运行情况标记代码段：
warm：基线解释器，存储编译后版本。
hot：优化编译器，假定前提，并做进一步速度优化。
![[Pasted image 20230723115218.png]]
去优化：假设无效时，去掉优化的内容。

## Tailwind CSS JIT
Tailwind CSS JIT（Just-In-Time Compilation）是一个全新的 Tailwind CSS 编译器，与传统的 AOT（Ahead-Of-Time Compilation）编译器不同，它可以实时编译并生成最小的 CSS 样式表，让使用 Tailwind CSS 的开发人员能更快更高效地编写样式代码。
Tailwind CSS JIT 采用增量式编译方式，只编译你需要的样式，这种方式可以避免全局搜索和解析整个 CSS 类库，提高编译速度。同时，它还可以通过缓存中间数据（如样式变量和计算结果）来进一步提高编译速度。


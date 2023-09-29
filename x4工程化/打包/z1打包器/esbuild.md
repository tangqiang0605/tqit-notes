## 学习总结
1. esbuild 是用 golang 写的打包器，速度快，虚拟模块友好，是优秀的 bundler、minimizer。
## 概念
1. Esbuild 是由 Figma 的 CTO 「Evan Wallace」基于 Golang 开发的一款打包工具

高效利用内存
一般而言，在 JS 开发的传统打包工具当中一般会频繁地解析和传递 AST 数据，比如 string -> TS -> JS -> string，这其中会涉及复杂的编译工具链，比如 webpack -> babel -> terser，每次接触到新的工具链，都得重新解析 AST，导致大量的内存占用。而 Esbuild 中从头到尾尽可能地复用一份 AST 节点数据，从而大大提高了内存的利用效率，提升编译性能。

Web 构建
Web 场景就显得比较复杂了，对于兼容性和周边工具生态的要求比较高，比如低浏览器语法降级、CSS 预编译器、HMR 等等，如果要用纯 Esbuild 来做，还需要补充很多能力。

## 插件
包含 name 和 setup 的对象。
name 是插件名，setup 方法的入参是 build。

build. onResolve：文件解析触发，
build. onLoad：加载文件触发

## 疑问
### 问题一
1. JavaScript 是单线程+JIT 性质的解释型语言。JavaScript 使用多线程需要线程通信的开销。Node 将 js 解析为字节码，然后转换为机器码。
解释：
1. 字节码是抽象的指令集，机器码是具体的指令集。字节码是平台无关的中间代码，可用于 java 虚拟机 jvm 执行。[知识科普：机器码和字节码 分别是什么？](https://baijiahao.baidu.com/s?id=1761900016032973294&wfr=spider&for=pc)
2. jit：just-in-time 即时编译器。在 JavaScript 引擎中，JIT 是一个可以将动态解释的代码转换为本机代码的技术。它通过根据程序的执行情况优化代码来提高代码的执行速度
### 问题二
transformer 是什么？
前端的构建工具来说主要有这样几个垂直的功能:
Bundler：整合
Transformer：转换高级语法，esbuild 可能不如 swc
Minimizer：压缩
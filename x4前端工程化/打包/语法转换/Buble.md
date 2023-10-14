类似 babel 的 es 编译器 (高版本转低版本 js）。

无配置，没有 plugins 和 preset 的概念，可扩展性较低，但简单易用。
相对较小，速度更快。
不支持 ES 2015 中表达的代码，如 for... of。buble 不支持的功能列表： https://buble.surge.sh/guide/#unsupported-features

作者：Sam
链接： https://www.imooc.com/article/264075
来源：慕课网
本文原创发布于慕课网，转载请注明出处，谢谢合作

## 通过命令行使用
```
npm i -g buble
mkdir -p src/vue/buble
touch src/vue/buble/index.js

buble src/vue/buble/index.js
```

## 通过 API 使用
```
npm i -D buble

const buble=require('buble')
buble.transform(code)
```
插件不多，rollup、babel、tsc

![[Pasted image 20230808164955.png]]
[一篇基于rollup+typescript开发npm包的干货 - 掘金](https://juejin.cn/post/7093218148299571231)
rollup 核心
1. rollup

rollup 插件
2. @rollup/plugin-node-resolve，解决包引用
3. @rollup/plugin-commonjs 转为 commonjs
4. @rollup/plugin-typescript 转为 js
1. @rollup/plugin-babel 转为 es5（tsc 已经有这个功能了呀，是不是重复了？对，而且 tsc 的可能更全）
2. @babel/core
3. @babel/preset-env
```
pnpm i -D @rollup/plugin-babel 
pnpm i -D @babel/core @babel/preset-env
```

ts 配置
1. target 要改成 es5，不然 babel 转换 es6的时候有些转换不了（tsc 转 es5+babel 转 es5）
2. ts 可以有支持 json 解析的配置"resolveJsonModule": true,

教程实践注意：
1. 去除 rollup 构建提醒
	1. 设置 tsconfig 的 module 为 esnext+    "moduleResolution": "NodeNext",
	2. rollup 的导出 format 为 cjs
2. rollup 的包换为官方包@rollup/plugin-xxx
3. rollup 配置文件以 mjs 结尾（因为 rollup 的配置文件必须为 ejs，本身 rollup 就只支持 esm）

文章提到的问题：
1. import 引入 utilibs（作者配置开发的包） 时没有代码补全提示，并且启动有找不到模块的报错
解决办法：
```
所在项目src/shims-vue.d.ts
declare module "utilibs";
```
2. 方法二，先配置使用 tsc 生成配置声明文件，再使用 rollup 编译 ts。（文中的最终解法）

[rollup学习--03开发一个rollup插件 - 掘金](https://juejin.cn/post/7023284800966361124?searchId=202308051032531AC551C83198476C662C)
[跳转提示-稀土掘金](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Frollup%2Fawesome) 插件列表
[跳转提示-稀土掘金](https://link.juejin.cn/?target=https%3A%2F%2Frollupjs.org%2Fguide%2Fen%2F%23plugins-overview)官方插件教程 
[[陈同学i前端] 一起学Rollup｜构建工作流与插件机制 - 掘金](https://juejin.cn/post/7155702261724184589?searchId=202308051032531AC551C83198476C662C)
## 原理
接收一个对象，包含名字和各种钩子hooks。

### 按时机分
hooks 分为 build hooks 和 output generation hooks。

Build：主要负责创建模块依赖图，初始化各个模块的 AST 以及模块之间的依赖关系（解析各模块的内容及依赖关系）
```
// build.js
const rollup = require("rollup");
const inputOptions = {
  input: "./src/index.js",
  external: [],
  plugins:[]
};
async function build() {
    const bundle = await rollup.rollup(inputOptions);
    // 打印各个模块的内容及依赖关系
    console.log(bundle); // 打印_1
    console.log(bundle.cache.modules); // 打印_2
}
build();
```
Output：构建打包并输出最终产物
```
// build.js
const rollup = require('rollup');
const inputOptions = {
  input: './src/index.js',
  external: [],
  plugins: [],
};
const outputOptions = {
//   dir: 'dist/es', // 调用write时输出产物到该目录
  entryFileNames: `[name].[hash].js`,
  chunkFileNames: 'chunk-[hash].js',
  assetFileNames: 'assets/[name]-[hash][extname]',
  format: 'es',
  sourcemap: true,
};
async function build() {
  const bundle = await rollup.rollup(inputOptions);
  const resp = await bundle.generate(outputOptions); // 打包生成产物（generate不写入磁盘）
  console.log(resp);
}
build();
```

### 按执行顺序分
Async 和 Sync：rollup 提供的 hook 有的内部只能执行同步操作不能出现异步的东西，这是同步钩子。有的钩子可以执行异步逻辑。

Paraller：多个插件实现了该钩子，存在一个异步，则它们并发执行。底层使用 Promise. all。

Sequential：串行执行。有异步则 await 等待异步。


[10分钟快速精通rollup.js——前置学习之rollup.js插件篇\_慕课手记 - 掘金](https://juejin.cn/post/6844903748905467918?searchId=202308051032531AC551C83198476C662C)
[10分钟快速入门rollup.js\_慕课手记](https://www.imooc.com/article/262083)
[10分钟快速精通rollup.js——Vue.js源码打包原理深度分析\_慕课手记](https://www.imooc.com/article/264074)

rollup. js 默认采用 ES 模块标准，我们可以通过 rollup-plugin-commonjs 插件使之支持 CommonJS 标准。

作者：Sam
链接： https://www.imooc.com/article/262083
来源：慕课网
本文原创发布于慕课网，转载请注明出处，谢谢合作

```
npm i rollup -g

预览打包后的内容
rollup src/main.js -f es

输出
rollup src/main.js -f es -o dist/bundle.js

参数--output.file是-o的全称
```

可以使用 [[babel-node运行esm代码]],运行打包后的 esm 代码。

## 配置文件
1. 配置文件 rollup. config. js 需要用 esm 编写。
2. 使用-c 会找到配置文件进行打包。
3. 打包 esm 自带 treeshaking，可以在顶层属性关闭。
4. external，使用了 resolve 插件可以通过这里让某些库只保持外部引用。
```
export default {
  input: './src/main.js',
  output: [{
    file: './dist/index-cjs.js',
    format: 'cjs',
    banner: '// welcome to imooc.com',
    footer: '// powered by sam'
  }, {
    file: './dist/index-es.js',
    format: 'es',
    banner: '// welcome to imooc.com',
    footer: '// powered by sam'
  }]
}
```

## API
案例：单入口多输出（配置文件本身就支持单入口多输出，这只是例子演示使用 api 替换cli）。按照思想也可以写多入口多输出。
```
npm i -D rollup
```

```
touch rollup-input-options.js

module.exports = {
  input: './src/main.js'
}

// touch rollup-output-options.js
module.exports = [{
  file: './dist/index-cjs.js',
  format: 'cjs',
  banner: '// welcome to imooc.com',
  footer: '// powered by sam'
}, {
  file: './dist/index-es.js',
  format: 'es',
  banner: '// welcome to imooc.com',
  footer: '// powered by sam',
}, {
  file: './dist/index-amd.js',
  format: 'amd',
  banner: '// welcome to imooc.com',
  footer: '// powered by sam',
}, {
  file: './dist/index-umd.js',
  format: 'umd',
  name: 'sam-umd', // 指定文件名称
  banner: '// welcome to imooc.com',
  footer: '// powered by sam',
}]
```


```
const rollup = require('rollup')
const inputOptions = require('./rollup-input-options')
const outputOptions = require('./rollup-output-options')

async function rollupBuild(input, output) {
  const bundle = await rollup.rollup(input) // 根据input配置进行打包
  console.log(`正在生成：${output.file}`)
  await bundle.write(output) // 根据output配置输出文件
  console.log(`${output.file}生成成功！`)
}

(async function () {
  for (let i = 0; i < outputOptions.length; i++) {
    await rollupBuild(inputOptions, outputOptions[i])
  }
})()
```

## 插件
[10分钟快速进阶rollup.js\_慕课手记](https://www.imooc.com/article/263597)
rollup 打包的对象是本地的 js 代码和库，不会打包第三方库。resolve 插件可以将其包含进来。用于集成其它库的源码。可以使用 external 配置保持外部引用，而不打包进来。

commonjs 插件（rollup 默认不支持 cjs，所以需要它），cjs 不支持 treeshaking。

babel 插件。

json 插件。直接导入 json 文件作为对象并使用其属性。

uglify 插件。压缩代码。不支持 esm、es 6。

## 监听
1. cli 模式，--watch
2. api 模式
```
const watcher = rollup.watch(options) // 调用rollup的api启动监听

watcher.on('event', event => {
  console.log('重新打包中...', event.code)
}) // 处理监听事件

// watcher.close() // 手动关闭监听

有watch就不需要前面打包的api了。会自动打包。
```



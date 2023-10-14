[【Babel系列 第三篇】从零带你实现一个Babel插件 - 掘金](https://juejin.cn/post/6918555538628280333?searchId=202308011957416E2A29A7EE68361DCDE7)
## 使用
Babel 有以下几种使用方式：
通过 Cli 使用
代码中使用
配合打包工具（gulp、webpack、rollup 使用）

```
npm install @babel/cli @babel/core --save-dev
npm install @babel/plugin-transform-arrow-functions @babel/plugin-transform-classes --save-dev
// .babelrc.js
const plugins = ['@babel/transform-arrow-functions', '@babel/transform-classes'];
module.exports = { plugins };

npx babel src --out-dir dist

测试代码
src/index.js
const app = () => { console.log(true) };
app()
```
## 配置
babel 的能力都是插件或预设提供的
```
优先级
plugins高于presets
plugins数组从左往右（先的保持）
presets数组从右往左（覆盖）
```

## webpack 中使用
```
mkdir babel_jsx_transform_demo
cd ./babel_jsx_transform_demo
npm init
npm install -D webpack webpack-cli @babel/core babel-loader

// webpack.config.js
const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  mode: 'none',
  module: {
    rules: [{
      test: /\.js$/,
      use: {
        loader: 'babel-loader',
        options: {
          plugins: []
          可以省略babel-plugin前缀
        }
      }
    }]
  }
}

//package.json
"start":"webpack"
```

## 原理
Babel 的三个主要处理步骤分别是：解析（parse），转换（transform），生成（generate）
babel 的 AST 标准是以 ESTree 作为基准的，只不过部分属性有些偏差。parser 是 babel 的 js 解析器。将 JS 代码转换成符合 estree 规范的 AST 结构。
parse 生成 ast。解析分为词法分析和语法分析。
转换是深度优先遍历（使用@babel/traverse 库）。使用网站查看 ast：[AST explorer](https://astexplorer.net/)。transform 对 ast 进行转换成新 ast（插件所在），最后根据 ast 生成字符串。

babel 源码原理：
babel-core 包提供 transform 方法，将 code 进行转换（transform），第二个参数接收一个 plugins 属性，接收一个数组，数组是含 vistor 属性的对象。
```
//babel核心库，用来实现核心的转换引擎
let babel = require('babel-core');
//可以实现类型判断，生成AST节点
let types = require('babel-types');
let code = `codes.map(code=>{return code.toUpperCase()})`;//转换语句
//visitor可以对特定节点进行处理
let visitor = {
    ArrowFunctionExpression(path) {//定义需要转换的节点,这里拦截箭头函数
        let params = path.node.params
        let blockStatement = path.node.body
        //使用babel-types的functionExpression方法生成新节点
        let func = types.functionExpression(null, params, blockStatement, false, false)
        //替换节点
        path.replaceWith(func) //
    }
}
//将code转成ast
let result = babel.transform(code, {
    plugins: [
        { visitor }
    ]
})
console.log(result.code)
```
## webpack+ts
```
npm i -D webpack webpack-cli typescript ts-loader
```
## webpack 项目
1. webpack webpack-cli webpack-dev-server clean-webpack-plugin
2. ts-loader typescript
3. html-webpack-plugin
4. @babel/core @babel/preset-env babel-loader core. js
5. less less-loader css-loader style-loader
6. postcss postcss-loader postcss-preset-env

## webpack 常用配置
sourcemap
devtool
entry
output
module
loader+options

打包器 module、rules\[\]
loader： test、use、exclude
插件：plugins
模块：resolve、extensions（将被包含的后缀文件也视为模块）

示例：
// webpack. config. js
```
const path = require("path");
module.exports = {
  mode: "development", //防止代码被压缩
  entry: "./src/index.js", //入口文件
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
  devtool: "source-map", //防止干扰源文件
};
```

## 兼容低级语法
webpack 打包成的代码可能仍含有箭头函数和 const，
需要配置：
```
output.environment.arrowFunction:false,const:false
```

## webpack 插件
babel：core-js 高转低

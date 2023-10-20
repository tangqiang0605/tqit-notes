作者：Sam
链接： https://www.imooc.com/article/264075
来源：慕课网
本文原创发布于慕课网，转载请注明出处，谢谢合作

vuejs 库使用 flow 进行类型检查。
```
npm i -D flow-bin

// package.json
{
	"scripts": {
		"flow": "flow"
	}
}

生成配置文件
npm run flow init

进行类型检查
npm run flow
```

示例代码
```
flow只会检查代码顶部添加了/* @flow */或// flow的源码。
/* @flow */ // 指定该文件flow检查对象
function square(n: number): number { // square的参数必须为number类型，返回值必须为number类型
  return n * n
}

console.log(square("2"))
```


代码无法通过 node 直接运行，先通过 babel 插件进行转换。[[babel]]。使用 babel-node 可以直接运行代码。
```
npm i -D @babel/plugin-transform-flow-strip-types

// .babelrc
{
  "presets": [
    "@babel/preset-env"
  ],
  "plugins": [
    "@babel/plugin-transform-flow-strip-types"
  ]
}

babel-node src/vue/flow/index.js
```
在 node 运行 es 代码的方法：
1. 转为 cjs
2. 添加后缀 mjs
3. 修改 packagejson 的 type
4. 使用 babel-node

[10分钟快速入门rollup.js\_慕课手记](https://www.imooc.com/article/262083)


```
npm i @babel/core @babel/node @babel/cli -g

npm init
npm i -D @babel/core @babel/preset-env

// .babelrc
{
	"presets": ["@babel/preset-env"]
}
```
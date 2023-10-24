TypeScript 是 JavaScript 的超集。提供了 JavaScript 的所有基本数据类型，如：number、string、boolean 等。它还增加了额外的类型，比如 any、unknown、never、void 等。
TypeScript 的类型和 JavaScript 的 typeof 的结果都是小写的，大写是指 JavaScript 的构造函数。
### 使用
安装 `npm i tsc -D` 或者 `npm i tsc -g`

运行：
1. 使用 `tsc 文件名` 转变为 js ，然后 node 执行。
2. 使用 `ts-node 文件名` 运行（需要安装 `npm i @types/node -D``npm i ts-node -g`
### 工具
TypeScript 还有良好的工具支持，比如 TSLint 和 Prettier
### ts-node 报错
在 `tsconfig.json` 中添加
```
{
	"ts-node":{
		"esm":true
	}
}
```
![[Pasted image 20230809220627.png]]
[使用 ts-node 命令运行 ts 文件时报错 (Warning: To load an ES module, set “type“: “module“ in the package. json...)\_typeerror [err\_unknown\_file\_extension]: unknown fi\_清晨-阳光 zx 的博客-CSDN 博客]( https://blog.csdn.net/pro_fan/article/details/124987158 )
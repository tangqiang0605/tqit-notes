## 特点
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

## 配置文件
typescript 配置文件、编译器配置
[解读TSConfig | 编程时光](https://www.coding-time.cn/ts/advance/%E8%A7%A3%E8%AF%BBTSConfig.html#%E6%96%87%E4%BB%B6%E5%BC%95%E7%94%A8%E5%92%8C-composite)
composite 配置选项用于启用 TypeScript 的项目引用功能，允许我们将一个 TypeScript 项目作为另一个项目的依赖。
"composite": true

tip：ts 的配置文件 json 是可以写注释的。

```
* 任意文件
** 任意路径
```

目标文件：
```
include
exclude
files
```

常用配置
```
extends 继承配置
target 目标版本
module 模块规范
lib 依赖库如‘dom’
outDir 目标目录
outFile 合并为目标文件
allowJs 是否编译js
checkJs 是否检查语法
removeComments 移除注释
noEmit 不生成文件
noEmitOnError 
alwaysStrict
noImplicitAny 不允许隐式any
noImplicitThis 不允许隐式this（指定this的类型在函数参数中）
strictNullChecks 严格检查空值
strict 开启所有严格检查配置
```

## 参考
[序言 | 编程时光](https://www.coding-time.cn/ts/preamble.html)
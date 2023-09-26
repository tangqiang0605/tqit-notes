### package. json
[关于前端大管家 package.json，你知道多少？ (qq.com)](https://mp.weixin.qq.com/s/RrHPyjQjGXqRWxz6LvslMw)

#### 包信息
name、version、description、homepage、repository、author、files、license。

files 要发布的文件，缺省为全部。可以新建. npmignore 忽略文件如. vscode。

name 作为 npm 链接的一部分，所以不能包含非 url 安全字符、不能重复。

version：遵循**semver**规范。

description：包介绍。

keywords：关键词。

homepage 项目主页

repository 项目仓库。

bugs 仓库 issue。

author、contributors（author 数组）：
```
"author": {
	"name":"tangqiang",
	"email":"",
	"url":"github"
}
```

#### 依赖声明 
dependencies、devDenpendencies 生产依赖和开发依赖。

peerDependencies：如果开发的是某个 npm 包的插件，在这里指明适配的版本。比如我开发了一个 loader 对应的是 webpack 5。

optionalDependencies 找不到包时，这里覆盖 dependencies 的同名包。

bundleDependencies 一起打包。

engines：指定 node 版本。

#### 脚本
scripts：开发时使用的脚本、tsc 监听、单元测试。

bin 将文件链接到 node_modules/. bin 中，供 npx 调用。

#### 代码包引入相关
对外暴露导出。
环境分为 browser 和 node，类型分为 cjs 和 mjs。
概念：入口文件
main：在 browser、node 都可用的包的入口文件。
```js
/// 引入自己的文件
import * from './src/index.js'

/// 引入发布的包
import * from 'apkg'
如果main配置'./src/index/index.js',那么等同于
import * from './src/index/index.js'
```

允许 node 运行的包都可以在 browser 中运行，如果我的包只允许在 browser 下使用：
browser: 只能在 browser 用的包的入口文件。

module：browser、node、esm 使用的入口文件。(文件需要命名为*. mjs 吗？)。

typings 字段用来指定 TypeScript 的入口文件：
`"typings": "types/index.d.ts",   `
该字段的作用和 main 配置相同。

优先级：
browser 使用 esm：browser→module→main
browser 使用 cjs：main→module→browser
node 使用 esm：main
node 使用 cjs：main

#### 配置
type：module。模块导入规范。
types 指定类型检查。

## 其他配置
一些其他 npm 包的配置也可以写在 packagejson 中，比如 browserlist、husky 等。

```
  "browserslist": [
    "> 1%",
    "last 2 versions",
    "not dead",
    "not ie 11"
  ]
```
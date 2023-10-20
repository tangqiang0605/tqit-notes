[【AST篇】手把手教你写Eslint插件 - 掘金](https://juejin.cn/post/6844903961804161031?searchId=20230801153833D404F54500632E00B8E0#heading-6)
[手摸手教你写个ESLint 插件以及了解ESLint的运行原理 - 掘金](https://juejin.cn/post/6844904016363667469?searchId=20230801153833D404F54500632E00B8E0#heading-23)
[AST explorer](https://astexplorer.net/)
可视化 ast [Fetching Title#llug](https://www.jointjs.com/demos/abstract-syntax-tree)
## 创建项目
```
npm i -g yo generator-eslint
```
创建文件夹并在文件夹内执行
```
yeoman生成器子集
yo eslint:plugin
```
配置
```
作者名
插件名，demo，去掉eslint-plugin前缀
介绍
包含自定义规则yes
包含processors处理器：no

然后会自动安装依赖，如果没有，手动npm install安装。
```

创建规则
```
yo eslint:rule
```
## 编写规则
开发位置
1. 在 lib/rules 下写 js 文件开发，名为规则名
2. 在 doc/rules 写 md 文档，名为规则名
3. 在 indexjs 中注册名字、config（用于项目的extend）

Create 方法中我们返回一个对象，[跳转提示-稀土掘金](https://link.juejin.cn/?target=https%3A%2F%2Fastexplorer.net%2F) 可以通过该网站查看 ast，并且蓝色是 ast 选择器即 Identifier。
```
return {
	Identifier:(node)=>{}
}
```

## 单元测试

## 项目测试
[【建议收藏】全网最全的讲清eslint和prettier的npm包和vscode插件的文章 - 掘金](https://juejin.cn/post/6990929456382607374)
npm link
```
新建测试项目
npm init -y
eslint --init如果失败先全局安装eslint
npm link eslint-plugin-zen或者安装
在extends中引入"plugin:zen/recommended"
查看报错或者手动eslint index.js
```

## 发布
发布时可以执行 script 命令生成 readme。
发布时在 packagejson 配置
```
files:["lib/"]
最后会上传lib、packagejson、readme、LICENSE
```
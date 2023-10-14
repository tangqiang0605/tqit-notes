[基于VS Code的插件开发（基础篇）\_vscode插件开发用什么语言\_一个被程序员耽误的厨师的博客-CSDN博客](https://blog.csdn.net/qq_30632003/article/details/129260402)

[VS Code API | Visual Studio Code Extension API](https://code.visualstudio.com/api/references/vscode-api)

[VS Code插件开发教程（5） 命令的使用 Command - 掘金](https://juejin.cn/post/6971645962976509965)

通常一个插件就是 Contribution Points、VS Code API 的组合。官方的 Extensions Capabilities Overview 文档可以帮助你寻找到适合你自己插件的 Contribution Points 和 VS Code API

yeoman、generator-code、vsce
```
npm install -g yo generator-code
yo code
```
搭建插件的框架
```
# ? What type of extension do you want to create? New Extension (TypeScript)
# ? What's the name of your extension? HelloWorld
### Press <Enter> to choose default for all options below ###

# ? What's the identifier of your extension? helloworld
# ? What's the description of your extension? LEAVE BLANK
# ? Initialize a git repository? Yes
# ? Bundle the source code with webpack? No
# ? Which package manager to use? npm

```
按 F5 开始调试代码需要耐心等待 build（通过命令打开的界面需要等很久）
## 命令
Ctrl+Shift+p 测试命令
``>xxx
```
// package.json
"contributes": {
   "commands": [{
      "command": "helloword.helloWorld",
+      "title": "Clock"命令名
   }]
},

```

## packagejson
1. name、publisher：VS Code 会把publisher.name作为插件的唯一 ID
2. main 插件入口，指向./out/extension. ts 文件。
3. contributes 发布内容配置 contribution point
	1. commands 命令
	2. configuration 配置
	3. configurationDefaults 默认的特定于语言的编辑器配置
	4. keybindings 快捷键绑定
	5. menus
4. activationEvents 插件激活事件
```
onLanguage 打开解析为特定语言文件时被激活，例如"onLanguage:python"
onCommand 在调用命令时被激活
workspaceContains 每当打开文件夹并且该文件夹包含至少一个与 glob 模式匹配的文件时
onView 每当在 VS Code 侧栏中展开指定 id 的视图
onUri 每当打开该扩展的系统范围的 Uri 时
onWebviewPanel
onCustomEditor
```

## extension. ts
导出两个方法：
activate
这是插件被激活时执行的函数
deactivate
这是插件被销毁时调用的方法，比如释放内存等。

## 发布
```
vsce package
插件市场，更多操作，从vsix安装
```

## 命令
通过 vscode. commands API 来注册和执行命令
通过 contributes. commands (Contribution Point) 来让命令在 Command Palette 中可用
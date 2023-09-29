## 功能
文件保存时推送到远端仓库。
1. 检测项目 workspace 根路径是否有 .auto-diary. json 配置文件
2. 如果有配置文件，则会在第一次进入 workspace 的时候更新远端的代码仓库
3. 编写文档的过程中，如果有文件保存，会自动做一次提交，然后推送到远端仓库

## 环境
```
yarn global add yo generator-code vsce
yo code

```
1. 如果 vscode 飘红，那么有可能是 vscode. d. ts 没有正确下载，重装所有依赖。
2. nodejs 生态的工具包，亲测是可以直接用的，像比较有名气的 shell. js 直接开箱即用
3. 官方 api 地址可以好好看一下，vscode 这个包暴露了全部可以使用的接口。

## 调试
略

## 发布
1. 在微软自己的 azure devops[Azure DevOps Services | Microsoft Azure](https://azure.microsoft.com/en-us/products/devops/)(https://link.juejin.cn/?target=https%3A%2F%2Fazure.microsoft.com%2Fen-us%2Fservices%2Fdevops%2F) 网站注册账号
点击上面的链接，找到注册或者登陆的按钮（微软账号可以直接用）
登陆进入之后会提示增加一个组织
看到管理面板之后点击个人信息里面的 Security
创建一个 Personal Access Token（一定需要给足相应的权限，官方教程中会有一个醒目的截图的）
复制创建出来的 token 保存好，指不定下次还会用上，但是你下次是看不到这个 token 的。
2. 发布插件
```
创建发布者
vsce create-publisher <publisher-name>
打包插件（发布是不用这步的）
vsce package
发布插件
vsce publish
```
作者：dana 520
链接： https://juejin.cn/post/6844903839577948167
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

作者：dana 520
链接： https://juejin.cn/post/6844903839577948167
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
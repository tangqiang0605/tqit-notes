
1. 命令 bin 指定文件
```
#!/usr/bin/env node

console.log('Welcome to Mortal World');
```
1. link
2. 执行命令

## pnpm 搭建

npm link 弊端：只能 link 一个。为了解决这个弊端，我们使用 pnpm 来搭建 menorepo 风格的脚手架工程。

子工程在 dependencies 字段中声明 mortal-cli 依赖包的版本，要用 workspace:* 来定义，而不是具体版本号来定义。
在 pnpm 中使用 workspace: 协议定义某个依赖包版本号时，pnpm 将只解析存在工作空间内的依赖包，不会去下载解析 npm 上的依赖包。

将 cli 包作为子项目，另一个项目在 dependencies 通过 workspace 引用，通过 pnpm i 建立连接。

![[Pasted image 20230727114034.png]]

```
根项目建立pnpm-workspace.yaml
packages: 
  - 'packages/*' 
  - 'examples/*'


子项目
#!/usr/bin/env node
console.log('Welcome to Mortal World');

子项目
  "dependencies": {
    "mortal-cli": "workspace:*"
  }
```
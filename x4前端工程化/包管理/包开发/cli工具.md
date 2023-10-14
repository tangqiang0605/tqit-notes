命令行处理 cac、yargs、commander
交互 inquirer
特效，ora、chalk

## 获取参数
Node. js 中的 process 模块提供了当前 Node. js 进程相关的全局环境信息，比如命令参数、环境变量、命令运行路径等等。
js 复制代码 const process = require ('process');
// 获取命令参数
console.log (process. argv); 

脚手架提供的 mortal 命令后面还可以设置参数，标准的脚手架命令参数需要支持两种格式，比如：
js 复制代码 mortal --name=orderPage
mortal --name orderPage

如果通过 process. argv 来获取，要额外处理两种不同的命令参数格式，不方便。
这里推荐 yargs 开源库来解析命令参数。运行以下命令安装 yargs：
js 复制代码 pnpm add yargs --F mortal-cli

pnpm add 是 pnpm 中安装依赖包的命令， --F mortal-cli，是指定依赖安装到 mortal-cli 子工程中。

```
使用
#!/usr/bin/env node
const yargs = require('yargs');

console.log('name', yargs.argv.name);
```

在 app 文件夹目录下运行 pnpm mortal -- --name=orderPage ，

注意，在 pnpm mortal 后面需要加上两个连字符（--），这是为了告诉 pnpm 后面的参数是传递给命令 mortal 本身的，而不是传递给 pnpm 的。

作者：红尘炼心
链接： https://juejin.cn/post/7260144602471776311
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

## 设置子命令
yargs 提供的 command 方法来设置一些子命令，让每个子命令对应各自功能，各司其职。


## 用户交互模块
使用 inquirer 模块

主要通过 inquirer.prompt() 来实现。prompt 函数接收一个数组，返回一个promise，数组的每一项都是一个询问项，询问项有很多配置参数。
![[Pasted image 20230727164950.png]]

## 拷贝文件
在 Node.js 中拷贝文件夹并不简单，需要用到递归，这里推荐使用开源库 copy-dir 来实现拷贝文件。

```
copydir.sync(from, to, options);
```

## 模板
mustache。因为 Mustache.render 的第一个参数类型是个字符串，所以在调用 fs.readFileSync 时要指定 encoding 类型为 utf8，否则 fs.readFileSync 返回 Buffer 类型数据。
```
const str = fs.readFileSync(path, { encoding: 'utf8' })
Mustache.render(str, data);
```

## 自动安装依赖、执行命令
我们要实现在生成模板过程中就自动安装这两个依赖。
我们使用 Node 中 child_process 子进程这个模块来实现。
在 child_process 子进程中的最常用的语法是：
child_process.exec (command, options, callback)

```
const { exec } = require('child_process');
exec(command,options,callback)
```

作者：红尘炼心
链接： https://juejin.cn/post/7260144602471776311
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

## 命令控制台动画
这里推荐使用开源库 ora 来实现加载动画。

## 发布
在 packages/mortal 文件夹目录下运行，运行以下命令安装将脚手架发布到 npm 上。

pnpm publish --F mortal-cli

## 案例
插件 TinyPng 命令行工具
[图片不压缩，前端要背锅 🍳 - 掘金](https://juejin.cn/post/7153086294409609229?utm_source=ug_by_post)

1. 安装
2. 执行命令
3. 命令行交互
4. 实现压缩

实现思路
总体分为五个过程：

查找：找出所有的图片资源；
分配：均分任务到每个进程；
上传：把原图上传到 TinyPng；
下载：从 TinyPng 中下载压缩好的图片；
写入：用下载的图片覆盖本地图片；
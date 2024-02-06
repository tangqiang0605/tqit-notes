项目一：todolist
项目二：toB 后台管理系统
项目三：toC 博客论坛

1. windows：安装 nodejs（nvm），


nodejs 对于前端项目开发的意义在于它提供了面向 JavaScript 的 api 和运行时，因此它可以运行 npm 管理和运行所有的开发依赖包，而有的开发依赖包能够将高级语法（比如 jsx）转换为原生语法。所以我们需要安装 nodejs。这里推荐下载 nvm。nvm 可以用于管理和切换系统中使用的 nodejs 的版本。

## 安装 nvm 与 nodejs
如果已经安装了 nodejs，需要先进行卸载，在设置>应用>应用和功能就可以卸载 nodejs 了。

下载 nvm 的 exe 文件并运行。地址：https://github.com/coreybutler/nvm-windows/releases/tag/1.1.11 。

设置一个 nvm 安装位置，并在该位置下创建 nodejs 文件夹，用于存放各个版本的 nodejs。

在 nvm 安装位置找到 settting. txt，配置镜像源。
```
// setting.txt
node_mirror: https://npm.taobao.org/mirrors/node/
npm_mirror: https://npm.taobao.org/mirrors/npm/
```

查看 nvm 版本： `nvm -v`
查看已安装的 nodejs ： `nvm list`
查看可下载的 nodejs：`nvm list available`
安装 nodejs： `nvm install 18.16.0`
查看 node 版本：`node -v`

## npm 与 npx
npm 是 nodejs 自带的包管理工具，npx 是 npm 5.2+ 附带的 package 运行工具。

别人将好用的代码写下来并发布供所有人使用，发布的这套代码称为包（或库、框架等），如果你的项目用到这个包，那么这个包就称为项目的依赖。比如你的项目需要一个表格，你不想自己写，那么你可以使用别人写好的表格，这个包就是你项目的依赖。普通依赖对于开发是有帮助的，会成为代码的一部分。

有的包则是提供辅助功能，用于提高你的代码效率。这部分包的代码不会出现在项目的最终输出中。比如帮你检查代码的错误，帮你整理代码文件，这些是和你写代码时的体验和效率是有关的，但是和你写的代码内容是无关的。

辅助性依赖分为两种，一种是全局依赖，安装在你的系统中，在任何地方都可以使用，你可以用它来帮你做一些工作，比如帮你计算某个文件夹的大小。另一种辅助性依赖是开发依赖，它安装在项目中，帮助你提高代码效率，比如你在项目中安装了 typescript 作为开发依赖，它可以帮助你检查类型错误。一般情况下，辅助性依赖都是以命令行作为交互的（也有用界面的），所以它们都会注册一个自己的命令。

使用 `npm install xxx -g` 来安装全局依赖，使用 `npm install xxx -D` 来安装开发依赖。全局依赖的开发者一般会注册一个命令，比如你安装 typescript 作为全局依赖，这个包注册了一个 tsc 作为命令，你安装之后就可以在任意地方使用了。如果你将它安装为开发依赖，那你就无法直接使用 tsc。

运行开发依赖注册的命令有两种方法：
1. 将命令写在 package. json 中的 scripts 下，然后通过 `npm run xxx` 运行。比如：
```
// package.json
{
	"scripts":{
		"build":"tsc"
	}
}
```
运行 `npm run build`，它就会运行 tsc 命令了。这种方法称为 npm script。npm script 非常常用，你可以安装一些自动化的依赖，然后用 npm run 的方法去启动它。
2. 使用 npx。直接在项目中使用 `npx tsc` 也是一样的。但是因为 npm script 已书面形式记录下来了，方便合作者查看，所以建议第一种方式。

npx 除了能直接运行开发依赖注册的命令，它还可以直接运行还没有安装下来的全局依赖的命令！其实，npx 就只有一个功能，就是运行命令，如果能够在本地找到，就运行本地的，如果没有，就运行网上的。

## 全局包的管理
查看全局包的安装位置： `npm root -g` 或者 `npm config ls`。
查看已安装的全局包：npm ls -g

## 使用cra创建 react 项目
最朴素的创建项目的方法，是在文件资源管理器创建一个文件夹，存放项目的所有代码，称为项目文件夹，然后再创建 package. json 并安装依赖和开发依赖，并创建一些必要的配置文件。而使用脚手架工具，可以一步帮我们完成这些任务。cra（create-react-app）就是这样的脚手架。
```
npx create-react-app todo-list
```

## 项目结构
cra 创建的项目结构十分简单，如果没有 cra，我们就需要手动一个一个创建这些文件，帮助我们自动完成任务这就是 cra 存在的意义。
首先 cra 创建了一个 src 文件夹，用来存放代码文件。public 文件夹用来存放图标、图片等资源文件。然后是一些配置，package. json、package-lock. json 描述了这个项目有哪些依赖，这些依赖存在 node_modules 中。然后是 readme，这个是向其他人介绍这个项目的文档。如果我们使用 git，当然要排除一些文件，cra 帮我们写好了，在. gitignore 里面。
```
|-- todo-list
    |-- .gitignore
    |-- package-lock.json
    |-- package.json
    |-- README.md
    |-- public
    |   |-- favicon.ico
    |   |-- index.html
    |   |-- logo192.png
    |   |-- logo512.png
    |   |-- manifest.json
    |   |-- robots.txt
    |-- src
        |-- App.css
        |-- App.js
        |-- App.test.js
        |-- index.css
        |-- index.js
        |-- logo.svg
        |-- reportWebVitals.js
        |-- setupTests.js
```

## react 入口
学习 react 的核心是理解它的生命周期。在理解生命周期的基础上，在合适的生命周期时期写合适的代码，就构成了我们的 react 项目。关于合适的代码，你只需要简单学习 react 提供的 api 和 jsx 写法就可以了。

react 是一个用来绘制 ui 的库。它的原理是获取 html 上的 dom 元素，然后控制它，对它进行各种 dom 操作（使用 JavaScript dom api）。src/index. js 完成的就是这样的功能。它获取 html 上的 root 元素，然后对它就行管理：将 App 绘制到 root 上。

所以我们只需要在 src 中保留 index 和 App. js 就可以开始编写我们的代码了。
```
|-- todo-list
    |-- .gitignore
    |-- package-lock.json
    |-- package.json
    |-- README.md
    |-- public
    |   |-- favicon.ico
    |   |-- index.html
    |   |-- logo192.png
    |   |-- logo512.png
    |   |-- manifest.json
    |   |-- robots.txt
    |-- src
        |-- App.js
        |-- index.js
```
运行，可以看到报错：
![[Pasted image 20231126171746.png]]
我们逐个解决就可以了。它说在 index. js 中引入 index. css 错误，因为这个文件已经被我们删除了，并不存在，后面也是类似的，根据报错删除这些引入语句就可以了。

然后它会提示：
![[Pasted image 20231126171957.png]]
把 App. js 中 return 的内容清空就可以了，因为我们想开始书写我们的新项目。
```
// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```
App. js：
```
// src/App.js
function App() {
  return;
}

export default App;
```

## 创建多个组件
我们准备做一个 todo list 应用，可以新建、勾选、删除代办事项。

```jsx
// App.js
import { useState } from "react";

function App() {
// 创建一个数组，用来保存todo list的数据
  const [list, setList] = useState([
    {
      text: '吃饭',
      key: 0,
      isfinished: false,
    },
    {
      text: '学习',
      key: 1,
      isfinished: true,
    },
  ])
  return (
    <>
      {list.map(item => {
        return (<div key={item.key} style={{ background: item.isfinished ? 'green' : 'white' }}> {item.text}</div >)
      })}
    </>
  );
}

export default App;
```


vite 是一个前端工具，可以帮助我们将使用高级语法的代码转换为浏览器可以运行的普通代码，同时它可以启动一个本地开发服务器，帮助我们预览项目的运行效果。

什么样的代码具备高级语法？像 jsx、ts、vue、sass 等非原生三件套（html、css、js）的语言。这些代码浏览器是不认识的，开发者书写这些代码，vite 将其进行转换，就可以在浏览器运行啦。

什么是本地开发服务器？我们把前端代码保存为文件，使用浏览器打开这些文件，就可以看到网页效果。浏览器打开前端源码文件有两种方式，一种是以文件的形式打开（使用文件协议），一种是使用 http 协议打开。通过文件协议打开的网页被浏览器当作一个文件浏览，而通过 http 协议打开的网页才是真正形式的网页展示。

## 开发服务器
vite 是如何启动一个本地开发服务器的？启动一个本地开发服务器是一件很容易的事情，我们自己也可以做到。最简单的方法就是下载 http-serve 并运行。而 vite 在启动本地开发服务器的同时，还对我们的代码进行了转换，使其能够在浏览器上成功运行。在项目中，我们通过输入命令行 `npm crate vite` 创建项目，`npm i` 安装依赖，最后通过命令 `npm run dev` 启动 vite 的开发服务器。

`npm run dev` 做了什么？npm run xxx 是包管理器 npm 的一个指令，用于执行 package. json 文件中对应的 script 字段。查看 package. json，可以看到 `dev` 其实是执行了 vite 命令。在 vite 的源码中，vite 使用 cac 作为命令行参数解析工具。**cac 是一个用于构建 CLI 应用程序的 JavaScript 工具库。** 在 npm 中，我们可以通过 package. json 的 bin 字段配置简单的命令，但是无法进行参数解析，使用 cac 库，可以生成很多命令入口，根据命令行命令，执行不同的入口函数。在我们匹配到 `dev` 时，它就执行 runServe 方法，runServe 方法整合配置项，通过 connect 的 createServe 方法创建起本地服务器服务。

connect 是一个 http 服务器框架。前端常见的服务框架还有：nodejs 的 http 模块，http-serve、express 和 koa。

runServe 方法还执行了很多操作，比如创建 websocket 服务实现文件监听、optimize 优化等。

## 预构建与强缓存
vite 是如何转义高级语法的？当我们首次启动 vite 时，vite 会执行一个名为预构建的操作。vite 找到入口文件，查看入口文件中是否还导入了其他依赖，如果有且非 esm 模块，vite 会使用 esbuild 对其代码的导入进行替换，并将依赖缓存到 node_modules/. vite 文件夹下。

预构建的任务一是统一依赖的导入方式（全部改用 esm），二是将有许多内部模块的 esm 依赖关系转为单个模块。浏览器执行到含 type="module"的 script 标签时，会向服务器发起请求，并对请求得到的文件进行模块解析。统一依赖的导入方式为 esm，可以充分利用浏览器对 esm 模块的解析支持。将多个模块转为单个模块，可以减少 http 请求，提升网页性能。

一旦服务端完成预构建的浏览器请求，服务端发送这个文件给浏览器的同时，还会要求浏览器缓存这个文件（强缓存），时期为一年，当浏览器遇到需要该文件的请求时，不再向浏览器要了，而是直接从本地缓存读取，速度更快。那么如果我修改了文件，怎么让浏览器知道我这个文件不是原来的文件，还是需要向我服务端请求呢？这里 vite 使用了一种 hash 算法，根据文件内容计算出不同的 hash 值，并加在文件名的后面，只要文件内容改变，hash 值就会改变，而文件名不同，浏览器在缓存中找不到这个文件，就会向服务端请求新的文件了。

## 入口文件与热更新
vite 生成的入口文件包含两条重要引入，一个是引入 client.ts 文件，一个是引入 main. ts 文件。

client. ts 文件在浏览器执行时，里面的代码会要求浏览器与服务器建立 websocket 通信，这样，当服务器端的代码发生修改时，就可以主动通知浏览器，让浏览器请求新的代码文件，使页面保持最新状态。这是实现热更新的一个重要途径。

maints 即入口文件，是预构建的起点，当 maints 的交互触发到其他 import 代码时，就会发送请求。一个 import 一般对应一个请求。但这个请求不一定会发出，而是先查看本地缓存，如果没有，再发送请求向服务端索要新文件。


技术选型
[开始 | Vite 官方中文文档 (vitejs.dev)](https://cn.vitejs.dev/guide/#community-templates)
[vitejs/awesome-vite: ⚡️ A curated list of awesome things related to Vite.js (github.com)](https://github.com/vitejs/awesome-vite#templates)


terser 压缩工具：对代码进行压缩混淆

treeshaking：删除未使用的代码

优势
nobundle：启动快、热更新
语法转义：ts、jsx、sass 等高级语法开箱即用
产物质量

### 预构建
自动开启的预构建，预构建产物在 `node_modules/.vite` 目录下，会设置浏览器强制缓存，过期时间一年，以下3个地方都没有改动，Vite 将一直使用缓存文件：
1.  package.json的`dependencies`字段
2.  各种包管理器的lock文件
3.  `optimizeDeps` 配置内容

预构建并不是万能的，有时候需要对其进行优化：
1. 当我们不需要缓存预构建
2. 运行时发现有的地方没有构建而进行二次预构建损害性能
3. 预构建会自动排除 esm 的包。如果该包依赖的不是 esm 包，就会出错。

### 入口文件

html 标签特性：每个外联 script 都会发送一次请求。

vite 入口文件index. html 中包含两条关键模块：
1. 入口模块
2. client 模块：客户端执行该模块，与开发服务器建立 websocket 通信，以响应热更新 hrm

每次对 vite 请求，vite 都会进行中间处理然后返回给客户端。
1. 导入语法修正
2. 转义 vue、jsx 文件


#### 其他静态资源

除了上述的一些资源格式，Vite也对下面几类格式提供了内置的支持：

-   媒体类：包括`mp4`、`webm`、`ogg`、`mp3`、`wav`、`flac`和`aac`
    
-   字体类文件：包括`woff`、`woff2`、`eot`、`ttf`和`otf`
    
-   文本类：包括`webmanifest`、`pdf`和`txt`
    

也就是说，可以在Vite将这些类型的文件当作一个ES模块来导入使用，如果项目中还存在其他格式的静态资源，可以通过`assetsInclude`配置来让Vite支持加载

`// vite.config.ts      {     assetsInclude: ['.gltf']   }   `

#### 特殊资源后缀

Vite中引入静态资源时，也支持在路径最后加上一些特殊的query后缀，包括：

-   `?url`：表示获取资源的路径，这在只想获取文件路径而不是内容的场景将会很有用
    
-   `?raw`：表示获取资源的字符串内容，如果你只想拿到资源的原始内容，可以使用这个后缀
    
-   `?inline`：表示资源强制内联，而不是打包成单独的文件

### JSON 加载
Vite 已经内置了对 JSON 文件的解析，底层使用 `@ rollup/pluginutils` 和 `dataToEsm` 方法将 JSON 对象转换为一个包含各种具名导出的 ES 模块，如下：
`import {version} from '../../../package.json'   `
不过可以在配置文件禁用按名导入的方式：
`// vite.config.ts      {     json: {       stringify: true     }   }   `
这样会将 JSON 的内容解析为 `export default JSON.parse('xxx')`，这样会失去 `按名导出` 的能力，不过在 JSON 数据量较大的时候，可以优化解析性能。
即前者可以按名直接导入 json 的属性，前者会消耗一些性能进行转换，而后者则默认导入一整个字符串。个人觉得没必要配。


### 分包
vite 的一个分包策略说白了我理解中的和 webpack 优化手段之一的提取公共库【 名字好多人叫的不一样 】差不多诸如一些  DllPlugin 之类的。

我们在 maints 引用 lodash，一旦修改，又会重新获取 lodash，但是其代码没有改变。我们应该手动分包，让客户端不再请求这一不变的部分。

yarn add lodash
yarn add lodash @types/lodash -D
```js
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import { forEach } from 'lodash'
let list: Array<any> = []
forEach(list,(item:any)=>{
    console.log(item,"item")
})
createApp(App).mount('#app')
```

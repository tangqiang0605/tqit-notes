
## 模块化
webpack 支持 commonjs 和 esmodule
它的原理：

CommonJS 模块化实现原理
ES Module 实现原理
CommonJS 加载 ES Module 的原理（esm 导出，cjs 导入）
ES Module 加载 CommonJS 的原理（cjs 导出，esm 导入）

commonjs 运行过程
1. modules 对象存储所有模块
2. 模块的路径作为 modules 的键，值为函数返回 module. exports 对象。
3. require 函数读取 modules 的值执行返回 module. exports 对象
```
var modules = {
  "./name.js": () => {
    var module = {};
    module.exports = "不要秃头啊";
    return module.exports;
  },
};
const require = (modulePath) => {
  return modules[modulePath]();
};

let author = require("./name.js");
console.log(author, "author");
```
commonjs 原理
1. modules 对象以路径为键存储函数，函数会给传来的参数挂载 exports 属性
2. require 时，查看 cache。
3. cache 为空，创建 module 并作为参数传给 modules\[path\]挂载 exports 属性。
4. 最后 require 返回这 module. exports 对象
```
//模块定义
var modules = {
  "./src/name.js": (module) => {
    module.exports = "不要秃头啊";
  },
};
var cache = {};

//接受模块的路径为参数，返回具体的模块的内容
function require(modulePath) {
  var cachedModule = cache[modulePath]; //获取模块缓存
  if (cachedModule !== undefined) {
    //如果有缓存则不允许模块内容，直接retuen导出的值
    return cachedModule.exports;
  }
  //如果没有缓存，则定义module对象，定义exports属性
  //这里注意！！！module = cache[modulePath] 代表引用的是同一个内存地址
  var module = (cache[modulePath] = {
    exports: {},
  });
  //运行模块内的代码，在模块代码中会给module.exports对象赋值
  modules[modulePath](module, module.exports, require);

  //导入module.exports对象
  return module.exports;
}

(() => {
  let author = require("./src/name.js");
  console.log(author, "author");
})();

```

esmodule 类似
1. 定义 modules 对象，属性值为绑定函数
2. require 调用并获得其 module. exports 对象

## 懒加载
在 Webpack 中常用的代码分离方法有三种：

入口起点：使用 entry 配置手动地分离代码。
防止重复：使用 Entry dependencies 或者 SplitChunksPlugin 去重和分离 chunk。
动态导入：通过模块的内联函数调用来分离代码。

作者：不要秃头啊
链接： https://juejin.cn/post/7152516872330543141/

来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

原理：
1. jsonp 请求文件
2. 合并 modules
3. require加载模块
![[Pasted image 20230815233313.png]]

具体实现：
1. require. e 调用 require. j，j 通过 jsonp 执行目标文件。
2. 目标文件是调用我们提供的函数进行安装。
3. e 后 then 的是 require，返回 module. exports 对象。


## AST
EStree 规范。

一个完整的编译器整体执行过程可以分为三个步骤：

Parsing (解析过程)：这个过程要经词法分析、语法分析、构建 AST（抽象语法树）一系列操作；
Transformation（转化过程）：这个过程就是将上一步解析后的内容，按照编译器指定的规则进行处理，形成一个新的表现形式；Traversal(遍历，深度优先) 和 Visitors (访问器)
Code Generation（代码生成）：将上一步处理好的内容转化为新的代码；

词法分析是使用 tokenizer(分词器)或者 lexer(词法分析器)，将源码拆分成 tokens，tokens 是一个放置对象的数组，其中的每一个对象都可以看做是一个单元（数字，标签，标点，操作符...）的描述信息。
```
tokens数组（词法分析）
[
  { type: "paren", value: "(" },
  { type: "name", value: "add" },
  { type: "number", value: "2" },
  { type: "paren", value: "(" },
  { type: "name", value: "subtract" },
  { type: "number", value: "4" },
  { type: "number", value: "2" },
  { type: "paren", value: ")" },
  { type: "paren", value: ")" },
];

访问器
const visitor = {
	NumberLiteral(node,parent){}, // 处理数字类型节点
	CallExpression(node,parent){} // 处理调用语句类型节点
}
```

## babel
[前端工程化基石 -- AST（抽象语法树）以及AST的广泛应用🔥 - 掘金](https://juejin.cn/post/7155151377013047304/#heading-14)

Babel 其实就是一个最常用的 Javascript 编译器，它能够转译 ECMAScript 2015+ 的代码，使它在旧的浏览器或者环境中也能够运行，工作过程分为三个部分（其实就跟我们上面手写的一样，相信大家现在肯定倍感亲切）：

Parse (解析) 将源代码转换成抽象语法树，树上有很多的 estree 节点
Transform (转换) 对抽象语法树进行转换
Generate (代码生成) 将上一步经过转换过的抽象语法树生成新的代码

作者：不要秃头啊
链接： https://juejin.cn/post/7155151377013047304/

当然我们现在不用从零开始手写了，可以借助于 babel 插件：

@babel/parser 可以把源码转换成 AST
@babel/traverse 用于对 AST 的遍历，维护了整棵树的状态，并且负责替换、移除和添加节点
@babel/generate 可以把 AST 生成源码，同时生成 sourcemap
@babel/types 用于 AST 节点的 Lodash 式工具库, 它包含了构造、验证以及变换 AST 节点的方法，对编写处理 AST 逻辑非常有用
@babel/core Babel 的编译器，核心 API 都在这里面，比如常见的 transform、parse，并实现了插件功能
```
yarn add @babel/core -D //里面就包含了@babel/parser、@babel/traverse、@babel/generate、@babel/types等

```

作者：不要秃头啊
链接： https://juejin.cn/post/7155151377013047304/
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。


babel 工具函数
1. 生成 ast（@babel/parser）
2. 用 visitor 转换 ast，（@babel/traverse）
3. ast 生成代码（@babel/generator）
4. 使用插件：@babel/core 的 transfom 函数。接收 code，自动解析，然后使用 plugins 对象数组的 vistor 属性修改 ast，最后返回结果。

babel 插件
1. 拥有 vistor 对象作为属性的对象。
2. api：api：blockStatement 、returnStatement，可以用它们来生成节点或判断节点。
```
let types = require("@babel/types"); //用来生成或者判断节点的AST语法树的节点

const arrowFunctionPlugin = {
  visitor: {
    //如果是箭头函数，那么就会进来此函数，参数是箭头函数的节点路径对象
    ArrowFunctionExpression(path) {
      let { node } = path;
      node.type = "FunctionExpression";

      //如果函数体不是块语句
      if (!types.isBlockStatement(node.body)) {
        node.body = types.blockStatement([types.returnStatement(node.body)]); //生成一个块语句，并将内容return
      }
    },
  },
};
```

## loader
 Webpack 本身只能处理 js  和 JSON 文件，其他类型文件它是不能够处理的。需要借助 Loader 来处理这些类型的文件，并将它们转换为有效的模块。Loader 本质上是导出函数的 JavaScript 模块，而该模块导出的函数（若是 ES6 模块，则是默认导出的函数）
 
```
/**
 *
 * @param {string|Buffer} content 源文件的内容
 * @param {object} [map] 可以被 https://github.com/mozilla/source-map 使用的 SourceMap 数据
 * @param {any} [meta] meta 数据，可以是任何内容
 */
function webpackLoader(content, map, meta) {
  // 你的 webpack loader 代码
}

作者：不要秃头啊
链接：https://juejin.cn/post/7157739406835580965
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
```
引入 loader
```
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          "style-loader", //将css内容变成style标签插入到html中去
          "css-loader", //解析css文件的路径等
          "less-loader", //将less=>css
        ],
      },
    ],
  },
执行顺序是从右向左
```
use
1. 字符串
2. 对象，含 loader 路径、options 配置。./loaders/simpleLoader.js
开发辅助
```
resolveLoader: {
方法一
 alias: {
   "simpleLoader": path.resolve(__dirname, "./loaders/simpleLoader.js"),
 },
 方法二，推荐
     //找loader的时候，先去loaders目录下找，找不到再去node_modules下面找
    modules: ["loaders", "node_modules"],
},
module: {
rules: [
  {
	test: /\.js$/,
	use: [
	  {
		loader: "simpleLoader",
		options: {
		  /* ... */
		},
	  },
	],
  },
],
},
```
loader 类型：前置 pre、普通 normal、行内 inline、后置 post。缺省 normal，由 use 的同级 enforce 的值配置。

loader 顺序
1. Pitching 阶段: Loader 上的 pitch 方法，按照后置 (post)、行内 (inline)、普通 (normal)、前置 (pre) 的顺序调用。
2. Normal 阶段: Loader 上的常规方法，按照前置 (pre)、普通 (normal)、行内 (inline)、后置 (post) 的顺序调用。模块源码的转换，发生在这个阶段。
3. 同等类型下的 Loader 执行顺序才是由右向左，或者由下到上执行。

loader 文件导出的函数就是 normal loader，函数的 pitch 属性的函数就是 pitching loader。当一个 Loader 的 pitch 阶段有返回值时，将跳过后续 Loader 的 pitch 阶段，直接进行到该 Loader 的 normal 阶段。
图示假设我们配置 normal\[a, b, c\]。
pitch：post、inline、normal、pre
normal：pre、normal、inline、post
![[Pasted image 20230819225636.png]]
![[Pasted image 20230819225642.png]]
```
Loader. pitch = function (remainingRequest, previousRequest, data) {
  console.log (remainingRequest, previousRequest, data)
};
```

这里的第三个参数 data，可以用于数据传递。即在 pitch 函数中往 data 对象上添加数据，之后在 normal 函数中通过 this. data 的方式读取已添加的数据，也就是注入上下文。

作者：不要秃头啊
链接： https://juejin.cn/post/7157739406835580965
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。


![[Pasted image 20230819224352.png]]
### 内联 loader
指定引入模块使用某个具体 loader
```
// src/index.js
import test from "c-loader!./test.js"; //使用内联 Loader

const a = 1;
```

## plugin
tapable 是一个类似于 Node.js 中的 EventEmitter 的库，但它更专注于自定义事件的触发和处理。通过 tapable 我们可以注册自定义事件，然后在适当的时机去触发执行。类比到 Vue 和 React 框架中的生命周期函数

tapable 采用的是发布订阅模式，通过 tap 函数注册监听函数，然后通过 call 函数按顺序执行之前注册的函数。

这里详细说一下这几个类型的概念：

Basic（基本的）：执行每一个事件函数，不关心函数的返回值
Waterfall（瀑布式的）：如果前一个事件函数的结果 result !== undefined，则 result 会作为后一个事件函数的第一个参数（也就是上一个函数的执行结果会成为下一个函数的参数）
Bail（保险的）：执行每一个事件函数，遇到第一个结果 result !== undefined 则返回，不再继续执行（也就是只要其中一个有返回了，后面的就不执行了）
Loop（循环的）：不停的循环执行事件函数，直到所有函数结果 result === undefined

loader 的 pitch 阶段 就是 bail 的。

### compiler
compiler 对象代表了完整的 webpack 生命周期。这个对象在启动 Webpack 时被一次性建立，并配置好所有可操作的设置，包括 options，loader 和 plugin。当在 Webpack 环境中应用一个插件时，插件将收到此 compiler 对象的引用。可以使用它来访问 Webpack 的主环境。

compilation 对象代表了一次资源版本构建。当运行 Webpack 开发环境中间件（ webpack-dev-server）时，每当检测到一个文件变化，就会创建一个新的 compilation，从而生成一组新的编译资源。一个 compilation 对象表现了当前的模块资源、编译生成资源、变化的文件、以及被跟踪依赖的状态信息。compilation 对象也提供了很多关键时机的回调，以供插件做自定义处理时选择使用。

把 compiler 比喻成 React 组件，在 React 组件中有一系列的生命周期函数（componentDidMount ()、render ()、componentDidUpdate ()等等），这些钩子函数都可以在组件中被定义。
把 compilation 比喻成 componentDidUpdate ()，componentDidUpdate ()只是组件中的某一个钩子，它专门负责重复渲染的工作（compilation 只是 compiler 中某一阶段的 hook ,主要负责对模块资源的处理，只不过它的工作更加细化，在它内部还有一些子生命周期函数）。

Webpack Plugin 是一个含 apply 方法的对象。当 Webpack 内部进行插件挂载时会执行 apply 函数。我们可以在 apply 方法中订阅各种生命周期钩子，当到达对应的时间点时就会执行。

```
const chalk = require("chalk");//给日志加颜色插件
const execSync = require("child_process").execSync;

const error = chalk.bold.red; //红色日志
const warning = chalk.keyword("orange"); //橘色日志

class DonePlugin {
  apply(compiler) {
    compiler.hooks.done.tap("DonePlugin", () => {
      //获取git账号信息的username
      let name = execSync("git config user.name").toString().trim();

      console.log(
        error(`${name},`),
        warning(
          "我知道此刻你很意外。但不知道怎么回事，我看见你的第一眼就沦陷了...可以给我一个多了解了解你的机会吗？  ————来自一个热心帮你解决问题的人"
        )
      );
    });
  }
}

module.exports = DonePlugin;

作者：不要秃头啊
链接：https://juejin.cn/post/7160467329334607908
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
```

## tepable
Tapable 的内部以特别巧妙的方式实现了发布订阅模式，这之中会有非常多的知识点：比如懒编译或者叫动态编译，关于类与继承抽象类的面向对象思想以及 this 指向的升华等等...

对同步钩子来说， tap 方法是唯一注册事件的方法，通过 call 方法触发同步钩子的执行。
对异步钩子来说，可以通过 tap、tapAsync、tapPromise 三种方式来注册，通过对应的 callAsync、promise 这两种方式来触发注册的函数。

四种钩子类型：略。

AsyncParallelBailHook 是一个异步并行、保险类型的 Hook，只要其中一个有返回值，就会执行 callAsync 中的回调函数。AsyncParallelBailHook 是一个异步并行、保险类型的 Hook，只要其中一个有返回值，就会执行 callAsync 中的回调函数。

### 调试代码
修改路径
```
//之前
const { SyncHook } = require("tapable");

//修改后，并在该行打断点
const SyncHook = require("../node_modules/tapable/lib/SyncHook");
```

### 原理
使用 [[Function]] 生成函数：当调用 call 方法时，会走两个关键的步骤：先动态生成执行代码，再执行生成的代码。
```
this.args 用来存放实例化过程中传入的形参数组
new Function(this.args().join(","), this.header() + this.content());
```

这么做一部分原因是为了极佳的性能考虑，比如只有在执行 call 方法时才会去动态生成执行函数，如果不执行则不处理（懒编译或者叫动态编译）。
还有一部分原因则是为了更加灵活。别忘了，该库里面还有其他类型的 Hook，如果我们想要实现其他 Hook，只需要定义好各自的 compiler 函数就可以了。
另外，Webpack 作者也提到过为什么采用 new Function 的方案，一切都是为了性能考虑，链接在这里：github. com/webpack/tap… ，有兴趣的可以去看看。

作者：不要秃头啊
链接： https://juejin.cn/post/7164175171358556173
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

## webpack 原理
[[webpack配置]]

Webpack 本质上是一个函数，它接受一个配置信息作为参数，执行后返回一个 compiler 对象。（工厂模式）
调用 compiler 对象中的 run 方法就会启动编译。
run 方法接受一个回调，可以用来查看编译过程中的错误信息或编译信息。

```
const Webpack=(config):{run:(cb)=>void}=>{return compiler}
```

```
// debugger.js
// const { webpack } = require("./webpack.js"); //后面自己手写
const { webpack } = require("webpack");
const webpackOptions = require("./webpack.config.js");
const compiler = webpack(webpackOptions);

//开始编译
compiler.run((err, stats) => {
  console.log(err);
  console.log(
    stats.toJson({
      assets: true, //打印本次编译产出的资源
      chunks: true, //打印本次编译产出的代码块
      modules: true, //打印本次编译产出的模块
    })
  );
});

```
运行 debbuger. js 类似运行 webpack ，得到编译结果。

compiler 构造函数：
1. 存储配置
2. 存储钩子（run、done）

插件：config. plugins 插件对象数组
```
//自定义插件WebpackDonePlugin
class WebpackDonePlugin {
  apply(compiler) {
    compiler.hooks.done.tap("WebpackDonePlugin", () => {
      console.log("结束编译");
    });
  }
}

作者：不要秃头啊
链接：https://juejin.cn/post/7170852747749621791
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
```

run
1. 触发各种钩子
2. 编译（利用 Compilation 对象的 build 方法）

Compilation:
1. options：webpackOptions
2. modules：模块。
3. chunks：代码块
4. assets：资源文件
5. fileDependencies：涉及文件（入口文件）

Compilation 流程:
1. 找到入口文件
2. 添加到 fileDependencies
3. 创建 module，遍历 test 得到 loader，loader 处理。
4. 读取代码中的依赖，将其地址添加到 fileDependencies 中，将 id 和路径添加到 module 的 denpendencies 上。
5. 转换导入语句最终代码并作为 module 的_source 值。
6. 加载loader
```
const loader1 = (source) => {
  return source + "//给你的代码加点注释：loader1";
};
```
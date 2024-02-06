## script 加载策略
1. defer：按顺序在文档解析后解析下载内容。
2. async：在文档解析时一起并行解析，顺序不固定。
3. 阻塞文档解析。
4. 在 dom 解析后解析。

## 引入
```
<script src="scripts/main.js" defer></script>
<script>
	这里也可以写代码...
</script>
还可以在元素上内联写方法，但是没人这么做
```
我们将 \<script\> 放在 HTML 文件的底部附近的原因是浏览器会按照代码在文件中的顺序加载 HTML。如果先加载的 JavaScript 期望修改其下方的 HTML，那么它可能由于 HTML 尚未被加载而失效。因此，将 JavaScript 代码放在 HTML 页面的底部附近通常是最好的策略。

在 HTML 和 CSS 集合组装成一个网页后，浏览器的 JavaScript 引擎将执行 JavaScript 代码。这保证了当 JavaScript 开始运行之前，网页的结构和样式已经就位。

#### 执行 js 与 js 的位置
html 中可能包含 js 代码（不管是外联的还是内联的）。js 代码一般是对 dom 或者 cssom 进行操作，所以往往要放在 dom 树和 cssom 树构建完成的后面，但它也可以放在 dom 树构建的过程中，这时候，解析 html 遇到 js 代码，也会停止 dom 树的构建，执行 js 代码。 js 代码只能对前面的 dom、cssom 进行操作，而无法对后面未添加进树的节点进行操作。

**js 应该至少等 css 解析完成再执行。** 解析 css 会阻塞主线程，执行 css、构建 js 任务是同步加入主线程的，不管 js 什么时候执行，我们都应该安排其在 css 后。

基于这个阻塞限制（停止 dom 树的构建），我们要把 script 放在正确位置：放在需要操作的 dom 后（如果放在最后，等同于 defer）；async（构建 dom 树的同时执行 js）；defer（完成 dom 树、布局绘制后执行 js）。
### 引入策略
要让脚本调用的时机符合预期，需要解决一系列的问题。可以使用回调。但更常用的是使用 async 或者 defer 属性。

async：无序。下载后马上执行，因为是并行不会阻塞页面解析。

（异步）浏览器遇到 `async` 脚本时不会阻塞页面渲染，而是直接下载然后运行。这样脚本的运行次序就无法控制，只是脚本不会阻止剩余页面的显示。当页面的脚本之间彼此独立，且不依赖于本页面的其他任何脚本时，`async` 是最理想的选择。

defer：有序。下载后等待页面解析后执行。

添加 `defer` 属性的脚本将按照在页面中出现的顺序加载，因此第二个示例可确保 `jquery.js` 必定加载于 `script2.js` 和 `script3.js` 之前，同时 `script2.js` 必定加载于 `script3.js` 之前。（像把 js 按顺序加入任务队列一样）
-   如果脚本无需等待页面解析，且无依赖独立运行，那么应使用 `async`。
-   如果脚本需要等待页面解析，且依赖于其他脚本，调用这些脚本时应使用 `defer`，将关联的脚本按所需顺序置于 HTML 中。


在 html 文档中引入 JavaScript

方法一：嵌入式

``` html
<script type="text/JavaScript">js代码</script>
```

方法二：外链式

``` html
<script type="text/JavaScript" src="js文件地址"></script>
```

script 标签在 html 文档中的位置

~~位置一：head。加载完才加载 body，造成页面阻塞空白。~~

位置二：head 中。加上 defer 属性。html 文档加载完成再加载 js 文件。（推荐。按需添加 defer）。

位置三：body 标签后面。
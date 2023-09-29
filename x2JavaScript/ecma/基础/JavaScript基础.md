【JavaScript 基础语法-dom-bom-js-es 6 新语法-jQuery-数据可视化 echarts 黑马 pink 老师前端入门基础视频教程 (500 多集)持续】 https://www.bilibili.com/video/BV1Sy4y1C7ha?p=280&share_source=copy_web&vd_source=29fe7574da791ab80847f919bb131f3a

HTML https://blog.csdn.net/wuyxinu/article/details/103515157
CSS https://blog.csdn.net/wuyxinu/article/details/103583618
JS https://blog.csdn.net/wuyxinu/article/details/103642800
JS-下 https://blog.csdn.net/wuyxinu/article/details/103646041
还有 jQuery 的 https://blog.csdn.net/wuyxinu/article/details/103669718
Node. js + Gulp 知识点汇总 https://blog.csdn.net/wuyxinu/article/details/103774211
Vue 知识点汇总（上）--附案例代码及项目地址 https://blog.csdn.net/wuyxinu/article/details/103965753
Vue 知识点汇总（下）--附案例代码及项目地址 https://blog.csdn.net/wuyxinu/article/details/103966175


## 介绍
JavaScript 是一种脚本，一门编程语言，它可以在网页上实现复杂的功能，网页展现给你的不再是简单的静态信息，而是实时的内容更新，交互式的地图，2D/3D 动画，滚动播放的视频等等。它是标准 Web 技术蛋糕的第三层。
![](../static/img/Pasted image 20230327171114.png)


JavaScript 相当简洁，却非常灵活。开发者们基于 JavaScript 核心编写了大量实用工具，可以使开发工作事半功倍。其中包括：
-   浏览器API—— 浏览器内置的 API 提供了丰富的功能，比如：动态创建 HTML 和设置 CSS 样式、从用户的摄像头采集处理视频流、生成 3D 图像与音频样本等等。
-   第三方 API —— 让开发者可以在自己的站点中整合其他内容提供者（Twitter、Facebook、地 等）提供的功能。
-   第三方框架和库 —— 用来快速构建网站和应用。

## 接口
浏览器内置应用接口 WebAPI：
-   [`文档对象模型 API（DOM（Document Object Model）API）`]( https://developer.mozilla.org/zh-CN/docs/Web/API/Document_Object_Model "文档对象模型 API（DOM（Document Object Model）API）") 能通过创建、移除和修改 HTML，为页面动态应用新样式等手段来操作 HTML 和 CSS。比如当某个页面出现了一个弹窗，或者显示了一些新内容（像上文小 demo 中看到那样），这就是 DOM 在运行。
-   [`地理位置 API（Geolocation API）`](https://developer.mozilla.org/zh-CN/docs/Web/API/Geolocation "地理位置 API（Geolocation API）") 获取地理信息。这就是为什么 [谷歌地图](https://www.google.cn/maps) 可以找到你的位置，而且标示在地图上。
-   [`画布（Canvas）`](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API "画布（Canvas）") 和 [`WebGL`](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGL_API "WebGL") API 可以创建生动的 2D 和 3D 图像。人们正运用这些 web 技术制作令人惊叹的作品。参见 [Chrome Experiments](https://www.chromeexperiments.com/webgl) 以及 [webglsamples](https://webglsamples.org/)。
-   诸如 [`HTMLMediaElement`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLMediaElement) 和 [`WebRTC`]( https://developer.mozilla.org/zh-CN/docs/Web/API/WebRTC_API "WebRTC") 等 [影音类 API](https://developer.mozilla.org/zh-CN/docs/Web/Guide/Audio_and_video_delivery) 让你可以利用多媒体做一些非常有趣的事，比如在网页中直接播放音乐和影片，或用自己的网络摄像头获取录像，然后在其他人的电脑上展示（试用简易版 [截图 demo](http://chrisdavidmills.github.io/snapshot/) 以理解这个概念）。

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
![](../static/img/Pasted image 20230327171610.png)


引入策略
要让脚本调用的时机符合预期，需要解决一系列的问题。可以使用回调。但更常用的是使用 async 或者 defer 属性。

（异步）浏览器遇到 `async` 脚本时不会阻塞页面渲染，而是直接下载然后运行。这样脚本的运行次序就无法控制，只是脚本不会阻止剩余页面的显示。当页面的脚本之间彼此独立，且不依赖于本页面的其他任何脚本时，`async` 是最理想的选择。

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

## 类型
常见类型：String、Number、Boolean、Array、Object

变量：
声明但未定义。两个变量没有数值，是空的容器。当你输入变量名并回车后，你会得到一个 `undefined` 的返回值。如果他们并不存在的话，那你就会得到一个报错信息。

声明且定义，但是赋了一个空值。比如调用 querySelector 获取一个不存在的元素，返回并赋值给调用者一个 null。`null`是 JavaScript 中的一个特殊值，表示引用不存在。

## 事件
事件能为网页添加真实的交互能力。它可以捕捉浏览器操作并运行一些代码做为响应。最简单的事件是点击事件。侦听事件发生的结构称为**事件监听器**（Event Listener），响应事件触发而运行的代码块被称为**事件处理器**（Event Handler）。
```
document.querySelector("html").addEventListener("click", function () {
  alert("click");
});
```

示例
```
let myImage = document.querySelector('img');

myImage.onclick = function() {
    let mySrc = myImage.getAttribute('src');
    if(mySrc === 'images/firefox-icon.png') {
      myImage.setAttribute('src', 'images/firefox2.png');
    } else {
      myImage.setAttribute('src', 'images/firefox-icon.png');
    }
}
```

## 其他
浏览器安全
每个浏览器标签页就是其自身用来运行代码的独立容器（这些容器用专业术语称为“运行环境”）。大多数情况下，每个标签页中的代码完全独立运行，而且一个标签页中的代码不能直接影响另一个标签页（或者另一个网站）中的代码。这是一个好的安全措施
 以安全的方式在不同网站/标签页中传送代码和数据的方法是存在的，但这些技术较为高级，本课程不会涉及。

服务器端代码 vs 客户端代码
你或许还听说过**服务器端（server-side）**和 **客户端（client-side）**代码这两个术语，尤其是在 web 开发时。客户端代码是在用户的电脑上运行的代码，在浏览一个网页时，它的客户端代码就会被下载，然后由浏览器来运行并展示。这就是**客户端 JavaScript**。服务器端代码在服务器上运行，接着运行结果才由浏览器下载并展示出来。

> 参考
> 
> https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript
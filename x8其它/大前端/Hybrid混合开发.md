## 学习材料
[前端跨端哪些事之Hybrid - 掘金](https://juejin.cn/post/7248888621364953147)
[JS Bridge 通信原理 - 知乎](https://zhuanlan.zhihu.com/p/343317967)
[一文读懂Hybird与Webview - 掘金](https://juejin.cn/post/7166578492249899044)
[URL Scheme拦截与JSBridge注入 - 掘金](https://juejin.cn/post/7166579645217767432/)
[web与Native通信之回调函数处理 - 掘金](https://juejin.cn/post/7166580046172258311/)

## 概念
这是一种[[跨端技术]]。由 web 端和原生 Native 端共同协作开发一款 App 的开发模式。其中 web 端负责处理复杂的页面及交互，Native 端负责提供原生具备的能力以及一些流畅的渲染。

随着手机硬件和软件系统的更新换代，Android5.0+、ios9.0+系统以上的手机上述问题被得到了有效的解决。使用原生打开 webview 几乎可以实现无缝打开，无限接近于原生。

## Web App
Hybrid混合开发原理就是频繁动态更新的内容是通过 H 5 开发，然后借助客户端的原生网页加载控件 WebView (Android)或 WKWebView (IOS)(后统称 WebView)。这种解决方案 H 5 可以随时修改发版，不受 APP 发布审核限制；同时 H 5 开发一次可以在三个平台运行，可以同时在 Android、IOS、浏览器中运行，可以降低开发成本。H 5 开发所占比例越大开发成本越小，如果一个 APP 功能大部分是 H 5 开发的那我们可以称之为 Web App。

## URL Scheme
如果想要打开一个 App 应用或者访问 Native 端的功能，直接访问它对应的 URL Scheme 即可。iframe 是 URL Scheme 拦截的常用方式。最后，在 Native 中设置拦截的方法以响应访问。
```
function executeScheme(href) {
    // 创建隐形iframe
    var iframe = document.createElement('iframe');
    iframe.style.cssText = 'display:none;width:0px;height:0px;';

    // iframe协议调用
    iframe.src = href;
    (document.body || document.documentElement).appendChild(iframe);

    // 删除iframe
    setTimeout(function () {
        iframe && iframe.parentNode && iframe.parentNode.removeChild(iframe);
    }, 0);
}
```

## JSBridge
web 端和 Native 端如何做到互相通信，互相调用对方的方法？

web 端与 Native 端的通信方式主要分为以下两种：
通过 UrL Scheme 拦截。[[URL#URL Scheme]]
通过 JSBridge 注入。

H 5 运行在 WebView 沙箱中，JSBridge 将需要调用的 Native 端方法打包为了一个对象挂载到了 web 端的 window 上供 js 使用。只具备 web 端调用 Native 端的能力，并不具备 Native 端调用 web 端的能力。
![[Pasted image 20230724112154.png]]

## Native 调用 H5
1. webView.evaluateJavascript 调用 js 方法

## 优点与缺点
混合应用的优点是：动态内容可以用 H5开发，而 H5是 Web 技术栈，Web 技术栈生态开放且社区资源丰富，整体开发效率高。缺点是性能体验不佳，对于复杂用户界面或动画，WebView 有时会不堪重任。

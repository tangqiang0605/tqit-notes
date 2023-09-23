Web API

Fetch API、Canvas API、Web Worker、WebRTC、WebGL

懒加载
IntersectionObserver API

webapi

navigator：
获取 useragent 环境、.permissions.query({ name: "clipboard-read" })  请求权限
-   如何判断当前环境是移动端还是 PC 端32
判断 `navigator.userAgent`，对于 Android/iPhone 可以匹配以下正则

`const appleIphone = /iPhone/i;   const appleIpod = /iPod/i;   const appleTablet = /iPad/i;   const androidPhone = /\bAndroid(?:.+)Mobile\b/i; // Match 'Android' AND 'Mobile'   const androidTablet = /Android/i;   `

当然，不要重复造轮子，推荐一个库: https://github.com/kaimallea/isMobile

`import isMobile from 'ismobilejs'      const mobile = isMobile()`

## cookie
### 属性
-   Domain
    
-   Path
    
-   Expire/MaxAge
    -   当 cookie 没有设置 maxage 时，cookie 会存在多久？如果没有 maxAge，则 cookie 的有效时间为会话时间。expire 绝对时间。maxage 相对时间
    - 
-   HttpOnly: 是否允许被 JavaScript 操作
    
-   Secure: 只能在 HTTPS 连接中配置
    
-   SameSite
- -   None: 任何情况下都会向第三方网站请求发送 Cookie
-   Lax: 只有导航到第三方网站的 Get 链接会发送 Cookie，跨域的图片、iframe、form表单都不会发送 Cookie
-   Strict: 任何情况下都不会向第三方网站请求发送 Cookie
目前，主流浏览器 Same-Site 的默认值为 `Lax`，而在以前是 `None`，将会预防大部分 CSRF 攻击，如果需要手动指定 `Same-Site` 为 `None`，需要指定 Cookie 属性 `Secure`，即在 https 下发送

### 操作
增 or 改
document.cookie = 'a=3'
查
document. cookie
删
document.cookie = 'a=3; max-age=-1'

删除cookie
通过把该 `cookie` 的过期时间改为过去时即可删除成功，具体操作的话可以通过操作两个字段来完成
1.  `max-age`: 将要过期的最大秒数，设置为 `-1` 即可删除
2.  `expires`: 将要过期的绝对时间，存储到 `cookies` 中需要通过 `date.toUTCString()` 处理，设置为过期时间即可删除
 CookieStore API18 其中的 `cookieStore.delete(name)` 删除某个 cookie

`credentials` 指在使用 `fetch` 发送请求时是否应当发送 `cookie`
-   `omit`: 从不发送 `cookie`.
-   `same-origin`: 同源时发送 `cookie`  (浏览器默认值)
-   `include`: 同源与跨域时都发送 `cookie`

## 事件 API
经常和 Domapi 配合。事件 api 负责检测用户操作，domapi 负责响应用户操作。 https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener

事件目标可以是一个文档上的元素 [`Element`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element)、[`Document`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document) 和 [`Window`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window)，也可以是任何支持事件的对象（比如 [`XMLHttpRequest`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest)）。

`addEventListener()` 的工作原理是将实现 [`EventListener`](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener) 的函数或对象添加到调用它的 [`EventTarget`](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget) 上的指定事件类型的事件侦听器列表中。如果要绑定的函数或对象已经被添加到列表中，该函数或对象不会被再次添加。但如果是匿名函数，其重复定义会带来许多麻烦，详见下文中的[内存问题](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener#%E5%86%85%E5%AD%98%E9%97%AE%E9%A2%98)一节.

Event 对象
**`Event`** 接口表示在 DOM 中出现的事件。有很多有用的属性。
什么是事件委托，e.currentTarget 与 e.target 有何区别
事件委托指当有大量子元素触发事件时，将事件监听器绑定在父元素进行监听，此时数百个事件监听器变为了一个监听器，提升了网页性能。

## ClipBoard API
// 是否能够有读取剪贴板的权限  
// result.state == "granted" || result.state == "prompt"  
const result = await navigator.permissions.query({ name: "clipboard-read" })  
// 获取剪贴板内容  
const text = await navigator.clipboard.readText()

禁止赋值
使用 CSS 如下：

`user-select: none;`

js
```
document.body.onselectstart = e => {    e.preventDefault();}

document.body.oncopy = e => {    e.preventDefault();}
```

请求 API
-   题目：如何取消请求的发送31
以下两种 API 的方式如下

-   XHR 使用 `xhr.abort()`
    
-   fetch 使用 `AbortController`

## Background Tasks API
rIC



-   如何把 DOM 转化为图片36

简单总结：DOM -> SVG -> Canvas -> JPEG/PNG、


## 路由
前端路由有两种实现方式:

history API

-   通过 `history.pushState()` 跳转路由
    
-   通过 `popstate event` 监听路由变化，但无法监听到 `history.pushState()` 时的路由变化
    

hash

-   通过 `location.hash` 跳转路由
    
-   通过 `hashchange event` 监听路由变化


## 二进制
浏览器如何读取二进制信息。文件上传下载。
-   File/Blob API
    
-   TypedArray/ArrayBuffer API
    
-   FileReader API

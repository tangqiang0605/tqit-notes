Web 即万维网 World Wide Web 的缩写。万维网是建立于因特网（一种计算机网络）上的使用 html（网页） 进行通信的网络。我们常见的浏览器，都是 Web 浏览器，即万维网浏览器。

什么是 web 开发？就是写网站的。

## 基本软件
基本的计算机、编辑器、浏览器。

以及：
- **图形编辑器**，如 [GIMP](https://www.gimp.org/) 、[Figma](https://www.figma.com/) 、[Paint.NET](https://www.getpaint.net/) 、[Photoshop](https://www.adobe.com/products/photoshop.html) 、[Sketch](https://www.sketch.com/) 或 [XD](https://www.adobe.com/products/xd.html) ，为你的网页制作图像或图形。
- **FTP 工具**，老式 Web 托管账户，以管理服务器上的文件（[Git](https://git-scm.com/) 正越来越多地取代 FTP 用于此目的）。有大量的 (S)FTP 程序可用，包括 [Cyberduck](https://cyberduck.io/)、[Fetch](https://fetchsoftworks.com/) 和 [FileZilla](https://filezilla-project.org/)。
- **自动化构建工具**，如 [Webpack](https://webpack.js.org/) 、[Grunt](https://gruntjs.com/) 或 [Gulp](https://gulpjs.com/) ，以自动执行重复性任务，如简化代码和运行测试。
- **库、框架等**，以加快编写常用功能。一个库往往是一个现有的 JavaScript 或 CSS 文件，它提供了现成的功能，供你在代码中使用。框架则更进一步，为你提供一个完整的系统和一些自定义的语法，让你在上面写一个 Web 应用。

**本地服务器**
以文件打开方式测试本地文件存在的问题：一，如果你只是从本地文件运行示例，一些浏览器（包括 Chrome）因为安全限制将不会运行异步请求（AJAX）。二、如果项目具有服务端代码，将不会按预期运行，因为浏览器无法识别他们。

创建前端本地开发服务器：最简单的方法之一就是使用 Python 的 `SimpleHTTPServer` 模块（命令 `python -m http.server 8080`）。

后端开发服务器：用来运行服务端代码。

后端语言与对应常用工具有：1、Java：tomcat；2、python：django、flask；3、JavaScript：nodejs、express、koa；4、php：MAMP、AMPPS、LAMP。

## 项目结构
命名规范：
1. 避免空格，因为不同机器对于空格的底层编码可能不一样。
2. 严格区分大小写，理由同上。

基础结构：
1. index.html
2. images 文件夹
3. styles 文件夹
4. scripts 文件夹

## 发布网站

### 获取主机服务和域名
如果你想要完全控制你发布的网页，那么你将需要花钱购置服务器和域名。

此外，你将需要一个 [文件传输协议](https://developer.mozilla.org/zh-CN/docs/Glossary/FTP) 程序来将网站文件上传到服务器。不同的 FTP 程序涵盖了不同的范围，但是你通常需要使用主机服务提供商给你的详细信息（比如用户名、密码、主机名）登录到 Web 服务器。然后程序在两个窗口里分别显示本地文件和服务器文件，这样你就可以在它们之间进行传输。

### 使用托管服务
托管服务比购买服务器更实惠，这是一种 PaaS 服务。
-  GitHub pages。创建一个新的仓库用于存放项目代码 username.github.io，可能需要等待几分钟，就可以通过 username.github.io 来访问你的网站了。

-   Google App Engine 是一个让你可以在 Google 的基础架构上构建和运行应用的强劲平台——无论你是需要从头开始构建多级 web 应用还是托管一个静态网站。参阅 [How do you host your website on Google App Engine?](https://developer.mozilla.org/zh-CN/docs/Learn/Common_questions/Tools_and_setup/How_do_you_host_your_website_on_Google_App_Engine) 以获取更多信息。

- vercel、netlify 等

## 网站工作原理
### 客户端和服务器
连接到互联网的计算机被称作客户端和服务器。

![Two circles representing client and server. An arrow labelled request is going from client to server, and an arrow labelled responses is going from server to client](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/How_the_Web_works/simple-client-server.png)

-   客户端是典型的 Web 用户入网设备（比如联网的手机电脑）、设备上可联网的软件（浏览器）。
-   服务器是存储网页，站点和应用的计算机。当一个客户端想要获取一个网页时，一份网页将从服务器上复制下来，传输到客户端的浏览器上。

### 中间部分
上文所述的客户端和服务器并不能完成全部工作。还有其他必要的部分。

网络协议：
超文本传输协议 (**HTTP**）是一个定义客户端和服务器间交流的语言的协议。

通信协议：
传输控制协议和因特网互连协议（**TCP/IP**）是定义数据在客户端和服务器间如何传输的通信协议。

DNS 解析：
真正的网址是 IP 地址，网页可以通过 IP 地址直接访问。它代表了一个互联网上独特的位置。但是 IP 地址并不容易记忆，这就是域名系统（DNS）被发明的原因。DNS 是将你输入浏览器的域名（像 "mozilla. org"）与实际 IP 地址相匹配的特殊的服务器。您可以通过 [DNS 查询工具](https://www.nslookup.io/website-to-ip-lookup/) 、cmd 的 ping 命令（ping 域名）等工具来查找网站的 IP 地址。

**网页组成文件**：
一个网页由许多文件组成。这些文件有两种类型：
    -   **代码** : 网页大体由 HTML、CSS、JavaScript 组成，不过你会在后面看到不同的技术。
    -   **资源** : 这是其他组成网页的东西的集合，比如图像、音乐、视频、Word 文档、PDF 文件。

### 获取网页
当你在浏览器里输入一个网址时：
1. 网络传输：所有在客户端和服务器之间传递的数据都是通过因联网使用 TCP/IP 协议族传输的。
2. DNS 解析：浏览器在域名系统（DNS）服务器上找出存放网页的服务器的实际地址（ip 地址）。
3. 客户端请求：浏览器发送 HTTP 请求信息到服务器请求拷贝一份网页到客户端。
4. 服务器响应：服务器同意客户端的请求后，会返回一个“200 OK”信息，然后开始将网页的文件以数据包的形式传输到浏览器。
5. 解析：浏览器将数据包（网页组成的必要文件）聚集成完整的网页，然后将网页呈现给用户。

> 参考
> 
> MDN：[web 入门 - 学习 Web 开发 | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Learn/Getting_started_with_the_web)
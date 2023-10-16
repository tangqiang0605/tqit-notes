## 超链接
[[网络资源]]
[[引入资源路径]]

## a 标签
跳转本页锚点、他页锚点、其他页面、下载。
```
<p>到指定页的<a href="contacts.html#Mailing_address">指定锚点</a>。
</p>
```

### 下载
- 提供一个网络资源链接，浏览器会打开该资源。[[浏览器处理链接]]
-  `download` 属性提供一个默认的保存名，并告诉浏览器是下载而不是打开。
```
<a href="https://download.mozilla.org/?product=firefox-latest-ssl&os=win64&lang=zh-CN"
   download="firefox-latest-64bit-installer.exe">
  下载最新的 Firefox 中文版 - Windows（64 位）
</a>
```

如果要下载动态文件，做法是在 JavaScript 动态创建 a 标签并触发其 open 方法，然后移除，不需要将标签添加到页面上。

### 链接文本内容建议 
-   不要重复 URL 作为链接文本的一部分。
-   不要在链接文本中说“链接”或“链接到”。
-   尽量减少相同文本的多个副本链接到不同地方的情况。比如，存在多个“单击此处”。
-   链接到非 HTML 资源——留下清晰的指示。当链接到一个需要下载的资源（如 PDF 或 Word 文档）或流媒体（如视频或音频）或有另一个潜在的意想不到的效果（打开一个弹出窗口），你应该添加明确的措辞，以减少混乱。

### 发送邮件
当点击一个链接或按钮时，可能会开启新的邮件的发送而不是连接到一个资源或页面。这种场景可以使用 [`<a>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/a) 元素和 `mailto:` URL 协议实现。
```
<a href="mailto:nowhere@mozilla.org">向 nowhere 发邮件</a>
```
实际上，电子邮件地址是可选的。如果你省略了它（也就是说，你的 [`href`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/a#attr-href) 属性仅仅只是简单的“mailto:”），发送新的电子邮件的窗口也会被用户的邮件客户端打开，只是没有收件人的地址信息，这通常在“分享”链接是很有用的，用户可以给他们选择的地址发送邮件。
事实上，任何标准的邮件头字段可以被添加到你提供的 `mailto` URL 中。其中最常用的是主题（subject）、抄送（cc）和主体（body）（这不是一个真正的标头字段，但允许你为新邮件指定一个简短的内容消息）。每个字段及其值被指定为查询项。
```
<a
  href="mailto:nowhere@mozilla.org?cc=name2@rapidtables.com&bcc=name3@rapidtables.com&subject=The%20subject%20of%20the%20email&body=The%20body%20of%20the%20email">
  发送含有 cc、bcc、主题和主体的邮件
</a>
```
每个字段的值必须使用 URL 编码，即，使用[百分号转义的](https://zh.wikipedia.org/wiki/%E7%99%BE%E5%88%86%E5%8F%B7%E7%BC%96%E7%A0%81)非打印字符（不可见字符如制表符、换行符、分页符）和空格。

## 参考
[锚元素 - HTML（超文本标记语言） | MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/a)
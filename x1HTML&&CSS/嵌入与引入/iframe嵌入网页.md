---
desc: 用于嵌入网页
---
## iframe
优点：
1. 安全，隔离环境、脚本、资源。
2. 快。如果不分开，脚本是一起下载一起解析，使用 iframe 就是各下各的，各自解析自己的资源。
缺点：
1. 通信。使用 cookie 或 postMessage。
2. dom 隔离。
3. SEO 不友好。
4. 容易管理混乱。
5. 浏览器进退键对 iframe 无效。
![[Pasted image 20231219183618.png]]
它提供了一种将整个 web 页嵌入到另一个网页的方法，看起来就像那个 web 页是另一个网页的一个 [`<img>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/img) 或其他元素一样。[`<iframe>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/iframe) 现在经常被使用。

关于 `<iframe>` 有一些严重的[安全隐患](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Multimedia_and_embedding/Other_embedding_technologies#%E5%AE%89%E5%85%A8%E9%9A%90%E6%82%A3)需要考虑，但这并不意味着你不应该在你的网站上使用它们——它只需要一些知识和仔细地思考。

 `<iframe>` 基本要素：

[`allowfullscreen`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/iframe#attr-allowfullscreen)

如果设置，`<iframe>` 则可以通过[全屏 API](https://developer.mozilla.org/zh-CN/docs/Web/API/Fullscreen_API) 设置为全屏模式（稍微超出本文的范围）。

[`frameborder`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/iframe#attr-frameborder)

如果设置为 1，则会告诉浏览器在此框架和其他框架之间绘制边框，这是默认行为。0 删除边框。不推荐这样设置，因为在 [CSS 中](https://developer.mozilla.org/zh-CN/docs/Glossary/CSS)可以更好地实现相同的效果。[`border`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border) `: none;`

[`src`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/iframe#attr-src)

该属性与 [`<video>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/video) / 元素表示文档中的图像。[`<img>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/img) 一样包含指向要嵌入文档的 URL 路径。

[`width`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/iframe#attr-width) 和 [`height`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/iframe#attr-height)

这些属性指定你想要的 iframe 的宽度和高度。

备选内容

与 [`<video>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/video) 等其他类似元素相同，你可以在 `<iframe></iframe>` 标签之间包含备选内容，如果浏览器不支持 `<iframe>`，将会显示备选内容，这种情况下，我们已经添加了一个到该页面的链接。现在你几乎不可能遇到任何不支持 `<iframe>` 的浏览器。

[`sandbox`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/iframe#attr-sandbox)

该属性需要在已经支持其他 `<iframe>` 功能（例如 IE 10 及更高版本）但稍微更现代的浏览器上才能工作，该属性可以提高安全性设置；我们将在下一节中更加详细地谈到。


为了提高速度，在主内容完成加载后，使用 JavaScript 设置 iframe 的 `src` 属性是个好主意。这使你的页面可以更快地被使用，并减少你的官方页面加载时间（重要的 [SEO](https://developer.mozilla.org/zh-CN/docs/Glossary/SEO) 指标）。

浏览器制造商和 Web 开发人员了解到网络上的坏人（通常被称为**黑客**，或更准确地说是**破解者**），如果他们试图恶意修改你的网页或欺骗人们进行不想做的事情时常把 iframe 作为共同的攻击目标（官方术语：**攻击向量**），例如显示用户名和密码等敏感信息。因此，规范工程师和浏览器开发人员已经开发了各种安全机制，使 `<iframe>` 更加安全，这有些最佳方案值得我们考虑——我们将在下面介绍其中的一些。
[单击劫持](https://en.wikipedia.org/wiki/Clickjacking)是一种常见的 iframe 攻击，黑客将隐藏的 iframe 嵌入到你的文档中（或将你的文档嵌入到他们自己的恶意网站），并使用它来捕获用户的交互。这是误导用户或窃取敏感数据的常见方式。
拒绝网页被其他网页的 iframe 引用：构建 MDN 的开发人员已经在网站页面的服务器上设置了一个不允许被嵌入到 `<iframe>` 的设置（请参阅[配置 CSP 指令](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Multimedia_and_embedding/Other_embedding_technologies#%E9%85%8D%E7%BD%AE_csp_%E6%8C%87%E4%BB%A4)）这是有必要的——整个 MDN 页面被嵌入在其他页面中没有多大意义，除非你想要将其嵌入到你的网站上并将其声称为自己的内容，或尝试通过单击劫持来窃取数据，这都是非常糟糕的事情。此外，如果每个人都这样做，所有额外的带宽将花费 Mozilla 很多资金。

#### 只有在必要时嵌入

有时嵌入第三方内容（例如 YouTube 视频和地图）是有意义的，但如果你只在完全需要时嵌入第三方内容，你可以省去很多麻烦。网络安全的一个很好的经验法则是“_你怎么谨慎都不为过，如果你决定要做这件事，多检查一遍；如果是别人做的，在被证明是安全的之前，都假设这是危险的。_”

除了安全问题，你还应该意识到知识产权问题。无论在线内容还是离线内容，绝大部分内容都是有版权的，甚至是一些你没想到有版权的内容（例如，[Wikimedia Commons](https://commons.wikimedia.org/wiki/Main_Page) 上的大多数图片）。不要在网页上展示一些不属于你的内容，除非你是所有者或所有者给了你明确的、书面的许可。对于侵犯版权的惩罚是严厉的。再说一次，你再小心也不为过。

如果内容获得许可，你必须遵守许可条款。例如，MDN 上的内容是[在 CC-BY-SA 下许可的](https://developer.mozilla.org/zh-CN/docs/MDN/Writing_guidelines/Attrib_copyright_license#%E6%96%87%E6%A1%A3)，这意味着，如果你要引用我们的内容，就必须[用适当的方式注明来源](https://wiki.creativecommons.org/wiki/Best_practices_for_attribution)，即使你对内容做了实质性的修改。

## 参考
[从 object 到 iframe——其他嵌入技术 - 学习 Web 开发 | MDN](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Multimedia_and_embedding/Other_embedding_technologies)
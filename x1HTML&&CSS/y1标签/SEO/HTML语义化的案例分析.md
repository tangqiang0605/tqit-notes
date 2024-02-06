1. 标题 | 青训营
2. 650 字
3. 分类阅读、标签青训营笔记、创作话题青训营笔记创作活动
分析一些实际网站的 HTML 结构，对比非语义化标签的差异；

## 为什么需要语义化？
语义化通常与无障碍紧密联系。语义化是指文档代码相对可读，对于网页的开发和无障碍阅读非常有帮助。无障碍指网页对于视障人士是友好的。

一般来说网站网页都包含以下几部分：页眉、导航栏、主内容、侧边栏、页脚。HTML 提供了对应的语义化标签：
```
<header>：页眉。
<nav>：导航栏。
<main>：主内容。主内容中还可以有各种子内容区段，可用<article>、<section> 和 <div> 等元素表示。
<aside>：侧边栏，经常嵌套在 <main> 中。
<footer>：页脚。
```

它们本质上和 div 没有区别，但是对可读性却有很大的帮助。它们正确地标识了网站的结构，并在某些情况下可以被无障碍设施利用。

打开浏览器的开发者工具（ctrl+shift+i），选择 lighthouse，可以测试网站的各种性能指标，其中就包含无障碍。
![[Pasted image 20230820113637.png]]

## 实现标签语义化
1. 标识结构：header、nav、main、article、section、aside、footer
2. 渲染列表：用 li 取代 div
3. 换行和水平分割：br、hr
4. alt 属性：一些标签如 img、a 上的 alt属性可以被屏幕阅读器识别。
5. 表格使用 table、th、tr、td，而不是 div。
6. 使用 `<strong>、<em>、<mark> 或 <span>` 替代 `<b>、<i> 和 <u>`

## 案例分析
MDN 是优秀的前端文档网站，其语义化与无障碍也做的比较完善。下面我们尝试分析一下这个页面[文档与网站架构 - 学习 Web 开发 | MDN](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Introduction_to_HTML/Document_and_website_structure)。

打开链接，在网页任意元素右键检查，即可查看该元素的 Dom 信息。

下面是内容的主要结构。
![[Pasted image 20230820114216.png]]
因为有语义化标签，我们可以轻松地定位到文章的主要部分 main、页脚 footer，并且知道 main 中包含着一篇文章 article，这篇文章包含多个段落 section。如果没有语义化标签，我们很难快速就获得这些信息。

你可能会注意到 section 后面出现了一个 aria-labelleby，它会被读屏软件识别并读出。有时在必要的地方也会出现 `aria-relevant`，`aria-label` 等属性。

右键一张图片，你可能会看到 alt 属性，该属性也会被读屏软件读出，帮助视障朋友了解图片中所展示的内容。
![[Pasted image 20230820114928.png]]

## 最后
标签语义化是必要的。现实中，很多残障人士因为身体原因无法正常外出，网络成为了他们主要甚至是唯一的娱乐方式，仅仅是视障人士，全球至少就要九亿人（包括红绿色盲），作为一个合格的前端开发者，我们应该尽可能提高网页的 Accessibility，让网络世界的大门平等地向每个人敞开。

参考文章：
[文档与网站架构 - 学习 Web 开发 | MDN](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Introduction_to_HTML/Document_and_website_structure)
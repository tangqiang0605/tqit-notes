## 概述
**文档**是由标记语言组织起来的文本文件。HTML 是最常见的标记语言，但你可能也听说过其他可标记语言，如 SVG 或 XML。实际上，HTML 和 SVG 都是 XML 的子集。

## 结构

``` html
<!DOCTYPE html>
<html>
    <head>
        <title>name</title>
    </head>
    <body>
        
    </body>
</html>
```

``` html
<!DOCTYPE html>
<html lang='en'>
    
<head>
    
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="ie=edge">
    
    引入字体
    <link href="https://fonts.googleapis.com/css?family=Lato:100,300,400,700,900" rel="stylesheet">
    
    <link rel="stylesheet" href="css/style.css">
    引入基础样式
    引入图标
    <link rel="shortcut icon" type="image/png" href="img/favicon.png">
    设置标题
    <title>Natours | Exciting tours for adventurous</title>
    </head>
</html>
```
## 标签
HTML 由特定的 XML 标签以及其属性值、innerContent 构成。

```
$(selector).attr('id')
$(selector).html()
$(selector).text()
```

一般元素应该包含开始标签、结束标签、内容。除了空标签。HTML 标签不区分大小写。不过，从一致性、可读性来说，最好仅使用小写字母。属性间不分顺序，空格隔开，键值对等于连接表示。

### 基础结构标签
基础结构：
-   `<!DOCTYPE html>` — 声明文档类型。仅用于保证文档正常读取。

-   `<html></html>` — 元素包含整个页面的内容，也称作根元素。

-   `<head></head>` — 该元素的内容对用户不可见，其中包含例如面向搜索引擎的搜索关键字、页面描述、CSS 样式表和字符编码声明等。

-   `<body></body>` — 含页面内容。

必要元信息：
-   `<meta charset="utf-8">` — 该元素指定文档使用 UTF-8 字符编码，UTF-8 包括绝大多数人类已知语言的字符，没有理由再选用其他编码。`<meta>` 元素。这个元素代表了不能由其他 HTML 元相关元素表示的元数据，比如 [`<base>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/base)、[`<link>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/link)、[`<script>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/script)、[`<style>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/style) 或 [`<title>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/title)。

-   `<title></title>` — 设置页面的标题，显示在浏览器标签页上，也作为收藏网页的描述文字。

### 常用标签
 `<br>` 换行
 `<hr>` 分割线
 ``` html
图像
<img src="图像url" alt="图片显示不出来显示的文字替换" title="鼠标聚焦时出现的文字提示"/>
<img src="图像url" width="500" border="15"/>
一般只修改高或宽，剩下它自己缩放。
同时高宽可能变形。
边框属性。

超链接
<a href="绝对地址" target="_blank">文本或图像</a>
<a href="相对地址：内部链接"></a>
<a href="#">空链接</a>
<a href="#id">锚点定位</a>
打开方法，缺省self当前页面打开，blank新窗口打开。
```


### 空标签
用于插入/嵌入东西。如 img、input。

HTML 中，无需在一个空元素的标签末尾添加 `/`，但当你希望你的 HTML 是有效的 XML 时，这么做也没问题。在 jsx 中，需要闭合。

### 替换元素
替换元素：像 [`<img>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/img) 和 [`<video>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/video) 这样的元素有时被称之为**替换元素**（嵌入元素），因为这样的元素的内容和尺寸由外部资源（像是一个图片或视频文件）所定义，而不是元素自身。

### 标签语义
我们要敬畏语义，做到**正确选用元素**。不要使用标题元素来加大、加粗字体，因为标题对于 [无障碍访问](https://developer.mozilla.org/zh-CN/docs/Learn/Accessibility) 和 [搜索引擎优化](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Introduction_to_HTML/HTML_text_fundamentals#%e4%b8%ba%e4%bb%80%e4%b9%88%e6%88%91%e4%bb%ac%e9%9c%80%e8%a6%81%e7%bb%93%e6%9e%84%e5%8c%96%ef%bc%9f) 等问题非常有意义。要保持页面结构清晰，标题整洁，不要发生标题级别跳跃。

在我们身边的任何地方都要依赖语义——我们依靠以前的经验来告诉我们一个日常物品的功能是什么；当我们看到某个东西时，我们知道它的功能是什么。举个例子，我们知道红色交通灯表示“停止”，绿色交通灯表示“通行”。如果运用了错误的语义，事情会迅速地变得非常棘手（难道有某个国家使用红色代表通行？我不希望如此）

### 块级元素与内联元素
一个块级元素不会嵌套在一个内联元素里面（比如 a 标签），但它可能嵌套在另一个块级元素里面。在这篇文章中提到的“块”和“内联”，不应该与 [CSS 盒子的类型](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/The_box_model#%E5%9D%97%E7%BA%A7%E7%9B%92%E5%AD%90%EF%BC%88block_box%EF%BC%89_%E5%92%8C_%E5%86%85%E8%81%94%E7%9B%92%E5%AD%90%EF%BC%88inline_box%EF%BC%89)中的同名术语相混淆。尽管它们默认是相关的，但改变 CSS 显示类型并不会改变元素的**分类**，也不会影响它可以包含和被包含于哪些元素。防止这种混淆也是 HTML5 摒弃这些术语的原因之一。

### 标签内容中的空格
无论你在 HTML 元素的内容 (innerContent)中使用多少空格（包括一个或多个空白字符或换行），当渲染这些代码的时候，HTML 解释器会将连续出现的空白字符减少为一个单独的空格符。除非使用 `<pre>` 标签包裹。

## 属性值
### 属性的顺序
属性间不分顺序，空格隔开，键值对等于连接表示。

### 属性值的引号
不包含 ASCII 空格（以及 `"` `'` `` ` `` `=` `<` `>` ）的简单属性值可以不使用引号，但是建议将所有属性值用引号括起来，这样的代码一致性更佳，更易于阅读。你也许在一些 HTML 中也见过单引号。这只是风格的问题，你可以从中选择一个你喜欢的。

### 实体引用
在 HTML 中，字符 `<`、`>`、`"`、`'` 和 `&` 是特殊字符。它们是 HTML 语法自身的一部分（实体）。你可以使用以下字符替代：`&lt;`、`&gt;`、`&quot;`、`&apos;`、`&amp;`。

### 引用路径
HTML属性值**引用文件路径**的一些通用规则：
-   若引用的目标文件与 HTML 文件同级，只需直接使用文件名，例如：`my-image.jpg`。
-   若引用的目标文件位于 HTML 文件的**上级**，需要加上两个点。
-   Windows 的文件系统使用反斜杠而不是正斜杠，但这在 HTML 中并不重要。

### 常见属性
title 对于无障碍的意义并不大。所以实际开发中不必把精力花在 title 属性上。`title` 属性为超链接声明额外的信息，比如你将链接至的那个页面。例如 `title="The Mozilla homepage"`。当鼠标悬停在超链接上面时，这部分信息将以工具提示的形式显示。

type 属性：link 引入 css、favicon 都可以不加 type 属性。

### 布尔属性
有时你会看到没有值的属性，这也是完全可以接受的。这些属性被称为布尔属性。布尔属性只能有一个值，这个值一般与属性名称相同。

### 全局属性
意思是所有标签都可以添加的属性。而不是作用域为全局的属性。

lang 全局属性。有必要为站点设定语言。这在很多方面都很有用。如果你的 HTML 文档的语言设置好了，那么你的 HTML 文档就会被搜索引擎更有效地索引（例如，允许它在特定于语言的结果中正确显示），对于那些使用屏幕阅读器的视障人士也很有用（例如，法语和英语中都有“six”这个单词，但是发音却完全不同）。
```
<html lang="zh-CN"></html>
<span lang='ja'></span>
```

## 排版
### 标题
对网页建立索引的搜索引擎将标题的内容视为影响网页搜索排名的重要关键字。没有标题，你的网页在[搜索引擎优化](https://developer.mozilla.org/zh-CN/docs/Glossary/SEO)方面效果不佳。

建议：
- 最好只对每个页面使用一次 `<h1>`。
- 请确保在层次结构中以正确的顺序使用标题（h 1-h 6）。
- 在现有的六个标题层次中，除非觉得有必要，否则应该争取每页使用不超过三层（关于排版都是通用的，比如写 makedown 也是）。

### 列表
普通列表：ol、ul、li。**普通列表常用于重复元素或相近元素的布局中，这是非常明智的选择**。比如在卡片、列表、表单中使用 `li` 标签。

（请跳过）描述列表：dl、术语 dt、描述 dd。一个术语 dt 的描述 dd 可以有多个。描述列表并不常用。
```
<dl>
  <dt>内心独白</dt>
    <dd>戏剧中，某个角色对自己的内心活动或感受进行念白表演，这些台词只面向观众，而其他角色不会听到。</dd>
  <dt>语言独白</dt>
    <dd>戏剧中，某个角色把自己的想法直接进行念白表演，观众和其他角色都可以听到。</dd>
  <dt>旁白</dt>
    <dd>戏剧中，为渲染幽默或戏剧性效果而进行的场景之外的补充注释念白，只面向观众，内容一般都是角色的感受、想法、以及一些背景信息等。</dd>
</dl>
```

### 标记
在 HTML 中我们用 [`<em>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/em)（emphasis）元素来标记特殊的情况，也可以被屏幕阅读器识别，并以不同的语调发出。浏览器默认该元素样式为斜体，但你不应该纯粹为了获得斜体风格而使用这个标签。为了获得斜体样式，你应该使用 [`<span>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/span) 元素和一些 CSS，或者是 [`<i>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/i) 元素。即，有语义使用 em，纯样式使用 i 或 css。

`<strong>` 和 `<b>` 元素同上。

仅仅影响表象而且没有语义的元素，被称为**表象元素**并且不该被使用。因为正如我们在之前看到的，**语义对无障碍、SEO（搜索引擎优化）等非常重要**。最好的经验法则：只有在没有更合适的元素时，才适合使用 `<b>`、`<i>` 或 `<u>` 来表达传统上用粗体、斜体或下划线表达的意思；而通常是有的。`<strong>`、`<em>`、`<mark>` 或 `<span>` 可能是更加合适的选择。要始终保持无障碍的心态。

斜体的概念对使用屏幕阅读器的人或使用拉丁字母以外的书写系统的人没有什么帮助。

人们强烈地将下划线与超链接联系起来。因此，在网页中，最好只给链接加下划线。

-   [`<i>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/i) 被用来传达传统上用斜体表达的意义：外国文字，分类名称，技术术语，一种思想……
-   [`<b>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/b) 被用来传达传统上用粗体表达的意义：关键字，产品名称，引导句……
-   [`<u>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/u) 被用来传达传统上用下划线表达的意义：专有名词，拼写错误……

### 页面结构
wrap、hero

页眉header
通常横跨于整个页面顶部有一个大标题 和/或 一个标志。这是网站的主要一般信息，通常存在于所有网页。

导航栏nav
指向网站各个主要区段的超链接。通常用菜单按钮、链接或标签页表示。类似于标题栏，导航栏通常应在所有网页之间保持一致，否则会让用户感到疑惑，甚至无所适从。许多 web 设计人员认为导航栏是标题栏的一部分，而不是独立的组件，但这并非绝对；还有人认为，两者独立可以提供更好的 [无障碍访问特性](https://developer.mozilla.org/zh-CN/docs/Learn/Accessibility)，因为屏幕阅读器可以更清晰地分辨二者。

主内容main
主内容中还可以有各种子内容区段，可用 [`<article>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/article)、[`<section>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/section) 和 [`<div>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/div) 等元素表示。

警告
div 元素非常便利但容易被滥用。由于它们没有语义值，会使 HTML 代码变得混乱。要小心使用，只有在没有更好的语义方案时才选择它，而且要尽可能少用，否则文档的升级和维护工作会非常困难。

侧边栏
[`<aside>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/aside)：侧边栏，经常嵌套在 [`<main>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/main) 中。
一些外围信息、链接、引用、广告等。通常与主内容相关（例如一个新闻页面上，侧边栏可能包含作者信息或相关文章链接），还可能存在其他的重复元素，如辅助导航系统。

页脚footer
横跨页面底部的狭长区域。和标题一样，页脚是放置公共信息（比如版权声明或联系方式）的，一般使用较小字体，且通常为次要内容。还可以通过提供快速访问链接来进行 [SEO](https://developer.mozilla.org/zh-CN/docs/Glossary/SEO)。

### 语义文本元素
以下内容并不常用，请跳过。

引用：如果一个块级内容（一个段落、多个段落、一个列表等）从其他地方被引用，你应该把它用 [`<blockquote>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/blockquote) 元素包裹起来表示，并且在 [`cite`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/blockquote#attr-cite) 属性里用 URL 来指向引用的资源。如果是行内内容，使用 `<q>` 以及它的 cite 属性。另外还有一个 cite 标签。三者了解即可。

 [`<abbr>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/abbr) ——它常被用来包裹一个缩略语或缩写，并且提供缩写的解释。
 ```
<abbr title="夏季奥林匹克运动会">奥运会</abbr>
```

HTML 有个用于标记联系方式的元素—— [`<address>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/address)。它仅仅包含联系方式

当你使用日期、化学方程式、和数学方程式时会偶尔使用上标和下标，以确保它们的正确含义。[`<sup>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/sup) 和 [`<sub>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/sub) 元素可以解决这样的问题。

计算机代码相关：
-   [`<code>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/code)：标记代码。
-   [`<pre>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/pre)：用于保留空白字符（通常用于代码块）——如果文本中使用了缩进或多余的空白，浏览器将忽略它，你将不会在呈现的页面上看到它。但是，如果你将文本包含在 `<pre></pre>` 标签中，那么空白将会以与你在文本编辑器中看到的相同的方式渲染出来。
-   [`<var>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/var)：变量名。
-   [`<kbd>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/kbd)：键盘等设备的输入。
-   [`<samp>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/samp)：输出。

HTML 还支持将时间和日期标记为可供机器识别的格式的 [`<time>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/time) 元素，例如：
```
<!-- 标准简单日期 -->
<time datetime="2016-01-20">20 January 2016</time>
<!-- 只包含年份和月份-->
<time datetime="2016-01">January 2016</time>
<!-- 只包含月份和日期 -->
<time datetime="01-20">20 January</time>
<!-- 只包含时间，小时和分钟数 -->
<time datetime="19:30">19:30</time>
<!-- 还可包含秒和毫秒 -->
<time datetime="19:30:01.856">19:30:01.856</time>
<!-- 日期和时间 -->
<time datetime="2016-01-20T19:30">7.30pm, 20 January 2016</time>
<!-- 含有时区偏移值的日期时间 -->
<time datetime="2016-01-20T19:30+01:00">7.30pm, 20 January 2016 is 8.30pm in France</time>
<!-- 提及特定周 -->
<time datetime="2016-W04">The fourth week of 2016</time>
```
不同的格式不容易被电脑识别——假如你想自动抓取页面上所有事件的日期并将它们插入到日历中，[`<time>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/time) 元素允许你附上清晰的、可被机器识别的时间或日期来实现这种需求。

## HTML调试
写代码和调试的关键其实是：熟悉语言本身和相关工具。

开发者工具：每一个现代网络浏览器都包含一套强大的开发工具套件。这些工具可以检查当前加载的 HTML、CSS 和 JavaScript，显示每个资源页面的请求以及载入所花费的时间。

**如何打开它？有三种方式：**
-   **_键盘快捷键_** _Ctrl + Shift + I_
-   **_菜单栏_**
-  **右键菜单**

HTML 的语法是宽松的，检查 HTML 文件语法的最好的方法就是让你的 HTML 页面通过 [Markup Validation Service](https://validator.w3.org/)。网页可以接受网址、上传一个 HTML 文档，或者直接输入一些 HTML 代码。

>参考
>
>MDN：[开始学习 HTML - 学习 Web 开发 | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Introduction_to_HTML/Getting_started)
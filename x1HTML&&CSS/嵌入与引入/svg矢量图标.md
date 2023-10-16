## svg 引入
引入方法：
1. 使用 img 的 src 属性直接引入。
2. 使用 css 的 background-image 属性引入。
3. 使用 svg 标签引入（内联引入，推荐）。
4. 使用 iframe 引入（了解即可，不推荐）。
```
<img src="my.svg">
```

兼容性：对于不支持 SVG（IE 8 及更低版本，Android 2.3 及更低版本）的浏览器，您可以从 `src` 属性引用 PNG 或 JPG，并使用 [`srcset`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/img#attr-srcset) 属性只有最近的浏览器才能识别）来引用 SVG。在这种情况下，仅支持浏览器将加载 SVG - 较旧的浏览器将加载 PNG：

```
<img src="equilateral.png" alt="triangle with equal sides" srcset="equilateral.svg">
```

## 概念
### 位图和矢量图 
-   位图使用像素网格来定义 — 一个位图文件精确得包含了每个像素的位置和它的色彩信息。流行的位图格式包括 Bitmap (`.bmp`), PNG (`.png`), JPEG (`.jpg`), and GIF (`.gif`.)
-   矢量图使用算法来定义 — 一个矢量图文件包含了图形和路径的定义，电脑可以根据这些定义计算出当它们在屏幕上渲染时应该呈现的样子。 [SVG](https://developer.mozilla.org/zh-CN/docs/Glossary/SVG) 格式可以让我们创造用于 Web 的精彩的矢量图形。

### SVG
[SVG](https://developer.mozilla.org/zh-CN/docs/Web/SVG) 是用于描述矢量图像的 [XML](https://developer.mozilla.org/zh-CN/docs/Glossary/XML) 语言。为了创建 SVG 图像，大多数人使用矢量图形编辑器，如 [Inkscape](https://inkscape.org/en/) 或 [Illustrator](https://en.wikipedia.org/wiki/Adobe_Illustrator)。

### SVG 优点*
-   内存小，因为存放的是绘画指令而非像素信息，因此它也可以无限放大而不失真。
-   矢量图像中的文本仍然可访问（这也有利于 [SEO](https://developer.mozilla.org/zh-CN/docs/Glossary/SEO)）。
-   SVG 可以很好地适应样式/脚本，因为图像的每个组件都是可以通过 CSS 或通过 JavaScript 编写的样式的元素。

### SVG 缺点*
那么为什么会有人想使用光栅图形（位图）而不是 SVG？其实 SVG 确实有一些缺点：
-   SVG 非常容易变得复杂，这意味着文件大小会增加; 复杂的 SVG 也会在浏览器中占用很长的处理时间。
-   SVG 可能比栅格图像更难创建，具体取决于您尝试创建哪种图像。
-   旧版浏览器不支持 SVG，因此如果您需要在网站上支持旧版本的 IE，则可能不适合（SVG 从 IE 9 开始得到支持）。

## 参考
[SVG：可缩放矢量图形 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/SVG)
## 介绍
层叠样式表（Cascading Style Sheet）是为网页添加样式的代码。和 HTML 类似，CSS 也不是真正的编程语言，甚至不是标记语言。它是一门样式表语言，这也就是说人们可以用它来选择性地为 HTML 元素添加样式。例如，更改内容的字体、颜色、大小和间距，将其拆分为多个列，或添加动画和其他装饰功能。

## 属性和兼容性参考
在 MDN 上的 [CSS reference](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference) 页面列举了所有的 CSS 属性页面。

当你想要寻找一个 CSS 特性的更多内容时，多使用你的搜索引擎来搜索 "mdn _css-feature-name_" 。例如，搜索 "mdn color" 和 "mdn font-size"！

让所有的浏览器都同时支持一个 CSS 新特性是不现实的，通常都会一个空档期——一些浏览器已经支持而另一些仍未支持。因此，查看特性的实现状态是非常有用的。在 MDN 上的每个属性的页面中都标有它们对应的状态，你可以通过这种方法来查看你是否可以去使用它。

## 引入 css 与解析
引入 css（emmet：link:css）
``` html
<link rel="stylesheet" href="index.css">
```
基础
```html
<head>
	内部样式
	<style>
		h1 {
			color:yellow;
		}
	</style>
	外部样式
	<link href="styles/index.css" rel="stylesheet" type="text/css">
</head>
<body>
	内联样式
	<h1 style="color:red">hello</h1>
</body>
```

浏览器会拉取该 HTML 相关的大部分资源，比如嵌入到页面的图片、视频和 CSS 样式。JavaScript 则会稍后进行处理
1.  浏览器拉取到 CSS 之后会进行解析，根据选择器的不同类型（比如 element、class、id 等等）把他们分到不同的“桶”中。浏览器基于它找到的不同的选择器，将不同的规则（基于选择器的规则，如元素选择器、类选择器、id 选择器等）应用在对应的 DOM 的节点中，并添加节点依赖的样式（这个中间步骤称为渲染树）。
2.  上述的规则应用于渲染树之后，渲染树会依照应该出现的结构进行布局。
![css]( https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps/How_CSS_works/rendering.svg )

当浏览器遇到无法解析的 CSS 选择器或声明的时候会发生什么呢？答案就是浏览器什么也不会做，继续解析下一个 CSS 样式！相似的，当浏览器遇到无法解析的选择器的时候，他会直接忽略整个选择器规则，然后解析下一个 CSS 选择器。

## 规则集
选择器selector+声明declaration。一个 css 文件是 css 规则集的集合。
**规则集**（通常简称“规则”）由以下部分构成：
![规则集](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/CSS_basics/css-declaration-small.png)
选择器（**Selector**）
在这个例子中就是 `p` 元素。

声明（**Declaration**）
一个单独的规则，如 `color: red`。**以分号结尾。**

属性（**Properties**）
本例中 `color` 就是 [`<p>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/p) 元素的属性。

属性的值（Property value）
在属性的右边，冒号后面即**属性的值**。

## @规则
```
@import 'styles2.css';
```
```
@media (min-width: 30em) {
  body {
    background-color: blue;
  }
}
```

## 选择器
并集选择器逗号隔开，书写两个选择器共有的属性
```
li.special,
span.special {
```
后代选择器空格隔开
```
li em {
```
兄弟选择器（相邻）
```
h1 + p {
```
伪（Pseudo）类选择器：特定状态下的特定元素（比如鼠标指针悬停）。`a:hover` 仅在鼠标指针悬停在链接上时选择 `<a>`。之所以称为伪类，是因为它的选择器优先级与类选择器相同。
```
a:link {
  color: pink;
}

a:visited {
  color: green;
}
```
示例
```
在 `<body>` 之内，紧接在 `<h1>` 后面的 `<p>` 元素的内部，类名为 special。
body h1 + p .special {
```

元素选择器：`p` 选择 `<p>`。

id 选择器：单一页面中，每个 ID 只对应一个元素。`#my-id` 选择 `<p id="my-id">`。

类选择器：单一页面中，一个类可以有多个实例。`.my-class` 选择 `<p class="my-class">` 和 `<a class="my-class">`。

属性选择器：`img[src]` 选择 `<img src="myimage.png">` 而不是 `<img>`。



[CSS 选择器 - 学习 Web 开发 | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Selectors)

选择器示例
```
h1
a:link
.manythings
#onething
*
.box p
.box p:first-child
h1, h2, .intro
```

## 函数
cacl
rotate
url

## 速记属性

一些属性，如 [`font`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/font), [`background`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background), [`padding`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/padding), [`border`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border), and [`margin`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/margin) 等属性称为速记属性--这是因为它们允许您在一行中设置多个属性值，从而节省时间并使代码更整洁。

```
padding
1个值，上下左右
2个值，上下，左右
3个值，上，左右，下
4个值，上、右、下、左
```

## 常用属性
字体属性
```
  font-family: sans-serif, '黑体';从左到右优雅降级，用逗号隔开。
```
text-align
font 速记属性

color
vertical-align

letter-spacing
text-transform

## 盒子模型
display：inline、inline-block、block

inline：不独占一行，不能设置宽高。

inline-block：不独占一行，可以设置宽高。

block：独占一行，可以设置宽高。

相关属性
padding
border
background
margin
box-shadow
border-radius
display


其他
cursor

## Emmet 语法
[Cheat Sheet](file:///D:/tplmydata/tplmydoc/课外笔记/22夏前端开发/css/工具库/emmet.html)

```
! 生成html基本结构

div元素、.类、#id

内容{}、属性[herf=#]

\>子、+兄弟

*多个

类名嵌入$实现自增\$序列数字\$\$01\$\$\$001.demo\$*5

lorem10生成十个字的随机文本、lorem100生成一百个字的随机文本
```


> 参考
> 
> https://developer.mozilla.org/zh-CN/docs/Web/CSS

css 技巧

## 多看 mdn

## css 变量
定义：--变量
引用：var (变量名，没有变量值时的默认值)
作用域。

```
document.querySelector('.pageone').style.setProperty('变量名','变量值');

全局定义在:root选择器中

document.documentElement.style.setProperty();
```
可用于设置主题颜色


## 响应式图片

该图片根据条件（媒体查询、类型等）使用 source 一个图片，最后都不符合使用 img。source 可以有多个。

``` html
<picture>
    <source>
    <source>
    <img>
</picture>
```

## scroll-snap 轮播回弹

父：scroll-snap-type

子：scroll-snap-align

## 空状态选择器

:empty

当根据列表生成时没有内容，显示空状态可以使用该选择器。

## clamp 响应式计算高度

clamp 函数

## 遮罩改变图片颜色

![image-20230131225956057](D:\tplmydata\tplmydoc\文档图片\image-20230131225956057.png)

## flex 中间留空

用 margin-left 或 margin-right: auto。如果使用 flex 1，会让东西移到中心，margin 则不会。

## 参考
[Web 开发者指南 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/Guide)
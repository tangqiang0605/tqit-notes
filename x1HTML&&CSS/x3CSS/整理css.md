## 基础
### 概念
层叠样式表（Cascading Style Sheet）是为网页添加样式的代码。

规则集：选择器 selector+声明 declaration。层叠样式表是一系列规则集的集合。

@规则：有@import、@media 等。

函数：cacl、rotate、url 等。

### 速记属性
如 [`font`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/font), [`background`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background), [`padding`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/padding), [`border`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border), [`margin`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/margin) 等属性称为速记属性。

因为它们**允许您在一行中设置多个属性值**，从而节省时间并使代码更整洁。
```
padding
1个值，上下左右
2个值，上下，左右
3个值，上，左右，下
4个值，上、右、下、左
```

### 属性和兼容性参考
[CSS reference](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference) 或百度“mdn 属性”。多看 mdn。

### css 的引入与解析
引入 css（emmet：link:css）
``` html
<link rel="stylesheet" href="index.css">
```

浏览器会拉取该 HTML 相关的大部分资源如图片、视频和 CSS 样式。JavaScript 则会稍后进行处理
![css]( https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps/How_CSS_works/rendering.svg )

当浏览器遇到无法解析的 CSS 选择器或声明时浏览器什么也不会做，继续解析下一个 CSS 样式。

### 选择器
[CSS 选择器 - 学习 Web 开发 | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Selectors)

### Emmet 语法
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

### css 变量
定义：--变量
引用：var (变量名，没有变量值时的默认值)
作用域。

```
document.querySelector('.pageone').style.setProperty('变量名','变量值');

全局定义在:root选择器中

document.documentElement.style.setProperty();
```
可用于设置主题颜色

## 布局
### 盒子模型
display：inline、inline-block、block

inline：不独占一行，不能设置宽高。

inline-block：不独占一行，可以设置宽高。

block：独占一行，可以设置宽高。

该图片根据条件（媒体查询、类型等）使用 source 一个图片，最后都不符合使用 img。source 可以有多个。

``` html
<picture>
    <source>
    <source>
    <img>
</picture>
```

### 字体引入
参考：字体

## 图标
## 应用
## 使元素不可见
隐藏元素

| 方法                         | 占据空间 | 响应点击 | GPU 加速 | 备注        |
| ---------------------------- | -------- | -------- | -------- | ----------- |
| display. none                | no       | no       | no       | 推荐        |
| visibility. hidden           | yes      | no       | no       |       推荐      |
| opacity. 0                   | yes      | yes      | yes      |             |
| absolute. top.-999           | no       | no       | no       | 常用于 canvas 加速 |
| 盒子模型为 0+overflow        | no       | no       | no       |             |
| clip-path: polygon (0 pxx 8) | yes      | no       | no       |             |
|                              |          |          |          |             |

display 和 visibility 适应 80%的两种不同要求。
特殊场景（动画、渲染）性能优化：opacity、absolute。

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
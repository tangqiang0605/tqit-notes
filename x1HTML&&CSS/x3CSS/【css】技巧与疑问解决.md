css inspiration

https://developer.mozilla.org/en-US/docs/Web/css

 


点击子元素对父操作：
1. par：has（：first-child：active）
# 位置

## 内联

元素占了全行，背景颜色超出。display的block改为inline-block。inline-block不自动占满全行。

元素下面有空白行，因为是内联元素，所以为了去除空白，可以使用diaplayblock；

内联元素居中：内联元素的行为就像文本一样，所以inline元素可以用text-align:center进行内部水平居中。

无法换行、设置宽高，display：block或inline-block，width、height

transition对于内联不生效。？待验证。

div没有内容会坍缩，可以加个\&nbsp;（所有元素默认高度为mix-content）

堆叠上下文

z-index是实现堆叠上下文的一种方法。但需要配合相对布局或绝对布局使用。因为堆叠上下文在流布局中并不存在，需要脱离流而存在。

## 元素居中

块元素水平居中：margin：0 auto；

文字水平居中：text-align：center

文字垂直居中：line-height：字体盒子高度。

文字垂直居中：vertical-align：-webkit-baseline-middle。

图片居中：父p用text-align：center

子元素完全居中：使用flex。

居于父元素中央。

``` css
position:absolute;
top:50%;
left:50%;
transform:translate(-50%,-50%);
```

## 元素居左右

可以实现导航栏横向布局等布局

1. 使用float：left/right
2. 使用flex：display：flex。justify-content：space-between。
3. 使用伪类：：before：：after伪类

## 宽度

padding生效：为了实现响应式，在按钮、文字中，通常不给定固定宽度，而是适应内容使用padding，如果padding不生效（太宽了），可以使用width:fit-content；或max-content。

margin生效，width:auto;

## 字体

不换行。多出省略white-space：nowrap不换行

去除em标签带来的斜体。font-style：none

取消字体下划线、a标签下划线。text-decoration：none

首行缩进2格。text-indent：2em

**字体还原技巧**

模仿和目标网址一模一样的字体。

1.ctrl+shift+c选中元素直接设置：color、fontsize、font-family、padding。外边距不写入其中。

font:大小/行高 'Microsoft YaiHei';其中font-size、font-family必填。不支持inherit属性。

2.还原高度：line-height、

前面是宽后面是高，高度问题一般通过line-height解决，整数写具体的数，非整数写比例，如1.1、1.5、2等。高度（-padding）=行高*字体或高度=行高。不论哪个盒子，**行高的位置都是固定在padding里的**，也就是content-box中的widthheight位置。

3.还原宽度：font-weight、letter-spacing通过截图对比、审查元素修改。

4.最后其他：width:max-content、其他属性。



尽量少用text-transform，除非是说明一定要使用，但也不一定通过css设置而是js，以提高字体选择器通用性。

尽量少用font，很多属性比如font-weight在font后面才生效。（在没有font中，缺省inherit继承font-family，该属性是其他font-属性的基础，因此font必须设置font-family，也导致font-属性在font后面才能生效。先加载字体，再设置字体，所以font-family是第一位）用font-size、line-height、font-family替代。

## 背景

标签背景图片

background：url（images/mybg.png) no-repeat;

background-image

## 渐变

**linear-gradient函数**

 ``` css
background:linear-gradient(角度从零点顺时针开始135deg，颜色1，颜色2)
 ```

可以使用该函数实现background上的颜色叠加。

**背景颜色叠加**

直接加颜色是不行的。

叠加只能用渐变函数、图片且不能出现其他非渐变函数颜色。关键点，逗号隔开，前面覆盖后面颜色。

``` css
background:linear-gradient(rgba(208, 210, 218, 0.22),rgba(208, 210, 218, 0.22)),linear-gradient(#202c45,#202c45); 
```

**渐变阴影**

原理：用伪类遮罩和filter、transform替代box-shadow。

``` css
filter:blur(25px)散光效果（从边框向四周扩散）使得整个元素模糊
```

方法：在目标元素下面添加通过::before添加遮罩，

``` css
content:'';
position:absolute;
top:0;
left:0;
width:100%;
height:100%;
然后模糊该遮罩并设置阴影参数:下列代码越靠前越核心
filter:blur(25px);
transform:translateY(30px) scale(0.9);
z-index:-1;或者pointer-events: none;
background:linear-gradient(135deg,#24ff72,#2196F3)
border-radius:40px;
```



# 属性

## list-style-type

none。关闭li标签元素的列表序号。

### Counter计数器

父元素设置counter-reset:chapter即计数器的名字

子元素设置counter-increment:chapter

子元素::before {

​	content:"第“counter(chapter)”章”counter(section)“节”；

}

## pointer-events

none。让挂载的元素不响应点击事件而是透过它点击到下层的元素。常用于遮罩。

## zoom

Zoom属性是IE浏览器的专有属性，Firefox等浏览器不支持。它可以设置或检索对象的缩放比例。除此之外，它还有其他一些作用，比如触发ie的hasLayout属性，**清除浮动**、清除margin的重叠（bfc）等。

## resize用户可以调整该元素的大小

用户可调整该元素的大小

## 控制图片、视频、元素的宽高比aspect-ratio

方法一/设置宽高

方法二/记得考虑兼容性。用于任何**具有宽高**的元素

aspect-ratio：n=aspect-ratio：n/1

aspect-ratio：16/9

aspect-ratio：auto保持原始比例



## 滚动贴合scroll Snap

父元素：scroll-snap-type：y/x mandatory；方向/方式：强制滚动，proximity缓和滚动

子元素：

scroll-snap-align：start/end/center；

scroll-padding距离，和padding类似

例子

main标签里多个secion。main设置滚动贴合。section设置子元素的对齐方式。

## 微信scroll横向布局

需要设置一些属性以使其生效。如果仍不生效重新编译即可。

1. scroll-x
2. display:flex;white-space:nowrap;

## 毛玻璃/阴影blur

有生成器可以直接看效果、复制代码。

.glass {
  background: rgba(255,255,255, 0.59透明度);
  backdrop-filter: blur(49px模糊度);
  border-radius: 24px;圆角弧度
}

## 表单

input样式：不需要可以关闭:focus上的outline:none;

input等表单经常不继承，可以使用inherit。



## 三角形、多边形

clip-path:polygon(x y,x y)

xy可以是百分比也可以是小数也可以是带单位的数字。

也可以用来制作三角形。

通过设置border的top、bottom、left、right等属性也可以制作三角形。

``` css
.triangle {
    border-left:5px solid blue;
    border-top:10px solid transparent;
    border-bottom:10px solid transparent;
}
高为5底为20的等边向右三角形。
```

## 边框

border、outline、outlineoffset

边框设为none后仍存在，可能是outline。

outline可以偏移形成下图效果。

border没有像padding、shadow一样写四个方向，而是四个方向一致。而border-color可以。

边缘变形问题：关闭border

![image-20230128223358543](D:\tplmydata\tplmydoc\文档图片\image-20230128223358543.png)





## 百分比

百分比：一般百分比取自父元素。也有取自自身如transform.继承父元素继承的是百分比计算出的具体值，而不是百分比。



## 单位转化过程

![image-20230127172311867](D:\tplmydata\tplmydoc\文档图片\image-20230127172311867.png)

## 动画

opacity可以制作成动画，而visibility:hidden不能。

动画效果的两种方式：1.过渡2动画

animate动画填充模式backward可以解决延迟播放开始前元素直接展示静态状态。

解决动画中的意外震动backface-visibility:hidden;

# 问题

## 浮动

设置浮动失去颜色，因为元素塌陷没有高度。解决方法，清楚浮动。给失去颜色的元素挂载clearfix类。（详见布局清除浮动，最好方法是挂载clearfix）

## 不生效

问题一：z-index/margin-right不生效

设置position：absolute/relative即可。目的使其脱离标准文档流。

- float：left | right；
- 设置position；
- 设置display；

[(27条消息) margin-right没效果，怎么解决_仙人不俗的博客-CSDN博客_marginright不生效](https://blog.csdn.net/hechenxi_gaoya/article/details/107483065)

margin-right并不会失效，我错误以为的失效是不设置margin-left而设置margin-right，子元素会靠在右边。在正常文档流中，margin-right生效的结果是下一个元素会被隔开。文档流中，原则上内容是尽量靠左，尽量靠上的。



问题二：元素不显示/百分百高度没有出来？？？百分比看里面的内容，里面没有内容也就没有显示。有的百分比是看父元素？比如宽。

object-fit只有设置了宽高才有用



问题三：margin生效，width:auto;

## 多余的滚动条

滚动条通常是多余的。

1.当元素高度设置满高或者满宽时，可能会出现多余的滚动条。设置* {margin和padding：0}即可去除多余的滚动条。

2.或设置overflow

## bfc：清除浮动

去除浮动元素的兄弟元素文字围绕浮动元素。对兄弟元素设置display:flow-root为了启动bfc。

底部塌陷。父元素设置底边距，子元素设置底边距，父元素塌陷，看起来子元素底边距不生效。给父元素加个bfc。

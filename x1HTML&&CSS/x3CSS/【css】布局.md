堆叠上下文Stacking Context

当父元素有transform时，会生成一个堆叠上下文，进而隔离其所有子元素。子元素的postion:fixed不再对准视口而是父元素。（只要fixed元素对不准，祖先必有一个存在堆叠上下文）

![image-20230210225446514](D:\tplmydata\tplmydoc\文档图片\image-20230210225446514.png)

# 格式化上下文

[学前端的你了解这些知识吗？——BFC、IFC、GFC、FFC_weixin_53515924的博客-CSDN博客_bfc ifc ffc](https://blog.csdn.net/weixin_53515924/article/details/123824225)

触发 bfc：overflow:hidden

## fc

格式化上下文。页面的一块渲染区域，规定了内部的渲染规则（子元素位置与其兄弟的相互作用）。fc不会影响区域外的元素。

box：一个标签一个box。根据display属性，

1）block-level  block：list-item 或 table。块级元素。每个块级元素至少生成一个块级盒（block-level Box）参与 BFC ，称为主要块级盒(principal block-level box)。一些元素，比如 `<li>`，生成额外的盒来放置项目符号，不过多数元素只生成一个主要块级盒。

2）Inline-level Box：inline,inline-block 或inline-table 时。行内级元素。行内级元素生成行内级盒(inline-level boxes)，参与行内格式化上下文 IFC 。

3）flex container： flex 或 inline-flex。弹性容器。块级（block-level）弹性容器框。行内级（inline-level）弹性容器框。

4）grid container： grid 或inline-grid



ffc、gfc

 **flex 格式化上下文**中，设置了 `margin: auto` 的元素，在通过 `justify-content` 和 `align-self` 进行对齐之前，任何正处于空闲的空间都会分配到该方向的自动 margin 中去

这里，很重要的一点是，margin auto 的生效不仅是水平方向，垂直方向也会自动去分配这个剩余空间。

# 传统布局

依靠文档流为基础，而不是像flex和grid脱离文档流（container本身不脱离，而内部完全脱离）。

## 文档流

块元素，可看作宽度为max-width。因此占满父元素一行。

行内元素，可看作宽度mix-width，内容多长它就多宽。

以上是正常文档流，为了实现更复杂的效果，需要修改文档流。

修改文档流的属性：float、position（absolute，fixed、sticky）、display（flex、grid）、multi-column。

脱离文档流：之前占据的空间会被后来的元素占据。float和position（absolute、fixed、sticky）

修改文档流不一定脱离文档流，比如display的inline、flex、grid等所有display属性。

## 浮动布局

使用浮动+盒子模型+定位：**float+margin+position**

浮动布局：实现从左到右/多行布局。一行满会自动换到下一行。

一般情况下我们通过ul>li或者div创建从上排到下的一系列元素。这系列元素给套上同一个类，类包含float:left（对于一列元素，应该给所有元素加上float属性。效果和flex布局类似），使它们从原来的从上到下变为从左到右。而父元素（容器）一般需要清除浮动(使用display：flow-root或者overflow：hidden或者使用伪类)。

### 五种定位position

position：static。不可设置。正常文档流。

position：relative。通过left、top设置偏移自身。空间占原位。不影响正常文档流。

position：absolute。通过left、top设置相对绝对布局的最近祖宗元素布局。不占空间。脱离文档流。会触发bfc。

position：fixed。脱离文档流。left、bottom、right、top相对窗口。脱离文档流会把元素宽高设置为内容宽高。会触发bfc。fixed是固定父元素为html的absolute。

position：sticky。滚到一定位置 fixed。脱离文档流。基于用户的滚动位置来定位。
粘性定位的元素是依赖于用户的滚动，在 position: relative 与 position: fixed 定位之间切换。它的行为就像 position: relative; 而当页面滚动超出目标区域时，它的表现就像 position: fixed;，它会固定在目标位置。元素定位表现为在跨越特定阈值前为相对定位，之后为固定定位。这个特定阈值指的是 top, right, bottom 或 left 之一，换言之，指定 top, right, bottom 或 left 四个阈值其中之一，才可使粘性定位生效。否则其行为与相对定位相同。

作者：教主鸽鸽
链接： https://juejin.cn/post/7080889197719994375
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。



z-index：如果两个元素的父元素（relative）有z-index，是取决于父元素的z-index。比如子元素是-1，但父元素是99，那么子元素仍在小于父元素zindex的元素之上。即z-index只在同级范围生效。

### 清除浮动

目的是使父的高度与浮动的子的高度一致。

方法一：设置bfc块级格式化上下文。

方法二：显式设置高度。

方法三：额外标签法。在浮动标签的同级新增一个属性为clear：both的标签。

**方法四：给父类加clearfix即可（推荐）。**

下面任选一个使用

``` css
.clearfix {
    *zoom:1;/*IE6、7*/
}
.clearfix:after {
    content:"";
    display:block;
    height:0;
    clear:both;
    visibility:hidden;
}
```

``` css
.clearfix {
    *zoom:1;
}
.clearfix:before,.clearfix:after {
    content:"";
    display:table;
}
.clearfix:after {
    clear:both;
}
```

``` css
.clearfix::after {
    content:"";
    display:block;
    clear:both;
}
```

### bfc布局

子外边距重叠取大者，浮动取消，塌陷消失。

0. 块级格式化上下文

1. BFC是一个[块级元素](https://so.csdn.net/so/search?q=块级元素&spm=1001.2101.3001.7020)，块级元素在垂直方向上依次排列。
2. BFC是一个独立的容器，内部元素不会影响容器外部的元素。
3. 属于同一个BFC的两个盒子，[外边距](https://so.csdn.net/so/search?q=外边距&spm=1001.2101.3001.7020)margin会发生重叠，并且取最大外边距。
4. 计算BFC高度时，浮动元素也要参与计算。（清除浮动）
5. 避免外边距塌陷[面试官：什么是BFC？BFC有什么特性？如何创建BFC？BFC有什么作用？_程序员鱼乐的博客-CSDN博客_bfc](https://blog.csdn.net/guoao20000915/article/details/125685983)

**给父级元素添加以下任意样式**

0. display：flow-root。
1. overflow: hidden;
2. display: flex;
3. display: inline-flex;
4. display: inline-block;
5. position: absolute;
6. position: fixed;

如果是为了清除浮动而使用bfc，尽量不用overflow（会影响滚动条）而是使用display:flow-root。

堆叠上下文

z-index是实现堆叠上下文的一种方法。但需要配合相对布局或绝对布局使用。因为堆叠上下文在流布局中并不存在，需要脱离流而存在。

块级上下文属于正常文档流。堆叠上下文属于脱离文档流。

# 新式布局

order：填数字；功能是按大小排序。

gap：间隔

flex、grid脱离文档流（原来位置可被其他元素占用）。position（static、relative）、float和transform则不会（原来位置仍保留）。

## Grid网格布局

第一步display：grid

第二步父元素分配空间

第三步子元素分配空间

第四步父子元素其他属性配置



grid-auto-flow：自动排序：grid的自动排序会有空洞，可以通过设置grid-auto-flow:row dense使其更加紧密地排序。

gap：空隙，gap=row-gap、column-gap。

grid-auto-rows：假设下来了有三行，但是我们只指定了一行的grid-template-rows，其他的就是用这个grid-auto-rows设定的值。缺省是min-content吗？

### 空间分配

方法一

父元素

grid-template：grid-template-columns / grid-template-rows;

- **占比%**
- **fr。占比。**1fr约等于minmax(min-content,max-content)但是会尽量取最大值（反向的minmax）
- **repeat(n，宽度)，minmax（最小宽度、最大宽度）**minmax会尽可能使用小的值。当有minmax和1fr并列时，缩到minmax的min和1fr的min-content，将不再缩小而是视野显示不全。
- **带单位的值、xxpx、xxem、xxrem、xxxvh**
- **max-content、min-content**。该列中文本最长的长度。min-content该列最长单词的长度。
- **auto-fill，repeat（auto-fill，100px)根据大小分为n份，比如在1000px下，分为10份，300px时分为3份。不足？**
- **auto-fit，则会将其中多余的未使用的网格宽度设为0.**
- **混合**

示例：

repeat（auto-fit，minmax（200px，1fr）），按照内部元素个数分为n个格，比如5个，当宽度小于200*5px，换行。

repeat（auto-fill，minmax（250px，1fr））和上面类似。

或repeat（auto-fill，150px），不足则没有。

看视频

子元素

选择第一行轨道的某列

- grid-column-start:第几列，默认是选择第一轨道trace，span 1。
  - **第几列的线line（正数）**
  - **倒数第几列的线line（负数）**
  - **span n，跨越的个数**

- grid-column-end:第几列
- grid-column: grid-column-start / grid-column-end ;

选择第一列轨道的某行

- grid-row-start、grid-row-end、grid-row；

- **grid-area**：`grid-row-start`/`grid-column-start`/`grid-row-end`/`grid-column-end`。grid-area是grid-column和grid-row的组合缩写。

方向二

grid-template-areas指定区域、grid-area分配区域。（可以用句号点占位）

``` 
container {
    display: grid;
    grid-template-columns: 1fr 3fr;
    grid-template-areas:
        "header header"
        "sidebar content"
        "footer footer";
}
header {grid-area: header;}
article {grid-area: content;}
aside {grid-area: sidebar;}
footer {grid-area: footer;}
```

### 对齐方式

父元素

项目对内对齐：align-items：end、justify-items：center，将容器分为多行，在每行的相对位置。

项目对外对齐：align-content：end、justify-content：space-around，当网格分配后仍小于 container 时有效果。将容器中的内容看为整体，相对容器去布局。

子元素

align-self、justify-self，对内对齐。网格布局无法支持对外对齐。

## mcl多列布局

multi-column-layout多列布局

可以看作是grid布局的简单形式，适合用来做自适应的瀑布流之类的布局。关注列而不关注行。通过columns设置列数和宽度，自适应显示内容。

可以看作是flex横向排列换行布局旋转的样子。多列布局不会脱离文档流。内容满一列后换到下一列。这里，块元素不占据整个视图宽度，而是占据列的宽度，块级元素仍然可看作宽度为max-content。

多列布局的高度是mix-content，也就是里面所有内容占满所有列之后的最小高度。给固定高度后设置column-fill：auto可以改变这种情况（从填到所有列优先变为**填满**一列优先）。

**columns：column-cout column-width；**父使用column-cout：3，使子元素按三列排列。第一个元素、第二个元素、第三个元素、然后换行，第四个元素、第五个元素、第六个元素。或。column-width设置固定列宽。根据浏览器大小变化列数。

column-gap：间隔。column-rule：分割线和border参数和一样

column-fill：auto先在前一列填满父高度后才在下一列显示新的内容

column-span：all，子元素内容占据所有列。宽度占多列。

## flex弹性布局

本质上是一维的（主轴mianaxis。副轴交叉轴crossaxis）。如果只有横轴，那么横向只有一个content。那么也只有justify-content和align-items。align-content是对横着的几条进行调整，而flex只有一条不换行且默认占满，justify-items是对竖向的，而flex中默认占满，不能调整。items是对每个元素内部进行的调整。content是对每个元素相对于容器的调整。

但在wrap换行的情况下，出现多行，可以设置gap控制行间间隔，通过align-content也可以设置行的位置分配。

常用：

1. displayflex使水平分布
2. alignitemscenter使垂直对齐。
3. flex1占满剩余空间
4. justifycontent：space-between
5. 水平居中垂直居中diaplayflex，alignitemscenter垂直对齐，justifycontentcenter水平对齐。一般用于单个子元素居中。

常见问题解决

1. 无法溢出/自动缩小：关闭shrik：flex-shrik：0
2. 跟随变形：alignitems默认stretch，设为其他值即可。如flex-start。
3. display:flex会触发bfc，导致子元素外边距重叠且只取其中最大值。

父元素属性

flex-direction：row缺省，column次常用，row-reverse/column-reverse。flex-wrap：nowrap缺省，wrap换行常用，wrap-reverse。子元素保持最小宽度不变。flex-flow：row wrap；direction和wrap的简写。flex-flow:column wrap就类似多列布局设置cloumn-fill:auto。

justify-content：flex-start缺省flex-end从end开始紧挨，center，space-between间隔，space-around两边留一半的间隔。space-evnely，两边留一倍等大。

align-items：默认stretch拉到行高/flex-start/flex-end/center/baseline字体基线

align-content：默认normal。整体对待。参数和justify-content类似。

gap：24px。order子含，排序。

gap的替代兼容性写法：

![image-20230206220025417](D:\tplmydata\tplmydoc\文档图片\image-20230206220025417.png)

子元素属性

如果元素没有width，子元素未超过父元素时width默认max-content，子元素超过父元素时width默认min-content

flex-basis会替代width，auto时使用width的值。

flex-grow，默认0，按比占用剩余空间

flex-shrink：注意默认是开启的，为1，子超过父会缩小。子宽减去超出部分占比。所以0关闭弹性缩小，子才会溢出父。

flex：过大 过小 基准=grow shrink basis。flex：initial等于01auto

解释下表

1. 放大缩小，使用width。常用。
2. 不放大不缩小，使用width，关闭弹簧效果
3. 放大缩小，宽度为0，放大缩小，100px宽度。
4. 放大缩小宽度为0.
5. 示例：填充剩余空间flex：1

![image-20230102163812867](D:\tplmydata\tplmydoc\文档图片\image-20230102163812867.png)

## 自适应布局（js）

根据不同设备跳转到不同的html

![image-20230102220614198](D:\tplmydata\tplmydoc\文档图片\image-20230102220614198.png)

## 响应式布局(移动端)

应用场景：交互少，官网。

与自适应布局对比一下。一个静态html多个设备不同形态。引入多个css，basic/small/big等。需要使用meta标签开启移动端响应式。（meta标签开启响应式 ，知手机浏览器设定网页宽度）

动态设置 html 标签 font-size 大小（@media）

### 一些方法

[如何实现响应式网页设计_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1UW4y1b7L9/?spm_id_from=333.999.0.0&vd_source=a192bbc2c82b7725cd9d5149075acda1)

横向排列的flex使用wrap和子使用flexbasis。使其不被压扁。

横向排列的grid也容易被小屏幕压扁，用repeat和minmax函数解决。

### 响应式宽高

设置百分比宽高。

使用min、max宽高。

使用rem。

使用vw/vh。

使用cacl（rem+vw）函数。

### 响应式字体

使用固定的rem、em、浮动的vw。而不是px。使用vw会出现窄屏幕字体过小的情况，可以使用calc(2rem+2vw)。

1. 使用媒体查询改变html元素的rem大小。
2. 使用js改变html元素的rem大小。

![image-20230102220304587](D:\tplmydata\tplmydoc\文档图片\image-20230102220304587.png)



### 响应式图片

根据条件选择合适的多倍图、二倍图、某种像素的图片。

1. 图片使用img的sizes根据sizes通过srcset获得对应的图片。srcset中图片的像素宽度写为不带单位的数字如1240，用注记符w表示该值为px宽度。通过sizes查询设置该小于宽度下最大的图片，如下图中，最大为400px时，使用最大为300px的图片，即300w的图了。范围小的在前面，最后是默认的值，也就是范围最大的了。

![image-20230102225753636](D:\tplmydata\tplmydoc\文档图片\image-20230102225753636.png)

2. 使用picture标签。下图有三个元素，一个一个读，符合条件的先使用。有多个source类似if和elseif，而img则是else。顺序应该从范围小到范围大。img只有一个，也就是范围最大的默认。

![image-20230102225807224](D:\tplmydata\tplmydoc\文档图片\image-20230102225807224.png)

### 容器查询

兼容性差。

某些组件内部元素根据组件容器改变，使该组件适应不同大小的设计。







### 媒体查询

media query。多用于移动端.电脑差别不大.

``` css
@media print
@media screen
@media 【only】 screen and （max-width：360px) {
	ul {
	}
}
```

断点定义。考虑css层叠性，**写在前面的条件应该包含后面的条件**。从小到大比如min600到min1200或者从大到小max1200到max600要按这两种顺序。

tailwindcss

<img src="D:\tplmydata\tplmydoc\文档图片\image-20230102154232331.png" alt="image-20230102154232331"  />

boostrap

<img src="D:\tplmydata\tplmydoc\文档图片\image-20230102154204323.png" alt="image-20230102154204323"  />

引入方式

1. 直接写在样式里

   ``` css
   @media print
   @media screen
   @media 【only】 screen and （max-width：360px) {
   	ul {
   	}
   }
   ```

2. 作为style的meida属性

![image-20230102161838763](D:\tplmydata\tplmydoc\文档图片\image-20230102161838763.png)

3. link引入的media属性

![image-20230205231225167](D:\tplmydata\tplmydoc\文档图片\image-20230205231225167.png)
引入字体
```css
@font-size {
	font-family:'';
	src:url()
}
```

## css

### 属性

box-shadow

参数：整体大小右偏移下偏移、大小、颜色

``` html
属性
color=""水平线颜色
width=""水平线宽度
align=""水平线方向，left左，right右
noshade="noshade"水平线默认阴影消除
align水平对齐方式，取值：left、center、right。
border：设置边框
bgcolor：设置背景颜色

width/height：表格的宽度/表格高度

list-style
background-color
vertical-align:middle;图片与文字的对齐方式
postition
top
left
border-radius
::before
display
background:url() no-repeat -81px 0;
background-size
媒体查询@media only screen and (max-width:800px){}
```

### 单位

1. 微信wxs

2. px像素光点

3. %

4. em：上一层字体的倍数：如body字体10px，则1em=10px。实现行距等比放大。比如p的父元素font-size：10px；然后p设为font-size：1em；line-height：1.5em。root元素默认16px;

5. rem：基于html的字体大小倍数。root em。

6. vw/vh。viewport可视画面大小。vw/vh取值0-100.

7. vmin/vmax：0-100，可视画面最长边可能是宽也可能是高，可视化画面最短边（可能是高/可能是宽）

8. fr：grid布局的单位


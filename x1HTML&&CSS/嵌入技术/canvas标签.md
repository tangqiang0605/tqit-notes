
canvas 标签：用于动画、游戏、数据可视化、图片编辑、实时视频处理等方面。

canvasAPI：2D
webGLAPI：硬件加速的 2D、3D
## 起步
### 元素
canvas 标签有宽高属性。这个属性规定了 canvas 中包含多少个像素点（px）
1. 默认 300\*150
2. 设置属性 width=“300”, height="150"

css 设置
css 设置宽高不会影响 canvas 包含的像素，可能会对单位像素点造成拉伸。

canvas 默认透明。

替换内容
1. 闭合标签内可以写替换内容
2. 缺少闭合标签，后面的内容会被当做替换内容，可能造成元素不显示。
3. 
### 获取
获取 HTMLCanvasElement 画板元素
document. getElementById ('canvas')

获取 CanvasRenderingContext2 D 画板渲染上下文
HTMLCanvasElement. getContext ('2d')
画板渲染上下文通过画板元素的方法获取，画板渲染上下文有很多绘制方法可以使用。

代码
```js
const canvas=document.getElementB yId('canvas');
// 检查支持性
if(!canvas.getContext)return;
const ctx=canvas.getContext('2d');
```

CanvasRenderingContext 2D 对象的方法

## 绘制
下面将 CanvasRenderingContext2D
### 线绘制
路径绘制。一个路径有子路径构成。
1. 创建路径起始点。
beginPath 方法：清空上次子路径列表。

3. 路径方法。
方法：arc、lineTo、quadraticCurveTo(cp1x, cp1y, x, y)、bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)、rect(x, y, width, height)
```js
    ctx.beginPath();
    ctx.moveTo(75, 40);
    ctx.bezierCurveTo(75, 37, 70, 25, 50, 25);
    ctx.bezierCurveTo(20, 25, 20, 62.5, 20, 62.5);
    ctx.bezierCurveTo(20, 80, 40, 102, 75, 120);
    ctx.bezierCurveTo(110, 102, 130, 80, 130, 62.5);
    ctx.bezierCurveTo(130, 62.5, 130, 25, 100, 25);
    ctx.bezierCurveTo(85, 25, 75, 37, 75, 40);
    ctx.fill();

```
new Path2D ()、Path2D. addPath()
1. 创建空 path 对象
2. 克隆 path 对象创建 path 对象
3. svg 指令创建 path 对象
``` js
    var rectangle = new Path2D();
    rectangle.rect(10, 10, 50, 50);
ctx.stroke(rectangle);

    var circle = new Path2D();
    circle.moveTo(125, 35);
    circle.arc(100, 35, 25, 0, 2 * Math.PI);
    ctx.fill(circle);
    
var p = new Path2D("M10 10 h 80 v 80 h -80 Z");
```
4. closePath 连接起点终点。fill 自动包含。stroke 按需使用。

fill 方法，或 stroke 方法，或 closePath 方法+stroke 方法。

补充：
弧度从 X 轴到 Y 轴方向。
弧度=(Math. PI/180)\*角度
### 块绘制
线可以绘制块，但块绘制是简便的绘制块的方式。
fillRect 方法：stokeRect、clearRect


### 控制
#### 其他

#### 位置
moveTo 方法
#### 颜色
属性：fillStyle 填充颜色、strokeStyle 边框颜色。绘制填充矩形就可以看出来。一般只用一个。rgba 有透明属性。全局透明globalAlpha
```
ctx.fillStyle = "orange";
ctx.fillStyle = "#FFA500";
ctx.fillStyle = "rgb(255,165,0)";
ctx.fillStyle = "rgba(255,165,0,1)";
```
#### 线末
butt。默认。
square，突出半线宽。也可能产生半像素点。
round 突出半线宽圆
#### 线结
lineJoin、
round 圆接转角. 半径为线宽。
bevel 切平
miter 尖 miterLimit，miter 超长则切平
#### 虚线
getLineDash ()、setLineDash ()、lineDashOffset 起始位置（起始偏移）逆时针
```
  ctx.setLineDash([4, 2]);
  ctx.lineDashOffset = 10;
```
#### 线宽
整数。
**半渲染点**：半渲染点看起来会模糊一点，这是因为位置不在像素边界。原因：绘制路径是从点对点的路径向两边绘制宽度，所以如果线宽是奇数，对半就会出现 0.5 在格子里，产生半渲染点。多出现在水平、垂直线。（蓝和白产生浅蓝为了覆盖整个格子）
解决方法：以半个点为坐标（如图）。
![[Pasted image 20230324180200.png]]

#### 渐变
新建一个 `canvasGradient` 对象，并且赋给图形的 `fillStyle` 或 `strokeStyle` 属性
[`createLinearGradient(x1, y1, x2, y2)`]( https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/createLinearGradient "createLinearGradient(x1, y1, x2, y2)")

createLinearGradient 方法接受 4 个参数，表示渐变的起点 (x1,y1) 与终点 (x2,y2)。

[`createRadialGradient(x1, y1, r1, x2, y2, r2)`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/createRadialGradient "createRadialGradient(x1, y1, r1, x2, y2, r2)")

createRadialGradient 方法接受 6 个参数，前三个定义一个以 (x1,y1) 为原点，半径为 r1 的圆，后三个参数则定义另一个以 (x2,y2) 为原点，半径为 r2 的圆。
```
  // Create gradients
  var lingrad = ctx.createLinearGradient(0,0,0,150);
  lingrad.addColorStop(0, '#00ABEB');
  lingrad.addColorStop(0.5, '#fff');
  lingrad.addColorStop(0.5, '#26C000');
  lingrad.addColorStop(1, '#fff');

  // assign gradients to fill and stroke styles
  ctx.fillStyle = lingrad;
  ctx.strokeStyle = lingrad2;
```
径向渐变
```
  var radgrad4 = ctx.createRadialGradient(0,150,50,0,140,90);
  radgrad4.addColorStop(0, '#F4F201');
  radgrad4.addColorStop(0.8, '#E4C700');
  radgrad4.addColorStop(1, 'rgba(228,199,0,0)');

  // 画图形
  ctx.fillStyle = radgrad4;
```

#### 图案
[`createPattern(image, type)`]( https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/createPattern "createPattern(image, type)")

该方法接受两个参数。Image 可以是一个 `Image` 对象的引用，或者另一个 canvas 对象。`Type` 必须是下面的字符串值之一：`repeat`，`repeat-x`，`repeat-y` 和 `no-repeat`

image 对象或 canvas 对象。
```js
  var img = new Image();
  img.src = 'canvas_createpattern.png';
  img.onload = function() {
    // src加载完毕，创建图案
    var ptrn = ctx.createPattern(img, 'repeat');
    ctx.fillStyle = ptrn;
    ctx.fillRect(0, 0, 150, 150);

  }
```
#### 阴影
偏移 xy、blur、颜色
```
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;
  ctx.shadowBlur = 2;
  ctx.shadowColor = "rgba(0, 0, 0, 0.5)";

  ctx.font = "20px Times New Roman";
  ctx.fillStyle = "Black";
  ctx.fillText("Sample String", 5, 30);
```
#### 填充规则
当我们用到 `fill`（或者 [`clip`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/clip "clip")和[`isPointinPath`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/isPointInPath "isPointinPath") ）你可以选择一个填充规则


### 文本
[`fillText (text, x, y [, maxWidth])`]( https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/fillText "fillText (text, x, y [, maxWidth])")

在指定的 (x, y) 位置填充指定的文本，绘制的最大宽度是可选的。

[`strokeText (text, x, y [, maxWidth])`]( https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/strokeText "strokeText (text, x, y [, maxWidth])")

在指定的 (x, y) 位置绘制文本边框，绘制的最大宽度是可选的。
```
  ctx.font = "48px serif";
  ctx.fillText("Hello world", 10, 50);
```

[`font = value`]( https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/font "font = value")
当前我们用来绘制文本的样式。这个字符串使用和 [CSS](https://developer.mozilla.org/zh-CN/docs/Web/CSS) [`font`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/font) 属性相同的语法。默认的字体是 `10px sans-serif`。

[`textAlign = value`]( https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/textAlign "textAlign = value")
文本对齐选项。可选的值包括：`start`, `end`, `left`, `right` or `center`. 默认值是 `start`。

[`textBaseline = value`]( https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/textBaseline "textBaseline = value")
基线对齐选项。可选的值包括：`top`, `hanging`, `middle`, `alphabetic`, `ideographic`, `bottom`。默认值是 `alphabetic`。

[`direction = value`]( https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/direction "direction = value")
文本方向。可能的值包括：`ltr`, `rtl`, `inherit`。默认值是 `inherit`。

[`measureText ()`]( https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/measureText "measureText ()")
将返回一个 [`TextMetrics`](https://developer.mozilla.org/zh-CN/docs/Web/API/TextMetrics) 对象的宽度、所在像素，这些体现文本特性的属性
```
工具类，用于预测宽度？
  var text = ctx.measureText("foo"); // TextMetrics object
  text.width; // 16;
```


## 图像操作
用于动态的图像合成或者作为图形的背景，以及游戏界面（Sprites）等等。浏览器支持的任意格式的外部图片都可以使用，比如 PNG、GIF 或者 JPEG。你甚至可以将同一个页面中其他 canvas 元素生成的图片、视频 dom 元素作为图片源。
HTML 规范为图片提供了 [`crossorigin`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/img#attr-crossorigin) 属性，结合合适的 [CORS](https://developer.mozilla.org/zh-CN/docs/Glossary/CORS) 响应标头，就可以实现在 [`<canvas>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/canvas) 中使用外部域加载的 [`<img>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/img) 元素，就像在当前源加载一样。

[`drawImage(image, x, y, width, height)`]( https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/drawImage "drawImage(image, x, y, width, height)")
这个方法多了 2 个参数：`width` 和 `height，` 这两个参数用来控制当向 canvas 画入时应该缩放的大小

## 参考
[Canvas 教程 - Web API 接口参考 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial)
[Pixi.js](https://pixijs.com/) 是一个基于 Canvas 和 WebGL 的高效率 2D 渲染引擎。Pixi. js 应用将会在我们的页面创建一个 Canvas 对象，并在上面绘制出我们想要的结果。Pixi. js 应用，就是一块可以调用 PixiAPI 的 canvas 画板。Pixi 很容易入门，只要掌握了 Pixi 中的以下几个重要概念，其他就都是参考他的文档调用 API 了。

## 显示对象
[DisplayObject](https://pixijs.download/release/docs/PIXI.DisplayObject.html) 是该引擎中各种对象的接口。在 Pixi 中，绘制精灵、文本、图形（Graph）、容器等对象，都可以使用 DisplayObject 上的属性和方法（比如大小、位置、点击事件等），因为这是他们的基类。

| PROPERTY       | DESCRIPTION                                                  |
| :------------- | :----------------------------------------------------------- |
| **position**   | X- and Y-position are given in pixels and change the position of the object relative to its parent, also available directly as `object.x` / `object.y` |
| **rotation**   | Rotation is specified in radians, and turns an object clockwise (0.0 - 2 * Math. PI) |
| **angle**      | Angle is an alias for rotation that is specified in degrees instead of radians (0.0 - 360.0) |
| **pivot**      | Point the object rotates around, in pixels - also sets origin for child objects |
| **alpha**      | Opacity from 0.0 (fully transparent) to 1.0 (fully opaque), inherited by children |
| **scale**      | Scale is specified as a percent with 1.0 being 100% or actual-size, and can be set independently for the x and y axis |
| **skew**       | Skew transforms the object in x and y similar to the CSS skew () function, and is specified in radians |
| **visible**    | Whether the object is visible or not, as a boolean value - prevents updating and rendering object and children |
| **renderable** | Whether the object should be rendered - when , object will still be updated, but won't be rendered, doesn't affect children `false` |

## 对象管理
[Container](https://pixijs.download/release/docs/PIXI.Container.html) 类即上面所说的容器，用于将一组 DisplayObject 根据需要放在一起，然后再挂载到 Pixi 应用上。想象一下，如果没有容器，所有东西都是直接挂载在 stage 上，那么就会整个结果会非常混乱。有了容器，整个 DisplayObject 对象可以被抽象为一棵树，方便对象的管理，而且可以很大地提高应用的性能。（像DomTree 一样）

stage：canvas 上用于挂载 DisplayObject 的对象，在 stage 上的显示内容都会被渲染出来。

容器的作用：1. 包含显示对象 2. 设置遮罩 3. 设置滤镜

使用遮罩：
```js
maskContainer.mask = mask;
maskContainer.addChild(mask);
```
mask 是一个图形 （Graph 对象），而 maskContainer 是一个容器（Container 对象），他们都是 DisplayObject。

## 纹理
纹理是显示对象使用的核心资源之一。

纹理的加载过程：源图像>加载器>基本纹理>纹理

加载器用于加载图片。PIXI.Texture.from()。可以加载图片、视频、画布、svg 等作为纹理。加载基本纹理（雪碧图）。BaseTextures 会自动缓存，因此重复调用同一 URL 每次都会返回相同的 BaseTexture。

## 事件
PixiJS 使用交互式对象的边界矩形来确定鼠标或触摸事件是否“命中”该对象。PixiJS 支持三种类型的交互事件，鼠标、触屏和指针。鼠标和触屏事件都会触发指针事件，所以首选使用指针事件。

PixiJS 中的事件不会“冒泡”。如果要支持冒泡，则需要在子对象的事件处理代码中显式重新触发父对象的事件。其次，没有事件捕获支持 - 例如，您不能让单个对象在拖动时捕获所有交互事件。

## 学习资源
官方文档： https://pixijs.io/guides/basics/assets.html ，首选。

中文文档： http://pixijs.huashengweilai.com/guide/start/1.introduction.html ，版本比较老。

视频教程：[2023全新Pixijs强大canvas图形渲染引擎教程_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1rG4y1M7MS/?spm_id_from=333.337.search-card.all.click&vd_source=a192bbc2c82b7725cd9d5149075acda1)，推荐，可以看完视频教程入门，然后再去学习官方文档。

实例：[有趣又逼真的水波交互动画 - 掘金](https://juejin.cn/post/7142648055052337182?utm_source=ug_by_post)

> 参考
> 
> Container： https://pixijs.io/guides/basics/containers.html
> DiaplayObject： https://pixijs.io/guides/basics/display-object.html
> Texture： https://pixijs.io/guides/basics/textures.html
# 【css】使用Swiper

# 一、基本使用

示例：[下载Swiper - Swiper中文网](https://www.swiper.com.cn/download/index.html#file1)

## html部分

引入css

``` html
<link rel="stylesheet" href="https://unpkg.com/swiper@8/swiper-bundle.css">
<link rel="stylesheet" href="https://unpkg.com/swiper@8/swiper-bundle.min.css">  
```

引入js

``` html
<script src="https://unpkg.com/swiper@8/swiper-bundle.js"> </script>  
<script src="https://unpkg.com/swiper@8/swiper-bundle.min.js"> </script>
<script src="https://unpkg.com/swiper@8/swiper-bundle.min.js.map"> </script>
ES 模块
<script type="module">
  import Swiper from 'https://unpkg.com/swiper@8/swiper-bundle.esm.browser.min.js'
  const swiper = new Swiper(...)
</script>
```

示例

``` html
<!DOCTYPE html>
<html>
<head>
    ...
    <link rel="stylesheet" href="dist/css/swiper-bundle.min.css">
</head>
<body>
    ...
    <script src="dist/js/swiper-bundle.min.js"></script>
    ...
</body>
</html>
```

挂载class

``` 
swiper默认容器

swiper-wrapper默认插件（装载swiper-slide），wrapper与其他插件是平级的（在html上）

swiper-slide轮播内容容器

swiper-pagination分页插件

swiper-scrollbar滚动条

swiper-button-prev、swiper-button-next导航按钮
```

示例

``` html
<!DOCTYPE html>
<html>

<head>
  <link rel="stylesheet" href="https://unpkg.com/swiper@8/swiper-bundle.css">
  <style>
    .swiper {
      width: 600px;
      height: 300px;
      border: 1px solid;
    }

    .swiper-slide {
      text-align: center;
      font-size: 18px;
      background: #fff;

      /* Center slide text vertically */
      display: -webkit-box;
      display: -ms-flexbox;
      display: -webkit-flex;
      display: flex;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      -webkit-justify-content: center;
      justify-content: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      -webkit-align-items: center;
      align-items: center;
    }

    .swiper-slide img {
      display: block;
      width: 600px;
      height: 300px;
      object-fit: cover;
    }
  </style>
</head>

<body>
  <script src="https://unpkg.com/swiper@8/swiper-bundle.js"> </script>
  <div class="swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide">Slide 1</div>
      <div class="swiper-slide">Slide 2</div>
      <div class="swiper-slide">Slide 3</div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>

    <!-- 如果需要滚动条 -->
    <div class="swiper-scrollbar"></div>

    <!-- 也可以放在options的modules里 -->
  </div>
  <!-- 导航等组件可以放在Swiper容器之外 -->
  
  <script>
    var mySwiper = new Swiper('.swiper', {
      // direction: 'vertical', // 垂直切换选项
      loop: true, // 循环模式选项

      // 如果需要分页器
      pagination: {
        el: '.swiper-pagination',
      },

      // 如果需要前进后退按钮
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      // 如果需要滚动条
      scrollbar: {
        el: '.swiper-scrollbar',
      },
    })

  </script>

</body>

</html>
```

## css部分

``` css
.swiper {
    width:600px;
    height:300px;
}
这里可以做unocss适配
```

## JavaScript部分

`new Swiper('.swiper', options)`

返回一个可操作的dom对象。[Swiper使用方法 > Swiper与DOM - Swiper中文网](https://www.swiper.com.cn/usage/dom7/index.html)

插件可以放在modules里，而不用在html中显式声明？

示例

``` js
var mySwiper = new Swiper ('.swiper', {
    direction: 'vertical', // 垂直切换选项
    loop: true, // 循环模式选项

    // 如果需要分页器
    pagination: {
        el: '.swiper-pagination',
    },

    // 如果需要前进后退按钮
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    // 如果需要滚动条
    scrollbar: {
        el: '.swiper-scrollbar',
    },
})   
```

# 二、过渡动画

## Swiper Animate

在线演示：[Swiper使用方法 > swiperAnimate 使用方法 - Swiper中文网](https://www.swiper.com.cn/usage/animate/index.html)

Swiper中文网提供的用于在Swiper内快速制作CSS3动画效果的小插件，适用于Swiper2.x、Swiper3.x、Swiper4.x和Swiper5.x 。
此插件不适用于loop模式

引入[swiper.animate.min.js](https://www.swiper.com.cn/download/index.html#file8)和[animate.min.css](https://www.swiper.com.cn/download/index.html#file9)

``` html
<!DOCTYPE html>
<html>
<head>
    ...
    <link rel="stylesheet" href="path/to/swiper.min.css">
    <link rel="stylesheet" href="path/to/animate.min.css">
</head>
<body>
    ...
    <script src="path/to/swiper.min.js"></script>
    <script src="path/to/swiper.animate.min.js"></script>
</body>
</html>
```

使用

``` html
挂载
在需要运动的元素上面增加类名ani，和其他的类似插件相同，Swiper Animate需要指定几个参数：
swiper-animate-effect：切换效果，例如 fadeInUp 
swiper-animate-duration：可选，动画持续时间（单位秒），例如 0.5s
swiper-animate-delay：可选，动画延迟时间（单位秒），例如 0.3s

<div class="swiper-slide">
	<p class="ani" swiper-animate-effect="fadeInUp" swiper-animate-duration="0.5s" swiper-animate-delay="0.3s">内容</p>
</div>

设置
<script>
  //Swiper5
  var mySwiper = new Swiper('.swiper-container', {
    on: {
      init: function () {
        swiperAnimateCache(this); //隐藏动画元素 
        swiperAnimate(this); //初始化完成开始动画
      },
      slideChangeTransitionEnd: function () {
        swiperAnimate(this); //每个slide切换结束时也运行当前slide动画
        //this.slides.eq(this.activeIndex).find('.ani').removeClass('ani'); 动画只展现一次，去除ani类名
      }
    }
  }) 
</script>
```

## Animate.css

如果以上这些效果不能满足你的需求，你可以仿照[animate.css](https://www.swiper.com.cn/download/index.html#file10)的格式制作一些其他效果，加到你自己的css文件。其他参数：[transition-timing-function](http://bbs.swiper.com.cn/forum.php?mod=viewthread&tid=13&page=1&extra=#pid25) 。

另外，关于Animate.css[【css】使用Animate.css_46590928的博客-CSDN博客](https://blog.csdn.net/weixin_46590928/article/details/127941137?spm=1001.2014.3001.5501)。

# 三、在原生js使用swiper

1.下载npm包`npm i swiper`

2.引入构造函数组件和样式  `import Swiper, { Navigation, Pagination } from 'swiper'`;

或引入全部 `import Swiper from 'swiper/bundle'`;

3.构造与类选择器绑定的swiper对象

```js
const swiper = new Swiper('.swiper', {
    // configure Swiper to use modules
    modules: [Navigation, Pagination],
    ...
});
```

4.挂载类选择器

5.获取swiper对象

用于获取属性、调用方法和设置监听事件

``` js
const swiper = document.querySelector('.swiper').swiper;

// Now you can use all slider methods like
swiper.slideNext();
```

或者使用new Swiper返回的对象

# 四、在vue中使用swiper

下载npm包、引入组件和样式、使用标签、绑定属性。

## 样式

基本样式：`import 'swiper/css'`

**全部组件样式：`import 'swiper/css/bundle'`**

其他样式：[Swiper API (swiperjs.com)](https://swiperjs.com/swiper-api#styles)（包括less、scss版本）

在此基础上自定义样式：根据组件名作为类选择器，如.swiper-slide

可以在swiper上挂载

## 组件

### 引入

**基本组件：`import { Swiper, SwiperSlide } from 'swiper/vue'`**

**其他组件：`import { Navigation, Pagination, Scrollar, A11y } from 'swiper'`**`

引入的组件将作为swiper的modules属性数组的元素。

更多组件：[Swiper API (swiperjs.com)](https://swiperjs.com/swiper-api#using-js-modules)

组件本质就是以组件名为class的div。所以我们也可以自己定制类似的组件。

``` 
<swiper>渲染为<div class="swiper">
<swiper-slide>渲染为<div class="swiper-slide">
```

### 使用

``` html
<swiper>
    <swiper-slide></swiper-slide>
</swiper>
```

### 属性

Swiper属性：

1.两个下表列出的额外属性

2.链接中的所有属性。（`Swiper` Vue.js component receive all [Swiper parameters](https://swiperjs.com/swiper-api/#parameters) as component props, plus some extra props）

3.swiper构造器options对象的第一层属性都可以作为属性

4.普通html标签的属性

| Prop         | Type     | Default | Description                            |
| ------------ | -------- | ------- | -------------------------------------- |
| `tag`        | `string` | `'div'` | Main Swiper container HTML element tag |
| `wrapperTag` | `string` | `'div'` | Swiper wrapper HTML element tag        |

 SwiperSlide属性

| Prop           | Type      | Default | Description                                                  |
| -------------- | --------- | ------- | ------------------------------------------------------------ |
| `tag`          | `string`  | `'div'` | Swiper Slide HTML element tag                                |
| `zoom`         | `boolean` | `false` | Enables additional wrapper required for zoom mode            |
| `virtualIndex` | `number`  |         | Actual swiper slide index. Required to be set for virtual slides |

### 事件

事件：@swiper事件和链接中的所有事件。（Swiper component supports all [Swiper events](https://swiperjs.com/swiper-api/#events), including additional `swiper` event that returns swiper instance as soon as possible.）

@swiper：调用一个函数，注入该实例，用于进行dom操作。

示例

``` html
<swiper @swiper="..." @slideChange="..." @reachEnd="..." ...></swiper>
```

### 插槽

swiper的插槽

- `container-start` - element will be added to the beginning of swiper-container
- `container-end` (default) - element will be added to the end of swiper-container
- `wrapper-start` - element will be added to the beginning of swiper-wrapper
- `wrapper-end` - element will be added to the end of swiper-wrapper

For example:

```html
<swiper>
  <swiper-slide>Slide 1</swiper-slide>
  <swiper-slide>Slide 2</swiper-slide>
  <template v-slot:container-start><span>Container start</span></template>
  <template v-slot:container-end><span>Container end</span></template>
  <template v-slot:wrapper-start><span>Wrapper start</span></template>
  <template v-slot:wrapper-end><span>Wrapper end</span></template>
</swiper>
```

Will be rendered as:

```html
<div class="swiper">
  <span>Container start</span>
  <div class="swiper-wrapper">
    <span>Wrapper start</span>
    <div class="swiper-slide">Slide 1</div>
    <div class="swiper-slide">Slide 2</div>
    <span>Wrapper wnd</span>
  </div>
  <span>Container end</span>
</div>
```

 SwiperSlide插槽作用域属性：暴露向SwiperSlide子标签的属性。

- `isActive` - true when current slide is active
- `isPrev` - true when current slide is the previous from active
- `isNext` - true when current slide is the next from active
- `isVisible` - true when current slide is visible (`watchSlidesProgress` Swiper parameter must be enabled)
- `isDuplicate` - true when current slide is a duplicate slide (when `loop` mode enabled) 

```html
<swiper>
  <swiper-slide v-slot="{ isActive }">
    <div>Current slide is {{ isActive ? 'active' : 'not active' }}</div>
  </swiper-slide>
</swiper>
```

### 其他

virtual slides[Swiper Vue.js Components (swiperjs.com)](https://swiperjs.com/vue#virtual-slides)

controller[Swiper Vue.js Components (swiperjs.com)](https://swiperjs.com/vue#controller)

thumbs[Swiper Vue.js Components (swiperjs.com)](https://swiperjs.com/vue#thumbs)

effects[Swiper Vue.js Components (swiperjs.com)](https://swiperjs.com/vue#effects)

## 对象

### 获取swiper实例化对象

方法一：标签绑定事件

@swiper：调用一个函数，注入该实例，用于进行dom操作。事件一创建监听就触发该事件绑定的事件处理函数。

方法二：组合式api

方式一是马上获取，推荐方式一，因为保存在一个变量后，该变量也可以在你想要的时机进行操作的实际操作，方式二可能会出现空对象的情况（方法一也可能），方式一不需要引入hook，也是swiper官方有关vue文档中获取实例的方法。方式二可以在你想要的时机获取（反而容易导致错误），但语义性更强。

```js
import { useSwiper, useSwiperSlide } from 'swiper/vue';
const swiper=useSwiper();
const swiperSlide=useSwiperSlide();
// swiperSlide对象用于获取slide数据（与插槽里的属性同名）
```

方法三：构造函数返回的实例

const swiper=new Swiper(seletor,options);

方法四：dom对象的swiper属性

**After** you initialize Swiper it is possible to access to Swiper's instance on its HTMLElement. It is `swiper` property of Swiper's HTML container element:

```js
const swiper = document.querySelector('.swiper').swiper;

// Now you can use all slider methods like
swiper.slideNext();
```

### 属性和方法

获取swiper对象后，可以获取其状态以其对其进行操作。查看[Swiper API (swiperjs.com)](https://swiperjs.com/swiper-api#methods-and-properties)。

## 示例

``` vue
<template>
  <swiper v-bind="mySwiper">
    <swiper-slide><img src="/pic/a (1).png"></swiper-slide>
    <swiper-slide><img src="/pic/a (2).png"></swiper-slide>
    <swiper-slide><img src="/pic/a (3).png"></swiper-slide>
    <swiper-slide><img src="/pic/a (4).png"></swiper-slide>
    <swiper-slide><img src="/pic/a (5).png"></swiper-slide>
    <swiper-slide><img src="/pic/a (6).png"></swiper-slide>
  </swiper>
</template>
<script setup>
// Import Swiper Vue.js components
import { reactive } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination, Autoplay } from "swiper";
const modules = reactive([Navigation, Pagination, Autoplay]);

const mySwiper = reactive({
  modules,
  // 导航
  navigation: true,
  // 分页
  pagination: {
    dynamicBullets: true,
    clickable: true
  },
  // 循环
  loop: true,
  // 居中
  centeredSlides: true,
  // 自动播放
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  }
  // slidesPerView: 3,
  // spaceBetween: 300,

})
</script>

<style>
:root {
  --swiper-theme-color: #fff !important;
}

.swiper {
  width: 1000px;
  height: 600px;
  border: 1px solid;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide text vertically */
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 1000px;
  height: 600px;
  object-fit: cover;
}

.swiper-pagination {
}

.swiper-pagination-bullet {
  font-size: 1px;
  color: white;
}
</style>
```


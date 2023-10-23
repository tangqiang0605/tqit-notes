## 一、基本用法

### 下载并引入

```shell
npm i animate.css --save
```

```js
import 'animate.css';
```

或直接引入

```html
<head>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
  />
</head>
```

### 使用

[Animate.css | A cross-browser library of CSS animations.](https://animate.style/)

```html
在类名使用（需要前缀）推荐。
在上面的网址中即可复制需要的类名。
注意要引用基础类animate__animated
<h1 class="animate__animated animate__bounce">An animated element</h1>
```

```css
在选择器中使用，作为属性animation的参数（无需前缀）不推荐容易出错。
.my-element {
  display: inline-block;
  margin: 0 0.5rem;

  animation: bounce; /* referring directly to the animation's @keyframe declaration */
  animation-duration: 2s; /* don't forget to set a duration! */
}
```


```javascript
“只在JavaScript中使用”的风格，不推荐，灵活性高但太麻烦。
实现动画播放间隔时的操作、动画事件监听。
// You can do a whole bunch of other stuff with animate.css when you combine it with Javascript. A simple example:
const element = document.querySelector('.my-element');
element.classList.add('animate__animated', 'animate__bounceOutLeft');

// You can detect when an animation ends:
const element = document.querySelector('.my-element');
element.classList.add('animate__animated', 'animate__bounceOutLeft');

element.addEventListener('animationend', () => {
  // do something
});

// or change its duration:
const element = document.querySelector('.my-element');
element.style.setProperty('--animate-duration', '0.5s');

// You can also use a simple function to add the animations classes and remove them automatically:

const animateCSS = (element, animation, prefix = 'animate__') =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    const node = document.querySelector(element);

    node.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve('Animation ended');
    }

    node.addEventListener('animationend', handleAnimationEnd, {once: true});
  });
```

### 自定义预设

```css
自定义预设动画类的属性。
--animate-delay:500ms
--animate-duration:1s
--animate-repeat:1
/* This only changes this particular animation duration */
.animate__animated.animate__bounce {
  --animate-duration: 2s;
}

/* This changes all the animations globally */
:root {
  --animate-duration: 800ms;
  --animate-delay: 0.9s;
}
```

```javascript
通过js代码修改css变量
// All animations will take twice the time to accomplish
document.documentElement.style.setProperty('--animate-duration', '2s');

// All animations will take half the time to accomplish
document.documentElement.style.setProperty('--animate-duration', '.5s');
```

### 语义化辅助类

持续时间（对应css变量--animate-delay)

| Class name          | Default delay time |
| ------------------- | ------------------ |
| `animate__delay-2s` | `2s`               |
| `animate__delay-3s` | `3s`               |
| `animate__delay-4s` | `4s`               |
| `animate__delay-5s` | `5s`               |

速度（对应css变量--animate-duration:1s）

| Class name        | Default speed time |
| ----------------- | ------------------ |
| `animate__slow`   | `2s`               |
| `animate__slower` | `3s`               |
| `animate__fast`   | `800ms`            |
| `animate__faster` | `500ms`            |

重复次数（对应css变量--animate-repeat:1）

| Class Name          | Default iteration count |
| ------------------- | ----------------------- |
| `animate__repeat-1` | `1`                     |
| `animate__repeat-2` | `2`                     |
| `animate__repeat-3` | `3`                     |
| `animate__infinite` | `infinite`              |

### 最佳实践

不要对大元素（如根元素）、内联元素（display为inline的元素）使用动画。

更多：[Animate.css的最佳实践](https://animate.style/#best-practices)。

## 二、unocss
好处是，运用css原子化思想，有更灵活的语义化类。

比如animate-repeate-后面可以接上任意数字（示例），而不用通过–animate-repeat变量定义Animate.css未预先提供的类，扩大了原先提供的3x4个语义化类。
### 安装依赖

`npm i -D unocss @unocss/preset-uno unocss-preset-extra`

### 配置文件

```js
// main.ts
import 'uno.css'
```

```js
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Unocss from '@unocss/vite'
import { presetAttributify, presetUno } from 'unocss'
import { presetExtra } from 'unocss-preset-extra'

export default defineConfig({
  plugins: [
    vue(),
    Unocss({
      transformers: [transformerDirectives()],
      presets: [
            presetUno(),
    		presetAttributify(),
    		presetExtra(),
      ],
    }),
  ]
})
```

### 使用

基础类：animated（在Animate.css中是animate__animated）。

动画类：animated-bounce、animated-flash等。

语义化辅助类：

示例：

```html
<!-- 动画名称 ( 动画名称可在 https://animate.style 查阅, 使用时需转为 `kebabCase` 短横线隔开的格式 ) -->
<div class="animated animated-bounce" />
<div class="animated animated-fade-in" />
<div class="animated animated-fade-out" />

<!-- 动画运行次数 -->
<div class="animated animated-bounce animated-infinite" /> <!-- 无限循环 -->
<div class="animated animated-bounce animated-repeat-6" /> <!-- 循环 6 次 -->
<div class="animated animated-bounce animated-repeat-666" /> <!-- 循环 666 次 -->

<!-- 动画延迟 -->
<div class="animated animated-bounce animated-delay-6" /> <!-- 延迟 6 毫秒 -->
<div class="animated animated-bounce animated-delay-6s" /> <!-- 延迟 6 秒 -->
<div class="animated animated-bounce animated-delay-6ms" /> <!-- 延迟 6 毫秒 -->

<!-- 动画周期 -->
<div class="animated animated-bounce animated-fast" /> <!-- 慢 -->
<div class="animated animated-bounce animated-faster" /> <!-- 很慢 -->
<div class="animated animated-bounce animated-slow" /> <!-- 快 -->
<div class="animated animated-bounce animated-slower" /> <!-- 很快 -->
<div class="animated animated-bounce animated-duration-6" /> <!-- 时长为 6 毫秒 -->
<div class="animated animated-bounce animated-duration-6s" /> <!-- 时长为 6 秒 -->
<div class="animated animated-bounce animated-duration-6ms" /> <!-- 时长为 6 毫秒 -->

<!-- 在 Vue 3 中使用 -->
<Transition class="animated animated-faster" enter-active-class="animated-rotate-in"
  leave-active-class="animated-rotate-out" mode="out-in">
  ...
</Transition>
```

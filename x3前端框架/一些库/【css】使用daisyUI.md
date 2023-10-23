## 一、介绍

基于TailwindCSS的一个组件库。

[daisyUI — Tailwind CSS组件](https://daisyui.com/)

[Tailwind CSS 中文文档 - 无需离开您的HTML，即可快速建立现代网站。](https://www.tailwindcss.cn/)

## 二、安装
方式一：安装TailwindCSS和daisyUI

安装TaiwindCSS

`npm install -D tailwindcss@latest postcss@latest autoprefixer@latest`

`npx tailwindcss init -p`

```js
// tailwind.config.js
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
}
// main.js/main.ts
import  ’./tailwind.css'
// tailwind.css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

安装daysiUI

`npm i daisyui`

```js
// tailwind.config.js
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
}
```
方式二：安装unocss以及daisyUI预设

`npm install unocss @unocss/preset-uno unocss-preset-daisy @kidonng/daisyui`

```js
// vite.config.ts
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Unocss from '@unocss/vite'
import { presetUno, transformerDirectives } from 'unocss'
import presetDaisy from 'unocss-preset-daisy'

export default defineConfig({
  plugins: [
    vue(),
    Unocss({
      transformers: [transformerDirectives()],
      presets: [
        presetDaisy(),
        presetUno(),
      ],
    }),
  ]
})

```
```js
// main.ts
// 使用TailwindCSS
import 'uno.css'
// 使用daisyUI
import '@kidonng/daisyui/index.css'
```
## 三、使用

结合二者的官方文档进行使用。

组件类：标签挂载组件类（允许多个），获得基础的组件样式。

```html
<button class="btn">Button</button>
```

装饰类：在组件类的基础上对样式进行修饰。

```html
<button class="btn loading">loading</button>
```

响应类：在该类前加上响应式前缀（lg，md，sm），根据不同的网页大小使用不同的响应类。所以响应类一般和尺寸相关。

```js
<button class="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg">
    根据页面大小响应式地改变按钮尺寸
</button>
```

原子类：除了装饰类和响应类对组件进行修饰外，我们还可以使用TailwindCSS提供的原子类进行修饰。（也支持响应式前缀）

```html
<button class="btn gap-2">gap-2是由Tailwind提供的原子类</button>
```

属性语义化：TailwindCSS的一个功能，可以直接在标签属性书写css属性。（需要自行配置开启这个功能）

原生css：对前面不能涵盖的需求进行补充。

总结：

对于组件类、装饰类、响应类，查看[Button 按钮 — Tailwind CSS组件 (daisyui.com)](https://daisyui.com/components/button/)。

对于原子类，查看[容器 - Tailwind CSS 中文文档](https://www.tailwindcss.cn/docs/container)。

对于原生css，查看[CSS 参考手册 (w3school.com.cn)](https://www.w3school.com.cn/cssref/index.asp)。

文档都提供了方便的搜索功能（Ctrl+K），你可以方便地找到你需要的css类。

如果对daisy文档中示例的svg标签感到迷惑，参考[【html】svg标签_-CSDN博客](https://blog.csdn.net/weixin_46590928/article/details/127927435)。

如果你对原子类感兴趣，参考[【vue3】css原子化 -CSDN博客](https://blog.csdn.net/weixin_46590928/article/details/127913896?spm=1001.2014.3001.5502)。
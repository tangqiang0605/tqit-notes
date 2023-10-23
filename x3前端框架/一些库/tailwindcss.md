对于不同的框架/工具，安装 Tailwind CSS 是完全不同的过程
## 原生起步
[【tailwind前端框架实战】用全新的前端框架tailwind做一个github页面，能加快300%写代码的速度，前端程序员必看_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1rf4y1g7r5/?spm_id_from=333.337.search-card.all.click&vd_source=a192bbc2c82b7725cd9d5149075acda1) 

`git clone https://github.com/tangqiang0605/starter-html-tailwindcss.git`

1. tailwind intell 插件
安装依赖

```
pnpm init
pnpm i -g lite-server
pnpm i -D tailwindcss npm-run-all

npx tailwindcss init 
配置content:['*.html']

配置脚本
"watch:tw": "npx tailwindcss -o tailwind.css --watch",
"watch:html": "npx lite-server",
"watch": "run-p watch:tw watch:html"

书写html、引入tailwind.css

pnpm watch
```
## 安装
```
pnpm create vite app -t vue

Vite创建的项目默认集成了`PostCSS`，而`TailwindCSS`本身就是一个`PostCSS`插件，所以直接使用即可。
pnpm i -D tailwindcss postcss autoprefixer

npx tailwindcss init -p
1.  创建`postcss.config.js`文件，这里的配置主要是添加`tailwindcss`的插件，这样你编写的css才会被`tailwindcss`处理；
2.  创建`tailwind.config.js`文件，主要进行扫描规则、主题、插件等配置。

配置tailwind.config.js
/** @type {import('tailwindcss').Config} */  
module.exports = {  
  content: [  
    './src/**/*.{vue,js,ts,jsx,tsx}'  
  ],  
}

全局引入
`tailwind.css`
@tailwind base;
@tailwind components;
@tailwind utilities;
`main.js`
import './tailwind.css'

使用
<template>  
<div class="w-32 h-32 bg-blue-500">  
</div>  
</template>
```
## 入门
apply 指令
```
<div class="menu">首页</div>
.menu {  
  @apply p-2 text-gray-900 font-semibold;  
}
1.  尽管使用`@apply`语法可以解决样式复用的问题，但并不推荐在早期就进行抽象，**因为自定义class的做法会生成更多的样式代码，造成生成的css文件变得更大**。
2. 使用vue指令（循环）代替。
```
theme 函数
```
div {  
  border-top: 1px solid theme('colors.gray.200');  
}
`TailwindCSS`认为，所有不使用其变量的值都为魔法值。比如上方的代码，完全可以使用`1px solid #e5e7eb`来实现，但是未来如果要对颜色进行统一调整，这行代码将无法达到预期效果（不会改变而变量在这里仍是这个值）。
```
额外的 css
```
<div class="w-[139px] h-[77px] bg-[#165DFF]"></div>
尽管这种方法可以优雅地解决问题，但这种 **魔法值** 的方案并不被推荐，因为事实上，这种做法会让样式体系超出规范的范围。如果项目中充斥着这种代码，会给后期的维护造成困难。
```
响应式
```
@media （min-width:768px）{
	div{
		@apply bg-blue-500
	}
}

使用taiwind
<div class="w-32 h-32 bg-green-500 md:bg-blue-500" />
默认bg-green-500 
响应式md:bg-blue-500

  <div class="h-12 w-12 bg-green-500 md:bg-red-500 md:h-20 lg:bg-green-500"></div>
```
深色模式
如果要支持手动切换深色模式而不是依赖于操作系统首选项，请使用 `class` 策略代替 `media` 策略：

```js
// tailwind.config.js
module.exports = {
  darkMode: 'class',
  // ...
}
```

现在，`dark:{class}` 类将不再根据 `prefers-color-scheme` 起作用，而是当在 HTML 树中出现 `dark` 类时起作用。

```html
<html class="dark">
<body>
</body>
</html>
```

如何将 `dark` 类添加到 `html` 元素中取决于您，但是一种常见的方式是使用 JS 从某个地方（如 `localStorage`）读取首选项并相应的更新 DOM。

自定义字体
您可以使用相同的方式为您正在使用的任何自定义字体添加 `@font-face` 规则。

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  @font-face {
    font-family: Proxima Nova;
    font-weight: 400;
    src: url(/fonts/proxima-nova/400-regular.woff) format("woff");
  }
  @font-face {
    font-family: Proxima Nova;
    font-weight: 500;
    src: url(/fonts/proxima-nova/500-medium.woff) format("woff");
  }
}
```

拓展功能类
将自己的功能类添加到 Tailwind 的最简单的方式是直接添加到您的 CSS 中。

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer utilities {
  .scroll-snap-none {
    scroll-snap-type: none;
  }
  .scroll-snap-x {
    scroll-snap-type: x;
  }
  .scroll-snap-y {
    scroll-snap-type: y;
  }
}
```
此外要支持响应式、深色模式、状态（伪类）需要额外操作，参考官方文档。

## 教程
1. 功能类即原子类。功能类前面可以添加一些前缀，这些前缀称为变体。可以设置伪类的变体，称为状态。
2. 插件使用 layer 注入为我们提供了基础的功能类。
3. 指令和函数
```
指令以@开头

tailwind 引入Tailwind的base, components, `utilities` 和 `screens` 样式。

apply 在css选择器中使用功能类

使用 `@layer` 指令告诉 Tailwind 一组自定义样式应该属于哪个 “bucket”。可用的层有 `base`, `components` 和 `utilities`。

您可以通过在 `@variants` 指令中声明自己的功能类来生成他们的 `responsive`, `hover`, `focus`, `active` 及其它 [变体](https://www.tailwindcss.cn/docs/hover-focus-and-other-states)。

您可以通过在 `@responsive` 指令中声明他们的定义来生成您自己的类的响应式变体。
```
## 原子
### display
```
display:flex
flex

display:block
block

display:grid
grid

display:hidden
hidden

```

### flex 布局
```
flex
items-center
space-x-4横向间隔为4
flex-shrink-0：空间不足时子元素根据这个因子就算收缩比。缺省1。设为0，空间不足也不收缩。
```
### maxwidth
```
max-width:0rem
max-w-0

max-width:24rem;
max-w-sm
24*16=384

max-width:28rem;
max-w-md

max-width:32rem;
max-w-lg
```

### margin

```
margin四边
margin:3.5rem;
m-14
14=3.5*4

m-16
margin:4rem;

margin水平
margin-left、margin-right
mx-auto

space-x-4左右外边距
```

### 圆角边框
```
border-radius:0.125rem;2px;
rounded

border-radius:0.25rem;4px;
rounded-md

border-radius:0.375rem;6px;
rounded-lg

rounded-full

边框环
ring-2
用于
<input class="focus:ring-2 focus:ring-blue-600 ...">

border 0px
border-n就是n个px大小
```

### 背景颜色
```
background:white
bg-white

bg-green-600
50,100-900
```

### 阴影
```
shadow-sm
shadow
shadow-md
shadow-lg
```

### 盒子
宽高
```
h-auto
height:auto

h-screen
height:100vh

h-full
height:100%

h-4倍的rem
h-72就是18rem

h-1/2百分比
```

### 字体
```
大小和线高
text-xs、sm、base、lg、xl
0.75rem、1rem
0.875、1.25
1、1.5
1.125、1.75
1.25、1.75

行高
leading-5
就是line-height:1.25rem
```
字母间距
```
tracking-wide
```
粗细
```
font-thin
font-weight: 100;

font-extralight
font-weight: 200;

font-light
font-weight: 300;

font-normal
font-weight: 400;

font-medium
font-weight: 500;

font-semibold
font-weight: 600;

font-bold
font-weight: 700;

font-extrabold
font-weight: 800;

font-black
font-weight: 900;
```
### 伪类
如果您需要当鼠标悬停在一个指定的父元素上时对其子元素设置样式，给父元素添加 `group` 类，并且为子元素的功能类添加 `group-hover:` 前缀。

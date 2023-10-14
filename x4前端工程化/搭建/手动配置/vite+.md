
vite+ animate@4. ?.?
1 安装
npm i animate. css
2 引入
```
/// main.ts
import 'animate.css'
```
测试
给 App. vue 挂载根节点
```html
<div class="animate__animated animate__bounce"></div>
```

vite+swiper
1. 安装和引入
yarn add swiper@8.4.4
```js
/// main.ts
import 'swiper/css/bundle'
```
2. 测试 App. vue (来自官方示例。使用 swiper 组件并 vbind 绑定响应式对象)
```js
<template>
  <swiper v-bind="mySwiper">
  图片放在根目录/public/pic下面
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

const pagination = reactive({
  clickable: true,
  renderBullet: function (index, className) {
    return '<span class="' + className + '">' + ('') + "</span>";
  },
})

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
  width: 1000 px;
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

vite+unocss
+animate
+daisyui
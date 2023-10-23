【vue3】使用vuex和pinia

# 一、简介

vuex和pinia都是全局状态管理的工具，pinia可以看成是vuex5。

全局状态可以实现组件间状态（数据）的共用，实现父子传参等功能。

vuex和pinia的关键是创建一个store对象（存储全局状态）并导出，在需要用到全局状态的文件中导入store使用即可。

从vuex和pinia获取的store都是响应式的。

最简单的store，就是模块导出一个reactive对象：[状态管理 | Vue.js (vuejs.org)](https://cn.vuejs.org/guide/scaling-up/state-management.html#simple-state-management-with-reactivity-api)。

# 二、使用vuex

安装

```
npm i vuex@next
```

# 三、使用pinia

## 准备

### 安装

`npm i pinia`

### 全局引入

``` js
// mian.ts/main.js

import {createPinia } from 'pinia'

const pinia=createPinia();

app.use(pinia)
```

### 创建store并导出

``` js
// store/index.ts

import { defineStore } from 'pinia'

export const useMainStore=defineStore('main',{state:mainstate,getters:maingetters,actions:mainactions})
```

关于store

store对象的state/getters/actions可以类比vue对象的data/computed/methods。

state的值是一个箭头函数，这样做是为了在服务器渲染时避免交叉请求导致的数据污染。（异步与锁）而箭头函数可以有更好的类型推导。

store名字可以使用枚举

``` js
// ./store-name.ts
export const enum Names{
    TEST='TEST'
}
// ./index.ts
import {Names} from './store-name.ts'
export const useTextStore=defineStore(Names.TEST,store)
```



## 使用

### 导入store并使用

``` js
import {useMainStore } from '../store'

const mainStore=useMainStore();
console.log(mainStore.count);
得到的mainStore.count是响应式的。
```

### 读取全局状态

``` js
读取state里的属性
console.log(mainStore.count);

读取getters里的属性
console.log(mainStore.count10);
对应store文件里的getters：
getters:{
 	count10(state){
		console.log('conut10是有缓存的，数据没有改变时不会重复调用，而是直接从内存里拿')；
		return state.count+10;
	}
    getter可以调用另外一个getter，直接使用函数名即可。
}

解构为了方便使用
const {count,foo}=mainStore丢失响应性

import {storeToRefs} from 'pinia'
const {count,foo}=storeToRefs(mainStore)还有响应性,但只用于读取，修改没用

import {storeToRefs} from 'pinia'
const {count,foo}=storeToRefs(mainStore)
count++;错误
```

### 修改全局状态

``` js
方法一
修改一个数据
mainStore.count++;

方法二：
// 一次性修改多个数据（有性能优化、patch会将所有数据改完再更新视图）
mainStore.$patch({
  count: mainStore.count + 1,
  foo: 'hello',
  arr: [...mainStore.arr, 4]
})
mainStore.$patch(state => {
  state.count++;
  state.foo = 'hello';
  state.arr.push(4);
})

使用action修改: 支持参数。可以用async修饰。可以调用另外一个action
不能使用箭头函数（箭头函数绑定外部this）
actions: {
  changeState(num){
    this.count+=num;
    this.foo = 'hello';
    this.arr.push(4);

    或

    this.$patch({
      count: mainStore.count + 1,
      foo: 'hello',
      arr: [...mainStore.arr, 4]
    })

    this.$patch(state => {
      state.count++;
      state.foo = 'hello';
      state.arr.push(4);
    })

  }
}
// 在需要的地方调用
mainStore.changeState(10);

最佳实践
actions: {
    修改一个
  changeState(num){
    this.count+=num;
  }
    修改多个
  changeStates(num){
      this.$patch(state => {
      state.count+=num;
      state.foo = 'hello';
      state.arr.push(4);
    })
  }
}
```

### store实例的api

$reset重置store状态

$subscribe((args,state)=>{})state变化时触发

$onAction((args)=>{})action被调用时触发

$patch批量修改state后才更新视图

# 四、数据持久化

## 原理

不管是vuex还是pinia，只要刷新页面，状态都会丢失。因此需要对store里面的数据进行持久化处理（改变时储存，获取时从储存中获取）。

[学习Pinia 第七章（pinia插件）_小满zs的博客-CSDN博客](https://xiaoman.blog.csdn.net/article/details/123431769)（建议观看里面的视频）。简单的总结一下，就是pinia实例的use方法接受一个函数：注入PiniaPluginContext类型的值context作为函数的参数，该函数的返回值将作为store的值。

现成的持久化插件（[Pinia Plugin Persist](https://seb-l.github.io/pinia-plugin-persist/)），可以快速帮助我们实现store的数据持久化。刷新网页状态也不会丢失啦。

## 安装

`yarn add pinia-plugin-persist`

## 配置

``` js
// main.ts
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia';
import piniaPersist from 'pinia-plugin-persist'

const app = createApp(App);

const pinia = createPinia();
pinia.use(piniaPersist);

app.use(pinia);
app.mount('#app')
```

``` js
// tsconfig.json
{
  "compilerOptions": {
    "target": "ESNext",
    "useDefineForClassFields": true,
    "module": "ESNext",
    "moduleResolution": "Node",
    "strict": true,
    "jsx": "preserve",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "esModuleInterop": true,
    "lib": ["ESNext", "DOM"],
    "skipLibCheck": true,
    "noEmit": true,
        // 这里新增一行（注意，json文件中没有注释，使用前请将所有注释移除）
    "types":["pinia-plugin-persist"]
  },
  "include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue"],
  "references": [{ "path": "./tsconfig.node.json" }]
}

```

## 使用

基本使用：对store进行配置(与state同级)


```js
export const useUserStore = defineStore('storeUser', {
  state () {
    return {
    }
  },
  persist: {
    enabled: true,
  },
})
```

自定存储的键值、存储位置

``` js
persist: {
  enabled: true,
  strategies: [
    {
      // 存储名称，默认为store名
      key: 'my_user',
      // 缺省存储在sessionStorage，可以更改为localStorage
      storage: localStorage,
      // 缺省存储state的全部，这里可以进行指定
      // paths: ['list','token']
    }
  ]
}
```

官方示例：将firstName和lastName以'storeUser'为键名存在sessionStorage中，将accessToken存储在localStorage中。

``` js
export const useUserStore = defineStore('storeUser', {
  state () {
    return {
      firstName: 'S',
      lastName: 'L',
      accessToken: 'xxxxxxxxxxxxx',
    }
  },
  persist: {
    enabled: true,
    strategies: [
      { storage: sessionStorage, paths: ['firstName', 'lastName'] },
      { storage: localStorage, paths: ['accessToken'] },
    ],
  },
})
```


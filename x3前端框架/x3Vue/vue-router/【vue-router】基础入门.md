## 一、安装
安装 `npm i vue-router`
- vue-router 包导出一个对象，包含多个实用的方法。（附表一）

## 二、核心
- vue-router 的重要概念：

| 对象   | 类型                    | 说明                                                         |
| ------ | ----------------------- | ------------------------------------------------------------ |
| router | 路由对象                | 路由对象。包含属性 routes、history、scrollBehavior。          |
| routes | Array\<RouteRecordRaw\> | routes 是一个存储 route 对象的数组。                            |
| route  | RouteRecordRaw          | route 对象包含一个具体路由的必要信息。必要属性：path。常用属性：name，component，其他属性：alias，redirect，meta，components。 |

### router

- 路由对象

1. 使用步骤：脚手架工具会自动帮我们完成这些任务，我们只需要配置routes即可。

> 1. 安装vue-router模块。
> 2. 导入vue-router模块对象的createRouter方法（可同时导入需要使用的历史模式）。在vscode中直接使用方法，会自动导包，可以跳过手动导入步骤。
> 3. 使用createRouter方法创建router对象。
> 4. 导出。
> 5. 导入router的定义文件。
> 6. 使用vue对象的use方法将router挂载到全局。

2. createRouter方法接受一个对象：该对象有以下参数。

| 属性           | 描述                                                         |      |
| -------------- | ------------------------------------------------------------ | ---- |
| history        | 通常填入一个函数返回值。createWebHashHistory()或createWebHistory或createMemoryHistory。 |      |
| routes         | 一个数组。一般在前面单独const一个routes常量，然后引入。      |      |
| scrollBehavior | 滚动行为。接受一个函数作为值，注入to，from，savePostion参数。return回一个savePostion对象或{top：数字100等}。当回到该页面时定位到那个位置。支持promise。 |      |

3. 代码示例

``` js
import { createRouter , createWebHashHistory } from 'vue-router'

const routes=[
    {
        path:'/',
        component:()=>import('@/view/index.vue')
    },
    {
        path:'/notfound',
        component:()=>import('@/view/notfound.vue')
    }
];

const router=createRouter({
    history: createWebHashHistory(),
    routes
})

export default router;
// module.exports = router;
```

``` js
import { createApp } from 'vue';
import App from './App.vue';

// 假设router定义在router/index.js文件中
import router from './router';
createApp(App).use(router).mount('#app');
```

### route

- 当前路由对象

必要属性：path。常用属性：name，component，其他属性：alias，redirect，meta，components。

| 参数       | 说明                                                         |      |
| ---------- | ------------------------------------------------------------ | ---- |
| path       | 路径，支持动态参数。                                         |      |
| name       | 可以配合parmas传参。                                         |      |
| component  | 对应的vue文件。                                              |      |
| children   | 子路由。包含route的数组。                                    |      |
| redirect   | 根据path重定向到另一个路由。可以用来指定父路由视图里默认的子路由。 |      |
| alias      | 接收一个path字符串或数组，url在alias的都将跳到这个路由。     |      |
| meta       | 路由元对象，自定义属性。在守卫中通过to.meta读取。            |      |
| components | 命名视图。                                                   |      |
| props      | 省去了调用useRouter的步骤直接使用匹配到的params参数。        |      |

routes示例

``` js
const routes = [
  { path: '/users/:id', component: User },
]
```

redirect

``` js
基本类型：redirect：path：string

路由对象：const routes = [{ path: '/home', redirect: { name: 'homepage' } }]

甚至是一个方法，动态返回重定向目标：
const routes = [
  {
    // /search/screens -> /search?q=screens
    path: '/search/:searchText',
    redirect: to => {
      // 方法接收目标路由作为参数
      // return 重定向的字符串路径/路径对象
      return { path: '/search', query: { q: to.params.searchText } }
    },
  },
  {
    path: '/search',
    // ...
  },
]
```

components

``` js
routes: [
    {
        path: '/',
        components: {
            default: Home,
            // LeftSidebar: LeftSidebar 的缩写
            LeftSidebar,
            // 它们与 `<router-view>` 上的 `name` 属性匹配
            RightSidebar,
        },
    },
],
<router-view/>使用default
<router-view name="LeftSidebar"/>使用LeftSidebar
```

alias

```
const routes = [{ path: '/', component: Homepage, alias: '/home' }]
```

### useRouter

- 获取路由对象
- 编程式导航

- useRouter方法是模块vue-router的一个属性。
- 该方法返回一个router原型对象，挂载了多个实用方法。
- 我们用createRouter创建的对象也使用了这个原型，所以也可以直接使用这些方法。
- 示例：

useRouter

``` js
import {useRouter} from 'vue-router'
const router=useRouter();
```

push/replace

``` vue
router.push(url:string)

router.push({
	path:url
})

router.push({
	name:route-name
})
push会保留记录，而replace不会保留记录
router.replace(url)
```

go/back

``` js
// 向前移动一条记录，与 router.forward() 相同
router.go(1)
// 返回一条记录，与 router.back() 相同
router.go(-1)
// 前进 3 条记录
router.go(3)
// 如果没有那么多记录，静默失败
router.go(-100)
router.back()
```

beforeEach/afterEach

``` js
一般放在mainjs中，作为路由守卫。
router.beforeEach((to,from,next)=>{next();})
rotuer.afterEach((to,from)=>{})
```

addRoute/getRoutes

``` js
router.addRoute({
    path:'/user',
    component:()=>import('../component/xxx.vue')
})
router.getRoutes();
```

### useRoute

- 获取当前路由对象

- 用来接受路由传参。
- **注意导航用router，读参用route**。
- push路由传参

``` js
router.push({
    path:url
    query：参数对象
})

读取
import {useRoute} from 'vue-router'
const route=useRoute()

route.query.name
route.query.price
```

- parmas传参：不能用path而要用name来配合parmas。在params中配置path无效。
- parmas传参刷新会无效。query会保存传递过来的值，刷新不变。

``` js
router.push({
    name:route-name
    params:'route-name'
})
```

- 动态路由参数

``` js
const routes = [
  // 动态字段以冒号开始
  { path: '/users/:username/posts/:postId', component: User },
]
import {useRoute} from 'vue-router'
const route=useRoute();
console.log(route.params);// { username: 'eduardo', postId: '123' }
```

## 三、视图

### router-link 组件

- 封装a标签（a href）的导航标签(.stop不会自动刷新)。
- to 属性=path 或 v-bind:to="{name: 'route-name'}"等。
- replace 布尔属性。表示不留历史记录。

### router-view 组件

- 单页面里根据不同的url渲染对应的组件到routerview里。

- 嵌套路由
  - 父组件需要包含router-view。
  - 父路由直接显示的子路由，path写"/"，斜杠可以省去写''。
  - children的path可以不写斜杠。一般是根路由才写斜杠。
- 命名视图

``` js
routes: [
    {
        path: '/',
        components: {
            default: Home,
            // LeftSidebar: LeftSidebar 的缩写
            LeftSidebar,
            // 它们与 `<router-view>` 上的 `name` 属性匹配
            RightSidebar,
        },
    },
],
<router-view/>使用default
<router-view name="LeftSidebar"/>使用LeftSidebar
```

- 路由过渡：在animate官网选取合适的过渡动画类名使用。涉及：插槽，transiton，component。

``` html
<router-view #default="{route,Component}">
    <transition :enter-active-class="`animate_animated ${route.meta.transition}`">
    	<component :is="Component"></component>
    </transition>
</router-view>
```

``` js
npm install animate.css
import 'animate.css'
```
## 四、附表
附表一：导出方法。
| 方法名               | 用处                  | 说明                                                         |
| -------------------- | --------------------- | ------------------------------------------------------------ |
| createRouter         | router 文件定义 rotuer  | 用来构建 router 对象。vue 使用路由就是将这个构建出来的 router 对象通过 use 方法注入全局使用。 |
| createWebHashHistory | 同上                  | 历史模式。默认。                                             |
| createWebHistory     | 同上                  | 历史模式。url 没有井号。                                      |
| createMemoryHistory  | 同上                  | 历史模式。ssr 服务端渲染使用。                                |
| useRouter            | vue 文件使用编程式导航 | 返回一个对象，一般在 sfc（单页面组件，以 vue 为后缀的文件）用 router 接。返回的这个对象有几个实用的方法。push、replace。go、back。addRouter、getRouters。beforeEach。afterEach。 |
| useRoute             | vue 文件读取 route 传参  | 返回一个对象，一般在 sfc 里用 route 接，有几个常用的属性。query、params。 |

# 开始
## 创建环境
1. 创建项目 `pnpm create vite -t vue`
2. 配置 vite. config. js
```
server:{
	open:true
}
```
3. 运行项目 `pnpm dev`

## 安装模块
`pnpm i vue-router`
vue-router 介绍：vue-router 包提供了一些有用的函数来管理路由，让我们不用自己调用 history API。

使用 vue-router 提供的方法创建一个插件。
```
// src/router/index.js
import { createRouter,createWebHistory } from 'vue-router';

const routes=[
	{path:'/hello',component:'../component/Hello.vue'},
	{path:'/',redirect:'/hello'}
];

const router=createRouter({
	histroy:createWebHistory(),
	routes
});

export default router;
```

使用插件。
```
// main.js
import router from './router/index.js';
createApp(App).use(router);
```

测试。
```
// component/Hello.vue
<template>
	<div>hello, from router</div>
</template>

// App.vue
<template>
  <RouterLink to="/hello">click to hello</RouterLink>
  <RouterView></RouterView>
</template>
```

# 传参
params、query、hash、props。 https://mp.weixin.qq.com/s/LazX7doIiVSpSneGdFEq1w

## params
配置
```
{path:'details/:id',name:'details'}
```

传参
```
this.$router.push('/detail/001');
this.$router.push({path:'/details/001'});
this.$router.push({name:'details',params:{id:'001'}})
```
1. 当 path 存在时，params 会被忽略。
2. params 用于补充 path 不存在的场景（比如 name）。

获取
```
this.$route.params
```
1. 通常放在 watch 中而不是生命周期，因为 detail/001 和 detail/002 都是同一组件，params 的改变不会走生命周期。
```
this.$watch(()=>this.$route.params,(new,pre)=>{...})
```

## query
不需配置路由记录

传参
```
this.$router.push('/detail/001?kind=car');
this.$router.push({path:'/details/001',query:{kind:'car'}});
this.$router.push({path:'/details',params:{id:'001'},query:{kind:'car'}});
```

获取
```
this.$route.query
```
1. 同样应该放在监听中。

## hash

传参
```
this.$router.push('/details/001#car');
this.$router.push({path:"/details/001",hash:"#car"});?
this.$router.push({name:'details',params:{id:'001'},hash:"car"});
```

获取
```
this.$route.hash.slice(1)
```

## props
让组件以自己的 props 使用参数而不是 this.$route。可以通过 props 来读取 params。
配置
```
布尔模式，将params设为component的props。
{path:'xxx',props:true,component:User}
有命名视图（components）需逐个指定
{
	...
	components:{default:User,sidebar:Sidebar},
	props:{default:true,sidebar:false}
}

对象模式?作为函数模式的过渡？
{
	component...
	props:{name:'world'}
}
函数模式
{
	component...
	props:(route)=>({name:route.query.name})
}
```

获取
直接从组件的 props 属性获取。

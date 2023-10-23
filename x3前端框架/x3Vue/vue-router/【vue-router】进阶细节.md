## 路由切换
参考： https://juejin.cn/post/6844903476661583880  

different router the same component vue。真实的业务场景中，这种情况很多。

![router-view.png](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2017/5/3/ed2de15673673276b00e205c042048e4~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

我创建和编辑的页面使用的是同一个 component, 默认情况下当这两个页面切换时并不会触发 vue 的 created 或者 mounted 钩子，官方说你可以通过 watch $route 的变化来做处理，但其实说真的还是蛮麻烦的。后来发现其实可以简单的在 router-view 上加上一个唯一的 key，来保证路由切换时都会重新渲染触发钩子了。这样简单的多了。

```ruby
<router-view :key="key"></router-view>

computed: {
    key() {
        return this.$route.name !== undefined? this.$route.name + +new Date(): this.$route + +new Date()
    }
 }
```


## route

### 嵌套路由

**以 `/` 开头的嵌套路径将被视为根路径。这允许你利用组件嵌套，而不必使用嵌套的 URL。**

在处理[命名路由](https://router.vuejs.org/zh/guide/essentials/named-routes.html)时，**你通常会给子路由命名**。请注意，只有子路由具有名称。

### 命名路由

- route的name属性

- 没有硬编码的 URL
- `params` 的自动编码/解码。

要链接到一个命名的路由，可以向 `router-link` 组件的 `to` 属性传递一个对象：

```
<router-link :to="{ name: 'user', params: { username: 'erina' }}">
  User
</router-link>
```

```
router.push({ name: 'user', params: { username: 'erina' } })
```

### 重定向和别名

redirect时，**[导航守卫](https://router.vuejs.org/zh/guide/advanced/navigation-guards.html)并没有应用在跳转路由上，而仅仅应用在其目标上**。在上面的例子中，在 `/home` 路由中添加 `beforeEnter` 守卫不会有任何效果。

在写 `redirect` 的时候，可以省略 `component` 配置，因为它从来没有被直接访问过，所以没有组件要渲染。唯一的例外是[嵌套路由](https://router.vuejs.org/zh/guide/essentials/nested-routes.html)：如果一个路由记录有 `children` 和 `redirect` 属性，它也应该有 `component` 属性。

相对重定向[#](https://router.vuejs.org/zh/guide/essentials/redirect-and-alias.html#相对重定向)也可以重定向到相对位置：

```
const routes = [
  {
    // 将总是把/users/123/posts重定向到/users/123/profile。
    path: '/users/:id/posts',
    redirect: to => {
      // 该函数接收目标路由作为参数
      // 相对位置不以`/`开头
      // 或 { path: 'profile'}
      return 'profile'
    },
  },
]
```

如果你的路由有参数，请确保在任何绝对别名中包含它们

### 将 props 传递给路由组件

```
const User = {
  // 请确保添加一个与路由参数完全相同的 prop 名
  props: ['id'],
  template: '<div>User {{ id }}</div>'
}
const routes = [{ path: '/user/:id', component: User, props: true }]
```

当 `props` 设置为 `true` 时，`route.params` 将被设置为组件的 props。

对于有命名视图的路由，你必须为每个命名视图定义 `props` 配置：

```
const routes = [
  {
    path: '/user/:id',
    components: { default: User, sidebar: Sidebar },
    props: { default: true, sidebar: false }
  }
]
```

### 路由独享的守卫

你可以直接在路由配置上定义 `beforeEnter` 守卫：

```
const routes = [
  {
    path: '/users/:id',
    component: UserDetails,
    beforeEnter: (to, from) => {
      // reject the navigation
      return false
    },
  },
]
```

### 带参数的动态路由匹配

关键词：高级匹配，动态路由

```js
const routes = [
  // 将匹配所有内容并将其放在 `$route.params.pathMatch` 下
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
  // 将匹配以 `/user-` 开头的所有内容，并将其放在 `$route.params.afterUser` 下
  { path: '/user-:afterUser(.*)', component: UserGeneric },
  // /:orderId -> 仅匹配数字
  { path: '/:orderId(\\d+)' },
  // /:productName -> 匹配其他任何内容
  { path: '/:productName' },
  // /:chapters ->  匹配 /one, /one/two, /one/two/three, 等
  { path: '/:chapters+' },
  // /:chapters -> 匹配 /, /one, /one/two, /one/two/three, 等
  { path: '/:chapters*' },
  // 匹配 /users 和 /users/posva
  { path: '/users/:userId?' },
  // 匹配 /users 和 /users/42
  { path: '/users/:userId(\\d+)?' },
]
```

## router

### 不同的历史模式

用 `createWebHistory()` 创建 HTML5 模式，由于我们的应用是一个单页的客户端应用，如果没有适当的服务器配置，用户在浏览器中直接访问 `https://example.com/user/id`，就会得到一个 404 错误。这就尴尬了。

不用担心：要解决这个问题，你需要做的就是在你的服务器上添加一个简单的回退路由。如果 URL 不匹配任何静态资源，它应提供与你的应用程序中的 `index.html` 相同的页面。漂亮依旧!

### 响应路由参数的变化

关键词：动态路由，path，watch，生命周期。

当用户从 `/users/johnny` 导航到 `/users/jolyne` 时，**相同的组件实例将被重复使用**。因为两个路由都渲染同个组件，比起销毁再创建，复用则显得更加高效。**不过，这也意味着组件的生命周期钩子不会被调用**。

要对同一个组件中参数的变化做出响应的话，你可以简单地 watch `$route` 对象上的任意属性，在这个场景中，就是 `$route.params` ：

```
const User = {
  template: '...',
  created() {
    this.$watch(
      () => this.$route.params,
      (toParams, previousParams) => {
        // 对路由变化做出响应...
      }
    )
  },
}
```

或者，使用 `beforeRouteUpdate` [导航守卫](https://router.vuejs.org/zh/guide/advanced/navigation-guards.html)，它也可以取消导航：

```
const User = {
  template: '...',
  async beforeRouteUpdate(to, from) {
    // 对路由变化做出响应...
    this.userData = await fetchUser(to.params.id)
  },
}
```

### 编程式导航

如果提供了 `path`，`params` 会被忽略

`router.push` 和所有其他导航方法都会返回一个 *Promise*

```
router.push({ path: '/home', replace: true })
// 相当于
router.replace({ path: '/home' })
```

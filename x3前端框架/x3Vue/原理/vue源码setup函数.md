[我用 ChatGPT 读 Vue3 源码 - 掘金](https://juejin.cn/post/7203325974120169527?utm_source=ug_by_post)

setup 始末：

packages/runtime-core/src/renderer. ts
mountComponent 挂载组件的方法：
1. 调用 createComponentInstance 创建组件实例
2. 将实例作为参数调用 setupComponent 处理 props 和slots
3. 将实例作为参数调用 setupRenderEffect 处理渲染副作用。

createComponentInstance 函数：
1. packages/runtime-core/src/component. ts 中定义
2. 接收 vnode、parent、suspense 边界。
3. vnode 获取 type、parent 或 vnode 获取 appContext，据此创建 instance 并返回出去。

setupComponent 函数：
1. 接收一个组件实例，和布尔 isSSR。
2. 处理 props 和slots
3. 判断组件是有状态组件还是函数式组件（h 函数）。有状态组件调用 setupStatefulComponent 进行状态初始化，否则 setupComponent 返回 undefined。

setupStatefulComponent 函数：
1. 校验组件名、指令名。
2. 创建代理缓存 accessCache
3. 创建公共实例代理对象 proxy
4. 调用 setup 函数初始化组件状态。

最后调用 handleSetupResult 和 finishComponentSetup 返回渲染函数。
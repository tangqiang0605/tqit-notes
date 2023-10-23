https://juejin.cn/post/6935584878071119885

react 是什么：React 是声明式 UI 库，负责将 State 转换为页面结构（虚拟 DOM 结构）后，再转换成真实 DOM 结构，交给浏览器渲染。

state 改变➡调和阶段（Reconciliation）➡️commit 阶段

调和
1. render 阶段：根据 state 调用 render 生成 dom。除了 state 改变引起的 render 阶段，forceUpdate、父组件的 render 执行也会触发本组件的 render 过程。
1. diff 深度遍历比较并记录更新方式（update、mount、unmount）

commit
1. 应用更新方案。
2. 调用组件钩子。（componentDidUpdate、useLayoutEffect）


## 优化
1. 减少 state 更新后的子组件更新。

父组件更新，子组件都会更新。父 render，子就直接 render。
1. 使用组件
pureComponent 类组件、React. demo 函数组件。PureComponent 是对类组件的 Props 和 State 进行浅比较，React.memo 是对函数组件的 Props 进行浅比较。渲染前先对 props 对象进行属性比较（浅比较）再确定要不要 render 而不是直接 render。

如果传给子组件的派生状态或函数，每次都是新的引用，那么 PureComponent 和 React.memo 优化就会失效。所以需要使用 useMemo 和 useCallback 来生成稳定值，并结合 PureComponent 或 React.memo 避免子组件重新 Render。

2. shouldComponentUpdate

传入大 props。其中不被利用的属性更新会导致组件更新。
-   最好的解决方案是使用发布者订阅者模式，只是代码改动要稍多一些，可参考本文的优化技巧「[发布者订阅者跳过中间组件 Render 过程]( #heading -9 " #heading -9")」。
-   第二个场景也可以在父子组件间增加中间组件，中间组件负责从父组件中选出子组件关心的属性，再传给子组件。相比于 shouldComponentUpdate 方法，会增加组件层级，但不会有第二个弊端。

  

作者：MoonBall  
链接：https://juejin.cn/post/6935584878071119885  
来源：稀土掘金  
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
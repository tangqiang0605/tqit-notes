[Vue3：原来你是这样的“异步更新” - 掘金](https://juejin.cn/post/7255247517389635639)这是 Vue3源码分析的第三篇，与响应式系统中调度执行有关，其中 computed、watch 等核心功能都离不开它，可见其重要程度。

什么是调度执行？

指的是响应式数据发生变化出发副作用函数重新执行时，我们有能力去决定副作用函数的执行时机、次数和方式。

## 原理
1. 给 effectFn 加上 options 参数。
2. trigger 执行时调用 effect. options. scheduler 函数，传入依赖集合中的函数。
3. 在 scheduler 中每次调 flushJob，但 flushJob 中只执行一次，这一次在第一次调用微任务（节流），而微任务在事件执行后的下一个时机执行。

## computed

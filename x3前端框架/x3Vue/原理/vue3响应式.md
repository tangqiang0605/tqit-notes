[面试官：Vue3响应式系统都不会写，还敢说精通？ - 掘金](https://juejin.cn/post/7090328834318270494)
## 原理
某个函数调用到这个参数时，就会收集到这个参数的 bucket 里，当其它地方改变了这个参数，就会再执行一遍这个函数。
最开始的一步，需要通过 effect 调用一下这个函数，进行一些处理，建立依赖关系。

## 版本 1
3. 调用 effect 依赖函数
4. effect 读取text并设置了 dom 的文本
5. get 时添加依赖到桶（set）
6. set 时调用桶的所有依赖。
## 版本 2
1. 调用 effect 传入一个依赖函数
2. effect 保存存入的函数到activeEffect并调用该函数
3. 该函数执行时读取 text 并设置了 dom 的文本
4. 触发了 text 的 get 代理将 activeEffect 的函数收集
5. set 时调用桶的所有依赖。
## 版本 3
bucket 改用 WeakMap
## 版本 4
封装为 reactive、track、trigger 方法。

## 总结
借助 Proxy 将一个对象 obj 变成响应式数据，拦截其 get 和 set 操作。
通过 effect 注册副作用函数，并在首次执行副作用函数时完成 obj 对象的依赖收集（track）。
当数据发生变化的时候，第 2 步注册的副作用函数会重新执行（trigger）。
看起来还不错，不过他还存在很多缺陷和不足，比如：
分支切换会导致不必要的 effect 执行损耗
effect 不支持嵌套注册副作用函数
...

## 优化分支切换
[面试官：你觉得Vue的响应式系统仅仅是一个Proxy？ - 掘金](https://juejin.cn/post/7251974224923050021)
依赖收集后后续可能会出现修改值时副作用函数的执行是没有意义的情况。解决的方法是执行该副作用函数时先从依赖集合删除该函数即可。之后执行时自动绑定。

1. effect 方法中，先调用清除方法，effectFn. deps 数组中存的是包含该依赖的依赖集合。从这些集合中 delete 掉 fn。
2. activeEffect=effectFn，其 deps 属性是包含这个函数的依赖集合的数组。
3. 适当修改 trigger 解决 cleanup 无限执行问题，因为原来的依赖集合，执行一个时，会清除它本身，最后可能又新加进来，那么等下又会执行新加的自己，又重复循环这个过程。解决方法就是保存快照执行快照，不直接在原来的集合上跑。

不理解：
1. activeEffect=effectFn，而 effectFn 是一个具有 deps 属性的函数。
2. 执行函数时，trace 方法，将这个值设置给对应的依赖的属性的依赖集合的一个。那这个数组是空的，并没有保存这个副作用函数。
3. trigger 中

理解了：
1. 对于第二点，它是把 effectFn 加入到依赖集合中了，然后执行这个函数，而这个函数是清除依赖和调用函数，所以是包含了这个函数的。
2. effectFn 它的附加属性 deps 确实是没有值。缺少了 trace 的修改，trace 时需要给函数 effectFn 的 deps 加入这个集合。

## effect 嵌套
effect 调用的是 vue 组件的 render 方法。
1. effect 里执行一个 effect 然后再调用 get，会导致后面的 get 的依赖是内 effect 而不是外 effect，解决的方法是维护一个effectStack栈。
2. 
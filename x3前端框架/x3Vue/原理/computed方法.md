## 基础
computed 计算属性是 vue 中一个用于提升应用效率的工具函数。

当我们在模板中使用包含响应式对象的复杂表达式来表示某个数据时，我们可以将其抽取为一个计算属性。
```
<span>{{ author.books.length > 0 ? 'Yes' : 'No' }}</span>
```
使用计算属性抽取逻辑并生成一个新的 ref 对象：
```js
const publishedBooksMessage = computed(() => { return author.books.length > 0 ? 'Yes' : 'No' })
```
优化后的模板：
```
<span>{{ publishedBooksMessage }}</span>
```

computed 和普通方法的区别是，computed 会缓存没用变化的值，进而减少对响应式对象的访问（一旦访问响应式对象，就会触发其 get 方法）。

所以，使用计算属性可以通过缓存提高执行效率，而且也让模板的含义更加容易理解，方便后期的维护。

## 原理
computed 函数包含一个 dirty 属性，当监控的响应式对象发生改变时（变脏），设 dirty 为 true，computed 就会读取响应式对象的值并重新计算自身的值，然后设 dirty 为 false。当 dirty 为 false 时，则直接从自身读取值，而不会触发响应式对象的 get 方法。

底层的流程是这样的：
1. 当我们创建一个 computed 属性时，我们将一个响应式对象传给了 computed 函数。
2. computed 函数一开始的 dirty 为 true，马上读取响应式对象的值，将得到的结果缓存下来，并设置 dirty 为 false。
3. 第二步中，当 computed 读取响应式对象时，会触发响应式对象的 get 方法，computed 会被该响应式对象收集到依赖中。
4. 响应式对象改变时，会通知所有依赖并更新视图。这时也会通知这个 computed 方法，设 dirty 为 true，computed 就会读取响应式对象并更新自己的值。
5. 如果值没有变（dirty 为 false），则每次模板读取 computed 的值都是从缓存中读取而不需要经过响应式对象。

## 实践 
1. 当模板中的表达式过于复杂时，应该使用 computed 抽象出来。
2. 使用 computed 应该是只读的，不应该产生其他副作用。
3. 如果需要根据响应式对象的变化执行其他操作（比如异步请求），应该使用 watch 而不是 computed。

> 参考：
> 
> [计算属性 | Vue.js (vuejs.org)](https://cn.vuejs.org/guide/essentials/computed.html)
>
>[【Vue面试题】为什么vue的computed可以缓存数据？原理是什么_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1HT411z7ZU/?spm_id_from=333.1007.tianma.4-4-18.click&vd_source=a192bbc2c82b7725cd9d5149075acda1)
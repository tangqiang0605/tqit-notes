微任务。
MutationObserver 是一个 JavaScript 的 API，用于监测 DOM 树的变化。它提供了一种异步的方式来监听 DOM 元素的增加、删除、属性变化等操作，以及文本节点的修改。

常用的属性：

attributes：是否监测元素的属性变化。
attributeOldValue：是否在属性变化时记录旧值。
attributeFilter：指定要监测的属性列表。
childList：是否监测子元素的添加或移除。
subtree：是否监测后代元素的变化。
characterData：是否监测文本节点的内容变化。
characterDataOldValue：是否在文本节点内容变化时记录旧值。

场景：
1. 动态内容加载后处理
2. 表单验证
3. 响应式布局
4. 自定义组件开发、组件移除等

## 使用
1. new 一个 MutationObserver 对象，接收一个函数，函数接收每次变化的内容 mutations 对象，目标元素发生变化将触发该回调函数。
2. 调用实例的 observe 方法接收目标元素和配置

### mutaions
1. type 类型，可表示元素属性、子节点、文本发生变化
2. addedNodes 添加的子节点
3. removeNodes 删除的子节点
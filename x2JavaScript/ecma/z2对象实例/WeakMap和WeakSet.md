## 概念
ES6版本中，引入了两种新的数据结构——WeakMap 和 WeakSet。

在 WeakMap 中，只有对象可以作为键。Map 可以是基础类型。
WeakMap 的键是**弱引用**的。这意味着，如果一个对象只被 WeakMap 引用，那么这个对象可以被垃圾回收（GC）。当这个对象被垃圾回收后，它对应的键值对也会从 WeakMap 中自动移除。
WeakMap 不可遍历，不能使用像 for...of

因此 WeakMap 在处理内存泄漏问题和管理对象私有数据等场景中有着显著的优势。WeakSet 类似。

## 应用
WeakSet 可以用来检查一个对象是否已经存在。
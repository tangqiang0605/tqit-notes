## 原理
当需要将对象转换为基本类型时，会按顺序调用它的 [` [@@toPrimitive]() `]( https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toPrimitive )、`valueOf()` 和 `toString()` 方法，直到得到基本类型的值。

转换原始类型：valueOf，然后 toString。
强制数字类型转换：valueOf，然后 toString。
强制字符串类型转换：toString，然后 valueOf。

> 除了日期对象，大多数对象没有可用的默认 valueOf()方法。可以通过重写对象的 valueOf()方法来自定义对象转换为数字的行为。
## 实例

1. 对象 `{}` 和 `[]` 都没有 `[@@toPrimitive]()` 方法。
2. 都从 [`Object.prototype.valueOf`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/valueOf) 继承 `valueOf()`，返回对象自身。
3. 调用 `toString()` 方法。[`{}.toString()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/toString) 返回 `"[object Object]"`，而 [`[]. toString ()`]( https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/toString ) 返回 `""`。数组的 toString 等同 `arr.join(',')`。

```
+[10]是多少？

[10]是一个数组，数组本质上是一个对象

+加法运算符要求参数是一个数字

第一步需要把数组转换为原始类型
[10]
转为“10”

第二步
+"10"
转为10
```

## 参考
[JavaScript 数据类型和数据结构 - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Data_structures#%E5%BC%BA%E5%88%B6%E5%8E%9F%E5%A7%8B%E5%80%BC%E8%BD%AC%E6%8D%A2)
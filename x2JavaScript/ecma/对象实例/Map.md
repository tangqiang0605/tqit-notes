[在 JavaScript 中，什么时候使用 Map 或胜过 Object - 掘金](https://juejin.cn/post/7141174031411052581?utm_source=ug_by_post)
大多数开发者在需要 hash map 的时候还是会使用对象，只有当他们意识到键值不能只是字符串的时候才会转而使用 Map

obj
1. 键不止字符串和 symbol
2. 对象自动继承了 Object. prototype。
	1. 我们需要一个额外的检查（例如 hasOwnProperty）来确保一个给定的属性确实是用户提供的，而不是从原型继承的。
	2. 存在原型污染攻击
	3. 不过，我们可以通过使用 Object.create(null) 来解决这个问题，它可以生成一个不继承 Object.prototype 的对象。
3. 如果 obj 包含一个开发者提供的具有相同名称的 hasOwnProperty 属性，那就会对 Object.prototype.hasOwnProperty 产生影响。Object.prototype.hasOwnProperty.call(obj, key)或{}.hasOwnProperty.call(key)，不过这也挺麻烦的。这就是为什么还会新出一个静态方法 Object.hasOwn 的原因了。
4. size。键值对数量。
	1. 如果只关心字符串、可枚举的键，那么可以用 Object.keys () 将键转换为数组，并获得其 length
	2. 如果 k 只想要不可枚举的字符串键，那么必须得使用 Object. getOwnPropertyNames 来获得一个键的列表并获得其 length
	3. 如果只对 symbol  键感兴趣，可以使用 getOwnPropertySymbols 来显示 symbol  键。或者可以使用 Reflect. ownKeys 来一次获得字符串键和 symbol  键，不管它是否是可枚举的。
5. 遍历：使用 for...in 循环。但它会读取到继承的可枚举属性。不能对一个对象使用 for ... of，除非我们明确定义 Symbol.iterator 方法，或用 Object.keys、Object.values 和 Object.entry 来迭代。
6. 不能依靠点/括号符号来检查一个属性的存在，因为值本身可能被设置为 undefined。相反，得使用 Object.prototype.hasOwnProperty 或 Object.hasOwn。

map
1. 任意类型可为键
2. 本身是可迭代对象（for of）

## 测试
[[实用工具函数]]

作者：王大冶
链接： https://juejin.cn/post/7141174031411052581
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
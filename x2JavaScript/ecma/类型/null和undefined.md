## 相同点
1. 基本类型。
2. falsy 值。
3. 没有 constructor (本质上是因为没有包装类)。

## 不同点
1. 诞生时间：先有 null，后有 undefined。
3. typeof 中，null 是 Object，undefined 是 undefined。
4. Number 时，null 是 0，undefined 是 NaN。
5. 获取不到 dom 元素、原型链终点（Object 的 prototype 的__proto__），都是 null。
6. 变量未声明或者不存在的对象属性，值为 undefined。

## 其它
1. undefined 是由 null 派生而来。
2. 在宽松判断中二者相等。undefined\=\=null。
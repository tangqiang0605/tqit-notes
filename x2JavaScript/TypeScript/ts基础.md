严格的空值检查（--strictNullChecks）映射类型, 可选链和空值合并运算符,

extends abstract
implements interface

extends 对 interface 是类型继承，对泛型使用是类型约束。

keyof 接受一个对象类型，返回所有 key 值组成的联合类型。any 的 keyof。any 可以代表任何类型。那么任何类型的 key 都可能为 string 、 number 或者 symbol 。所以自然 keyof any 为 string | number | symbol 的联合类型。
```js
function getValueFromKey<T extends object, K extends keyof T>(obj: T, key: K) {   
  return obj[key];  
}
```

type 和 interface
1. interface 自动合成重复声明
2. interface 必须是对象
3. 当 interface 不支持时，使用 type
## 泛型

### 泛型作用域
泛型例 2
```js
Tinterface IPerson<T> {    
	new(...args: unknown[]): T;
}
function getInstance<T>(Clazz: IPerson<T>) {   
	return new Clazz();
}
class Person {}
自动推断：和例1同理，没有接受泛型参数，自动根据函数参数推导。而传入的是一个类，这个类属于IPerson接口吗？ts通过推断需要发现Person符合IPerson接口。
const person = getInstance(Person);
```
泛型例 3
两种不同的泛型时机
```js
例子1中的函数限制
type Callback = <T>(item: T) => void  
例子2中的接口限制
type Callback<T> = (item: T) => void;
```
 **TS 是一种静态类型检测，并不会执行你的代码。**
前者作为参数时，与外层的 T（如果存在的话），二者是没有关系的，是相互独立的，可以视 T 为 G。而后者接受一个参数，如果外层也是泛型，会传入给它。泛型作用域。
```js
第一种
forEach<string>(callback:Callback)
第二种
forEach<string>(callback:Callback<T>)
```



### Conditional Types （条件类型）
``type isString<T> = T extends string ? true : false;
**条件类型 `a extends b ? c : d` 仅仅支持在 type 关键字中使用。**
# TypeScript 手册

## 二、进阶

keyof

in

typeof

as const


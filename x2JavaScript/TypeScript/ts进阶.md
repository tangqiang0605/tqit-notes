
type 和 interface
1. interface 自动合成重复声明
2. interface 必须是对象
3. 当 interface 不支持时，使用 type
## 泛型
**把明确类型的工作推迟到创建对象或调用方法的时候才去明确的特殊的类型，简单点来讲我们可以将泛型理解成为把类型当作参数一样去传递。**
泛型例 1
```js
function identity<T>(arg: T): T {   
  return arg;  
}  

接受一个泛型参数来限制返回值的类型

自动推导：该函数需要接受一个参数作为泛型参数，但是这里没有提供，ts发现这个参数和函数参数是同个类型，而函数参数可以推导出来，所以泛型参数也可以被推导出来。
const userName = identity('name');
```
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

## 分发
```js
type GetSomeType<T extends string | number> = T extends string ? 'a' : 'b';  
let someTypeOne: GetSomeType<string> // someTypeone 类型为 'a'  
let someTypeTwo: GetSomeType<number> // someTypeone 类型为 'b'
let someTypeThree: GetSomeType<string | number>; // what ?
因为‘string|number’类型不是string，所以应该是b但是，因为分发的存在，返回‘a|b’
```
如何理解，这里 extends 不是简单的判断相等，而是进行分发，遇到联合类型，会将其拆开分别判断，最后将结果联合起来。



### Conditional Types （条件类型）
``type isString<T> = T extends string ? true : false;
**条件类型 `a extends b ? c : d` 仅仅支持在 type 关键字中使用。**


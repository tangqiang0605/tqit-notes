extends 类型继承、泛型约束
对 interface 是继承
对泛型使用是约束

keyof 接受一个对象类型，返回所有 key 值组成的联合类型。any 的 keyof。any 可以代表任何类型。那么任何类型的 key 都可能为 string 、 number 或者 symbol 。所以自然 keyof any 为 string | number | symbol 的联合类型。
```js
function getValueFromKey<T extends object, K extends keyof T>(obj: T, key: K) {   
  return obj[key];  
}
```

**is类型谓词**
所谓 is 关键字其实更多用在函数的返回值上，用来表示对于函数返回值的类型保护。

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
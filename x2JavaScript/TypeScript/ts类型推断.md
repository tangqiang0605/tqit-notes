## 类型推断
```
let values = [1, 2, "three", true];  
// 推断为(number | string | boolean)[]
```
类型数组：像"Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday"这样的式子是 typescript 的数组。in 可以判断是否在数组中。
## 联合类型分发
遇到联合类型，会将其拆开分别判断，最后将结果联合起来。
```js
type GetSomeType<T extends string | number> = T extends string ? 'a' : 'b';  
let someTypeOne: GetSomeType<string> // someTypeone 类型为 'a'  
let someTypeTwo: GetSomeType<number> // someTypeone 类型为 'b'
let someTypeThree: GetSomeType<string | number>; // what ?
因为‘string|number’类型不是string，所以应该是b但是，因为分发的存在，返回‘a|b’
```
如何理解，这里 extends 不是简单的判断相等，而是进行分发，遇到联合类型，会将其拆开分别判断，最后将结果联合起来。
## 类型守卫与类型收窄
类型守卫可以用于在运行时检查变量的类型，并在代码块内部将变量的类型范围缩小到更具体的类型。

守卫通常使用**类型断言、类型谓词、typeof 操作符、instanceof 操作符或自定义的 is 谓词函数**来判断变量的具体类型，并根据判断结果收窄变量的类型范围

断言
1. ！ 不为空
2. ？ 可能为空
3. as 类型，类型断言

控制流类型收窄：在判断语句使用 typeof、instanceof 、in 或自定义is谓词函数
```
function isCircle(shape: Shape): shape is Circle {
  return shape.kind === 'circle';
}
```

真值收窄
```
function processValue(value: string | null) {
  if (value) {
    console.log(value.toUpperCase());
  } else {
    console.log('Value is null or empty');
  }
}
```
示例中，当条件表达式 value 的结果是真值（即不为 null 或空字符串）时，TypeScript 编译器会将 value 的类型范围缩小为 string

## 类型体操
提供了强大的工具和技巧，用于处理复杂的类型操作和转换

条件类型（Conditional Types）
条件类型允许我们根据输入类型的条件判断结果来选择不同的类型。 
```
T extends U ? X : Y
```


keyof 操作符和索引访问类型
keyof 操作符用于获取类型的所有属性名，结合索引访问类型可以从一个类型中获取属性的具体类型。
```
interface Person {
  name: string;
  age: number;
}

type PersonKeys = keyof Person;  // "name" | "age"
```

infer 推断。
```
将值推断为变量 R。
infer R
接着R作为变量可以继续使用
```

extends 

泛型函数。映射类型。

类型体操
```
type TYPE<T>=T extends Array <infer U>?U: T;
```
- 使用该类型时，其实是根据传入的 T 决定这个类型具体是哪个类型。
- 如果是一个数组，比如 T 是 string[]，那么它是 extends 自 Array[string]的，此时返回 U，U 是 string。即 TYPE<string[]\>为 string。
- 如果传入的不是数组，返回传入的类型。
- 如果传入元组[string, number]返回 string|number

```
type Last<T extends any[]>=T extends [... any[], infer Last]? Last:[]
```
- 传入一个任意数组（不然报错）
- 前面的参数构成一个 any 数组
- 最后一个参数被占位符 Last 获取
- 返回 Last
- 如果数组为空，返回一个空数组

```
type ReverArr\<T extends any[]\>=T extends [infer First,... infer rest]?[... ReverArr\<rest\>,First]: T;
```
- 使用递归翻转数组
## 其它操作符
typeof 获取实例的类型。

in 常用于判断属性是否存在 keyof 返回的类型数组中。
## 类型兼容
接口和类的兼容。
### 鸭子类型（Duck Typing）
或 "结构化类型"（Structural Typing）。在 TypeScript（或更一般地说，静态类型语言）的上下文中，鸭子类型意味着**一个对象的类型不是由它继承或实现的具体类别决定的，而是由它具有的结构决定的。** 只要一个对象的结构满足了接口的要求，我们就可以把这个对象看作是这个接口的实例，而不管这个对象的实际类型是什么

>“如果它走起路来像一只鸭子，叫起来也像一只鸭子，那么它就是一只鸭子。

### 协变和逆变
[类型兼容：协变和逆变 | 编程时光](https://www.coding-time.cn/ts/advance/%E5%8D%8F%E5%8F%98%E5%92%8C%E9%80%86%E5%8F%98.html#%E5%8D%8F%E5%8F%98-%E7%B1%BB%E5%9E%8B%E7%9A%84%E5%90%91%E4%B8%8B%E5%85%BC%E5%AE%B9%E6%80%A7)
在一些类型系统中，例如 Java，这些概念是显式嵌入到语言中的，例如使用 extends 关键字表示协变（继承），使用 super 关键字表示逆变（多态）。

在其他一些类型系统中，例如 TypeScript，协变和逆变的规则是隐式嵌入的，通过类型兼容性检查来实现。

协变即**子可以被安全地用在期望父的任何地方**）。

逆变是协变的反面。我们不能在期望 Dog 的地方使用 Animal，因为 Animal 可能不包含某些属性或方法。在函数参数类型的兼容性检查中，TypeScript 使用了逆变：
```
type Animal = { name: string };
type Dog = Animal & { breed: string };

let dogHandler = (dog: Dog) => { console.log(dog.breed); }
let animalHandler: (animal: Animal) => void = dogHandler;  // Error! 
```
## .d.ts 与声明文件
TypeScript 的类型定义文件（.d.ts）为已有的 JavaScript 库提供类型信息。

编写声明文件时，我们使用 declare 关键字来声明**全局**变量、函数、类、接口等类型。

当我们在一个项目中使用多个声明文件时，需要注意文件的加载顺序和作用域问题。因为声明文件中的类型声明会影响整个项目，所以我们需要确保所有的声明文件都被正确地加载，并且不会互相冲突。
### 声明模块
使用 declare module 时，我们可以定义一个模块，并在其中声明模块内部的类型。可用于声明和识别特殊后缀的模块，比如 vue 文件。
```
// 声明vue文件模块导出的对象类型
delare module '*.vue'{
  import {defineComponent,App} from 'vue'
  const component:RetrunType <typeof defineComponent> & {install(app:App):void}
  export default component
}
```

## 装饰器
[[修饰器]]
TypeScript 支持以下几种类型的装饰器：
类装饰器
```
function Sealed(constructor: Function) {
    Object.seal(constructor);
    Object.seal(constructor.prototype);
}
```
方法装饰器
```
function Log(target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
    let originalMethod = descriptor.value; // 保存原始函数
    descriptor.value = function (...args: any[]) {
        console.log("Arguments: ", JSON.stringify(args));
        let result = originalMethod.apply(this, args);
	    console.log("Result: ", result);
        return result;
    }
}

```
访问器装饰器
```
function ReadOnly(target: any, key: string, descriptor: PropertyDescriptor) {
    descriptor.writable = false;
    return descriptor;
}
```
属性装饰器
参数装饰器

### 反射元 api
实验性功能

## 模板字面量类型
用于限制模板字符串中插入的变量的类型。
```
type Greeting<T extends string> = `Hello, ${T}!`;

type GreetingWorld = Greeting<'World'>;  // GreetingWorld的类型为"Hello, World!"
```

## 命名空间和模块（不阅读）
 TypeScript 中，命名空间是一种将代码封装在一个特定名称下的方式，以防止全局作用域污染并避免命名冲突。
1. export 关键字允许我们从命名空间外部访问这些元素 (需附带前缀)
2. 允许嵌套
 ```
 namespace MyNamespace {
  export const myVar: number = 10;
  export function myFunction(): void {
    console.log("Hello from MyNamespace");
  }
}

```
3. 在 TypeScript 的早期版本中，命名空间被广泛地使用来组织和包装一组相关的代码。然而，随着 ES6 模块系统（ES6 Modules）的出现和广泛使用，命名空间的用法变得越来越少，现在被视为一种遗留的方式来组织代码。**注，typescript 很早出现，比 esm 早。** 现在使用的更多的是模块。
4. 随着 ES6 模块语法的普及，现代 JavaScript 项目通常更倾向于使用模块来组织代码。然而，对于一些遗留项目或那些需要将多个文件合并为一个全局可用的库的场景，命名空间可能更为合适。
5.  TypeScript 中，我们可以使用模块解析策略（如 Node 或 Classic），以确定如何查找模块。这些策略在 tsconfig. json 文件的 compilerOptions 选项下的 moduleResolution 选项中定义。模块就是 esm 的模块了。

## 参考
[序言 | 编程时光](https://www.coding-time.cn/ts/preamble.html)
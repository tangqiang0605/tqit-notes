[类型兼容：协变和逆变 | 编程时光](https://www.coding-time.cn/ts/advance/%E5%8D%8F%E5%8F%98%E5%92%8C%E9%80%86%E5%8F%98.html#%E5%8D%8F%E5%8F%98-%E7%B1%BB%E5%9E%8B%E7%9A%84%E5%90%91%E4%B8%8B%E5%85%BC%E5%AE%B9%E6%80%A7)

装饰器、泛型、高级类型以及元数据反射等。严格的空值检查（--strictNullChecks）映射类型,可选链和空值合并运算符,

TypeScript 还有良好的工具支持，比如 TSLint 和 Prettier

TypeScript 的类型定义文件（.d.ts）是一个独特的优点，它们为已有的 JavaScript 库提供类型信息。

TypeScript 是 JavaScript 的超集。提供了 JavaScript 的所有基本数据类型，如：number、string、boolean 等。它还增加了额外的类型，比如 any、unknown、never、void 等。

TypeScript 的类型是小写的，和 JavaScript 的 typeof 一样。

## 基础
### 类型
数组Array
1. number\[\]
2. 泛型写法，Array\<number\>
3. 元组类型 Tuple，在方括号中定义具体值或类型

枚举 Enum 
1. 可以给枚举值赋值
2. 如果枚举值为数字，后面递增
3. 枚举值可以是字符串
4. 枚举值可以是表达式
5. 异构枚举：枚举值为数字和字符串混用。
```
enum Color {Red,Green,Blue}
let c:Color=Color.Green
```

Unknown 
1. any 类型对应的安全类型。any 类型允许我们对其进行任何操作，而 unknown 类型则要求我们在操作之前进行类型检查或类型断言，以确保类型的安全性。
2. 只能赋给 any 或 unknown
3. 在对 unknown 类型的值进行**操作**之前，必须进行类型检查或类型断言，确保操作的安全性。

空与未定义
1. 所有类型的子类型。可以把 null 或 undefined 赋给其他类型。
2. 当你指定了--strictNullChecks 标记，null 和 undefined 只能赋值给 void 和它们各自的类型

void
1. 表示函数无返回值
2. 作为变量只能接收 null 或 undefined，一般不会这样做。

Never
1. never 类型是那些总是会抛出异常或者根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型。函数 error 和 infiniteLoop 的返回类型都是 never
2. never 类型用来表示永远不可能存在的值的类型。比如，一个永远抛出错误或者永远处于死循环的函数的返回类型就是 never
3. 在实际开发中，我们可能很少直接使用 never 类型，但是它在 TypeScript 的类型推断和控制流分析中起着非常重要的作用。
```
function error(message: string): never {
    throw new Error(message);
}
```

### 自定义类型
联合类型 Union Types
```
let variable: string | number;

variable = "Hello"; // OK
variable = 1; // OK

```

交叉类型 Intersection Types
```
interface Part1 { 
  a: string;
}

interface Part2 { 
  b: number;
}

type Combined = Part1 & Part2;

let obj: Combined = { 
  a: 'hello',
  b: 42,
};
```

### 接口和类
1. 至少满足 interface 的定义，可以有多余的属性。
2. interface 的属性可以是函数，然后这个 interface 可以用来描述函数。
```
interface SearchFunc {
  (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function(src: string, sub: string): boolean {
  let result = src.search(sub);
  return result > -1;
}

```
3. 描述数组
```
interface StringArray {
  [index: number]: string;
}

let myArray: StringArray;
myArray = ["Bob", "Fred"];

interface Dictionary {
  [index: string]: string;
}

let myDict: Dictionary;
myDict = { "key": "value" };

```

TypeScript 也使用类（Classes）来定义对象的行为。然而，TypeScript 的类具有一些额外的特性，如访问修饰符（Access Modifiers） public、private 和 protected 缺省public、静态属性（Static Properties）、抽象类（Abstract Classes）等。

## 重载
定义不同接口，然后用一个函数配合 if-else去实现它们
```
function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    } else if (typeof x === 'string') {
        return x.split('').reverse().join('');
    }
}

reverse(12345);  // returns 54321
reverse('hello');  // returns 'olleh'
```

## 泛型与泛型约束

泛型还支持约束（Constraints）的概念，使用 extends 关键字来对泛型类型进行约束。这样可以确保传递给泛型的类型满足特定条件。



## 命名空间和模块
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
3. 在 TypeScript 的早期版本中，命名空间被广泛地使用来组织和包装一组相关的代码。然而，随着 ES6 模块系统（ES6 Modules）的出现和广泛使用，命名空间的用法变得越来越少，现在被视为一种遗留的方式来组织代码。注，typescript 很早出现，比 esm 早。现在使用的更多的是模块。
4. 随着 ES6 模块语法的普及，现代 JavaScript 项目通常更倾向于使用模块来组织代码。然而，对于一些遗留项目或那些需要将多个文件合并为一个全局可用的库的场景，命名空间可能更为合适。
5.  TypeScript 中，我们可以使用模块解析策略（如 Node 或 Classic），以确定如何查找模块。这些策略在 tsconfig.json 文件的 compilerOptions 选项下的 moduleResolution 选项中定义。模块就是 esm 的模块了。

## 类型系统层级
### 顶层类型（Top Type）和底层类型（Bottom Type）
顶层类型是所有其他类型的父类型，这意味着在 TypeScript 中的任何类型都可以看作是顶层类型的子类型。TypeScript 中有两个特殊的顶层类型：any 和 unknown

底层类型是所有类型的子类型。这意味着，在类型系统的层次结构中，任何类型都可以被看作是底层类型的超类型。在 TypeScript 中，never 类型是唯一的底层类型。

## 类型数组
像"Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday"这样的式子是 typescript 的数组。in 可以判断是否在数组中。

## 高级类型
### 映射类型
例如将属性变为只读或可选，从现有属性中选择一部分属性等。
[[docs/x2JavaScript/y6typescript/typescript#类型数组]]

Readonly
```
将T对象的所有值变为只读
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};
将对象的所有值变为可选
type Partial<T> = {
  [P in keyof T]?: T[P];
};
选择部分属性
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};
指定键只能在k数组中取，且值只能为T类型
type Record<K extends keyof any, T> = {
  [P in K]: T;
};

```

### 条件类型
```
T extends U ? X : Y
```
infer 推断。
```
将值推断为变量 R。
infer R
接着R作为变量可以继续使用
```

### 模板字面量类型
用于限制模板字符串中插入的变量的类型。
```
type Greeting<T extends string> = `Hello, ${T}!`;

type GreetingWorld = Greeting<'World'>;  // GreetingWorld的类型为"Hello, World!"

```

## 类型推断
```
let values = [1, 2, "three", true];  // 推断为(number | string | boolean)[]
```

## 类型守卫与类型收窄
类型守卫可以用于在运行时检查变量的类型，并在代码块内部将变量的类型范围缩小到更具体的类型。守卫通常使用**类型断言、类型谓词、typeof 操作符、instanceof 操作符或自定义的谓词函数**来判断变量的具体类型，并根据判断结果收窄变量的类型范围

控制流类型收窄：在判断语句使用 typeof、instanceof 、in 或自定义谓词函数
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
条件类型允许我们根据输入类型的条件判断结果来选择不同的类型。 [[docs/x2JavaScript/y6typescript/typescript#条件类型]]

keyof 操作符和索引访问类型
keyof 操作符用于获取类型的所有属性名，结合索引访问类型可以从一个类型中获取属性的具体类型。[[docs/x2JavaScript/y6typescript/typescript#类型数组]]
```
interface Person {
  name: string;
  age: number;
}

type PersonKeys = keyof Person;  // "name" | "age"
```

infer 关键字 [[docs/x2JavaScript/y6typescript/typescript#条件类型]]

extends [[#泛型与泛型约束]]

泛型函数 Util [[#映射类型]]
1. Partial、Required、Pick、Exclude、Omit、Readonly

## 类型兼容
### 鸭子类型（Duck Typing）
或 "结构化类型"（Structural Typing）。
鸭子类型的概念来自一个古老的英语成语：“如果它走起路来像一只鸭子，叫起来也像一只鸭子，那么它就是一只鸭子。在 TypeScript（或更一般地说，静态类型语言）的上下文中，鸭子类型意味着一个对象的类型不是由它继承或实现的具体类别决定的，而是由它具有的结构决定的。

只要一个对象的结构满足了接口的要求，我们就可以把这个对象看作是这个接口的实例，而不管这个对象的实际类型是什么

### 协变和逆变
类型系统中，协变和逆变是对类型比较(类型兼容)一种形式化描述。在一些类型系统中，例如 Java，这些概念是显式嵌入到语言中的，例如使用 extends 关键字表示协变，使用 super 关键字表示逆变。在其他一些类型系统中，例如 TypeScript，协变和逆变的规则是隐式嵌入的，通过类型兼容性检查来实现

例如，如果你有一个 Animal 类型的数组，并且你有一个 Dog 类型的对象（假设 Dog 是 Animal 的子类型），那么你应该能够将 Dog 对象添加到 Animal 数组中。这就是协变。反过来，如果你有一个处理 Animal 类型对象的函数，并且你有一个 Dog 类型的对象，你应该可以使用这个函数来处理 Dog 对象。这就是逆变。

协变就是子可以兼容父，它描述的是类型的“向下兼容性”。如果一个类型 A 可以被看作是另一个类型 B 的子类型（即**子可以被安全地用在期望父的任何地方**），那么我们就说 A 到 B 是协变的。


逆变是协变的反面。如果存在类型 A 和 B，并且 A 是 B 的子类型，那么我们就可以说由 B 组成的某些复合类型是由 A 组成的相应复合类型的子类型。
这在函数参数中最常见。A 到 B 是逆变的。在函数参数类型的兼容性检查中，TypeScript 使用了逆变
```
type Animal = { name: string };
type Dog = Animal & { breed: string };

let dogHandler = (dog: Dog) => { console.log(dog.breed); }
let animalHandler: (animal: Animal) => void = dogHandler;  // Error! 
```
我们不能将类型为(dog: Dog) => void 的 dogHandler 赋值给类型为(animal: Animal) => void 的 animalHandler。因为如果我们传递一个 Animal（并非所有的 Animal 都是 Dog）给 animalHandler，那么在执行 dogHandler 函数的时候，就可能会引用不存在的 breed 属性。因此，函数的参数类型是逆变的。

## .d.ts 拓展类型定义
声明文件是一种以 .d.ts 为扩展名的特殊文件，它不包含具体的实现，主要内容是类型声明，包括变量、函数、类、接口等的类型定义。

编写声明文件时，我们使用 declare 关键字来声明**全局**变量、函数、类、接口等类型。

当我们在一个项目中使用多个声明文件时，需要注意文件的加载顺序和作用域问题。因为声明文件中的类型声明会影响整个项目，所以我们需要确保所有的声明文件都被正确地加载，并且不会互相冲突。

### 声明模块
使用 declare module 时，我们可以定义一个模块，并在其中声明模块内部的类型
```
declare module 'my-module' {
  export const myVariable: string;
  export function myFunction(): void;
}
```
1. 在其他文件中导入使用
```
import {myVariable} from 'my-module'
```

### 声明合并
声明合并是 TypeScript 的一项特性，它允许我们在多个位置声明同名的类型，然后 TypeScript 会将这些声明合并为一个类型

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

## 编译器配置
[解读TSConfig | 编程时光](https://www.coding-time.cn/ts/advance/%E8%A7%A3%E8%AF%BBTSConfig.html#%E6%96%87%E4%BB%B6%E5%BC%95%E7%94%A8%E5%92%8C-composite)
composite 配置选项用于启用 TypeScript 的项目引用功能，允许我们将一个 TypeScript 项目作为另一个项目的依赖。
"composite": true
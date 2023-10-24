## 类型系统层级
### 顶层类型（Top Type）和底层类型（Bottom Type）
顶层类型是所有其他类型的父类型，这意味着在 TypeScript 中的任何类型都可以看作是顶层类型的子类型。TypeScript 中有两个特殊的顶层类型：any 和 unknown。

底层类型是所有类型的子类型。这意味着，在类型系统的层次结构中，任何类型都可以被看作是底层类型的超类型。在 TypeScript 中，never 类型是唯一的底层类型。

顶层：any、unknown
上层：string、number、boolean
中层：null、undefined
底层：never

Unknown 
1. any 类型对应的安全类型。any 类型允许我们对其进行任何操作，而 unknown 类型则要求我们在操作之前进行类型检查或类型断言，以确保类型的安全性。（反之，当要求我们进行检查或断言时，我们可以通过 any 回避）
2. 只能赋给 any 或 unknown
3. 不能调用属性或方法
4. 不能赋给非顶级类型（这点非常常见，所以我们得到一个 unknown，只能赋给 any 或者 unknown，而不能赋给 string 或 number 等基本类型）

空 null 与未定义 undefined
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

## 枚举
1. 可以给枚举值赋值
2. 如果枚举值为数字，后面递增
3. 枚举值可以是字符串
4. 枚举值可以是表达式
5. 异构枚举：枚举值为数字和字符串混用。
```
enum Color {Red,Green,Blue}
let c:Color=Color.Green
```

## 数组 Array
1. number\[\]
2. 泛型写法，Array\<number\>
3. 元组类型 Tuple，在方括号中定义具体值或类型
- arguments 是伪数组。其实是 IArguments
- 数组接口（用于创建伪数组类型，比如 arguments 的类型实现）：
```  
interface ArrNumber {
  ​	[index: number]:number
}
```

## 函数
- 默认参数 age:number=26
- 可选参数 age?:number
- 函数重载。分为函数头声明和操作函数。函数头声明不同的重载，操作函数要兼容前面的所有类型（所以一般用 any 接）。

## 复杂类型
联合类型 Union Types
```
let variable: string | number;

variable = "Hello"; // OK
variable = 1; // OK

```

交叉类型 Intersection Types，和 extends 一样，区别是可以区分设计者的意图 （虽然效果相同，但是我们可以直到它是交叉还是继承来的，区分二者是兄弟还是父子关系）。
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
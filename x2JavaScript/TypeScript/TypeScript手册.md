# TypeScript手册

安装`npm i tsc`

使用`tsc 文件名`转变为js`node 文件名`运行js

使用一个命令`ts-node 文件名`运行（需要安装`npm i @types/node -D``npm i ts-node -g`

## 一、类型

### 1. 基本类型

string，boolen，number

### 2. 顶级类型（toptype）

- any

- unknow
  - 比any更安全
  - 不能调用属性或方法
  - 不能赋给非顶级类型

### 3. 接口对象

- 接口是对对象属性的规范，对象是对接口规范的一个具体实现

- 多个同名接口会合并。或使用语义化的extends。

- ？为空安全，可选属性

- redonly加在前面，只读

- \[proName:string\]:any：接任意多个属性，确定属性、可选属性（已经写了的属性要和该属性的类型兼容，所以一般写any或联合类型）


### 4. 数组类型

- number\[\]

- Array\<number\>

- arguments是伪数组。其实是IArguments

- 数组接口（用于创建伪数组类型，比如arguments的类型实现）：

  interface ArrNumber{

  ​	\[index:number\]:number

  }

### 5.函数

- 默认参数age:number=26
- 可选参数age?:number
- 函数重载。分为函数头声明和操作函数。函数头声明不同的重载，操作函数要兼容前面的所有类型（所以一般用any接）。

### 6. 复杂类型

1. 联合类型：man|woman
2. 交叉类型：和extends差不多。man&woman。语义化。
3. 断言：欺骗编译器不报错。age as number。

## 二、进阶

keyof

in

方括号

infer

typeof

as const

## 三、类型体操

type TYPE\<T\>=T extends Array\<infer U\>?U:T;

- 定义了一个泛型的类型。TYPE\<number\>，TYPE\<string\>。

- 使用该类型时，其实是根据传入的T决定这个类型具体是哪个类型
- 如果是一个数组，比如T是string[]，那么它是extends自Array[string]的，此时返回U，U是string。即TYPE<string[]\>为string。
- 如果传入的不是数组，返回传入的类型。
- 如果传入 元组[string,number]返回string|number

type Last<T extends any[]>=T extends [...any[],infer Last]?Last:[]

- 传入一个任意数组（不然报错）
- 前面的参数构成一个any数组
- 最后一个参数被占位符Last获取
- 返回Last
- 如果数组为空，返回一个空数组

type ReverArr\<T extends any[]\>=T extends [infer First,...infer rest]?[...ReverArr\<rest\>,First]:T;

- 使用递归翻转数组

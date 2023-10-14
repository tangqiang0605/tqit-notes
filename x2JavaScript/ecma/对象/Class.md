（ES6）引入了许多新的语言特性和语法糖，其中包括了面向对象编程的 Class（类）机制。

Class 是一种特殊的函数，通过 Class 关键字定义。是定义了 constructor、属性绑定 this、方法绑定到 prototype 的语法糖。ES6中，类的实例通过 new 关键字进行创建，并自动调用类的构造函数进行初始化。

```
属性
1. 可以作为顶级且不用let声明
2. 在构造函数中用this定义
方法
1. 普通函数写法
2. 类的方法写法（es6，不需要function关键字）
```

## 五个修饰符
static：定义静态方法，只能通过类本身调用，不能通过类的实例调用。
get 和 set：定义属性的读取和设置方法，使用类似访问属性的语法进行调用。
private：定义私有方法，只能在类的内部被访问，外部无法访问。ES6中，可以使用\# 作为前缀来定义私有属性和方法。
protected：定义受保护方法，只能在类的内部和子类中被访问，外部无法访问。

## instanceof 二元符
使用 instanceof 运算符来判断一个对象是否是某个类的实例。
```
console.log(rect instanceof Rectangle);  // 输出：true
console.log(rect instanceof Object);     // 输出：true
```
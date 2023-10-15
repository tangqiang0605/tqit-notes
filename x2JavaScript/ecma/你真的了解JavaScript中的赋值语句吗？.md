## 提出问题
在任何一门编程语言中，赋值语句非常常见。JavaScript 中的赋值语句是这样子的：
```JavaScript
a = 1
```
等号左边的代码称为**左值**，一般是变量，等号右边的代码称为**右值**，一般为表达式。

### 第一个例子
然而，JavaScript 的赋值语句并没有像我们直觉上那么简单，比如下面这个例子：
```JavaScript
{
	let a = b = 1
}
console.log(a)
console.log(b)
```

运行结果是什么？显然，let 声明的变量的作用域只在语句块中，在作用域外打印 a 会导致引用错误。

那如果注释掉 `console.log(a)` 呢？结果是 `1`！这是**由于赋值语句导致的偶然性全局变量问题**。

或许你会得出答案：
```JavaScript
let a = b = 1
```
等同于：
```JavaScript
b = 1
let a = b
```
这样，就能很好地解释为什么打印 a 会报错，而 b 却可以正常打印。

### 第二个例子
那么是不是所有例子都是这样的？

比如：
```JavaScript
foo.a = foo.b = 1
```
是否等效于
```JavaScript
foo.b = 1
foo.a = foo.b
```

从结果上看，好像是的。

### 第三个例子
那么请你观察第三个例子：
```javascript
let foo = { age:20 }
foo.age = foo = { name:'foo' }
console.log(foo.age)
```
如果按照我们上面的变换方法，代码应该等同于：
```JavaScript
let foo = { age: 20 }
foo = { name: 'foo' }
foo.age = foo
console.log(foo.age)
```
1. foo 被赋值为 `{name:'foo'}`。
2. foo 又新增属性 age，值为 foo，形成了循环引用。
3. 这时候打印 foo. age，应该会得到 `{name:'foo'}`。

然而，令人出乎意料的是，打印的结果为 `undefined`！

说明它是从左到右赋值的？
```javascript
let foo = { age: 20 }
foo.age = foo
foo = { name: 'foo' }
console.log(foo.age)
```

### 循环引用表示法
在 console. log 中是如何表示循环引用的？很简单，在旁边增加注解即可。变量 `*1` 代表对象 `{ name: 'foo', ref: null }` 的地址。在对象中使用 `[Circular 变量]` 来指代某一个对象。

于是，对象：
```JavaScript
const foo = {
	name:'foo'
	ref:null
}
foo.ref = foo;
```
被表示为：
```JavaScript
<ref *1> { name: 'foo', ref: [Circular *1] }
```

> 除了 `*1`，其它的循环引用都会尽可能展示，除非它们形成的图不存在同构关系，则被表示为 `[Object]`，没有 `*2`。

## 求证

### 赋值顺序
到底赋值是从左到右还是从右到左呢？

第一、二个例子给出的答案是从右到左，而第三个例子给出的答案是从左到右。

而根据我们的常识和直觉，也应该是从右到左的，因为只有把右值算出来了，左边才能赋值：
```JavaScript
a=b=0;
```
从右往左：b=0，然后 a=b，那么 b 的值可知，a 的值也可知。
从左往右：a=b，b 的值是多少？这个时候我们是不知道的。

借助 proxy 验证：
```JavaScript
const order = {
  a: 'a',
  b: 'b',
  c: 'c',
}

const p = new Proxy(order, {
  set(target, property, newValue) {
    console.log(property)
    target[property] = newValue
  }
})

p.a = p.b = p.c = 'new value'
```
输出结果是：
```
c
b
a
```
说明赋值是从右往左的！

### 两个阶段
那么第三个例子是怎么解释？它也是从右到左的！请仔细观察和下面的代码：

1. 从右到左赋值，但是输出 `{ name: 'foo' }`
```javascript
let foo = { age: 20 }
foo.age = foo = { name: 'foo' }
console.log(foo)
```
2. 从右到左拆分，输出 `<ref *1> { name: 'foo', age: [Circular *1] }`
```JavaScript
let foo = { age: 20 }
foo = { name: 'foo' }
foo.age = foo
console.log(foo)
```
3. 从左到右拆分，输出 `{ name: 'foo' }`
```javascript
let foo = { age: 20 }
foo.age = foo
foo = { name: 'foo' }
console.log(foo.age)
```

经过对比，我们可以得出结论：我们在 JavaScript 中发现了量子态！（误）

事实上，确实存在一种“叠加”的状态，但是这是因为两个阶段叠加在一起了！别急，我们先回忆一下 webpack 的 loader 机制。

### webpack 的 loader 机制
webpack 会分为两个阶段执行 loader ，分别是从左往右的 pitch （预检）和从右往左的 normal （执行）阶段。
> 如果 pitch 有返回值，则执行已经 pitch 过的模块的 normal 阶段！

JavaScript 的赋值过程也是类似的。一开始会从左往右检查并保存地址，然后再从右往左赋值。为了方便称呼，我们借用 webpack 的叫法，称第一个阶段为预检阶段，第二个阶段为执行阶段。

让我们在回到第三个例子，现在它已经难不倒我们了！
```javascript
let foo = { age: 20 }
foo.age = foo = { name: 'foo' }
console.log(foo)
```
执行过程：
1. 读取 foo. age 的地址。
2. 读取 foo 的地址。
3. 预检阶段结束，进入执行阶段。
4. 将 foo 赋值为 `{name:'foo'}`
5. 给 foo. age 赋值，但此时 foo. age 并不是从新的 foo 上读取的，而是使用了旧的 foo 的地址。

我们可以通过以下代码验证：
```JavaScript
let foo = { tag: 'oldfoo', age: 20 }
let goo = foo
foo.age = foo = { name: 'newfoo' }
console.log(goo)
console.log(foo)
```
输出：
```
{ tag: 'oldfoo', age: { name: 'newfoo' } }
{ name: 'newfoo' }
```

不难得出结论，在赋值语句中，左值的地址并不是在赋值阶段读取的，而是在检查阶段读取的。

## 总结
1. 赋值是分为两个阶段的。
2. 赋值语句是从左往右检查的，并且在检查时给左值绑定了地址。
3. 赋值语句是从右往左执行的，并使用了检查时给定的地址。
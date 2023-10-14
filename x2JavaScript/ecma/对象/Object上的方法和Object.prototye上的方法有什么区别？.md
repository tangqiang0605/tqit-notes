## 开发中的疑问
有时候在网页开发的过程中，我们会遇到这两个函数：
``` JavaScript
Object.prototype.toString.call()
Object.keys()
```

有的前端小伙伴可能就会产生这样的疑问：为什么 keys 方法存在 Object 上而不是 Object. prototype 上？有什么讲究吗？

答案是肯定的，本质上，就是 Object 原型方法和 Object 静态方法的区别。

不过在这之前，我们需要复习一下构造函数、对象原型以及对象的创建方法。

## 构造函数与对象原型
如图：
![Pasted image 20231014222107.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dca19c790ba54f98b8317a02fb255e0b~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=728&h=322&s=18974&e=png&b=fdfdfd)
1. 对象的 `__proto__` 属性就是对象的原型对象。
2. 原型对象的 constructor 属性也指向对象的构造函数。
3. 构造函数的 prototype 属性指向对象的原型对象。
## 对象的 constructor
只有 prototype 才有 constructor，普通对象的 constructor 继承自其原型对象的 constructor。
为了方便理解，下面我们不再提及到非原型对象的这个指针。


## 原型链
实际上，对象原型和构造函数也是一个对象，如果把它们放到“实例对象”的位置，它们也拥有自己的对象原型和构造函数，于是，原型链（套娃）便开始了。
![Pasted image 20231014214721.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/abf60b09b50d46dcb558c570aec8c8f5~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1678&h=795&s=54445&e=png&b=fefefe)

思考一下：
1. Function 以及 Function. prototype 的__proto__指向哪里？
2. Object 以及 Object. prototype 的__proto__指向哪里？
3. Foo（用户自定义构造函数）以及 Foo. prototype 的__proto__指向哪里？

指向如图：


![Pasted image 20231014220711.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/256042bdee9b4cf1955cc4b916929e5f~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1687&h=842&s=65996&e=png&b=fdfdfd)
1. 所有构造函数都是由 Function 创建的，所以 proto 指向 Function. prototype。
2. 除了 Object. prototype，其它原型都是 `{}` ，而 `{}` 的 proto 显然指向 Object. prototype。
3. Object. prototype 与其它 prototype 不同，它是 `[Object:null prototype]{}` 而不是 `{}`。它的 proto 指向 null。
4. null 是基本类型，不具备任何属性。


## 创建对象的三种方法
1. 使用大括号创建。这种创建方法隐式继承了 Object。也就是说，效果和 new Object 是一样的。普通的工厂函数创建的对象也属于这一类。
2. 使用构造函数或者类创建。需要使用关键字 new。并会继承该构造函数的 prototye 属性作为实例对象的 proto。
3. 使用 Object. create 静态方法创建。该方法接收一个对象（typeof 为 Object 的值，因此也允许参数为 null），作为创建对象的原型。如果 Object. create 的参数为 null，那么它和 Object. prototype 的辈分是相当的。打印的结果都是 `[Object:null prototype]{}`。

## 原型方法与静态方法
有了前面这些基础知识的铺垫，相信很快就能理解 Object. prototype 和 Object 静态方法的区别，其实非常简单。

几乎所有的对象的原型链上都存在 Object. prototype，因此，放在 Object. prototype 这个对象的方法都能被大多数对象拿到。但是：
1. 如果这个对象是通过 `Object.create(null)` 方式创建的，那么它就和 Object. prototype 对象同级，无法通过继承拿到 Object. prototype 对象的方法。
2. 另外，在继承的过程中，实例对象到达 Object. prototype 的原型链上的方法往往可能被重写。

基于以上两点，我们只能避免直接调用实例对象的方法，而是通过类似 `Object.prototype.xxx.call(obj,...args)` 这样长的代码来保证使用的是 Object 的原型方法。

而 Object 静态方法不管对什么对象，都可以直接使用，而且也更简短。

可以说，对象原型（尤其是比较长的原型链上）的方法背弃了其设计初衷：通过实例对象就可以调用到原型链上的方法。

在新的 EcmaScript 的语法的 Api 中，更多的是以静态方法出现而不是原型方法，比如 Proxy、Reflect 的 Api，一方面就是为了避免上述问题，另一方面是为了避免一些冲突（开发者在原型上定义的方法刚好和新语法的名字一样）。所以，不难理解，以后越来越多的 Api 都会选择以静态方法的形式出现，而不是原型方法。
Proxy 是一种非常有用的特性。JavaScript 中，Proxy 是一个特殊的“包装器”对象，它可以用于修改或扩展某些基本操作的行为，比如属性读取、函数调用等。这种修改或扩展的行为是通过所谓的"traps"实现的，这些"traps"定义了如何拦截和改变基本操作。

ES6中引入了另一个新的全局对象 Reflect，它提供了一组用于执行 JavaScript 基本操作的方法，例如 Reflect.get()，Reflect.set()等。这些方法与 Proxy 的 traps 一一对应。这使得 Proxy 的 traps 可以使用对应的 Reflect 方法来执行被拦截的操作



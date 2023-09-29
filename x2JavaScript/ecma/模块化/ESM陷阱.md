本文的 esm 指 ES6 及以上的 module 规范。

## 使用 ESM
如果想在 nodejs 中使用 ESM，需要进行简单配置：
1. `npm init -y`
2. 在 package.json 中新增字段：`"type":"module"`。

## 两种导出
`export`导出：变量、函数、对象。
```js
1. 导出变量定义（声明+赋值）
export const age=1;
export const age;  错误
export age;  错误

2. 导出函数定义
export function sayHello(){console.log('hello')};
export ()=>{console.log('hello')};  错误
export sayHello;  错误

3. 如果需要导出变量名、函数名、箭头函数，使用对象包裹。
const sayHello=()=>{console.log('hello')};
export {
	age,
	sayHello
}
```
在 export 后面可以加 const，而 export default 后面不行。export const age = 12;

`export default` 导出：变量、函数、对象。
```js
只能导出定义好的变量
export default age;
export default sayHello;
export default { age,sayHello };

export default const age;  错误
export default const age=1;  错误
```


## 三种导出
导入分为全部导入、默认导入（default import）和具名导入。

全部导入必须重命名：
```js
import * as obj from 'my.js' 
```
导入的 obj 中包含所有 export 的属性，并且 export default 在其属性 default 上。

解构导入：对全部导入的对象进行解构使用。
```js
得到export导出的内容：
import { age } from 'my.js'

得到default export导出的内容：
import { default } from 'my.js'
```


默认导入：
```js
import obj from 'my.js'
```
此处的 obj 为默认导出（export default）的内容。

三者可以混用：
```js
写成多行：
import obj from "./my. js"; 
import { age } from "./my. js"; 

写成单行：
import 默认导入, 具名导入 from './my.js';
或者：
import 默认导入, 全部导入 './my.js';
```
一般来说，模块导出要么使用 export，要么使用 export default，尽量不要混用二者，尽管这是被允许的。

## 陷阱：第四种导入
下面的情况中，假设没有 export 导出而只有 export default 导出。
```
export default {
	age:12,
	name:'zs'
}
```

第四种导入，解构导入。使用默认导出+解构导入：
```
import { age,name } from './lib';
```

这是一种错误的语法，ESM 中并没有这种规范，造成这种错误的原因是：
1. 将 import 后面的具名导入误以为是解构语句。**import 只有具名导入，没有解构语句。** 在 import 后面并不是解构赋值，而是命名导出。命名导出会寻找 export 中相同的名字, 而不是将 export default 导出的对象进行解构。

2. 默认导入得到的对象不能在 import 中解构。
```
正确：
import obj from 'my.js'
const { age } = obj;  

错误：
import { age } from 'my.js'
```

3. 这种错误会导致严重的后果：你的代码有时候可以运行，有时候却不行！因为在 babel5 中，接受了这种错误的写法并给你添加了 polyfill，所以你的错误写法看起来是可以运行的。而 babel6 取消了这个特性，你的代码将会得到空的结果（因为没有 myjs 中没有 export 导出任何 age）。

4. 在 vue 的 sfc（单页面组件）中，支持使用该写法，但是请不要依赖它。

5. commonjs 中是可以这样做的。
```
const {BundleAnalyzerPlugin} =require('webpack-bundle-analyzer');
```

## 总结
在 ESM 中，具名导入只会读取 export 的内容，默认导入只会读取 default 的内容，不可将二者混用。导入只有三种方式，没有第四种所谓的解构导入。
```
正确：
import { age } from 'my.js' // 导入export的age
import obj from 'my.js' // 导入export default 的对象

想导入默认导出中的age属性：
import { age } from 'my.js' // 错误
import obj from 'my.js'
const { age } =obj; //正确
```

最佳实践：
1. 一个文件中只使用一种方式导出。
2. 默认导入后需要解构，应该在 import 语句后面。


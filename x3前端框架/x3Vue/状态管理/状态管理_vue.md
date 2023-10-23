## pinia
安装插件后即可使用。
在 store 中使用 defineStore 定义 store 并导出如useUser。
在组件中直接导入并调用：useUser ()。
直接读取 store 的 state、computed。直接修改 state。如果需要异步、复杂业务操作，调用 store 的方法。

### 安装
`npm i pinia`
使用插件
```js
import { createPinia } from 'pinia';
app.use(createPinia());
```

### 创建 store
```js title="./src/store/counter"
import { defineStore } from 'pinia';

export const useCounter = defineStore('counter',store对象)
1. 'counter'为命名空间。
2. 可以在任意组件、其他store导入并使用。
```

store 对象构成：state+getter、action。
1. state 属性：返回初始状态对象的函数。
2. getter （计算属性）的两种写法：
	```js
	// 推荐：使用state，自动将返回类型推断为数字
	doubleCount(state) {
	  return state.counter * 2
	},
	
	// 返回类型必须明确设置
	doublePlusOne(): number {
	  return this.counter * 2 + 1
	},
	```
	getter 不可传参。间接传参
	```js
	getUserById: (state) => {
	  return (userId) => state.users.find((user) => user.id === userId)
	},
	```
	闭包优化。在执行此操作时，**getter 不再缓存**，它们只是您调用的函数。但是，您可以在 getter 本身内部缓存一些结果，这并不常见，但应该证明性能更高：
	```js
	export const useStore = defineStore('main', {
	  getters: {
	    getActiveUserById(state) {
	      const activeUsers = state.users.filter((user) => user.active)
	      return (userId) => activeUsers.find((user) => user.id === userId)
	    },
	  },
	})
	```
3. action 非常适合定义业务逻辑操作


### 使用 store
```js
// 根据需要导入store下需要的模块，如user、counter等。
import { useCounter } from '@/stores/counter'// @指 src 文件夹

const store =useCounter();
// store 由 reactive 包裹，使用时不需要点 value。
console.log(store.name);
// 在模板中直接使用store。
如{{store.name}}
```

1. store 具有响应式。对 store 进行解构会丢失响应式。
```js
// 错误。失去响应式。
const { name } = store;

// 保持响应性。仅使用 store 中的状态但不调用任何操作时。
import { storeToRefs } from 'pinia'
const { name } = storeToRefs(store);

// 推荐写法。直接使用，只读不写。
store.name
```
2. 使用 store
```js
cosnt store = useStore();

修改
store.counter++;

调用action
store.getUserInfo(userId);
```

其他
```
高性能批量修改(对象模式，针对普通变量)
store.$patch({
	counter:store.counter+1
})

函数模式，针对数组、对象
store.$patch((state)=>{
	state.item.push(newItem);
})

重置
store.$reset();

替换state
store.$state = { counter:1 }
```

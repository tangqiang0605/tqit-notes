## 概念
xstate 是一个有限状态机和状态图的 JavaScript 库。

状态 states、initialState、finalState：起始点，过程点、终点。

转换与事件 transitions、events

复合状态 compound states：一个 state 里不止有 on 转换，还有 initial 和 states 子状态。

原子状态：atomic

并行状态、区域：parall states

自转换：一个状态通过转换，移动到本身状态。
[self-transition.c8ffac05.svg](https://lecepin.github.io/xstate-docs-cn/assets/img/self-transition.c8ffac05.svg)

延迟转换

动作：副作用，比如进入 idle 时提示用户处于 idle 状态（即将自动登出）。


包：
1. xstate
2. @xsate/vue
3. 其它

使用：
1. 安装依赖
2. 使用 createMachine 函数创建一个 machine。
3. 使用 interpret 函数创建一个服务。
```
createMachine({}[,options]):machine
machine.transition(state|string,{type:xxx}):state
// => State {
//   value: { method: 'check' }|'yellow',
//   history: State { ... }
// }
state.mathes(string),state.value是否为string的子集

interpret(machine):interpret
interpret.onTransition((state)=>void):interpret
interpret.start():interpret
interpret.send({type:xxx})
```
转换（transitions），配置在 on 对象中。

参数
```
{
	id
	initial
	// context
	states
	// type:"parallel"并行状态
}
```
states
```
{
	idle: {
	  // type:'final'走到该state时，会触发
	  // type:'history' 历史状态
	  // invoke:{id,src,onDone,onError}
      on: {
        FETCH: { target: 'loading' }
      },
      initial
      states:{
	      walk:{
		      on:{eventName:{target:stateName}}    
		  }
      }
    },
}
```


## 参考
[XState 文档](https://lecepin.github.io/xstate-docs-cn/zh/)
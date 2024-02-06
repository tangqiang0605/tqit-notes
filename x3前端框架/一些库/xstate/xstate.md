## 状态节点 state
1. 标识
	1. 相对：`.xxx`，缺省内部转换。
	2. 默认：`#id.xxx`、`id.xxx`
2. id：一、建议根节点使用 id。二、要保证id 唯一。
3. 
## 历史 history
1. 定义历史节点，跳转到该节点时，指向的是上一个节点。
```
hist:{
	type:'history',
	history:'deep'// 缺省为shallow
	target:'third'// 如果没有上一个节点，跳转到这个节点。缺省为节点缺省值。
}
```
## 解释 interpret
坚持状态机的状态。状态图的解释的、运行的实例称为服务。
### 发送事件
```
send({type:'click',x:12,y:40})
```
## 演员 actor
在 assign(...) 动作中，使用 spawn(...) 创建一个新的演员引用。
```
// 往context.todos中添加一个对象，属性ref为actor
actions: assign({
	todos: (context, event) => [
	  ...context.todos,
	  {
		todo: event.todo,// {type:xxx,todo:xxx}
		// 添加一个具有唯一名称的新 todoMachine actor
		ref: spawn(todoMachine, `todo-${event.id}`)
	  }
	]
})
```
注意：
1. 不能在赋值函数之外调用 spawn。（例子中，spawn 是在 todos 的赋值函数中调用）。以保证每次指向不同引用。·

## 延迟 delay
1. after（与 on 同级）
```
green:{
	after:{
		1000:transitions
	}
}
```
2. 事件延迟 Event. delay.
```
send({type:'TOGGLE'},{delay:1000})
```
## 文档
1. 只能通过图标打开文档首页
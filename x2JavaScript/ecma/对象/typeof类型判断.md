
物理上，null 和 object 底层逻辑编码都是 000 开头，所以都是 object。

逻辑上，为了新建或清空对象，经常使用 null 来占位。
```
function debounce(fn,period){
	let timer=null;
	return ()=>{
		if(!timer){
			clearTimer(timer);
		}
		timer=setTimeout(fn,period);
	}
}

let updatesomething=debounce(()=>{
	console.log(true)
},100)

```

## instanceof
检测对象的原型链上靠近对象的构造函数 prototype
```
carobj instanceof Car
```
有作用域限制。在 iframe 上无能为力。

## Object. prototype. constructor
除了 null 和 undefined 没有构造函数，其他都可以判断出类型。
不能跨iframe

## Object. prototype. toString. call (obj)
在 es6 以下，null 和 undefined 均为 object

## 综合
使用 typeof，如果是对象，使用最后一个方法。
```
function getType(target){
	let type=typeof target;
	if(type=='object'){
		type=(Object.prototype.toString.call(target).slice(8,-1)).toLocaleLowerCase();
	}
	return type;
}
```

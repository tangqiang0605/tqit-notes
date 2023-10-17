extends abstract
implements interface

extends 对 interface 是类型继承，对泛型使用是类型约束。

keyof 接受一个对象类型，返回所有 key 值组成的联合类型。any 的 keyof。any 可以代表任何类型。那么任何类型的 key 都可能为 string 、 number 或者 symbol 。所以自然 keyof any 为 string | number | symbol 的联合类型。
```js
function getValueFromKey<T extends object, K extends keyof T>(obj: T, key: K) {   
  return obj[key];  
}
```
## 泛型
1. 指代某种类型
2. 使用 extends 加以限制

## 断言
！ 不为空
？ 可能为空
as 类型，类型断言

## 模块声明
用于声明和识别特殊后缀的模块，比如 vue 文件。
```
// 声明vue文件模块导出的对象类型
delare module '*.vue'{
  import {defineComponent,App} from 'vue'
  const component:RetrunType <typeof defineComponent> & {install(app:App):void}
  export default component
}
```

## ts-node 报错
在 `tsconfig.json` 中添加
```
{
	"ts-node":{
		"esm":true
	}
}
```
![[Pasted image 20230809220627.png]]
[使用 ts-node 命令运行 ts 文件时报错 (Warning: To load an ES module, set “type“: “module“ in the package. json...)\_typeerror [err\_unknown\_file\_extension]: unknown fi\_清晨-阳光 zx 的博客-CSDN 博客]( https://blog.csdn.net/pro_fan/article/details/124987158 )
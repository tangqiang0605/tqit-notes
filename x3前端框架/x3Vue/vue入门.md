
Vue 基于标准 HTML 拓展了一套模板语法

1. 模板语法
使用指令实现常用 dom 操作的

前端项目本质上是使用 JavaScript 

## 构建
使用脚手架
create-vue：npm init vue@latest
其他方式
cdn：unpkg、jsdelivr、cdnjs


脚本
build
其他自行查看 packagejson

对 dom 操作
改变样式
1. 绑定
改变 attribute
2. v-bind
改变 innerContent
1. mustache

模板语法
绑定变量：响应式对象、普通变量、函数

响应式对象改变时：绑定的 attrs、innerContent。

模板中使用响应式对象
reactive：直接使用
ref：
在 js 中：
都要使用 value。
作为 reactive 的属性则不用：reactiveobj. refobj
在模板中：
当 ref 在模板中作为**顶层属性**被访问时，它们会被自动“解包”。变量作为绑定时有两种状态：一种是表达式、一种是文本插值
1. 顶层自动解包：refobj
2. 非顶层：normalobj. refobj

```
import {createApp} from 'vue';

creatApp的参数为一个对象或者导入的vue文件。
const app=createApp({
	data(){
		return {
			count:0
		}
	}
})

app.mount('#app');
```

事件
```
<button @click="count++">Count is: {{ count }}</button>
<button @click="increment">Count is: {{ count }}</button>

<script setup>
import { ref } from 'vue'
const count = ref(0);
function increment() {
  count.value++;
}
```


标签：指令+属性+修饰+值

```
v-bind
  绑定多个属性
  <div v-bind="objectOfAttrs"></div>
  动态属性
  <a :[attributeName]="'www.baidu.com'"> ... </a>
  <button @[eventName]="changeColor">changeColor</button>
```
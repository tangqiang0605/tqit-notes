.textContent 
.innerHTML
document.querySelector (*)



```
document.addEventListener("DOMContentLoaded", function() {
  function createParagraph() {
    let para = document.createElement('p');
    para.textContent = '你点击了这个按钮！';
    document.body.appendChild(para);
  }

  const buttons = document.querySelectorAll('button');

  for(let i = 0; i < buttons.length ; i++) {
    buttons[i].addEventListener('click', createParagraph);
  }
});
```

## Dom Api
domapi 非常简单。
```
const element=document.getElementById('myElement');
element.setAttribute('data-custom','value');
element.style.color='red';
element.innerHTMl='<p>hello</p>';
const children=element.childNodes;
```

获取 dom，然后操作其内容（attrs、style、inner），或者像树一样遍历其他节点。

节点与 dom 的区别？前者是一个 node 对象，后者是一个 document object model，不是对象。

### 选择
```
document.querySelector('.myClass');// 推荐
document.querySelectorAll('.myClass');
```

### 样式
```
element.setAttribute('className','xxx');

推荐
element.classList.add('xxx');
element.classList.remove('xxx');
element.classList.toggle('xxx-active');
```

### 内部
innerText、innerHTML。对子元素操作可以看作是对 innerHTML 的字符串编辑操作。
```
el.innerHTML='<div>hello</div>';

推荐
const newEl=document.createElement('div');
newEl.textContent='hello';
el.appendChild(newEl);
```

## 技巧
### 事件监听
事件委托：将事件监听器添加到父元素（currentTarget）上而不是它本身（target）。点击某个组件时，可能没有事件，但会冒泡会触发祖先节点上的所有事件。直接交付 document，可以减少冒泡中触发的事件。可以提高性能。冒泡来源，target，类似 proxy 中的 target 来源。事件监听器委托者 currentTarget。
```
document.addEventListener('click',(event)=>{
	if(event.target.matches('.myClass')){
		console.log('Element clicked:',event.target)
	}
})
```

### 批量更新
使用文档片段（fragement）或 rAF 批量更新。
```
const el=document.querySelectorAll('.myClass');
const fragment=docuemnt.createDocumentFragment();
el.forEach(v=>{
	const newEl=document.createElement('span');
	newEl.textContent='Updated';
	fragment.appendChild(newEl);
})

批量添加dom元素，可以先加在fragement中，再作为一个整体一次性加入某个dom中。
document.body.appendChild(fragment);
```

### shadow dom
创建自定义组件。
HTMLElement 的 attahShadow 方法可以创建一个 shadow dom。并被 customElement 的 define 方法使用。
```
class MyComponent extends HTMLElement {
	construct(){
		super();
		const shadowRoot=this.attachShadow({mode:'open'});
		shadowRoot.innerHTML='<p>hello</p>';
	}
}

customElement.define('my-component',MyComponent);
```

### template 标签
h 5 一个强大的功能。
```
<template id="#myt"><p>hello</p></template>
```

```
const template=docuemnt.getElementById('myt');
const el=template.content.cloneNode(true);
document.body.appendChild(el);
```


原生绑定事件的三种方式
![[Pasted image 20230419130252.png]]
第一种兼容性最好

react 的 jsx 语法中使用 onClick 而不是 onclick，是为了做兼容修改。


## dom 
document. getElementById ()

dom. onclick、onkeyup、onblur、onfocus、oncopy、onpaste

dom. blur ()：控制聚焦

dom. value：dom 获取预定义属性 value 值

dom. getAttribute ()：dom 获取自定义属性如 data-xxx



document.getElementById('next')

dom元素.onclick=function(){}

dom元素.setAttribute('src','xxx.jpg')

dom元素.style.display='none'

dom元素.innerHTML='文本内容'

```
push加到末尾

unshift加到前面

pop删除末尾

shift删除前面

forEach((e,i,arr)=>{})当前元素索引数组本身

map

filter

解构操作

空白占位

let [a,,b]=[1,2,3];//a=1,b=3;



正则表达式、正则验证

reg正则表达式.test(字符串)



setTimeout(()=>{},time)

setInterval(fn,time)返回intervalId

clearInterval(intervalId)暂停循环



promise



const ele=document.querySelector("");

ele.value="";



模块

module

import styles from "./styls.css" assert {type:'css'};
```



## dom

[Web API 接口参考 | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/API)

![image-20230206230626656](D:\tplmydata\tplmydoc\文档图片\image-20230206230626656.png)

``` js
let sidebar=document.getElementsByClassName("sidebar")[0];
let sidebar_content=document.getElementsByClassName("content-wrapper")[0];
window.onscroll=()=>{
    //当前滚动高度，视口高度，
    console.log(window.scrollY,window.innerHeight,window.pageYOffset);
    //内容高度/元素高度、距离顶部 
    let sidebar-rect=sidebar_content.getBoundingClientRect();
    console.log(sidebar-rect.height,sidebar-rect.top);
    let sidebarTop=sidebar-rect.top+window.pageYOffset;
    属性设置
    sidebar_content.style.transform=`translateY(-${contentHeight}px`;
    sidebar_content.style.position="fixed";
    、属性移除
    sidebar_content.style.position="";
}
```

添加元素

``` js
for(let i=0;i<100;i++){
    const element=document.createElement("div");
    element.innerHTML=i;
    document.body.appendChild(element);
}
一次append渲染一次，该循环导致渲染一百次，也就是页面有100次回流。
```

添加元素（优化）

``` js
const fragment=document.createDocumentFragment();
for(let i=0;i<100;i++){
    const element=document.createElement("div");
    element.innerHTML=i;
    fragment.appendChild(element);
}
document.body.appendChild(fragment);
一次append渲染一次，利用fragment，让页面只渲染一次。
```

拖拽

``` js
let oDiv=document.querySelector('div');
oDiv.addEventListener('mousedown',(e)=>{
    let x=e.offsetX;
    lef y=e.offsetY;
    document.addEventListener('mousemove',(e)=>{
        lef div_left=e.clientX-x;
        let div_top
    })
})

e.clientX鼠标点击的视图位置
e.clientY相对根元素的位置
e.offsetX相对父元素的位置
moveup鼠标松开事件
oDiv.offsetHeight高度
oDiv.offsetWidth元素宽度
window.innerHeight
window.innerWidth视图宽度

```

输入框

``` js
const input=document.querySelector('.ipt');
const items=document.querySelectorAll('.div');
焦点事件focus、blur失去焦点、
input输入事件e.target.value输入的值
移动光标
input.setSelectionRange(input.value.length-1,input.value.length);
```

添加类

``` js
const odiv=document.querySelector('div');
odiv.classList.add(添加的css类名);
odiv.classList.remove(删除的类名);
odiv.classList.toggle(有则删除无则添加)
```

元素内容

``` js
const odiv=document.querySelector('div');
odiv.textContent="";
```

响应式

![image-20230207183942711](D:\tplmydata\tplmydoc\文档图片\image-20230207183942711.png)

自适应

![image-20230207184119693](D:\tplmydata\tplmydoc\文档图片\image-20230207184119693.png)

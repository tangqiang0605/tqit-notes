AJAX 是异步的 JavaScript 和 XML（**A**synchronous **J**avaScript **A**nd **X**ML）。简单点说，就是使用 [`XMLHttpRequest`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest) 对象与服务器通信。

## 基础
ajax：不刷新页面更新网页的一顿操作。由 xhrApi+domApi 构成。它的出现使得 web 开发从原生时代进入了 AJAX 时代。
```
function loadDoc() {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     document.getElementById("demo").innerHTML = this.responseText;
    }
  };
  xhr.open("GET", "ajax_info.txt", true);
  xhr.send();
}
```

ajax 使用 xml、纯文本或 json 来传输数据。

ajax 流程：
1. 页面触发事件
2. 创建 xhr
3. 发送请求
4. 根据请求执行数据更新或 dom 操作。

### XMLHttpRequest
简称 xhr。所有现代浏览器都支持 XMLHttpRequest 对象。

创建 xhr
```
function createXhr(){
	if (window.XMLHttpRequest) {
	    return new XMLHttpRequest();
	} else {
	    // code for IE6, IE5
	    return new ActiveXObject("Microsoft.XMLHTTP");
	}
}
```

常用方法
| 方法                 | 描述     |
| -------------------- | -------- |
| setRequestHeader     | 设置头部 |
| getAllResponseHeader | 获取头部 |
| open                 | 配置请求 |
| send                 | 发送请求 |
| abort                | 取消请求         |
常用属性
| 属性               | 描述     |
| ------------------ | -------- |
| readyState         | xhr 状态 |
| status             | 响应状态 |
| statusText         | 状态文本 |
| responseText       | 响应数据 |
| responseXML        | 响应数据 |
| onreadystatechange | xhr 状态改变事件         |

## 封装
普通的 xhr 请求
``` js
获取xhr对象，用于发送网络请求
const xhr=new XMLHttpRequest();

发送GET请求
xhr.open('GET','https://api.apiopen.top/getJok');
xhr.send();

对响应进行处理
xhr.onreadystatechange=function(){
    if(xhr.readyState===4){
        if(xhr.status>=200&&xhr.status<300){
            响应成功时执行
            xhr.response是响应的内容
            console.log(xhr.response);
        }else{
            响应失败时执行
            xhr.status是响应的状态码
            console.log(xhr.status);
        }
    }
}
```

封装为函数
```js
function get(url,cb,err){
	const xhr=new XMLHttpRequest();
	xhr.open('GET',url);
	xhr.send();
	xhr.onreadystatechange=function(){
	    if(xhr.readyState===4){
	        if(xhr.status>=200&&xhr.status<300){
	            cb(xhr.response);
	        }else{
	            err(xhr.status);
	        }
	    }
	}
}
```

promise 化
``` js
function get(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.send();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr.response);
        } else {
          reject(xhr.status)
        }
      }
    }
  })
}

get(url).then(value=>{
},reason=>{
})
```


## 技巧
使用?t=" + Math.random()得到非缓存的结果。

status 码 [HTML 状态消息 (w3school.com.cn)](https://www.w3school.com.cn/tags/html_ref_httpmessages.asp)

原生 onkeyup 事件监听 input 输入
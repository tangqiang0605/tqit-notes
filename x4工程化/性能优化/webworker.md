[HTML Standard (whatwg.org)](https://html.spec.whatwg.org/multipage/workers.html#importing-scripts-and-libraries)
js 单线程。webworker api 提供多线程的浏览器环境。
Worker 线程主要拿来**处理大量数据、进行密集计算、执行文件处理，以及实现其他不适合在主线程里做的任务，**以缓解页面响应迟钝或假死的情况。

业务场景：文件处理、离屏 canvas
获取文件 md5 值
```js
importScripts("https://cdn.jsdelivr.net/gh/emn178/js-md5/build/md5.min.js");
onmessage = ({ data: file }) => {  
  try {  
    // 利用FileReader，读取文件并转换为ArrayBuffer  
    const fileReader = new FileReader();  
    fileReader.readAsArrayBuffer(file);  
  
    fileReader.onload = (ev) => {  
      const arrayBuffer = ev.target.result;  
      // 利用js-md5插件获取MD5值  
      const md5Value = md5(arrayBuffer);  
      // 向主线程传递消息  
      postMessage(md5Value);  
    };  
    fileReader.onerror = (err) => {  
      throw new Error(err);  
    };  
  } catch (err) {  
    // 向主线程抛出错误  
    throw new Error(err);  
  }  
};
```
离屏 canvas
```js
// 主线程  
  
const worker = new Worker("worker.js");  
const canvas = document.getElementById("canvas");  
// 将canvas控制权转移到 Worker 线程的 OffscreenCanvas 对象上  
const offscreenCanvas = canvas.transferControlToOffscreen();  
  
// 把 OffscreenCanvas 对象发送给 Worker 线程  
worker.postMessage({ canvas: offscreenCanvas }, [offscreenCanvas]);

// Worker 线程  
  
onmessage = function (e) {  
  // 使用 OffscreenCanvas  
  let canvas = e.data.canvas;  
  // 获取绘图上下文  
  let ctx = canvas.getContext("2d");  
  // 进行绘制，与正常使用canvas时完全相同  
  ctx.fillStyle = "#1989fa";  
  ctx.rect(10, 10, 100, 100);  
  ctx.fill();  
};
```




二者都是通过 postmessage 发送、onmessage 监听。
```js
// 主线程  
  
// 新建一个 Worker  
const worker = new Worker("worker.js");  
  
// 向 Worker 发消息  
worker.postMessage("message from main");  
  
// 监听 Worker 线程发回来的消息  
worker.onmessage = (event) => {  
  console.log(event.data); // "message from worker"  
};  
  
// 关闭 Worker  
worker.terminate();

// Worker 线程  
逻辑：Worker 线程通过 `onmessage` 监听函数接收消息，在 Worker 线程中处理完毕后通过 `postMessage()` 方法向主线程发送消息。
  
// 监听主线程发来的消息  
onmessage = (event) => {  
  console.log(event.data); // "message from main"  
  
  // 向主线程发送消息  
  postMessage("message from worker");  
  
  // 关闭 Worker  
  close();  
};
```

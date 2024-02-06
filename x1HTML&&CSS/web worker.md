我认为这篇内容应该归在 JavaScript 的 bom 下。

## web worker
浏览器有三个线程和 js 相关：
2. js 引擎线程。gui 线程与 js 线程互斥，js 执行太久会导致页面渲染阻塞。
3. 事件触发线程。控制事件循环，加入待处理队列。
4. 异步 http 请求线程。

其实背后还有一个 web worker 线程，可以防止 js 主线程被阻塞。

可以利用 web worker 执行复杂任务，另外，还可以使用 web worker 进行标签页间的通信（中介者模式）
![[Pasted image 20231219183256.png]]
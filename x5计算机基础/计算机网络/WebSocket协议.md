[用 Node.js 手写 WebSocket 协议 (qq.com)](https://mp.weixin.qq.com/s/EWE6vIvwWDJ_A6SqikV6Tg)

websocket 严格来说和 http 没什么关系，是另外一种协议格式。但是需要一次从 http 到 websocekt 的切换过程。

websocket 可以在开发者工具 network、ws 查看。

#### 切换协议
HTTP/1.1 101 Switching Protocols


确认有 websocket 能力

请求的时候带上这几个 header：
`Connection: Upgrade   Upgrade: websocket   Sec-WebSocket-Key: Ia3dQjfWrAug/6qm7mTZOg==   `
前两个很容易理解，就是升级到 websocket 协议的意思。第三个 header 是保证安全用的一个 key。

服务端返回这样的 header：
`HTTP/1.1 101 Switching Protocols   Connection: Upgrade   Upgrade: websocket   Sec-WebSocket-Accept: JkE58n3uIigYDMvC+KsBbGZsp1A=   `
和请求 header 类似，Sec-WebSocket-Accept 是对请求带过来的 Sec-WebSocket-Key 处理之后的结果。

固定的验证算法
```
const crypto = require('crypto');function hashKey(key) {  const sha1 = crypto.createHash('sha1');  sha1.update(key + '258EAFA5-E914-47DA-95CA-C5AB0DC85B11');  return sha1.digest('base64');}
```
也就是用客户端传过来的 key，加上一个固定的字符串，经过 sha1 加密之后，转成 base64 的结果。这个字符串 258EAFA5-E914-47DA-95CA-C5AB0DC85B11 是固定的。

### websocket
开发者工具切换 wc、message 可以查看。
websocket 协议
![[Pasted image 20230310155727.png]]
http 协议是 key: value 的 header 带个 body 的。它是文本协议，每个 header 都是容易理解的字符。这样好懂是好懂，但是传输占的空间太大了。而 websocket 是二进制协议，一个字节可以用来存储很多信息。

### websocket 服务器
后端实现服务器
1. 创建服务器
2. 监听事件 upgrade
3. 开启socket
4. write 响应请求
5. 监听消息
6. 处理 buffer
7. 实现发送

### 前端
用浏览器的 WebSocket api 建立连接，发送消息。
```js
	const ws = new WebSocket("ws://localhost:8080");  

ws.onopen = function () {  
	ws.send("发送数据");  
	setTimeout(() => {  
		ws.send("发送数据2");  
	}, 3000)  
};  

ws.onmessage = function (evt) {  
	console.log(evt)  
};  

ws.onclose = function () {  
};
```
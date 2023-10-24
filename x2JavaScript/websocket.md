## 设置请求头 (都不行)
1. 方法一，携带在 url 上，结果：设置了 params ，不是 header。
2. 方法二，以“WebSocket-Protocol: token”携带在协议上。不行。Failed to construct 'WebSocket': The subprotocol 'WebSocket-Protocol: token' is invalid.
3. 方法三，直接放在 protocol 上，后台获取不到带 sec 的。
4. 方法四，protocol 分开写，不行。
5. 方法五，设置请求头方法 `undefined`。
6. 方法六，onopen 设置请求头，该方法连接成功后才执行。
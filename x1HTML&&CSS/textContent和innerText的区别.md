1. textContent 返回的是源html 中元素包裹的所有子孙文字节点。
2. innerText 类似，但是是从渲染结果提取的。所以 innerText 受 JavaScript、css 影响。比如设为 displaynone，那么 innerText 就会失去这个子文本节点。
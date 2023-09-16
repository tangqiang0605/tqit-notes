在 node 环境下支持 domApi
```
const yargs = require('yargs')
const http = require('node:http')
const { JSDOM } = require('jsdom')
// 获取命令参数
const server = http.createServer((req, res) => {
  const { content } = yargs.argv
  const dom = new JSDOM();
  const contentDom = dom.window.document.createElement('h1')
  contentDom.textContent = content
  dom.window.document.body.appendChild(contentDom)
  res.end(dom.serialize())
})

server.listen(3000, () => console.log('server is running at port 3000'))
```
该包可用于在 node 环境下对网页代码进行测试（无头浏览器）
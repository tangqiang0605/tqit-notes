## URL 路径
HTML 属性值**引用文件路径**的一些通用规则。

【你中了几条呢？要正确理解前端开发中的绝对路径和相对路径哦！【渡一教育】】 https://www.bilibili.com/video/BV1op4y1c7op/?share_source=copy_web&vd_source=29fe7574da791ab80847f919bb131f3a

一个网络资源对应一个 url 地址。

url 组成：schema+domain+port+path+query+hash。

绝对路径：和当前资源的 path 无关 （可能与协议域名端口有关）。
1. 完整路径。
2. 省略 schema（用斜杠替代），使用当前资源的协议。
3. 省略协议域名端口，使用当前资源的协议域名端口。

相对路径：相对当前资源的路径。
1. `./` 当前。
2. `../` 上一层。
3. 直接书写，比如 `list`，等同 `./list`。
4. query。使用当前 path。
5. （常用）hash。使用当前 path。

## 参考
[Web 开发者指南 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/Guide)
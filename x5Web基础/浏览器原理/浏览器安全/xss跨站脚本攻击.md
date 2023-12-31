[XSS网络攻击 - 原理，类型和实践\_哔哩哔哩\_bilibili](https://www.bilibili.com/video/BV1rg411v7B8/?spm_id_from=333.337.search-card.all.click&vd_source=a192bbc2c82b7725cd9d5149075acda1)

安全问题：盗取用户信息比如 cookie。

## 反射性攻击
在搜索时候，服务端将搜索内容与页面进行拼接，比如搜索“abc”，网页返回内容是“您搜索 abc 的结果”，这种拼接容易被嵌入 script 插入恶意代码。原因是服务端没有对不可信内容进行过滤就返回。

## 存储型攻击
发表嵌入恶意代码的评论，服务端存储起来，别人访问就拼接返回。原因也是服务端没有对不可信内容进行过滤就存储。

## dom 型攻击
由于浏览器自身的过滤行为，锚点默认是不发往服务器的。假设图片使用描点的内容拼接作为图片的 src，就可以通过锚点注入恶意代码。
```
#123
let num=123
let src='image'+num+'.png'
// 设置img的src为src
```
dom 型攻击就是浏览器在解析页面的过程中被注入了恶意代码。原因是前端没有对用户输入的内容进行过滤就意图插入 html 中。

## 预防
防范 XSS 攻击的最好方式就是删除或禁用任何可能包含可运行代码指令的标记。对 HTML 来说，这些包括类似 `<script>, <object>, <embed>,和 <link>` 的标签。

修改用户数据使其无法用于运行脚本或其他影响服务器代码执行的过程被称作输入过滤。许多 Web 框架默认情况下都会对来自 HTML 表单的用户数据进行过滤。

## 参考
[站点安全 - 学习 Web 开发 | MDN](https://developer.mozilla.org/zh-CN/docs/Learn/Server-side/First_steps/Website_security)
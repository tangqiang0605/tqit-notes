## Mockjs 快速上手
[Mock.js (mockjs.com)](http://mockjs.com/examples.html)
`npm i mock -D`
使用方法：
mock 只有两个函数。查看官方文档生成所需数据。
``` ts
import mock from 'mock.js'
mock.Random.csentence()
mock.Mock('@csentence()')
```

## Mockjs 核心概念
通过数据模板（类）定义生成随机数据：使用 mock 函数传入 DTD 对象{}。

通过数据占位符定义生成随机数据（属性）：使用 Mock 传入占位符或 Random 调用语义化的方法。

数据模板中的每个属性由 3 部分构成：属性名、生成规则、属性值：
``` js
// 属性名 name 生成规则 rule 属性值 value
'name|rule': value
```

## Mockjs 拦截
Mock. js 通过覆盖和模拟原生 XMLHttpRequest 的行为来拦截 Ajax 请求。仅用于配置 Ajax 请求，将来可能用于配置 Mock 的其他行为。

```js
import mock from 'mockjs';
mock.Mock(rurl?,rtype:?,template);
```
rurl：可选。表示需要拦截的 URL，可以是 URL 字符串或 URL 正则。例如 `/\/domain\/list\.json/`、`'/domian/list.json'`。

rtype：可选。表示需要拦截的 Ajax 请求类型。例如 `GET`、`POST`、`PUT`、`DELETE` 等。

template：可选。表示数据模板，可以是对象或字符串。例如 `{ 'data|1-10':[{}] }`、`'@EMAIL'`。

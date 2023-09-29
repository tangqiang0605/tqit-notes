[[session认证]]
在 session 认证的基础上，session 中保存的是用户信息，服务器只需保存密钥，对密钥进行解密得到用户信息进行验证。

token 就是携带了用户信息的 session。

## 注意
session 存在 cookie 中（但也可以持久化）。而 token 可以存在 cookie、或者每次从 localstorage 取出放在请求中（authorization 或 token 字段）。

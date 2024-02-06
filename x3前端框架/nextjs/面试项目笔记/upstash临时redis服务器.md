免费的 Redis 服务器，它叫 Upstash。如果你正在开发个人产品，那么请忘掉 Redis 的配置和各种安全措施，用 Upstash，什么 RDB 和 AOF、雪崩和击穿、密码和权限，这些 Upstash 会帮你搞定，你只需要关注你要实现的功能。

创建一个 Upstash 的 Redis 数据库
NextJS 服务端组件和 Redis 交互

1. 注册 upstash
2. 创建 redis 数据库
3. 安装@upstash/redis 依赖
4. lib/redis. ts 书写配置
5. app/pages. tsx 服务端组件直接和 redis 交互。

[用 Upstash 作为你的 Redis 服务器 | J 实验室](https://weijunext.com/article/6510121c-90da-4d20-85a1-72cbbdb3983b)
## nestjs-cli
```
pnpm i -g @nestjs/cli
nest new project-name
pnpm run start

nest --help
nest g resource user 
```
$[ P (B) = P (B|A) \cdot P (A) + P (B|A') \cdot P (A') = 0.8 \times 0.01 + 0.2 \times 0.99 = 0.207 ]$

然后利用贝叶斯公式计算实际患病的概率 P (A|B)：
$[ P (A|B) = \frac{P (B|A) \cdot P (A)}{P (B)} = \frac{0.8 \times 0.01}{0.207} \approx 0.0386 ]$
## 入口
NestFactory. create 根据 module 创建一个 app。

## Controller 路由处理
分为两部分：
1. 依赖注入：controller 会自动对 constructor 的参数进行注入并绑定到 this 上。一般注入 service。
2. 业务处理

### 路由处理
```
get动态参数@Param() 为空返回param对象，有参数返回对象字段，一般不填
post请求@Body()
```

## Service 数据与业务处理
主要实现数据库查询和业务逻辑



[nest-js\_小满zs的博客-CSDN博客](https://blog.csdn.net/qq1195566313/category_11844396.html)
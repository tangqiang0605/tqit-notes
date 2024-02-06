Client ID
7bacba7c327337d72974
Client secrets
16f4758bf3e4ae5d8e00ced94a052cfa4cb54c02

在 nextjs v13.2推出后，next-auth 已支持 app router 模式下在 app 文件夹内构建 API，但是鉴于官方文档主要使用方式仍然是放在 pages 文件夹下，所以本例也将**在 pages 下进行 API 编写**。

```
pages/api/auth/[... nextauth]. ts 中使用[... nextauth]是为了动态匹配 nextauth 的所有 API 路由，如:
/api/auth/callback 处理认证回调
/api/auth/signin 处理登录
/api/auth/signout 处理登出
/api/auth/session 获取 session 等等
也就是说，使用[... nextauth]可以动态匹配所有包含/api/auth/和 nextauth 的 API 路由。
```

## 后台部分
pages/api/auth/\[... nextauth\]. ts
导入 next-auth 包、导入配置authOptions。
使用 next-auth 包的默认导出方法 NextAuth 接收参数authOptions，返回该函数值。

lib/auth
导出 authOptions。authOptions 对象导出必要配置，包括 session、pages、providers（next-auth 提供的 GithubProvider）、callbacks

## 前端部分
components/UserAuthForm. tsx
1. use client
2. 具名导入 next-auth/react 提供的 signIn 方法。
3. 点击按钮触发 github 方法。

环境变量
1. githubid、gihubsecret, 被authOptions配置读取
2. nextauth_secret、nextauth_url，被 next-auth 读取

用命令生成: openssl rand -base64 32

使用 powershell（不是cmd）
```
# 生成随机字节
$randomBytes = [byte[]]::new(32)
$randomNumberGenerator = [System.Security.Cryptography.RandomNumberGenerator]::Create()
$randomNumberGenerator.GetBytes($randomBytes)

# 将随机字节转换为 base64 编码的字符串
$base64String = [Convert]::ToBase64String($randomBytes)

# 打印结果
Write-Host $base64String

```

## 登录之后
1. 登录之后跳转首页
2. 如果想要在首页回显个人信息。
如下：
1. lib/session. ts：导出一个方法，返回 getServerSession (authOptions)。里面含用户信息。
2. app/page. tsx 调用这个方法。
3. 为了 Image 可以生效，我们需要在 next.config.js 里添加可信域（添加 github 头像服务的域名）

## postgres
1. 有时候我们不止是需要第三方授权的用户信息，我们还想自己保存一个用户表，把用户基本信息和我们自定义的一些字段共存，那么我们就需要建一个数据库了。
2. 在 Mysql 被 oracle 收购后，postgres 成为开源社区里最闪亮的新星。postgres 也是本文代码用到的数据库。
3. 如果我们自己安装 postgres，很多操作会显得非常繁琐，但如果在 docker 中安装，一切就变得非常丝滑。

### 安装 docker、docker-compose
### 创建 docker-compose. yml
```
# docker-compose.yml
version: '3.1'
services:
  nextjs-learn-domes:
    image: postgres
    volumes:
      - ./postgres:/var/lib/postgresql/data
    ports:
      - 5432:5432
    environment:
      - POSTGRES_USER=myuser
      - POSTGRES_PASSWORD=mypassword

  adminer:
    image: adminer
    restart: always
    ports:
      - 8080:8080
```
启动
```
docker-compose up -d
```
现在访问 http://localhost:8080就可以登录数据库了

### 使用 prisma 操作数据库
在 Node 中用过 Sequelize 操作数据库的兄弟都知道，这是一个让你可以用写对象的方式来写 sql 的工具，极大简化了前端对 sql 的学习成本和开发成本，Prisma 也是这样的工具。
安装 prisma、@prisma/client
```
npx prisma init
```
初始化后，在根目录会出现一个 prisma 的文件夹，这个文件夹用来存放 Prisma 相关配置；里面还有一个 schema. prisma 文件，是核心的数据库 Schema 定义文件，开发时主要通过修改它来更新数据库模型设计。
再去看. env 文件，会发现多了一条配置
DATABASE_URL="postgresql://johndoe: randompassword@localhost : 5432/mydb? schema=public"
Bash
需要改成我们的 postgres 配置
DATABASE_URL="postgresql://myuser: mypassword@localhost : 5432/mydb? schema=public"

#### schema. prisma 定义表结构
用户表：多两个字段。sub 第三方唯一 id、platform 平台。其它基本信息如用户名、头像、邮箱。
```
npx prisma migrate dev --name "init"
```
打开数据库，会发现现在 User 表已经创建出来了

### 实例化 PrismaClient
1. lib/prisma. ts 实例化PrismaClient
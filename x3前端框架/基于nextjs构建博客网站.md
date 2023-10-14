[如何用Next.js搭建全栈前端知识库项目？](https://mp.weixin.qq.com/s/zKLN4tBJc5svYvxB1WkdLg)
[轻松使用Notion API——Notion教程 - 掘金](https://juejin.cn/post/7067108031678545927#heading-3)

## nextjs
```
npx create-next-app tqit-knowledge
```

项目结构
1. app：定义路由。index 映射到 page. jsx
	1. layout 组织页面结构。page 会被映射到入参的 children 属性中。
	2. app 文件夹下的组件都是服务器组件，不能使用 useState、useEffect 等客户端特性。通过'use client'声明客户端组件。
2. components：组件
3. pages/api：获取数据
4. styles：css 样式
5. public 静态资源
6. pages 页面路由器

组件
1. Link 组件：next/link。属性 href。
```
<Link href="/category">  跳转路由  </Link>
```
2.next/image
```
      <Image  
        src="/path/to/your/image.jpg"  
        alt="Description of the image"  
        width={300}  
        height={200}  
      />
```

## notion
notion 数据库
1. 创建一个 api token。[Notion – The all-in-one workspace for your notes, tasks, wikis, and databases.](https://www.notion.so/my-integrations/)
2. 获取数据库的 id
3. 数据库分享给 token（add connections 找到你的 api token 名字）
## markdown
1. 下载依赖
```
npm install -D markdown-it @tailwindcss/typography
```
2. 配置 tailwind
3. 挂载 prose
```
<div  className='prose w-full'  
  dangerouslySetInnerHTML={{ __html: htmlString }} // 将html字符串解析成真正的html标签  
/>
```
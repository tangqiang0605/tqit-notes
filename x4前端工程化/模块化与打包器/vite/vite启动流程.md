[Vite 源码（二）vite启动流程以及如何获取config配置 - 掘金](https://juejin.cn/post/7044086324306903048?searchId=20230725214238EAECE6AA1FF78C24FAE1)

1. packagejson 定义 bin 命令位置 node/cli. ts
2. 文件中使用 cac 进行 cli 命令处理
3. createServer 创建 http 服务器、webstocket 服务器。
4. chokidar 监听文件
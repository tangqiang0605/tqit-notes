
问题一：构建位置
在代码的根目录

问题二：构建失败
文件名为 Dockerfile 而不是 node. Dockerfile

问题三：构建失败
要先运行 docker，先打开 docker 桌面版，然后就可以构建了。

## 安装 docker 桌面版
1. 手写静态服务器并使用 serve 依赖启动
2. 编写 Dockerfile、docker-compose. yaml 启动项目。dockercompose 就是将启动 docker 的命令记录下来。
```
编写dockerfile
构建镜像，参数tag
docker build -t simple-app .
查看镜像
docker images
运行容器
docker run --rm -p 3000:3000 simple-app
查看情况
docker ps

编写docker-compose.yaml
创建并启动容器
docker-compose up --build
```
3. dockercompose 就是将构建镜像的一长串参数记下来，执行时顺便构建并运行。
安装方法：[安装docker compose\_安装docker-compose\_猿小飞的博客-CSDN博客](https://blog.csdn.net/u011442726/article/details/130823392)
要给权限。
## nginx
```
docker run -it --rm -p 3000:80 nginx:alpine
```
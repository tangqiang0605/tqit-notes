集群部署、隔离环境、灰度发布以及动态扩容缺一不可，而容器化则成为中间的必要桥梁。

组成部分

docker client: 即 docker 命令行工具
docker host: 宿主机，docker daemon 的运行环境服务器
docker daemon: docker 的守护进程，docker client 通过命令行与 docker daemon 交互
image: 镜像，可以理解为一个容器的模板，通过一个镜像可以创建多个容器
container: 最小型的一个操作系统环境，可以对各种服务以及应用容器化，是镜像的运行实例
registry: 镜像仓库，存储大量镜像，可以从镜像仓库拉取和推送镜像

## 安装
软件安装

如果是个人服务器且为 linux，可参考安装 docker ,它将 docker 与 docker compose 一并安装。[Site Unreachable](https://docs.docker.com/engine/install/centos/)

命令行安装
Homebrew 的 Cask 已经支持 Docker for Mac，因此可以很方便的使用 Homebrew Cask 来进行安装，执行如下命令：

brew cask install docker

查看版本

docker -v

## 部署
[[创建vue项目]]
```
touch Dockerfile
// Dockerfile
FROM nginx  
COPY dist/ /usr/share/nginx/html/  
COPY default.conf /etc/nginx/conf.d/default.conf  

docker pull nginx
touch default.conf
// default.conf
server {
    listen       80;
    server_name  localhost;

    #charset koi8-r;
    access_log  /var/log/nginx/host.access.log  main;
    error_log  /var/log/nginx/error.log  error;

    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
    }

    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }
}

构建镜像
docker build -t tagname .
docker image ls | grep tagname

创建容器
docker run -d -p 3000:80 --name your-container-name image-tag-name
docker ps -a # 查看容器id
```
[[命令行命令]]查看对应的静态文件

## 贡献
1. 注册 dockerhub 账号
2. 命令行 `docker login` 登录
3. 给 image 打 tag：`docker tag <image> <username>/<repository>:<tag>`

## 原理
docker 底层使用了一些 linux 内核的特性，大概有 namespace，cgroups 和 ufs。
namespace
docker 使用 linux namespace 构建隔离的环境，它由以下 namespace 组成

pid: 隔离进程
net: 隔离网络
ipc: 隔离 IPC
mnt: 隔离文件系统挂载
uts: 隔离 hostname
user: 隔离 uid/gid

作者：白哥学前端
链接： https://juejin.cn/post/7139724794672447518
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

## 命令
[[docker常用命令]]

## 配置文件
[[Dockerfile]]
[[docker-compose配置]]
## 常见问题
问题一：构建位置
在代码的根目录

问题二：构建失败
文件名为 Dockerfile 而不是 node. Dockerfile

问题三：构建失败
要先运行 docker，先打开 docker 桌面版，然后就可以构建了。

## 安装
如果是个人服务器且为 linux，可参考[Install Docker Engine on CentOS | Docker Docs](https://docs.docker.com/engine/install/centos/#install-using-the-repository) ,它将 docker 与 docker compose 一并安装。

一共两步：
1. Set up the repository
2. Install Docker Engine

单独安装 docker-compose： [安装docker compose\_安装docker-compose\_猿小飞的博客-CSDN博客](https://blog.csdn.net/u011442726/article/details/130823392)，要给权限。
## 基本流程
docker
``` shell
# 编写dockerfile
# 构建镜像
docker build -t simple-app .
# 查看镜像
docker images
# 运行容器
docker run --rm -p 3000:3000 simple-app
# 查看情况
docker ps
```
docker-compose
``` shell
# 编写docker-compose.yaml
# 创建并启动容器
docker-compose up --build
```
## 搭建学习 nginx 配置的环境
```
docker run -it --rm -p 3000:80 nginx:alpine sh
```

```
version: "3"
services:
	learn-nginx:
		image: nginx:alpine
		ports:
			- 4000:80
		volumns:
			- nginx.conf:/etc/nginx/conf.d/default.conf
			- .:/usr/share/nginx/html 
```
## 部署静态页面
2. 编写 Dockerfile、docker-compose. yaml 启动项目。
```shell
# 使用官方 Nginx 镜像作为基础镜像
FROM nginx

# 将我们自己编写的 Nginx 配置文件复制到容器中
将项目下的nginx.conf复制到容器中
COPY nginx.conf /etc/nginx/nginx.conf

# 将应用程序的静态文件复制到容器中
从项目的static复制到html文件夹下
COPY static /usr/share/nginx/html

# 暴露容器的 80 端口
EXPOSE 80
```
构建镜像、映射到主机
```shell
# 在项目根目录下执行以下命令构建 Docker 镜像
docker build -t my-nginx .

# 运行 Nginx 容器
docker run -d -p 8080:80 my-nginx
```
## 部署前端项目
Dockerfile
``` yaml
FROM node:14-alpine as builder
 
WORKDIR /code
 
# 单独分离 package.json，是为了安装依赖可最大限度利用缓存
ADD package.json yarn.lock /code/
RUN yarn
 
ADD . /code
RUN npm run build
 
# 选择更小体积的基础镜像
FROM nginx:alpine
COPY --from=builder code/build /usr/share/nginx/html
```

docker-compose. yaml
``` yaml
version: "3"
services:
  simple:
    build:
      context: .
      dockerfile: simple.Dockerfile
    ports:
      - 4000:80
```

docker-compose up --build simple

## 部署 vue 项目
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

## 构建并部署 react 项目
![[Pasted image 20231003195031.png]]
![[Pasted image 20231003195046.png]]
配置前端路由
```
location / {
	try_files $uri $uri/ / index.html
	expires -1; # no-cache
}
```
静态资源强缓存：
```
location /static {
	expires 1y;
}
```
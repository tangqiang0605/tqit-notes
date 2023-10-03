## 常用路径
```
/etc/nginx
/etc/nginx/conf.d
```
## Dockerfile
``` shell
FROM <image>[:<tag>] [AS <name>]
FROM nginx:alpine

WORKDIR 工作路径

COPY 复制

ADD [--chown=<user>:<group>] <src>... <dest>
ADD ./code

RUN <command> # 在镜像中执行命令
RUN npm run build

CMD # 指定容器如何启动。一个Dockerfile只有一个CMD
```
## docker-compose
docker-compose 就是将构建镜像的一长串参数记下来，执行时顺便构建并运行。
配置：
```shell
# docker-compose.yaml
version: "3"
services:
  app:
    image: "nginx:alpine"
    ports:
      - 8000:80
  app2:
	  build: .
	  ports:
	    - "3000:3000"
	  volumes:
		- ./:/egg:ro # 本地到容器的映射
		-  /egg/node_modules # 排除文件夹
```
命令：v1 使用 docker-compose，v2 使用 `docker compose`。
```
docker compose up # 启动容器
-d 后台
--build 镜像修改时会重启

docker-compose version
docker compose ls
docker compose down # 关闭容器 -v清除volumn
```
## 同步
1. 使用 v 进行绑定，如果容器新增文件，本地也会新增，如果不想，添加 ro（readonly）改为只读。
```
docker run -v host-path:container-path:ro 
```
## docker 命令
1. tag 是镜像名， name 是容器名。
2. build 是根据 dockerfile 创建镜像，run 是根据镜像创建容器，start 是启动已存在的容器（和 stop 是一对）。
3. rmi 是删除镜像，rm 是删除容器。

docker build
```
# 根据Dockerfile创建镜像
docker build .

-t 指定tag名字
```
docker run
```
# 根据基础镜像创建容器，镜像可以是通过Dockerfile创建的，或者通拓拉取得来的。
docker run --rm -it --name nginx -p 8888:80 nginx:alpine

-dit \
--name：为容器指定名称

nginx:alpine：基础镜像

-v /home/workspace:/home/workspace \
-v 排除文件夹

-p host-port:container-port
-d 后台运行detached mode
-e 环境变量
--rm：当停止容器时自动清除容器
-it：可交互式、赋予 tty 的方式
```
镜像管理：
```
# 通过dockerfile镜像
docker build -t image-name:version .
# 通过容器获得镜像
docker commit -a "作者信息" -m "log信息" 容器id 目标镜像名称:tag版本

# 列出所有本地镜像
docker images

docker rmi -f image-name

# 添加tag
docker tag id username/image-name:version

# 查看镜像信息，如配置及环境变量等。
docker inspect node:alpine 

# 发布镜像
docker login
docker push

# 拉取镜像
docker pull node:alpine

# 构建容器
docker run
```
容器管理：
```
docker ps # 意为process status
docker ps -a
docker ps -l
docker port # 查看端口映射
docker stats # 查看容器资源占用

# 构建容器
docker run
# 启动容器
docker start id
docker stop id
docker restart id
docker rm id # 清除容器的同时清除volumn：加-v

# 访问容器
docker exec -it id或者container-name /bin/bash
```

相关：
[[命令描述]]
测试容器服务是否正常 [[命令行命令]] curl

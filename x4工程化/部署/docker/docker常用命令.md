
## docker-compose
v1 使用 docker-compose，v2 使用 `docker compose`。
```
docker-compose version
docker compose version
docker compose ls
docker compose up # 启动容器
```
[[docker-compose配置]]
## docker
```
# 加入拉取一个 node:alpine 的镜像
$ docker pull node:alpine

# 查看镜像信息，如配置及环境变量等。
$ docker inspect node:alpine

# 列出所有镜像
$ docker images
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
node                alpine              f20a6d8b6721        13 days ago         105MB
mongo               latest              965553e202a4        2 weeks ago         363MB
centos              latest              9f38484d220f        8 months ago        202MB

docker build -t image-name:version .

# 容器管理
docker run
docker stop
docker rm
docker ps # 查看容器列表
docker port # 查看端口映射
docker stats # 查看容器资源占用
docker ps -l
docker exec -it <container-name>

# 创建容器
docker run --rm -it --name nginx -p 8888:80 nginx:alpine
--rm：当停止容器时自动清除容器
-it：可交互式、赋予 tty 的方式
--name：为容器指定名称
-p host-port:container-port：宿主机与容器端口映射，方便容器对外提供服务
nginx:alpine：镜像
```

相关：
[[命令描述]]
测试容器服务是否正常 [[命令行命令]]curl
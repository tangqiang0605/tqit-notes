使用 docker build 构建镜像，docker build 会使用当前目录的 Dockerfile 构建镜像。
```
FROM <image>[:<tag>] [AS <name>]
FROM nginx:alpine

ADD [--chown=<user>:<group>] <src>... <dest>
ADD ./code

RUN <command> # 在镜像中执行命令
RUN npm run build

CMD # 指定容器如何启动。一个Dockerfile只有一个CMD
```

相关：
[[命令描述]]
官方文档： [Site Unreachable](https://docs.docker.com/engine/reference/builder/)

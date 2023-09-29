安装： [nginx.org/en/linux\_packages.html#RHEL](http://nginx.org/en/linux_packages.html#RHEL)

位置
```
/etc/nginx
/etc/nginx/conf.d
```

在项目根目录建立镜像配置：
```
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
```
# 在项目根目录下执行以下命令构建 Docker 镜像
docker build -t my-nginx .

# 运行 Nginx 容器
docker run -d -p 8080:80 my-nginx
```
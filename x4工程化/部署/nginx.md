## 快速安装、测试、启动
[Nginx 的简述与部署（Linux） - 掘金](https://juejin.cn/post/7234059110236651578?searchId=20230805205243D11D3BFBD935A8C8EC3A)
```
# 安装依赖包：
yum -y install gcc zlib zlib-devel pcre-devel openssl openssl-devel

# 切换目录
cd /usr/local

# 创建存放目录 nginx
mkdir  nginx

# 切换到 nginx 目录下
cd nginx

# 下载 nginx 安装包
wget http://nginx.org/download/nginx-1.22.0.tar.gz

# 解压安装包
tar -xvf nginx-1.22.0.tar.gz

# 解压完成后，进入 nginx 下的目录
cd /usr/local/nginx/nginx-1.22.0

./configure

# 执行 make 命令
make

# 执行安装命令
make install

# 查看是否安装完成（查看是否有 nginx 进程）
ps -ef | grep nginx

# 若存在进程则代表安装成功，则可以切换到 /sbin 目录下
cd /usr/local/nginx/sbin

# 在当前目录下验证 nginx 配置文件是否正确
./nginx -t

# 在当前目录下启动 nginx 服务
./nginx -c  /usr/local/nginx/conf/nginx.conf

# 在当前目录下重启 nginx 服务（可能存在 nginx.pid 报错的问题，可参考百度结果）
./nginx -s reload

# 启动成功后再次查看 nginx 进程
ps -ef | grep nginx

```
## 简介
[前端开发者必备的Nginx知识 - 掘金](https://juejin.cn/post/6844903793918738440?searchId=20230805205243D11D3BFBD935A8C8EC3A)
详细操作
[安装Nginx 及 创建服务脚本 - 掘金](https://juejin.cn/post/7176425528889442365?searchId=202308052101494D59AC2040288DC73952)
## 安装
1. 安装依赖 gcc、zlib、peri 等
2. 下载安装包
3. 解压安装包
4. 编译安装./configure、make、make install
5. 运行

## 位置
```
/usr/local/nginx
存放安装包
/usr/local/nginx/conf/nginx.conf
/usr/local/nginx/sbin/nginx
```

## 命令
```
查看进程
ps -ef|grep nginx
kill 进程id
killall nginx
杀掉进程+启动=重启

验证配置
/usr/local/nginx/sbin/nginx -t
启动服务
/usr/local/nginx/sbin/nginx -c /usr/local/nginx/conf/nginx.conf
重启服务、重新加载配置
/usr/local/nginx/sbin/nginx -s reload
在关闭已接受的连接请求后再关闭
-s quit
快速停止
-s stop
```
防火墙
```
查看状态
firewall-cmd --state
查看配置规则
firewall-cmd --list-all
关闭
systemctl stop firewalld.service
禁止开机自启动
systemctl disable firewalld.service
放行
firewall-cmd --zone=public --add-port=80/tcp --permanent
重启
firewall-cmd --reload
```
注册系统服务：通过系统服务的方式启动 nginx
```
vi /usr/lib/systemd/system/nginx.service
[Unit]
Description=nginx - web server
After=network.target remote-fs.target nss-lookup.target
[Service]
Type=forking
PIDFile=/usr/local/nginx/logs/nginx.pid
ExecStartPre=/usr/local/nginx/sbin/nginx -t -c /usr/local/nginx/conf/nginx.conf
ExecStart=/usr/local/nginx/sbin/nginx -c /usr/local/nginx/conf/nginx.conf
ExecReload=/usr/local/nginx/sbin/nginx -s reload
ExecStop=/usr/local/nginx/sbin/nginx -s stop
ExecQuit=/usr/local/nginx/sbin/nginx -s quit
PrivateTmp=true
[Install]
WantedBy=multi-user.target
重新加载系统服务
systemctl daemon-reload
启动nginx
systemctl start nginx.service
查看状态
systemctl status nginx
开机启动
systemctl enable nginx.service
```
## 配置
```
worker_processes
工作进程数目，处理并发
events
影响服务器与用户的网络连接
http
配置最频繁的部分，代理、缓存、日志等多数功能和第三方模块的配置都在这里。
```
1. 多个值使用空格隔开
```
http.server
一个虚拟主机，一个http中可以配置多个server
server_name:ip或域名
location.root 根目录
location.index 首页
```
nginx 配置案例
```
events {
    worker_connections 1024;
}

http {
    server {
        listen 80;
        server_name ip;

        location / {
            root /usr/share/nginx/html;
            root /home/static/项目/dist
            index index.html;
        }
    }
}

```
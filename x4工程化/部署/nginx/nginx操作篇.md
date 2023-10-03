## 常用路径
```
/usr/local/nginx
/usr/local/nginx/sbin
/usr/local/nginx/conf/nginx.conf
/usr/share/nginx/html
/home/static/项目/dist
```
命令 `nginx` 即 `/usr/local/nginx/sbin/nginx`。
其它常见位置：
```
/etc/nginx/conf
/usr/local/etc/nginx
/opt/homebrew/etc/nginx
```
具体使用 `nginx -V` 命令查看 `--conf-path` 安装位置、`--prefix` 默认首页位置。

## 常用命令
nginx 的命令十分简单，就是控制服务的启停。剩下一部分是 linux 对 nginx 进程的管理。

进程控制：
```
# 执行后没有消息即安装成功，打开localhost查看
# 启动nginx
nginx
# 查看进程
ps -ef|grep nginx
# 关闭进程
kill 进程id
killall nginx
```

服务控制：
```
# 启动服务
nginx
nginx -c /usr/local/nginx/conf/nginx.conf
# 优雅停止，在关闭已接受的连接请求后再关闭
nginx -s quit
# 立即停止
nginx -s stop
nginx -s reload
# 重新打开日志文件
nginx -s reopen
```

其它：
```
# 验证配置
nginx -t
# 查看各种文件位置
nginx -V
```

## 配置
### 基础配置
1. worker_processes：工作进程数目，处理并发。
2. events：影响服务器与用户的网络连接。
3. http：配置最频繁的部分，代理、缓存、日志等多数功能和第三方模块的配置都在这里。

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
        }
    }
    server {
	    xxx
    }
}
```
多个值使用空格隔开
```
# 一个虚拟主机，一个http中可以配置多个server
http.server

listen # 监听端口
server_name # ip或域名

location / {
	root #根目录
	index #首页
}
```
### 反向代理
```
server {
	location /api {
		# 反向代理
		proxy_pass http:xxx;
	}
}
```
### 负载均衡
```
# 负载均衡
upstream backend {
	ip_hash; # ip绑定策略。根据客户端分配固定服务器，解决session问题
	least_conn; # 最小链接数策略
	fair; #  最快响应时间策略
	# 缺省，轮询策略。
	server #ip;
	server #ip;
	server #ip weight=权重;
}
server {
	location /api {
		# 反向代理
		proxy_pass http://backend; # backend是自定义的
	}
}
```

### https 配置
1. 在主流云平台申请ssl证书 (aws/GCP/阿里云/腾讯云)。
2. 使用 openssl 生成自签证书。
3. 配置 nginx。
4. 参考： [07.HTTPS配置\_哔哩哔哩\_bilibili](https://www.bilibili.com/video/BV1mz4y1n7PQ?p=7&spm_id_from=pageDriver&vd_source=a192bbc2c82b7725cd9d5149075acda1)

### 重定向
1. 在配置 https 后通常也会配置 http 重定向到 https。
```
server {
	listen 80;
	server_name your.com your.your.com;
	return 301 https://$server_name$request_uri;
}
server {
	listen 443 ssl;
}
```
### 请求过滤
[前端开发者必备的Nginx知识 - 掘金](https://juejin.cn/post/6844903793918738440?searchId=20230805205243D11D3BFBD935A8C8EC3A#heading-11) 

### gzip
如何知道客户端是否支持 gzip 呢，请求头中的 `Accept-Encoding` 来标识对压缩的支持。

启用 gzip 同时需要客户端和服务端的支持，如果客户端支持 gzip 的解析，那么只要服务端能够返回 gzip 的文件就可以启用 gzip 了, 我们可以通过 nginx 的配置来让服务端支持 gzip。下面的 respone 中 `content-encoding:gzip`。

```
    gzip                    on;
    gzip_http_version       1.1;        
    gzip_comp_level         5;
    gzip_min_length         1000;
    gzip_types text/csv text/xml text/css text/plain text/javascript application/javascript application/x-javascript application/json application/xml;
```

作者：ConardLi
链接： https://juejin.cn/post/6844903793918738440
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

## 优化
```
nginx配置
location下
add-header X-key value;
gzip on;
expires -1;设置了就是headers的Cache-control的值max-age=xxx
```
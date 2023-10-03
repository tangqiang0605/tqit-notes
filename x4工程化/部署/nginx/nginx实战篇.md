## 安装
方法一：使用包管理器安装： 
linux：
```shell
sudo apt update
sudo apt install nginx
```
mac：
```
brew install nginx
```
windows：
```
scoop install nginx
choco install nginx
```
其它操作系统：[nginx.org/en/linux\_packages.html#RHEL](http://nginx.org/en/linux_packages.html#RHEL)

方法二：编译安装。
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

方法三：docker 安装。
```
docker pull nginx
```

## nginx 自启动
注册系统服务：通过系统服务的方式启动 nginx
```shell
vi /usr/lib/systemd/system/nginx.service
```
修改配置文件
```shell
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
```
重启服务
```
# 重新加载系统服务
systemctl daemon-reload
# 启动nginx
systemctl start nginx.service
# 查看状态
systemctl status nginx
# 开机启动
systemctl enable nginx.service
```
参考：[安装Nginx 及 创建服务脚本 - 掘金](https://juejin.cn/post/7176425528889442365?searchId=202308052101494D59AC2040288DC73952)
## 静态资源服务器
```
location ~* \.(png|gif|jpg|jpeg)$ {
    root    /root/static/;  
    autoindex on;
    access_log  off;
    expires     10h;# 设置过期时间为10小时          
}
```
## 部署 hexo 博客
【【GeekHour】30分钟 Nginx 入门教程】 【精准空降到 02:49】 https://www.bilibili.com/video/BV1mz4y1n7PQ/?p=4&share_source=copy_web&vd_source=29fe7574da791ab80847f919bb131f3a&t=169
```
npm install hexo-cli -g
hexo init blog
cd blog
npm install
# 转换markdown
hexo g
# 启动本地服务器
hexo s
```
将 public 文件下的内容复制到 `nginx -V` 对应的 `--conf-path` 中的 root 地址即可。一般设在 `/home/static/项目/` 目录下。
```
cp -rf ./public/* /home/static/blog/public
```
hexo 一键部署
```
hexo d
```

## 部署 vue3 项目
```
npm create vite vue-demo -t vue
cd vue-demo
npm install
npm build
```
将 dist 目录放置到 `nginx -V` 对应的 `--conf-path` 中对应的 server 配置的 root 地址即可。一般设为 `/home/static/项目/dist`。


## 参考
[前端开发者必备的Nginx知识 - 掘金](https://juejin.cn/post/6844903793918738440?searchId=20230805205243D11D3BFBD935A8C8EC3A#heading-11)
关于 docker 的笔记一共分为三篇，这是第一篇。
概念篇：概念、原理、结构、参考文档。
操作篇：命令行、配置文件、docker-compose。
实战篇：安装、部署、常见问题解决。

## 概念
集群部署、隔离环境、灰度发布以及动态扩容缺一不可，而容器化则成为中间的必要桥梁。

## 组成部分
- docker client: 即 docker 命令行工具
- docker host: 宿主机，docker daemon 的运行环境服务器
- docker daemon: docker 的守护进程，docker client 通过命令行与 docker daemon 交互
- image: 镜像，可以理解为一个容器的模板，通过一个镜像可以创建多个容器
- container: 最小型的一个操作系统环境，可以对各种服务以及应用容器化，是镜像的运行实例
- registry: 镜像仓库，存储大量镜像，可以从镜像仓库拉取和推送镜像

## 优化构建
docker 有个 layer 机制，我们尽量把同类型的步骤分开写，以最大限度利用构建缓存，加快镜像构建速度。
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

## 参考
官方文档： [Site Unreachable](https://docs.docker.com/engine/reference/builder/)
[写给前端的 docker 使用指南 - 掘金](https://juejin.cn/post/7139724794672447518)
【🐳Docker 概念，工作流和实践 - 入门必懂】 【精准空降到 06:14】 https://www.bilibili.com/video/BV1MR4y1Q738/?share_source=copy_web&vd_source=29fe7574da791ab80847f919bb131f3a&t=374
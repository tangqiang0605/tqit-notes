linux 主要通过命令和用户交互。

命令格式：
1. 软件。
2. 参数。

例如：
```
nginx -V
```

命令执行结果：
linux 的一个设计思想是，没有消息就是最好消息。如果没有报错，说明你的命令执行成功。

linux 防火墙：
```
# 查看状态
firewall-cmd --state
# 查看配置规则
firewall-cmd --list-all
# 关闭
systemctl stop firewalld.service
# 禁止开机自启动
systemctl disable firewalld.service
# 放行
firewall-cmd --zone=public --add-port=80/tcp --permanent
# 重启
firewall-cmd --reload
```
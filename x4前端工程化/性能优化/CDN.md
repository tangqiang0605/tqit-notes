## 概念
CDN（Content Delivery Network）内容分发网络。一种通过网络相连的计算器网络系统，提高网络传递速率。

## 组成
1. 分发服务系统：边缘 cache 负责响应用户请求。
2. 负载均衡系统：确定提供用户的访问地址。包括全局负载均衡和本地负载均衡。前者找到合适的节点，后者找到节点中合适的设备。
3. 运营管理系统：负责管理、计费、统计功能。

## 作用
1. 托管静态文件，加速资源访问。
2. 减少服务器负载。
3. 防御 DDos 攻击、MITM 攻击。
4. 可按需拓展的云服务。
5. 直播传送、流媒体传送。

## 原理
DNS 原理：
1. 检查浏览器缓存。
2. 检查系统缓存入 hosts 文件。
3. 检查路由器缓存。
4. 向 ISP 的LDNS服务器查询。
5. 向根域名服务器请求解析。根服务器会返回顶级域名的地址，顶级域名会返回次级域名的地址，次级域名会返回目标 ip。LDNS 会缓存并返回给客户端。

CDN 原理：
（1） 未使用 CDN：
1. 域名解析得到 ip。
2. 访问主机。
3. 得到响应。

（2）使用 CDN：
1. 本地 DNS 发现地址对应 CDN 专用的 DNS 服务器，将解析权交给地址 CNAME 指向的 CDN 专用的 DNS 服务器。
2. CDN 专用 DNS 服务器返回 CND 全局负载均衡 ip。
3. 用户请求该 ip。
4. 全局负载均衡设备根据用户地址选择一个区域负载均衡的 ip 发送请求。
5. 区域负载均衡选择并返回合适 ip 给全局负载均衡。
6. 全局负载均衡返回数据给用户。
7. 用户向缓存服务器发起请求并得到响应。
8. 如果没有，缓存服务器向上级缓存服务器请求，直到网站服务器。如果是流媒体，则是通过主动推送，而不是被动然后向上级查找。
> CNAME 就是域名的一个别名。CNAME 指向域名，域名指向 ip。


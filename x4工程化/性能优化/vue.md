图片
webpack 引入资源的时候有 base64和打包到 dist 目录下两种的方式，前者可以减少 http 请求。页面中通过路径引入的图片，实际上都会向服务器发送一个请求拿到这张图片。对于资源较小的文件，设置成 base64，既可以减少请求，也不会影响到页面的加载性能。

表格
[Vue3 Table 性能优化，减少 85% 渲染耗时 (qq.com)](https://mp.weixin.qq.com/s?__biz=MzUxNTkxNDY1Nw==&mid=2247486356&idx=1&sn=c9de21086c231544de8ff01d202c8276&chksm=f9ae255aced9ac4c9a01ef204088323991991d0536f076bd9a356e37ee6e913c4bd7e6d433b9&cur_album_id=1817691334581813257&scene=189#wechat_redirect)
data 与 columns 从 ref 改 shallowRef 后。-   修改 table 源码，将 data 与 columns 从 ref 改为 shallowRef。

getColspanRealWidth 优化后。-   修改 table 源码，getColspanRealWidth 函数中响应式数据优化。

业务优化去除 tooltip disabled 属性后。-   业务优化：去掉 el-tooltip disabled 属性，改为 if。

渲染
  // 先展示 loading  
  showLoading.value = true;  
  // 200ms 后再修改 table 是否显示，防止和 loading 合并到一个渲染周期，导致 loading 不显示  
  setTimeout(() => {
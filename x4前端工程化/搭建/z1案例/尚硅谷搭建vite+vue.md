# 项目搭建记录

1. pnpm+vite+vue+ts `pnpm create vite` `cd rfid` `pnpm i` 安装失败，报错vite包未找到。原因是我使用的是国内镜像，npm在国内镜像可以找到包，但是pnpm可能找不到。 切换回官方镜像 `pnpm config set registry https://registry.npmjs.org/` 查看目前的地址 `pnpm get registry` 参考文章：[https://article.juejin.cn/post/7245838232012488764](https://article.juejin.cn/post/7245838232012488764) `pnpm dev` 结果：正常启动。
    
2. vscode 插件volar、volarts版、vue vscode snippets。 禁用eslint。 删除样式文件style.css 重置App.vue v3tss(vue vscode snippets)
    
3. eslint
    

pnpm i eslint -D  
npx eslint --init  
2/esm/ts/

4. vite配置 server.open设true
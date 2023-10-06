## 功能
1. 托管静态资源。
1. 自动部署。
3. 加速 Git Pages。
4. 免费的 ssl 证书。
5. 接入电子邮件等功能。
6. 给你的域名配置 dns 服务器。

## hexo
```
npm i -g hexo
hexo init project-name
cd project-name
hexo g
# 配置_config.yml之后可以自动部署
npm install hexo-deployer-git --save
hexo d
```

## git
```
git remote add origin https://xxx.git
git add ./
git commit -m "xxx"
git push --set-upstream origin main
```

## netlify
1. 选择分支、清空 build setting。
2. 设置域名 Domain。到供应商设置域名解析的 cname 的@
3. 和www指针。
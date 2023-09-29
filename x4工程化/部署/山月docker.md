```
nginx配置
location下
add-header X-key value;
gzip on;
expires -1;设置了就是headers的Cache-control的值max-age=xxx
```

部署前端项目
```
FROM node:14-alpine as builder
 
WORKDIR /code
 
# 单独分离 package.json，是为了安装依赖可最大限度利用缓存
ADD package.json yarn.lock /code/
RUN yarn
 
ADD . /code
RUN npm run build
 
# 选择更小体积的基础镜像
FROM nginx:alpine
COPY --from=builder code/build /usr/share/nginx/html
```

```
version: "3"
services:
  simple:
    build:
      context: .
      dockerfile: simple.Dockerfile
    ports:
      - 4000:80
```

docker-compose up --build simple
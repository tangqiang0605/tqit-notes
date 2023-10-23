[手摸手，带你用vue撸后台 系列一（基础篇） - 掘金 (juejin.cn)](https://juejin.cn/post/6844903476661583880)

bulid
config：配置，放环境变量
src：源代码
static：第三方不打包资源
favicon. ico
index. html
配置文件
package. json
.babelrc
eslintrc. js
.gitignore

src
api 请求
assets 主题、字体等静态资源
components 组件、directive 指令、filters 全局 filter、icons 所有 svg、lang 国际化、mock、styles、utils、vendor 共用vendor
permisson. js 权限管理
router、store、views
App. vue、main. js

api 与 view 一一对应。
component 放共用的，如果是某个页面所属，应该放在 views 的某个页面下。

## 起步
### webpack
配置 jquery、alias
### eslint
### axios
### 多环境
### webpack-bundle-analyzer
###  跨域
### mock
### iconfont
### router
1. 配置路由
2. 封装 router-view 使其响应路由切换
### 容器服务
后台项目会把 dist 文件夹里的东西都会打包成一个 docker 镜像，基本步骤为

```coffeescript
npm install
npm run build:prod
```

![Paste_Image.png](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2017/5/3/4b23bedbc78aa03295a4a58b73d263b8~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

主站PC站基于nodejs、Vue实现服务端渲染，所以不仅需要依赖nodejs，而且需要利用pm2进行nodejs生命周期的管理。为了加速线上镜像构建的速度，我们利用taobao源 [registry.npm.taobao.org](https://link.juejin.cn?target=https%3A%2F%2Fregistry.npm.taobao.org "https://registry.npm.taobao.org") 进行加速, 并且将一些常见的npm依赖打入了基础镜像，避免每次都需要重新下载。 这里注意下 建议不要使用cnpm install或者update 它的包都是一个link，反正会有各种诡异的bug，这里建议这样使用

```awk
npm install --registry=https://registry.npm.taobao.org复制代码
```

如果你觉得慢还是有可优化的空间如使用`webpack dll` 或者把那些第三方vendor单独打包 external出去，或者我司现在用的是http2 可以使用`AggressiveSplittingPlugin`等等，这里有需求的可以自行优化。

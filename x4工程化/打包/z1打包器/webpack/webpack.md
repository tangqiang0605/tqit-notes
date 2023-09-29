https://www.bilibili.com/video/BV1Xy4y1v7S2/?spm_id_from=333.1007.top_right_bar_window_custom_collection.content.click
ts 教程：webpack、贪吃蛇类实战
## webpack 原理

[从构建产物洞悉模块化原理 - 掘金](https://juejin.cn/post/7147365025047379981/)
[【Webpack】异步加载(懒加载)原理 - 掘金](https://juejin.cn/post/7152516872330543141/)
# 上手
[webpack 文档更新日志（9.30-10.25） - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/268925969)

- webpack 是模块打包工具，用来解决模块依赖问题。
- webpack 基于 node，将模块转为 node 的 commonjs 模块。
- 一切皆模块。indexhtml 只需导入 indexjs 即可使用 css 和 js，因为 css 在 js 中 import。

内置功能
- webpack-dev-server：本地测试服务器。一可以配置 port 和自动打开。二 webpack-dev-server 自动刷新页面（因此生成的 bundlejs 是在内存中）。webpack 会把所有 js 打包成一个 js（解决浏览器 es 6 兼容问题）而 webpackserve 则把这个文件打包到内存中（可以通过/文件名读取）。
- html-webpack-plugin 用于复制 index. js 到主页，配合 webpack-dev-server 自动展示首页。一、配置页面复制到哪里。二、自动注入 bundlejs。把指定位置的文件复制到首页（为了配合 dev-webpack-server 和模块化开发）。然后在首页中自动添加 js 的引入。

重要概念：loader 和 plugins。
loader 插件：webpack 专门针对 js 进行处理，如果不是 js 或者涉及 js 高级语法，需要安装合适的 loader 处理。配置在 module 下。

安装
`npm install webpack webpack-cli -D`

webpack. config. js
```
const path=require('path');
module.exports={
	entry:'./index.js',
	mode:'production',
	output:{
		filename:'bundle.js',
		path:path.join(__dirname,'dist')
	}
}
```
测试
```
// index.js
function sayHello(){
	console.log('hello');
	return 'world';
}
console.log(sayHello());
```

`npx webpack` 打包

```
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const path = require('path')
module.exports = {
    module: {
        rules: [
	        {
		        test:/\.(png|jpg|gif)$/,
		        use:[fileLoader,urlLoader]
	        },
	        {
		        test:/\.css$/,
		        use:['style-loader','css-loader']
	        }
	    ]
    },
    plugins: [ new CleanWebpackPlugin()]
}

const fileLoader={
	test: /\.(png|jpg|gif)$/,
	use: {
		loader: 'file-loader',
		options:{
			name:'[name]_[hash].[ext]',
			outputPath:'images/'
		}
	}
}

const urlLoader={
	loader:'url-loader',
	options:{
		name:'[name]_[hash].[ext]',
		outputPath:'images/',
		limit:102400 //100kb
	}
}

```

# 基本配置
## jquery
如果第三方库的代码中出现 ![.xxx或jQuery.xxx或window.jQuery或window.](https://juejin.cn/equation?tex=.xxx%E6%88%96jQuery.xxx%E6%88%96window.jQuery%E6%88%96window.) 则会直接报错。要达到类似的效果，则需要使用 webpack 内置的 `ProvidePlugin` 插件，配置很简单，只需要
```actionscript
new webpack.ProvidePlugin({
  $: 'jquery' ,
  'jQuery': 'jquery'
})
```
这样当 webpack 碰到 require 的第三方库中出现全局的$、jQeury和window.jQuery 时，就会使用 node_module 下 jquery 包 export 出来的东西了。
链接： https://juejin.cn/post/6844903476661583880  

## alias
依据个人或团队规范：
```js
resolve: { 
	alias: { 
	'~':resolve(__dirname, 'src'),
	'src': path.resolve(__dirname, '../src'), 
	'components': path.resolve(__dirname, '../src/components'), 
	'api': path.resolve(__dirname, '../src/api'), 
	'utils': path.resolve(__dirname, '../src/utils'), 
	'store': path.resolve(__dirname, '../src/store'), 
	'router': path.resolve(__dirname, '../src/router')
	} 
} 
//使用 
import stickTop from '~/components/stickTop'
```

# 装载器和插件
## eslint
eslint+vscode-eslint
vscode 配置

## loader
https://mp.weixin.qq.com/s/nzDOwkIXCmErycuBtTgg1Q
https://mp.weixin.qq.com/s/T9H5HYpo-MBgZiSnaHTi0A
https://mp.weixin.qq.com/s/oCbuOkQku3gDGw-6b4C04Q
loader 先从左往右执行每个 loader 的 pitch，再从右往左链式执行 loader 本身。

file-loader 使用了 Raw loader。

loader/plugins

loader 直接 use
plugins 引入然后配置

# 实例
## 开发一个 loader


## 优化

### 提高构建速度
多线程加载器
`npm i thread-loader -D`
缓存加载器
`npm i cache-loader -D`
```
{
	test:/.js$/,
	use:[
		'thread-loader',
		'cache-loader'
	]
}
```

热更新（webpack 内置插件）
```
const webpack=require('webpack');

{
	plugins:[new webpack.HotModuleReplacementPlugin()],
	devServer:{hot:true}
}
```

exclude 不需编译
```
{
	test:/.js$/,
	include:path.resolve(__dirname,'../src'),
	exclude:/node_modules/,
}
```

### 压缩打包文件
压缩 css 代码
`npm i css-minimizer-webpack-plugin -D`
压缩 js 代码
`npm i terser-webpack-plugin -D`
bundle 分析
`npm i webpack-bundle-analyzer -D`
gzip：常用文件压缩算法。提高传输效率。
`npm i compression-webpack-plugin -D`
```
const CssMinimizerPlugin=require('css-minimizer-webpack-plugin');
const TerserPlugin=require('terser-webpack-plugin');
const {BundleAnalyzerPlugin} =require('webpack-bundle-analyzer');
const CompressionPlugin=require('compression-webpack-plugin');

optimization:{
	minimizer:[
		new CssMinimizerPlugin(),
		new TerserPlugin({
			terserOptions:{
				compress:{
					drop_console:true
				}
			}
		}),
	]
}

plugins:[
		new BundleAnalyzerPlugin(),
		new CompressionPlugin({
			algorithm:'gzip',
			threshold:10240,
			minRatio:0.8
		})
]
```
tree-sharking（webpack 生产模式默认开启）
source-map：用于压缩后定位。开发时生成大的细的，生成时生成小的粗略的。
```
// dev
module.exports={
	mode:'development',
	devtool:"eval-cheap-module-source-map"
}
// prod
module.exports={
	mode:'development',
	devtool:"nosources-source-map"
}
```
base 64 减少网络 io
```
{
	test:/.(png|jpe?g|gif|svg|webp)&/,
	type:'asset',
	parser:{
		dataUrlCondition:{
			maxSize:20*1024,
		}
	},
	generator:{
		filename:'images/[contenthash][ext][query]',
	}
}
```
哈希缓存
```
output:{
	path:path.resolve(__dirname,'../dist'),
	filename:'js/chunk-[contenthash].js',
	clean:true
}
```

## vuecli的项目配置
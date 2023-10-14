## 封装
1. 创建实例（设置 baseURL 、请求超时时间）
2. 请求拦截器（配置 token）
3. 响应拦截器（响应服务器的响应，比如 token 校验）
4. 导出实例

## axios 配置
请求数据的单向数据流：vue 页面使用 store，store 调用 api，api 使用封装的 axios。
```
import axios from 'axios';

// axios是一个拥有很多静态方法的函数。
axios({url,method,data}); // 直接调用
axios.defaults.baseURL='xxx'; // 设置属性
axios.defaults.timeout=60000;

// token在拦截器里设置更合适
service.defaults.headers.common['Authorization']='token';
// 可以不设置。放这里是为了知道有这种操作。
service.defaults.headers.post['Content-Type']='application/x-www-form-urlencoded';
service.defaults.headers.get['Content-Type']='application/x-www-form-urlencoded';
```
实例
```
不管是axios还是create创建的对象，都是实例，都拥有同样的方法属性。
create的意义在于，你可以创建多个实例并设置不同的配置。
通常使用service、request表示create的单例。
const service = axios.create(axios.defaults); // 创建实例
```
封装

```
import axios from 'axios';
import {config} from './config';

// 第一、二步，创建单例并配置普通属性
const service=axios.create(config);

// 第三步，配置拦截器
service.interceptors.request.use(reqInterceptor,handleReqErr);
service.interceptors.response.use(resInterceptor,handleResErr);

export default service;
```
config
```
config：
{
	baseURL:config.baseURL来自配置文件的前缀
	tiemout:5000,
	// 以上两个足矣
	withCredentials:true, //跨域携带cookie
	headers:{'X-Custom-Header':'xxx'}
}
```

option 嗅探请求跨域问题：
后端设置 Access-Control-Allow-Origin:*
或者前端配置代理proxy

创建单例、使用 baseURL

设置拦截

导出实例

## axios 封装一
1. 没有使用单例
2. 对 request 的封装不够好（要自己填 post、get 字符串）。
3. 没有使用@而是使用相对路径./../
4. 接口路径不规范，应该使用：get_user-name 类似格式而不是小驼峰。

### 接口管理
```
// src/api/api.js
import { request } from './axios.js';

export class UserApi{
	static async login(params){}
	static async register(params){}
	static async getUserInfo(params){}
}
```

## 前端解决跨域
（json、proxy）
proxy, server 的 host、port、proxy（target、changeOrigin、rewrite）
```
// vite.config.js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
	plugins:[vue()],
	server:{
		host:'127.0.0.1',
		port:3000,
		proxy:{
			'/api':{
				target:'',
				changeOrigin:true,
				rewrite:(path)=>path.replace(/^\api/,'');
			}
		}
	}
	server:{
		cors:true,
		open:true,// 自动打开
		port:5173,
		proxy:{
			'^/api':{
				target:'http://127.0.0.1:8080/',
				changeOrigin:true,
				rewrite:(path)=>path.replace(/^\/api/,'')
			}
		}
	}
})
```

### vite 分环境
```
env后面对应vite命令参数mode的值

.env.dev
NODE_ENV='development'

.env.prod
NODE_ENV='production'
```
脚本：
```
script:{
	"build-only": "vite build --mode production"
}
```
环境值参考（来源网络）：
![[Pasted image 20230412171547.png]]
## 类封装
```
import axios from 'axios'
import type {AxiosInstance,AxiosRequestConfig,AxiosResponse,InternalAxiosRequestConfig} from 'axios';

class Request {
	instance:AxiosInstance
	constructor(config:AxiosRequestConfig){
		this.instance=axios.create(config);
		this.instance.interceptors.request
			.use((res:AxiosRequestConfig)=>res,(err:any)=>err);
		this.instance.interceptors.response
			.use((req:AxiosResponse)=>res,(err:any)=>err);
	}
	request(config:AxiosRequestConfig){
		return this.instance.request(config);
	}
}

export default Request;
```
使用
```
import request from '@/utils/request.ts';

const a=new request(config);

a.request(config);
```

## 全局loading
发送请求时，累计请求+1，收到响应时，累计请求-1，大于 0，启动加载动画，等于 0，关闭动画。

动画组件从 store 读取累计请求。axios 会更新 store 中的累计请求。
1. 自定义动画组件。（fixed、absolute、keyframes）
2. 全局引入
3. store 配置对应方法（showLoading 变量，updateLoading 方法）
4. 计数模块。增加，减少，设置组件。
5. 拦截器调用计数模块函数。请求拦截增加，响应拦截减少。

## 加密
npm install crypto-js@^4.0.0

## 接口测试
使用 springboot、nodejs、express、koa、mock 工具 提供接口。

## 拦截器
用于动态设置 token（推荐）
![[Pasted image 20230412191011.png]]

响应拦截
不足：200 或 response. config. responseType=== 'blob'即文件流也直接返回。
![[Pasted image 20230412191625.png]]
## axios 二次封装
axios 对底层网络请求 api 的封装。在浏览器中运行使用 xhr。在 nodejs 中运行使用 http 模块。

`npm i axios`

使用方法：
1. 像 fetch 一样直接使用。
2. 二次封装 axios，适应业务需求，减少代码量。

二次封装：创建实例，挂载配置（请求头、拦截器），导出实例（即完成单例模式的创建）
```js
import axios from "axios";  
// import router from "@/router";  
import {config} from "@/config/index.ts";  

创建实例
const service = axios.create({  
baseURL: config.baseUrl,  
timeout: 5000,  
withCredentials: false,  
headers: {'X-Custom-Header': 'zuiyu'}  
})  
全局配置
service.defaults.headers.common['Authorization'] = "AUTH_TOKEN";  
service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';  
service.defaults.headers.get['Content-Type']='application/x-www-form-urlencoded'  

请求拦截器  
service.interceptors.request.use(function (req) {  
console.log(config,req)  
// if (config.loading) {  
// }  
return req;  
}, function (error) {  
// 对请求错误做些什么  
return Promise.reject(error);  
});  

响应拦截器  
service.interceptors.response.use(function (response) {  
const res = response.data;  
if (res.code !== 200) {  
// token 过期  
if (res.code === 401)  
// 警告提示窗  
return;  
if (res.code == 403) {  
return;  
}  
// 若后台返回错误值，此处返回对应错误对象，下面 error 就会接收  
return Promise.reject(new Error(res.msg || "Error"));  
}  
return response;  
}, function (error) {  
// 对响应错误做点什么  
if (error && error.response) {  
switch (error.response.status) {  
case 400:  
error.message = "请求错误(400)"  
break  
case 401:  
error.message = "未授权,请登录(401)"  
break  
case 403:  
error.message = "拒绝访问(403)"  
break  
case 404:  
error.message = `请求地址出错: ${error.response.config.url}`  
break  
case 405:  
error.message = "请求方法未允许(405)"  
break  
case 408:  
error.message = "请求超时(408)"  
break  
case 500:  
error.message = "服务器内部错误(500)"  
break  
case 501:  
error.message = "服务未实现(501)"  
break  
case 502:  
error.message = "网络错误(502)"  
break  
case 503:  
error.message = "服务不可用(503)"  
break  
case 504:  
error.message = "网络超时(504)"  
break  
case 505:  
error.message = "HTTP版本不受支持(505)"  
break  
default:  
error.message = `连接错误: ${error.message}`  
}  
} else {  
if (error.message == "Network Error") error.message == "网络异常，请检查后重试！"  
error.message = "连接到服务器失败，请联系管理员"  
}  
return Promise.reject(error);  
});  
  
export default service
```

## axios 分环境
[Vue3集成axios分环境调用 (qq.com)](https://mp.weixin.qq.com/s/KCxiOrnzg5V6Qy9fOR3g6A)
dev 开发环境，prod 生产环境

1. 编写环境文件
2. 配置环境信息并导出@/config/index. ts
3. 修改 packagejson 的 vite script
4. 封装 request
5. 配置反向代理 vite. config. ts

## axios 优化
请求动画：请求开始时加载动画，请求结束时结束动画，应该封装到 axios 中。如果多个请求，会导致动画被前面某个请求关闭。



## 参考文章
[十分钟封装一个好用的axios，省时又省力他不香吗 - 掘金](https://juejin.cn/post/7090889657721815076?searchId=20231014103922CED99F141000F468251B)，除了开头有些废话，最后的用例是符合我的习惯的，推荐阅读学习。
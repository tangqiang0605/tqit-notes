## 封装
1. 创建实例（baseURL 从环境取，请求超时时间）
2. 请求拦截器（配置 token）
3. 响应拦截器（响应服务器的响应比如 token 校验）
4. 导出实例
5. 使用：执行实例：实例（）


## axios 配置
vue 页面使用 store，store 调用 api，api 使用封装的 axios。
```
引入axios
从包里引入进来的axios是一个提供很多静态方法的函数。可以直接调用它，或者使用它的属性、方法。
import axios from 'axios';

axios({url,method,data});// 直接调用
axios.defaults.baseURL='xxx';// 设置属性
axios.create(axios.defaults);// 使用方法（创建单例）

不管是axios还是create创建的对象，都是单例，都拥有同样的方法属性。
create的意义在于，你可以创建多个单例并设置不同的baseURL。
下面用service表示create的单例。
```

```
设置拦截器
service.interceptors.request.use(reqInterceptor,handleReqErr);
service.interceptors.response.use(resInterceptor,handleResErr);
```

option 嗅探请求跨域问题：
后端设置 Access-Control-Allow-Origin:*
或者前端配置代理proxy

创建单例、使用 baseURL

设置拦截

导出单例

## axios 封装一
1. 没有使用单例
2. 对 request 的封装不够好（要自己填 post、get 字符串）。
3. 没有使用@而是使用相对路径./../
4. 接口路径不规范，应该使用：get_user-name 类似格式而不是小驼峰。
```
yarn add axios
```
axios 二次封装
```
// src/api/axios.js
import axios from 'axios';
import { useCommonStore } from '../store/module/common.js';
import { storeToRefs } from 'pinia';

// 全局配置
axios.defaults.timeout=60000;
axios.defaults.baseURL='';

// 拦截器
axios.interceptors.request.use(reqInterceptors,handleReqError);
axios.interceptors.response.use(resInterceptors,handleResError);

// 封装请求
export {request};
```
没必要，但可以了解 axios 的用法。
![[Pasted image 20230412191502.png]]
接口管理
对这段代码的评价：要用 get、post 字符串，封装之后更麻烦。api 地址不应是小驼峰，路径一般不区分大小写，建议使用 kebab-case。
```
// src/api/api.js
import { request } from './axios.js';

export class UserApi{
	static async login(params){
		return request('/login',params,'post');
	}
	static async register(params){
		return request('/register',params,'post');
	}
	static async getUserInfo(params){
		return request('/userInfo',params,'get');
	}
}

export class BookApi{
	static async getBookList(params){
		return request('/bookList',params,'get');
	}
}
```

逻辑层
```
// xxx.vue
import { UserApi } from '../api/api.js';
const login=async ()=>{
	const params={
		username:'admin',
		password:'1234',
	}
	const res=await UserApi.login(params);
}
```

前端解决跨域（json、proxy）
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
})
```

## axios 封装二
1. 有分环境
2. 不需要封装 request 方法。

yarn add axios

### 配置
vite 分环境
```
.env.dev
NODE_ENV='development'

.env.prod
NODE_ENV='production'
```
![[Pasted image 20230412171547.png]]
```
script:{
"build-only": "vite build --mode production"
其他mode
}
```
### 封装
```
import axios from 'axios';
import {config} from '@config';

// 第一、二步，创建单例并配置普通属性
const service=axios.create(config);

// 第三步，配置拦截器
service.interceptors.request.use(reqInterceptor,handleReqErr);
service.interceptors.response.use(resInterceptor,handleResErr);

export default service;
```
```
config：
{
	baseURL:config.baseURL来自配置文件的前缀
	tiemout:5000,
	以上两个足矣
	withCredentials:false,
	headers:{'X-Custom-Header':'xxx'}
}
```

```
不必要的配置
// config中设置单例属性（类似全局静态属性的内容，axios.defaults.timeout）.
// 请求头只能在defaults中设置。
// token在拦截器里设置更合适
service.defaults.headers.common['Authorization']='token';
// 可以不设置。放这里是为了知道有这种操作。
service.defaults.headers.post['Content-Type']='application/x-www-form-urlencoded';
service.defaults.headers.get['Content-Type']='application/x-www-form-urlencoded';
```
### 反向代理
前端解决跨域问题的办法。
```
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
```

### 使用
```
api.js

import service from '@/util/request.js';
export const getSomething=()=>service.get('/get_something');
export const testPost=(params)=>service.post('/test/post',{
	params,
	{
		x-www-form-urlencoded用于表单提交
		headers:{'Content-Type':'application/x-www-form-urlencoded'}
	}
})
```

## axios 封装 3
```
import axios from 'axios'
import type {AxiosInstance,AxiosRequestConfig,AxiosResponse,InternalAxiosRequestConfig} from 'axios';

class Request {
	单例
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

request(config);
```

```
类拦截器

```

## 请求中动画
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


## alova
axios 弱点：
1. 与框架弱绑定，需自行维护。
2. 性能无作为。重复请求、同时多个请求。
3. 体积 11+kb。
4. ts 迷惑。

alova 优点：
1. 请求缓存
2. 请求共享：
3. 提供加载状态
4. 4 kb+

```
// axios
import axios from 'axios';
import {ref,onMounted} from 'vue';

const loading=ref(false);
const error=ref(null);
const data=ref(null);

const requestData=()=>{
	loading.value=true;
	或者使用try-catch，在二者没有什么区别。
	axios.get('http://xxx/index')
		.then(result=>{data.value=result})
		.catch(e=>{error.value=e})
		.finally(()=>{loading.value=false});
}
onMounted(requestData);

// alova
import { createAlova, useRequest } from 'alova';
const pageData=createAlova({baseURL}).Get('/index');
const {loading,data,error} =useRequest(pageData);
```

## 拦截器
用于动态设置 token（推荐）
![[Pasted image 20230412191011.png]]

响应拦截
不足：200 或 response. config. responseType=== 'blob'即文件流也直接返回。
![[Pasted image 20230412191625.png]]
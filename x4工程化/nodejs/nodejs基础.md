在浏览器中全局对象是 window，在 Node 中全局对象是 global。

认识nodejs
1. js=es+webapi（dom+bom）
2. js运行环境：浏览器（解析引擎）nodejs（基于ChromeV8引擎）


## 安装
卸载 nodejs。使用 geek 或系统即可。

安装 nvm。下载 exe。
https://github.com/coreybutler/nvm-windows/releases/tag/1.1.11 。

运行。设置一个 nvm 安装位置，并在该位置下创建 nodejs 文件夹，存放 nodejs。
nvm 安装位置配置 settting. txt。
```
node_mirror: https://npm.taobao.org/mirrors/node/

npm_mirror: https://npm.taobao.org/mirrors/npm/
```

`nvm -v`
`nvm install 18.16.0`
`nvm list`

## 模块化开发

JavaScript 开发弊端：
1. 全局污染
2. 命名冲突（一个文件里的变量和另一个文件里的变量同名）
3. 线性依赖关系（外联引入）。

解决方法：
1. Java 式命名空间。
2. 变量前加_(jquery 库和 vue 使用$, lodash 使用_)。
3. 对象写法：相当于有了一层命名空间，但是变量是公有的，不妥当。
4. IFFE。
5. commonjs 深拷贝、树状结构。

### commonjs
exports 是 module.exports 的别名（exports 指向 module. exports）。最终输出以 module. exports 为准。

### 内置模块
文件模块
```
const fs=require('fs');
fs.readFile('fileUrl',cb);
fs.writeFile(filename,data,cb);
```

路径模块
1. 不同系统的分割符不同：linux 是左斜杠、windows 是右斜杠（参考‘八’字）。
```
const path=require('path');
path.join(__dirname,'b','c');
```

### 第三方模块
1. 全局模块。通过命令行 cli 交互。通常是一些脚手架。
2. 局部模块。导入暴露的方法使用。
3. 使用 npm 进行安装、管理。

`npm i nrm -g`
`npm i nrm open@8.4.2 -g`
`nrm ls`
`nrm use taobao`

## 开发服务器
get
```
const http=require('http');
const url=require('url');
const app=http.createServer();

app.on('request',(req,res)=>{
	解析query
	let {query,pathname}=url.parse(req.url,true);

	req.headers
	req.method
	res.writeHead(200,{'Content-Type':'text/html;charset=utf8'})

	if(pathname=='/'){
		res.end('<h1>首页</h1>')
	}
})
app.listen(3000);
```

post 需要监听 data 事件和 end 事件。
```
const querystring=require('querystring');
app.on('request',(req,res)=>{
	let postData='';
	req.on('data',(chunk)=>postData+=chunk);
	req.on('end',()=>{
		//接收到的post请求体内容
		console.log(querystring.parse(postData))
	})

})
```

响应静态资源
```
const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');
const mime = require('mime');

const app = http.createServer();

app.on('request', (req, res) => {
	// 获取用户的请求路径
	let pathname = url.parse(req.url).pathname;

	pathname = pathname == '/' ? '/default.html' : pathname;

	// 将用户的请求路径转换为实际的服务器硬盘路径
	let realPath = path.join(__dirname, 'public' + pathname);

	let type = mime.getType(realPath)

	// 读取文件
	fs.readFile(realPath, (error, result) => {
		// 如果文件读取失败
		if (error != null) {
			res.writeHead(404, {
				'content-type': 'text/html;charset=utf8'
			})
			res.end('文件读取失败');
			return;
		}

		res.writeHead(200, {
			'content-type': type
		})

		res.end(result);
	});
});

app.listen(3000);
console.log('服务器启动成功')

```


**客户端请求途径**

1.  GET方式

-   浏览器地址栏
-   link标签的href属性
-   script标签的src属性
-   img标签的src属性
-   Form表单提交
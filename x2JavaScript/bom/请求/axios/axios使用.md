## get 请求
在实践中我一般使用 `request.get`（request 是 axios 的实例），这样代码量更小。

推荐写法：
```
axios.get<any,response>(url,{params})
```
通用写法：
```
// 请求/test_get?id=123
axios({
	method:'get',
	url:'/test_get',
	params:{
		id:123
	}
})
```
其它写法：
```
axios({url,params})
```
## post 请求
### 提交表单
```
// config中包含请求头的设置
// 推荐写法
axios.post('/test_post',data,config,
	{
		x-www-form-urlencoded用于表单提交
		headers:{'Content-Type':'application/x-www-form-urlencoded'}
	})
// 通用写法
axios({	...config,url,method,data})
```

提交文件
```
const data={id:123}

// 普通数据转formData
function toFormData(data){
	let formData=new FormData();
	for(let key in data){
		formData.append(key,data[key]);
	}
	return formData;
}

axios({
	method:'post',
	url:"/test_upload"
	data:toFormData(data);
})

```

put/patch/delete 和 post 只有 method 区别。

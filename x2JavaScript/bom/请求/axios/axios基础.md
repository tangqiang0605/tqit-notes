## get 请求
推荐写法：
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

其他写法：
```
axios('/test_get');
axios({method:"get",url:"/test_get"});
axios.get('/test_get',{params:{id:123}});
```

## post 请求
提交表单
```
config中包含请求头的设置
option包含url、method和data

axios({
	...config,
	...option
})

axios.post('/test_post',data,config)
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

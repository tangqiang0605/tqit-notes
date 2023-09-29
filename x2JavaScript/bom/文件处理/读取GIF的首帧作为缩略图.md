


-   未标记块：Header（文件头）、Logical Screen Descriptor（逻辑屏幕描述符）、Global Color Table（全局颜色表）、局部颜色表（Local Color Table）

从 Header 开始顺着箭头一直读到 PlainTextExtension 完成第一帧的读取，其中 GlobalColorTable、ApplicationExtension、CommentExtension、LocalColorTable、PlainTextExtension 不一定存在。

-   接下来重复GraphicControlExtension、ImageDescriptor、ImageData 读取剩下的帧图片数据

-   控制块：图形控制扩展（Graphics Control Extension）
    
-   图形渲染块：纯文本扩展（Plain Text Extension）、图像描述符（Image Descriptor）

-   图像数据块：图像数据（Image Data）

-   特殊用途块：应用扩展（ Application Extension）、注解扩展（Comment Extension）、数据流结束标记（Trailer）


![[Pasted image 20230430163048.png]]


header：占 6 个字节 0-5。GIF 89a
logical screen descriptor：7 个字节 6-12。其中 10 标记下一块 Global color table 的大小。

起始：pos=13
```
palette = getBitArray(dataView.getUint8(10));

3 * Math.pow(2, 1 + bitToInt(palette.slice(5, 8)));
```
global color table：大小为 `3*2^(N+1)`

起始：pos+= `3*2^(N+1)`
每帧
graphic control extension
如果存在，下一个起始：+8

image descriptor 2c 开始，+10

每解析完一轮 Image Descriptor 都需要读取下 Data Sub-blocks（数据子块，属于image Data），直至所有子块被读取完毕。


计算机中的文件都是以流结构存储的。gif 文件也是如此。

gif 的文件流是由不同类型的块组成的：未标记块+控制块+图形渲染块+特殊用途块+图像数据块。每个块都有自己的编码标记起始位。

解析 gif 就是对 gif 的文件流结构进行解析：
1. 读取流
2. 处理流
3. 输出流

## 读取流
input 标签需要设置 type 属性的值为‘file’，选中文件后，可以通过 files 属性读取 File 对象。
```JavaScript
const input= querySelector('input');
input.addEventListener('change',(e)=>{
	const blob=e.target.files[0];
```

或者通过请求的方式直接获取 Blob 对象：
```JavaScript
使用XMLHttpRequest
const xhr= new XMLHttpRequest();
xhr.open('get','/walking.gif');
xhr.send();
xhr.responseType='blob';
xhr.onreadystatechange = ()=>{
	if(xhr.readyState===XMLHttpRequest.DONE&& xhr.status===200){
		const {response:blob}=xhr;		
	}
}

使用fetchAPI
const blob=await fetch(new Request('/walking.gif')).then(res=>res.blob());
```

File 是 Blob 的子类。二者都是 JavaScript 中的内置类。要读取类中存储的数据，需要转换为 ArrayBuffer。Blob 是类文件类型，存储的数据中还区分了文件的元数据。而 ArrayBuffer 中存储的是文件的纯二进制形式的数据。
```
const reader = new FileReader();
reader.readAsArrayBuffer(blob);
reader.onload = (e) => {
	const buffer=e.target.result;// result是一个ArrayBuffer对象
}
```

使用 DataView 读取 ArrayBuffer 中的数据。不同平台对于二进制存储的字节序不同，DataView 使用统一的 API 忽略了这些底层细节。使用 DV 读取第一个字节。
```
const dv=new DataView(buffer);
const code=dv.getUint8(0); // 读取前8位比特
console.log(String.fromCharCode(code)); // 将编码转为unicode，输出 G
```

转换过程的完整代码：
```
async function getBuffer(path){
	const blob=await fetch(path).then(res=>res.blob());
	const reader=new FileReader();
	reader.readAsArrayBuffer(blob);
	reader.onload=(e)=>readBuffer(e.target.result);
}

function readBuffer(buffer){
	const dv = new DataView(e.target.result);
	let data = '';
	for (let i = 0; i < dv.byteLength; i++) {
		data += String.fromCharCode(dv.getUint8(i));
	}
	console.log(data);
}

getBuffer('walking.gif');
```

使用 fetchAPI 可以简化上述过程，一行代码搞定：
```
async function parseGif(path){
	const dv=await fetch(path).then(res=>res.arrayBuffer()).then(buffer=>new DataView(buffer));
	// 解析部分
}
```

## 处理流

3. 未标记块：文件头+逻辑屏幕描述符+全局颜色表+局部颜色表。
4. 控制块：图形控制拓展
5. 图形渲染块：纯文本拓展、图像描述符
6. 特殊用途块：
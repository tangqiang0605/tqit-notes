

## Blob
`Blob` 对象表示一个不可变、原始数据的类文件对象。它的数据可以按文本或二进制的格式进行读取。可以转换成 [`ReadableStream`](https://developer.mozilla.org/zh-CN/docs/Web/API/ReadableStream) 来用于数据操作。
Blob 表示的不一定是 JavaScript 原生格式的数据。[`File`](https://developer.mozilla.org/zh-CN/docs/Web/API/File) 接口基于 `Blob`，继承了 blob 的功能并将其扩展以支持用户系统上的文件。

创建 Blob：
使用构造方法转化其他类型
从 blob 中 slice
使用 file 读取一个blob

## File
[`File`](https://developer.mozilla.org/zh-CN/docs/Web/API/File) 接口基于 `Blob`，继承了 blob 的功能并将其扩展以支持用户系统上的文件。

通常情况下， `File` 对象是来自用户在一个 [`<input>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input) 元素上选择文件后返回的 [`FileList`](https://developer.mozilla.org/zh-CN/docs/Web/API/FileList) 对象（dom. files），也可以是来自由拖放操作生成的 [`DataTransfer`](https://developer.mozilla.org/zh-CN/docs/Web/API/DataTransfer) 对象，或者来自 [`HTMLCanvasElement`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCanvasElement) 上的 `mozGetAsFile` () API。
`File` 对象是特殊类型的 [`Blob`](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob)，且可以用在任意的 Blob 类型的 context 中。比如说， [`FileReader`](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader), [`URL.createObjectURL()`](https://developer.mozilla.org/zh-CN/docs/Web/API/URL/createObjectURL), [`createImageBitmap()` (en-US)]( https://developer.mozilla.org/en-US/docs/Web/API/createImageBitmap "Currently only available in English (US)"), 及 [`XMLHttpRequest.send()`]( https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest#send ()) 都能处理 `Blob` 和 `File`。

## URL
页面元素往往接受一个 url 字符串作为参数，而不是 blob 或者 file 。
```
node.src='url'
node.setAttribute('src','url')
```

创建 blob
```
const obj = {hello: 'world'};
const blob = new Blob([JSON.stringify(obj, null, 2)], {type : 'application/json'});
```

blob 的转换
```
创建类型化数组
const bytes = new Uint8Array(59);
for (let i = 0; i < 59; i++) {
	bytes[i] = 32 + i;
}

转化为blob
const blob=new Blob([typedArray.buffer],{type: mimeType});

blob转化为url
const url=URL.createObjectURL(blob)
```

读取 blob
```
方法一：FileReader
const reader = new FileReader();
reader.readAsArrayBuffer(blob);
reader.addEventListener('loadend', () => {
   // reader.result 包含被转化为类型化数组的 blob 中的内容
});

方法二：Response
const text=await (new Response(blob)).text();

方法三
const text=await blob.text();
```

读取文件
```
从input读取
const input=document.getElementById('input');
const file=input.files[0];
```

文件信息
```
file.name
file.size
file.type
```

使用文件作为图片
```
const reader = new FileReader();
reader.readAsDataURL(file);
reader.onload = (e) => {
  img.src = e.target.result;
};

方法二
const objectUrl=URL.createObjectURL(blob);  // file是blob的子类
img.onload=()=>URL.revokeObjectURL(objectUrl); // 使用后要释放
```

上传文件
```
const reader=new FileReader();
reader.readAsBinaryString(file);
reader.onload=(e)=>{xhr.send(e.target.result)}
```

## 参考
[Blob - Web API 接口参考 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob)
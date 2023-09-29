[https://mp.weixin.qq.com/s?\_\_biz=MzA4Njg4MDgwNQ==&mid=2247484494&idx=1&sn=bf8b77143997ded378d7c3e632c54beb&chksm=9fc0a304a8b72a12cbb7db9de62524e7245dba7812d8a69689554fe5472e5e6e2533d655667c&scene=21#wechat\_redirect](https://mp.weixin.qq.com/s?__biz=MzA4Njg4MDgwNQ==&mid=2247484494&idx=1&sn=bf8b77143997ded378d7c3e632c54beb&chksm=9fc0a304a8b72a12cbb7db9de62524e7245dba7812d8a69689554fe5472e5e6e2533d655667c&scene=21#wechat_redirect)

## stringify
JavaScript 中，JSON.stringify() 是一个内置函数，用于将 JavaScript 对象转换为 JSON 字符串。

stringify () 函数具有以下属性：replacer 是一个可选的参数，它可以是一个函数或一个数组。它用于指定需要序列化的对象的属性。当 replacer 是一个函数时，它将被应用于对象的每个属性，可以用来过滤、替换或转换属性的值。当 replacer 是一个数组时，只有数组中包含的属性才会被序列化。

space 是一个可选的参数，用于控制生成的 JSON 字符串的缩进和格式化。它可以是一个数字表示缩进的空格数，或者是一个字符串表示缩进的字符串。

如果要序列化的对象具有 toJSON() 方法，那么该方法将被调用

### 应用
1. 数据传输、发送。
2. 数据存储。LocalStorage 只能存字符串。

### 注意事项
[[深拷贝与浅拷贝]]
循环引用
如果要序列化的对象存在循环引用，即对象之间相互引用，会导致无限递归的情况。为了避免死循环，可以在 replacer 函数中使用 WeakSet 或其他方式来检测循环引用，并在检测到循环引用时抛出错误或采取其他处理方式。

特殊类型
特殊类型（如**日期Date和正则表达式RegExp**）需要进行适当的处理，以确保正确的序列化和反序列化。
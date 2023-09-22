对象的特殊属性

const obj = {};

//定义属性
Object.defineProperty (obj, Symbol. toStringTag, { value: "Module" });

//查看自定义类型
console.log (Object.prototype.toString.call (obj)) //'[object Module]'改变了类型为 Module

作者：不要秃头啊
链接： https://juejin.cn/post/7147365025047379981/
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
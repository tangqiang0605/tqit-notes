[Date类：日期和时间处理 | 编程时光](https://www.coding-time.cn/js/advance/Date%E7%B1%BB%EF%BC%9A%E6%97%A5%E6%9C%9F%E5%92%8C%E6%97%B6%E9%97%B4%E5%A4%84%E7%90%86.html#_4-2-%E8%AE%A1%E7%AE%97%E4%B8%A4%E4%B8%AA%E6%97%A5%E6%9C%9F%E4%B9%8B%E9%97%B4%E7%9A%84%E5%A4%A9%E6%95%B0%E5%B7%AE)
1. 在深拷贝或浅拷贝（JSON. stringify）中要注意特殊处理[[深拷贝与浅拷贝]]

Date 是一个构造函数，其 prototype 属性指向原型对象，而原型对象的 constructor 又指向构造函数。在对象实例中，引用其 constructor 将按原型链寻找至原型对象的 constructor。

Date 实例对象的 api 都是继承自原型对象。

月份从 0 开始。

## 常用 api
1. toISODate 打印‘yyyy-mm-dd’

## format 原理
format 传入一个字符串，这些字符串是固定的可选的，用于决定年月份的顺序，有些更完备的 format 还支持一个时间段多种格式比如七月或 7 月。
```
Date.prototype.format = function(format) {
  const year = this.getFullYear();
  const month = String(this.getMonth() + 1).padStart(2, '0');
  const day = String(this.getDate()).padStart(2, '0');
  const hours = String(this.getHours()).padStart(2, '0');
  const minutes = String(this.getMinutes()).padStart(2, '0');
  const seconds = String(this.getSeconds()).padStart(2, '0');
  
  format = format.replace('YYYY', year);
  format = format.replace('MM', month);
  format = format.replace('DD', day);
  format = format.replace('HH', hours);
  format = format.replace('mm', minutes);
  format = format.replace('ss', seconds);
  
  return format;
};

// 使用示例
const date = new Date();
const formattedDate = date.format('YYYY-MM-DD HH:mm:ss');
console.log(formattedDate);

```

## 技巧
获取月份最后一天
```
Date.prototype.getFirstDayOfMonth = function() {
  const year = this.getFullYear();
  const month = this.getMonth();
  
  return new Date(year, month, 1);
};

Date.prototype.getLastDayOfMonth = function() {
  const year = this.getFullYear();
  const month = this.getMonth() + 1;
  
  return new Date(year, month, 0);
};
```
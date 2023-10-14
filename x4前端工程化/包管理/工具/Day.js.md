我们经常会从后端或者表单中读取到一个表示时间的字符串或者数字，并将其转化为我们需要的格式，Dayjs 可以节省我们自己封装时间格式处理函数的时间。除此之外，dayjs 还支持插件（提供定义一段时间长度，判断节假日、闰年等功能）、国际化等特性。

## 开始
### 安装
```
npm install dayjs
或者
pnpm add dayjs
```

### 引入
```
cjs：
const dayjs=require('dayjs');

mjs:
import * as dayjs from 'dayjs'
```
使用 ts：[安装 | Day.js中文网 (fenxianglu.cn)](https://dayjs.fenxianglu.cn/category/#typescript)

### 示例
```
import * as dayjs from dayjs

const date=new Date();

let day1=dayjs(date);
let day2=day1.add('day',1);

console.log(day1.isBefore(day2));
console.log(day2.format('[YYYYescape] YYYY-MM-DDTHH:mm:ssZ[Z]') )
// 'YYYYescape 2019-01-25T00:00:00-02:00Z'

```

## 使用
### 创建
```js
当前时间
dayjs()

传入Date对象
dayjs(new Date())

传入ISO8601
dayjs('2018-04-04T16:00:00.000Z')

传入时间戳
dayjs(1318781876406)

无效
dayjs(null)

使用插件：
传入对象：
dayjs.extend(objectSupport)
dayjs({ year :2010, month :3, day :5, hour :15, minute :10, second :3, millisecond :123});

传入格式化字符串
dayjs.extend(customParseFormat)
dayjs("12-25-1995", "MM-DD-YYYY")
```
Day.js 对 `Date` 对象进行了封装，代替修改本地 `Date.prototype`。Day.js 对象是不可变的，也就是说，以某种方式改变 Day.js 对象的所有 API 操作都将返回它的一个新实例。

### 比较
使用 isBefore、isSame、isAfter。其中 `isSame()` 方法不传参数或参数为 `undefined`都默认返回 true
```
dayjs().isBefore(dayjs('2011-01-01')) // 默认毫秒

如果想使用除了毫秒以外的单位进行比较，则将单位作为第二个参数传入。
dayjs().isBefore('2011-01-01', 'year')
```

### 操作
参考 Date 对象的 get 和 set 方法。
```
格式一：
dayjs().day();
dayjs().day(12);

格式二：
dayjs().get('year')
dayjs().set('year',2023)
```

运算
```
dayjs('2019-01-25').add(1, 'day').subtract(1, 'year').year(2009).toString()
```

### 显示
```
dayjs().format() 
// 默认返回的是 ISO8601 格式字符串 '2020-04-02T08:02:17-05:00'

dayjs('2019-01-25').format('[YYYYescape] YYYY-MM-DDTHH:mm:ssZ[Z]') 
// 'YYYYescape 2019-01-25T00:00:00-02:00Z'

dayjs('2019-01-25').format('DD/MM/YYYY') // '25/01/2019'
```

> 参考
> 
> [Day.js中文网 (fenxianglu.cn)](https://dayjs.fenxianglu.cn/)
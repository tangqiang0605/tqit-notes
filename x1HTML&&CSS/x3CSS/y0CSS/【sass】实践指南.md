实践：通过html+sass仿写网站的静态首页。

## 语法
@include+@mixin 
$变量
.#{$变量}选择器

## 搭建
1. 安装 live-server 拓展。
2. live sass compiler 拓展
3. 对 live sass complier进行设置
插件、拓展设置，转为文本）在最后面粘贴
``` json
  "liveSassCompile.settings.formats": [
    {
      "format": "compressed",
      "extensionName": ".min.css",
      "savePath": "./css"
    }
  ],
  "liveSassCompile.settings.excludeList": [
    "**/node_modules/**",
    ".vscode/**"
  ],
  "liveSassCompile.settings.autoprefix": [
    "> 1%",
    "last 2 versions"
      覆盖99%的浏览器、浏览器的最后两个版本
  ],
```
4. 测试
```
新建index.scss
$color:skyblue;
body {
  background-color: $color;
}

右下角启动sass compiler，生成css

新建index.html
叹号快速生成模板。link:css引入css。

右下角启动live server，查看效果。
```
5. 项目结构
```
|-- index.html
|-- scss 
	存放sass文件。
	sass/abstracts存放_mixin.scss、_variables.scss等文件。一般_开头的文件只被唯一的主scss文件引入使用。
|-- css（自动生成）
	|-- index.min.css
	|-- index.min.css.map
```
其他：写入必要的 reset、工具 js、fonticon、html 中图标标题字体 css 引入 js 引入、meta 响应式标签。

## 架
sass+bem。[CSS 架构之 BEM - 掘金 (juejin.cn)](https://juejin.cn/post/7021461539236347940)

bem 介绍。通过&。

## 语法
变量、导入、混入、嵌套、继承比较常用。

### 变量
$color:一切可以作为属性值的值;
一般写在sass/abstracts/_variables.scss中被引入。命名方法查看命名参考。
sass 与 css 变量的区别，sass 在编译前决定，转为 css 时变成硬编码，css 在运行时决定。sass 的计算也是同理。都是为了方便程序员。
``` scss
$color-red:red;
$border-red:1px solid $color-red;
```
变量后缀! default/! global

### 嵌套
``` scss
article {
  ~ article { border-top: 1px dashed #ccc }
  > section { background: #eee }
  dl > {
    dt { color: #333 }
    dd { color: #555 }
  }
  nav + & { margin-top: 0 }
}
群组选择器：嵌套+并集选择器
.container {
  h1, h2, h3 {margin-bottom: .8em}
}
nav, aside {
  a {color: blue}
}

生成
article ~ article { border-top: 1px dashed #ccc }
article > footer { background: #eee }
article dl > dt { color: #333 }
article dl > dd { color: #555 }
nav + article { margin-top: 0 }
.container h1, .container h2, .container h3 { margin-bottom: .8em }
nav a, aside a {color: blue}
```

父选择器：嵌套+关键字&
子嵌套、伪类嵌套&（&是占位符代表嵌套父名，所以是可以后置的，比如 nav&生成 nav:after）
``` scss
h1 {
    &:hover{
        
    }
}
生成h1:hover

h2 {
    h1 & {}
}
生成h1 h2{}
```

占位符选择器：%base 继承。其实是用于取别名。

写在类名后面，该类不会被编译

而其他类中以@extend %base 引入，作为子代继承。

例子：
.button@base

.btn 中使用。
编译为. button .btn{button 类的属性}和. btn{原来 btn 类里的其他属性}

### 导入
原生@import url(css.css);
@import "abstracts/variables";
导入scss不需后缀，导入css需要后缀。导入后该命令的位置可以看作导入文件的所有内容，然后生成css。所以import后可以直接使用import里的内容，生成的css也是他们组合的结果。

sass 中写自己的 import 导入 sass 文件可以使用其中的变量，用原生 import 导入不行，但是会出现在编译的文件里。![image-20230126095522439](D:\tplmydata\tplmydoc\文档图片\image-20230126095522439.png)

### 混入
@mixin定义混入、@include引入混入。混入一般放在sass/abstracts/_mixin.scss中

![image-20230128202349463](D:\tplmydata\tplmydoc\文档图片\image-20230128202349463.png)

![image-20230126104623252](D:\tplmydata\tplmydoc\文档图片\image-20230126104623252.png)

![image-20230126104723215](D:\tplmydata\tplmydoc\文档图片\image-20230126104723215.png)

### 继承
@extend类名。看占位符选择器。生成并集选择器。被继承的类，继承的类1，继承的类2{}。用了占位符则被继承的类不会写出来。

继承比混入简洁。重复的代码量多的用继承，重复代码少的用混入。

### 运算
加减，一方缺省没有单位则使用另一方的单位。

乘法最多只能有一方有单位。

除不一定会执行。而是作为分隔符原样照搬。解决方法：加个括号

![image-20230126110054159](D:\tplmydata\tplmydoc\文档图片\image-20230126110054159.png)

### 插值

#{变量}，将其值作为文本原原本本地粘贴到所在位置。
问题、注意
1. 属性嵌套要加空格，注意格式，不然会报错。
2. 引入的文件加不加下划线前缀都一样。
3. 下划线和横线是一样的。

![[Pasted image 20230429233011.png]]

include 调用 b 方法并传入参数，b 方法中，将该参数拼接成一个变量，然后使用变量作为选择器的名字，并使用@content 引用 inclue 里面的方法体。

at-root 是表示父选择器的占位符。
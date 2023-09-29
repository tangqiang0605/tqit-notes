原生 js 获得的是 dom 对象，jqurey 获取的是 jqurey 对象。jqurey 是对 dom 的伪数组包装。
重要思想：隐式迭代，链式编程。

## 常用
引入 (微软)：
```
<script src="https://ajax.aspnetcdn.com/ajax/jquery/jquery-1.9.0.min.js"></script>
```
使用：语法：$(selector).action()
```
文档就绪
$(function(){}
```


```
元素隐藏
$("p").toggle();
下拉菜单
$("#panel").slideToggle();

css
$("#p1").css("color","red")
多个属性使用类
$("p").css({"background-color":"yellow","font-size":"200%"});

$("#runoob").attr("href")返回属性值，第二参数为设置值
返回值为获取值，如果传入字符串或返回字符串的函数则可以设置。
$("#test").text()
$("#test").html()
$("#test").val()表单值
```

添加新元素
内部：append、prepend
jQuery after() 方法在被选元素之后插入内容。
jQuery before() 方法在被选元素之前插入内容。
```
var txt1="<p>文本-1。</p>"; // 使用 HTML 标签创建文本 
var txt2=$("<p></p>").text("文本-2。"); // 使用 jQuery 创建文本 
var txt3=document.createElement("p"); 
txt3.innerHTML="文本-3。"; // 使用 DOM 创建文本 text with DOM 
$("body").append(txt1,txt2,txt3);
```

jQuery remove() 方法删除被选元素及其子元素。
jQuery empty() 方法删除被选元素的子元素。
```
$("#div1").remove();
下面的例子删除 class="italic" 的所有 <p> 元素：
## 实例
$("p").remove(".italic");
```

类
```
$("body div: first").addClass("important blue");
$("h1,h2,p").removeClass("blue");
$("h1,h2,p").toggleClass("blue");
```

### 遍历
```
父
$("span").parent();
$("span").parents();
$("span").parents("ul");

子
$("div").children([selector]);
$("div").find("span");
$("div").find("*");

兄弟
$("h2").siblings([selector]);
$("h2").next();
$("h2").nextAll();
$("h2").nextUntil("h6");

伪类
$("div p").first();
$("div p").last();
$("p").eq(1);// 第二个
$("p").filter(".url");
$("p").not(".url");

```
### 请求
```
$.get( URL [, data ] [, callback ] [, dataType ] )
$.get("demo_test.php",function(data,status){}

$.post( URL [, data ] [, callback ] [, dataType ] )


$("#div1").load("demo_test.txt",function(responseTxt,statusTxt,xhr){}

```
## 开始
### 简介
jQuery 是一个很容易学习的库。它的出现启发了现代前端框架。如今 jQuery 时代已经过去，但 jQuery 并不是因为落后而离开，而是功成身退。

jQuery 库包含以下特性：
-   HTML 元素选取
-   HTML 元素操作
-   CSS 操作
-   HTML 事件函数
-   JavaScript 特效和动画
-   HTML DOM 遍历和修改
-   AJAX
-   Utilities

### 引入
可以直接在 cdnjs 上找到需要的库。
```html
<script src="http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.8.0.js">
</script>
```

## 使用
### 示例
```html
<!DOCTYPE html>
<html>
	<head>
	<script src="/jquery/jquery-1.11.1.min.js"></script>
	<script>
		function appendText()
		{
			var txt1="<p>Text.</p>";              // 以 HTML 创建新元素
			var txt2=$("<p></p>").text("Text.");  // 以 jQuery 创建新元素
			var txt3=document.createElement("p");
			txt3.innerHTML="Text.";               // 通过 DOM 来创建文本
			$("body").append(txt1,txt2,txt3);        // 追加新元素
		}
	</script>
	</head>
	<body>
	
	<p>This is a paragraph.</p>
	<button onclick="appendText()">追加文本</button>
	
	</body>
</html>
```

### 选择器
jQuery 使用的语法是 XPath 与 CSS 选择器语法的组合。如"`p#demo `"（css 选择器，id 为 demo 的 p 元素），`$("[href$ ='.jpg']")` 选取所有 href 值以 ".jpg" 结尾的元素 (XPath 表达式)。

[jQuery 参考手册 - 选择器 (w3school.com.cn)](https://www.w3school.com.cn/jquery/jquery_ref_selectors.asp)

### 别名   
```
使用自己的名称（比如 jq）来代替 $ 符号，避免与其他模块冲突。
var jq=jQuery.noConflict()
```

### 事件函数
如 click。

### 效果函数
触发事件、引发效果。如，点击时消失。

如果在文档没有完全加载之前就运行函数，操作可能失败。下面是两个具体的例子：
-   试图隐藏一个不存在的元素
-   **获得未完全加载的图像的大小**

因此我们需要 ready 函数：
```html
<html>
<head>
	<script type="text/javascript" src="jquery.js"></script>
	<script type="text/javascript">
		$(document).ready(function(){
		  $("p").click(function(){
		  $(this).hide();
		  });
		});
	</script>
</head>

<body>
	<p>If you click on me, I will disappear.</p>
</body>

</html>
```

## 实战
读取一个文件并生成元素，将该文件中的数据展示在页面上，点击元素时触发对应事件。可以参考这个案例： [html+jQuery实现图片百叶窗效果_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1qA4y1X7M4/?spm_id_from=333.337.search-card.all.click&vd_source=a192bbc2c82b7725cd9d5149075acda1)
``` js title="index.html"
$('document').ready(function () {
    $.ajax({
        url: './images_list.json',
        success(data) {
            data.images = data.images.slice(2, 7);
            for (let image of data.images) {
                $('main').append(`<div style="background-image:url(https://www.bing.com/${image.url})"><p>${image.copyright}</p></div>`);
            };
            $('div').first().addClass('active');
            $('div').click(function () {
                $('div').removeClass('active');
                $(this).toggleClass('active');
                console.log(this);
            })
        }
    })
})
```


> 参考
> 
> [jQuery 教程 (w3school.com.cn)](https://www.w3school.com.cn/jquery/index.asp)
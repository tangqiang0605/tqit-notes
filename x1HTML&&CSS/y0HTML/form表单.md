## 概念
表单：由表单控件构成
表单控价：也称小部件
空元素：没有插槽的元素，如 `<br/>`，`<input/>`

## 表单元素
```html
<form>
  <fieldset>
    <legend>Fruit juice size</legend>
    <p>
      <input type="radio" name="size" id="size_1" value="small">
      <label for="size_1">Small</label>
    </p>
    <p>
      <input type="radio" name="size" id="size_2" value="medium">
      <label for="size_2">Medium</label>
    </p>
    <p>
      <input type="radio" name="size" id="size_3" value="large">
      <label for="size_3">Large</label>
    </p>
  </fieldset>
</form>
```

### form 元素
- action 提交地址url
- method 提交方式
```js
<form action="/my-handling-form-page" method="post"></form>
```

### fieldset 域元素
大表单使用。用于 form 里面分组。

### legend 域标题元素
fieldset 的子元素，用于描述这个 fieldset 的功能。

### label 标签
for 值为 input 的 id，与 input 联动。
为什么使用 label+for
1. 点击时聚焦 for
2. 无障碍
3. 其他

input 标签

name 提交时的键值
pattern：内容需要符合 pattern 的值（正则）
id 用于 label 的 for 绑定。
type：**text、password、**file 文件选择、button、checkboxes 多选复选框、radio 单选、image 图片提交、**submit 提交、**reset 重置按钮、hidden、number、select 标签用于声明下来列表、option 标签用于声明列表项
value 提交时的默认值**
size 属性：框的物理尺寸。元素的宽度，当 type 为 text 或 password 时。
maxlength：type 为 text 或 password 时，输入的最大字符数

特殊属性：
checked：type 为 radio 或 checkbox 时，指定按钮是否是被选中
readonly 只读提交，hidden 不可见提交，disabled 只读不提交。
autofocus

### textarea 标签
与 input 区别：
可以包含硬换行（而 input 则会忽略回车）。
需要闭合标签（而 input 是空元素）

默认值与富文本：
默认值闭合标签之间写：即使可以将任何东西放入到 `<textarea>` 元素中，甚至可以包含其他 HTML 元素、CSS 和 JavaScript，由于该元素的特性，这些内容**都将以纯文本的形式渲染**。在非表单组件上使用 [`contenteditable`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes/contenteditable) 可以为捕捉 HTML 或富文本内容提供 API。

```
<textarea id="content" cols="30" row="10">默认值</textarea>
```
可见行数：rows 属性规定 textarea 的可见高度。缺省 2
可见宽度：cols 属性规定 textarea 的可见宽度。缺省 20
最大长度：maxlengthmaxlength 属性规定文本区域的最大长度（以字符计）。
名称：name 属性为文本区规定名称。用于提交。
resize，默认表单空间的大小是可调的 both。horizontal、verical、none。
wrap，默认 soft

### button 按钮
type
submit 默认，button、reset。

### select 选择框
```
<select id="simple" name="simple">
  <option>Banana</option>
  <option selected>Cherry</option>
  <option>Lemon</option>
</select>

在 <optgroup>元素中，label属性的值在嵌套选项之前显示。
<select id="groups" name="groups">
  <optgroup label="fruits">
    <option>Banana</option>
    <option selected>Cherry</option>
    <option>Lemon</option>
  </optgroup>
  <optgroup label="vegetables">
    <option>Carrot</option>
    <option>Eggplant</option>
    <option>Potato</option>
  </optgroup>
</select>
```
如果一个 [`<option>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/option) 元素明确设置了 `value` 属性，当表单提交时也会提交那个选项对应的值。如果像上面的例子那样省略了 `value` 属性，[`<option>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/option) 元素的内容会作为提交的值。所以 `value` 属性并不是必需的，然而你可能需要向服务器中发送与视觉所见相比缩短或者改变过的值。

多选
```
<select id="multi" name="multi" multiple size="2">
```

### datalist 自动补全框
`<datalist>` 元素需要指定一个 `id`。使用 [`list`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input#attr-list) [`list`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input#attr-list) 属性和 [`<datalist>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/datalist) 元素可以与任何需要用户输入的组件（一般是 text、email 的 input）配合使用。这可能会导致一些不太显然的用法。
```
<input type="text" name="myFruit" id="myFruit" list="mySuggestion">
<datalist id="mySuggestion">
  <option>Apple</option>
  <option>Banana</option>
  <option>Blackberry</option>
  <option>Blueberry</option>
  <option>Lemon</option>
  <option>Lychee</option>
  <option>Peach</option>
  <option>Pear</option>
</datalist>
```

### progress进度条
```
<progress max="100" value="75">75/100</progress>
```

### meter计量器
-   [`low`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/meter#attr-low) 和 [`high`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/meter#attr-high) 将范围分为了三个部分：
[`optimum`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/meter#attr-optimum) 值定义了 [`<meter>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/meter) 元素的最佳值。如果 optinum 在中部，表示中部是首选的。
-   如果当前值位于首选范围，则计量器显示为绿色。
-   如果当前值位于平均范围，则计量器显示为黄色。
-   如果当前值位于最差范围，则计量器显示为红色。
```html
此时应为黄色（平均）
<meter min="0" max="100" value="75" low="33" high="66" optimum="50">xxx</meter>
```

## input 控件 type 详解
一般用 ul+li 包裹而不是 div。
input 是空元素。

### 常见type
- text、password、
- radio、checkbox
- submit、reset、anonymous
- image
点击时提交表单并在query附带相对位置 http://foo.com?pos.x=123&pos.y=456
```js
<input type="image" alt="Click me!" src="my-img.png" width="80" height="30">
```
- file
accept 属性、multiple 属性
```html
<input type="file" name="file" id="file" accept="image/*" multiple>

<input type="file" accept="image/*;capture=camera">
<input type="file" accept="video/*;capture=camcorder">
<input type="file" accept="audio/*;capture=microphone">
```

### h5 新增 type
color：颜色选择器
email
1. 输入法多了个@
2. 自带表单验证
配合 multiple 可以输入多个邮件地址
search
和 text 差不多。除了：带叉叉、输入法为搜索
tel
1. 电话键盘
url
1. 验证协议
2. 键盘适配
number
1. 只许整数
2. 带 spinner 增加减少值
3. step 设置 spinner 步长。为 any 时可以为浮点数。
4. 键盘适配
5. min、max 属性控制
```
<input type="number" name="change" id="pennies" min="0" max="1" step="0.01">
```
如果范围太大，渐进式增加没有意义（如范围为 `00001` 到 `99999` 的美国 ZIP 码）的话，使用 `tel` 类型可能会更好；它提供了数字键盘，而放弃了数字输入器的 spinner UI 功能。
range
min、max、step
```
<label for="price">Choose a maximum house price: </label>
<input type="range" name="price" id="price" min="50000" max="500000" step="100" value="250000">
<output class="price-output" for="price"></output>

const price = document.querySelector('#price');
const output = document.querySelector('.price-output');

output.textContent = price.value;
price.addEventListener('input', () => {
  output.textContent = price.value;
});
```
```
<label for="price">Choose a maximum house price: </label>

<input type="range" name="price" id="price" min="50000" max="500000" step="100" value="250000">

<output class="price-output" for="price"></output>
```

### 日期
datetime_local、
显示和选择一个没有特定时区信息的日期和时间的控件。
month
显示和选择带有年份信息的某个月的控件。
time
可能会以 _12 小时制_显示，但一定会以 _24 小时制_形式返回。
week
一年中特定编号周。一周以周一开始，一直运行到周日结束。另外，每年的第一周总会包含那一年首个星期四，其中可能不包括当年的第一天，也可能包括前一年的最后几天。

约束：max、min、step


## 表单美化
为什么使用 CSS 美化表单组件这么困难？一些元素难以被美化，并且可能需要一些复杂的技巧，偶尔需要高级的 CSS3 知识。所有这些小部件的主要问题来自于它们具有非常复杂的结构，而 CSS 目前还不足以表达这些小部件的所有细微部分。如果你想定制这些小部件，你必须依靠 JavaScript 来构建一个你能够应用样式的 DOM 树。我们会在 [How to build custom form widgets (en-US)]( https://developer.mozilla.org/en-US/docs/Learn/Forms/How_to_build_custom_form_controls "Currently only available in English (US)")一文中探索如何实现这一点。
```
input[type=search] {
  border: 1px dotted #999;
  border-radius: 0;

  -webkit-appearance: none;
}
```

css伪类：focus、default、checked

## 表单验证
### 验证属性
required 必填、
pattern
minlength/maxlength

当一个元素校验通过 CSS 伪类 :valid
如果一个元素未校验通过伪类 [`:invalid`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:invalid) 

正则
abc 确定
或者：a|b、\[ab\]、\[abcd\]
非\^
.任意一个字符
{n, m}

### javascript 验证表单
如果你想控制原生错误信息的界面外观，或者你想处理不支持 HTML 内置表单校验的浏览器，则必须使用 Javascript。

HTML5 提供 [constraint validation API](https://www.w3.org/TR/html5/forms.html#the-constraint-validation-api) 来检测和自定义表单元素的状态。

## 表单提交
发送格式为表单数据（`application/x-www-form-urlencoded`）如果是二进制数据，则为 `multipart/form-data` 形式。
使用 html
使用 JavaScript
new FormData
append（key, value）

使用 html+JavaScript
form 写 id
js 获取 form
使用 new FormData（form）实例化
监听 form 的 submit

``` js
form.addEventListener('submit',function (event) {
    event.preventDefault();
    sendData();
});
```

## 参考
[Web 开发者指南 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/Guide)


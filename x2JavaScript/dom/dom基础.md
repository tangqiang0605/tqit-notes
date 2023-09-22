[JavaScript操作DOM常用的API - 掘金](https://juejin.cn/post/6844903604445249543?searchId=20230731200759424787CEBE6F74E65537)
[Site Unreachable](https://www.cnblogs.com/cjxstart/p/16017052.html)

我们可以通过 JavaScript 来调用 document 和 window 元素的 API 来操作文档或者获取文档的信息。

## 节点
节点 Node 是一个接口，有许多接口都从 Node 继承方法和属性。Node 的 nodeType 属性表示 Node 的类型。

包括（目前保留）：
1. 元素节点element
2. 元素中的文字text
3. xml 文档声明
4. 注释节点comment
5. document 节点document
6. 文档类型描述节点
7. documentfragment 节点
8. 其他类型已被废弃
![[Pasted image 20230731201101.png]]

3.1 Element
（1）nodeType 为1
（2）nodeName 为元素标签名，tagName 也是返回标签名
（3）nodeValue 为 null
（4）parentNode 可能是 Document 或 Element
（5）子节点可以是任意类型的node

3.2 Text
（1）nodeType 为3
（2）nodeName 为 #text
（3）nodeValue 为文本内容
（4）parentNode 是一个 Element
（5）没有子节点

3.3 Comment
（1）nodeType 为8
（2）nodeName 为 #comment
（3）nodeValue 为注释的内容
（4）parentNode 可能是 Document 或 Element
（5）没有子节点

3.4 Document
Document 表示文档，在浏览器中，document 对象是 HTMLDocument 类 的一个实例，表示整个页面，它是 window 对象的一个属性。
（1）nodeType 为9
（2）nodeName 为 #document
（3）nodeValue 为 null
（4）parentNode 为 null
（5）子节点可能是一个 DocumentType 或 Element

3.5 DocumentFragment
DocumentFragment 是所有节点中唯一一个没有对应标记的类型，它表示一种轻量级的文档，可能当作一个临时的仓库用来保存可能会添加到文档中的节点。
（1）nodeType 为 11
（2）nodeName 为 #document -fragment
（3）nodeValue 为 null
（4）parentNode 为 null

## 创建
创建的元素并不属于 HTML 文档，它只是创建出来，并未添加到 HTML 文档中，要调用 appendChild 或 insertBefore 等方法将其添加到 HTML 文档树中。
```
let element = document.createElement(tagName);接收标签
var text = document.createTextNode(data);接收文本
```

```
elem.id = 'test';
elem.style = 'color: red';
elem.innerHTML = '我是新创建的节点';
document.body.appendChild(elem);
```
其它
```
var dupNode = node.cloneNode(deep);
let fragment = document.createDocumentFragment();
```

## 修改 Dom 树
```
var deletedChild = parent.removeChild(node);
parent.replaceChild(newChild,oldChild);
```

## 查询 dom 树
直接查询
```
  var element = document.getElementById(id);
  var elements = document.getElementsByTagName(name);
  var elements = document.getElementsByName(name) 
  var elements = document.getElementsByClassName(names); // or:
  var elements = rootElement.getElementsByClassName(names);
  var element = document.querySelector(selectors);
  var elementList = document.querySelectorAll(selectors);

```
通过亲戚关系
```
节点的属性
parentNode
parentElement
childNodes可能有textnode、commentnode
children都是element
firstChild
lastChild
hasChildNodes
previousSibiling
previousElementSibling
nextSibling
nextElementSibling
```

## 修改 dom
### 元素节点
属性
```
  element.setAttribute(name, value);
  let attribute = element.getAttribute(attributeName);  
  element.removeAttribute(attrName)
```
样式
```
  var style = window.getComputedStyle(element[, pseudoElt]);
  var clientRect = element.getBoundingClientRect();元素的大小以及相对于浏览器可视窗口的位置

  elem.style.color = 'red';
  elem.style.setProperty('font-size', '16px');
  elem.style.removeProperty('color');

element.setAttribute('style', 'height:100px;width:100px;background-color:red;');

element.className = 'blue';
element.className += 'blue fb';

element.style.cssText = 'height: 100px !important';
element.style.cssText += 'height: 100px !important';
```

创建引入新的 css 样式文件
```
 function addNewStyle(newStyle) {
            var styleElement = document.getElementById('styles_js');

            if (!styleElement) {
                styleElement = document.createElement('style');
                styleElement.type = 'text/css';
                styleElement.id = 'styles_js';
                document.getElementsByTagName('head')[0].appendChild(styleElement);
            }
            
            styleElement.appendChild(document.createTextNode(newStyle));
        }

        addNewStyle('.box {height: 100px !important;}');
```
使用 addRule、insertRule
```
// 在原有样式操作
        document.styleSheets[0].addRule('.box', 'height: 100px');
        document.styleSheets[0].insertRule('.box {height: 100px}', 0);

        // 或者插入新样式时操作
        var styleEl = document.createElement('style'),
            styleSheet = styleEl.sheet;

        styleSheet.addRule('.box', 'height: 100px');
        styleSheet.insertRule('.box {height: 100px}', 0);

        document.head.appendChild(styleEl);
```
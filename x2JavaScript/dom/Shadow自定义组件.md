[JS Shadow DOM：创建封装的组件和样式隔离 | 编程时光](https://www.coding-time.cn/js/advance/ShadowDOM.html)

Shadow DOM  是一项 Web 标准，用于创建封装的组件并实现样式隔离。它允许将组件的 HTML 结构、样式和行为封装在一个独立的 DOM 树中，从而与主文档的 DOM 树相互隔离。通过这种方式，开发者可以创建具有独立样式和行为的组件，而不用担心与其他组件或主文档的样式冲突。

## API
```
添加
指定元素.attachShadow(options)

获取
指定元素.shadowRoot

查询
指定元素.shadowRoot.querySelector(xxx)

宿主
shadowRoot.host

通过给shadowRoot添加子元素实现组件的创建
// 创建自定义按钮
const button = document.createElement('button');
button.classList.add('custom-button');
button.textContent = 'Click me';

// 将按钮添加到 Shadow Root 中
shadowRoot.appendChild(button);
```





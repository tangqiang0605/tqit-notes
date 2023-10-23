
## 高阶组件
参考文章[03. 高阶组件 Higher-Order Components (yuque.com)](https://www.yuque.com/zdk/pnadia/kuadnl)
highrer-order-components，React 中用户重用组件逻辑的高级技术。HOC 本身并不是 React API 的一部分，而是从 React 构思本质中复现出来的一种模式，具体来说，高阶组件并不是一个组件，而是一个函数，这个函数接收一个组件作为参数，增强组件的功能后并返回一个新的组件。
组件是将 props 转化为 UI，然而高阶组件则是将一个组件转化成一个新的组件。
创建高阶组件，约定以 with 进行开头。指定函数参数，参数应该以大写字母开头，这个参数将作为要渲染的组件。
2.  高阶函数内部创建一个类组件
-   在类组件中提供复用的状态，以及操作状态的方法
-   通过 props 将复用的状态传递给被包装的组件
在高阶组件内容，创建一个类，提供需要复用的数据、操作数据的方法。并返回该类。

具体：一个以 with 前缀的函数，接收一个 WrapperComponent（参数遵循大驼峰，因为参数是组件，组件就是以大驼峰命名）。函数内创建一个包含复用状态以及操作复用状态的类，该类继承自 React. Component (import React from 'react')。重点还包含一个 render 函数（用于向下传递值给被包装组件），返回 `<WrappedComponent {... this.state}{...this.props}></WrappedComponent>`。普通组件通过 this. props 读取高阶组件中的 state 属性。
React. Component 子类的内容：
1. 普通属性：title=xxx
2. 普通方法：methods=（）=>{}
3. 状态：state={}
4. 生命周期钩子：componentDidMount（）{}
5. render 函数：render（）{}

使用：
```jsx
const 高阶组件=withMouse(普通组件);

class App extends React.Component {
	render（）{
		<>
			<高阶组件></高阶组件>
		<>
	}
}

```
说明：类 extends React. Component 就是一个组件。
不要在 render 函数中使用高阶组件，因为每次 render 都会创建一个新的组件实例，每一次都会使子对象树完全被卸载或移除。这样不仅性能损耗比较大，还会造成组件状态以及其子元素全部丢失。我们比较推荐在组件定义外应用高阶组件，以便生成的组件只会被创建一次，标识符在每次渲染中也是相同的。
```jsx
// 推荐在在组件定义外应用高阶组件
const MousePosition = withMouse(Position)
class App extends React.Component {
  render() {
    // 不要在 render 函数这里使用高阶组件
    // const MousePosition = withMouse(Position)
    return (
      <div>
        <MousePosition name="亚瑟"></MousePosition>
      </div>
    )
  }
}
```

react

npm create vite react-demo -- --template react-ts

npm i

code 文件夹打开

插件es7+ react、redux、。。。

app.tsx必要的就是一个引入‘./App.css'、一个导出export default App。以及导出的函数

``` html
function App(){
return <div className='App'>
    
</div>
}
```

组件

app.tsx同目录下新建文件DemoA.tsx(组件名用大驼峰），输入rfce使用模板

``` react
import React from 'react' 
function Comp(){
    return {
        <div>
        
        </div>
    }
}

export default DemoA
```

DemoA.tsx

``` react
import React from 'react' 
const name='我';
function Comp(){
    const msg='喜欢吃饭'
    const Id='banner'
    return {
        <div>
            插值语法
            <div>
            {name+msg}
            </div>
            <div id={Id}></div>
        </div>
    }
}
export default DemoA
```

App.tsx

``` react
import DemoA from './DemoA'自动补充import语句

function App(){
return <div className='App'>
    <Demo/>
</div>
}
```

return 必须只有一个根元素（由 div 或 `<>`包围，后者不会被渲染）

原始html。用于富文本

![image-20230209173230140](D:\tplmydata\tplmydoc\文档图片\image-20230209173230140.png)

返回jsx对象的函数为组件。

类名用className属性绑定。不然报错。
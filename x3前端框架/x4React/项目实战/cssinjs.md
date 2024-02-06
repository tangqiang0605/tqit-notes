[styled-components:前端组件拆分新思路 - 掘金](https://juejin.cn/post/6844903878580764686)

styled-components 与组件拆分。


styled-components 理念：all in js。

```
npm install styled-components --save
```
1. 支持嵌套语法。
2. css 模块化（与全局化相对）。
3. 支持引入 js 代码逻辑（模板字符串）
	1. 接受传参并绑定在 props 上。
## 使用方法
styled-component 接受一个标签元素，并使用 css 代码进行包裹，导出为可用的 react 组件。

### 一般用法
演示:
```javascript 
// style.js
import styled from 'styled-components';

export const HeaderWrapper= styled.div`
	# inline css sheet
`
```
引入使用：
```javascript
import React from 'react';
import {Headerwrapper } from './style.js';

class App extend React.Component {
	render(){
		return <HeaderWrapper></HeaderWrapper>
	}
}
```

### 全局样式
```javascript
//iconfont.js
//全局样式同理
import {createGlobalStyle} from 'styled-components'

export const IconStyle = createGlobalStyle`
@font-face {
  font-family: "iconfont";
  src: url('./iconfont.eot?t=1561883078042'); /* IE9 */
  src: url('./iconfont.eot?t=1561883078042#iefix') format('embedded-opentype'), /* IE6-IE8 
  //...
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
`

```
引入：
```javascript
import { IconStyle } from './statics/iconfont/iconfont'

function App() {
  return (
    <Provider store={store}>
      <div>
        {/* 通过标签形式引入这些样式 */}
        <IconStyle></IconStyle>
        <div>
          <Route path='/' exact component={Home}></Route>
          <Route path='/detail' exact component={Detail}></Route>
        </div>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;

```

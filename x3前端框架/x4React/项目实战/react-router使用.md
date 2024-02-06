## 介绍
React-Router 有以下几个库：

react-router：React Router 的核心库，提供基础功能，如 Route、Link、history 等。
react-router-dom：是针对 Web 应用的库，提供了 BrowserRouter、HashRouter 等路由组件。
react-router-native：是针对移动端应用的库，提供了 NativeRouter、MemoryRouter 等路由组件。
react-router-config：提供了静态路由配置的能力，并且可以在服务端使用。
react-router-redux：将 React-Router 和 Redux 集成，可以将路由状态同步到 Redux Store 中。

React-Router 的 API 包括以下几个主要的组件：

BrowserRouter：使用 HTML5 history API，在应用程序中提供基于浏览器的导航。
HashRouter：使用散列值（hash）在应用程序中提供客户端路由。
Route：渲染与指定 URL 匹配的组件。
Switch：渲染第一个与当前 URL 匹配的 Route 或 Redirect。
Link：生成带有指定 URL 的锚标记（）以导航到不同的路由。

除了这些主要组件之外，React-Router 还提供了其他一些有用的组件和 API，如 Redirect、withRouter 和 useHistory 等。

作者：石小石 Orz
链接： https://juejin.cn/post/7249761605599559741
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
## 安装
React-Router 的安装方法：
npm：
$ npm install react-router-dom@6
yarn$ yarn add react-router-dom@6
复制代码目前官方从 5 开始已经放弃原有的 react-router 库，统一命名为 react-router-dom

作者：狮子大大
链接： https://juejin.cn/post/7033313711947251743

来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
## 引入视图 Router
root 挂载 App，App 中定义路由表。
```
import React from "react";
import ReactDOM from "react-dom/client";
// 导入 BrowserRouter 组件
import { BrowserRouter } from "react-router-dom";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
```

BrowserRouter 是 React Router 库提供的一种路由组件，它使用 HTML5 中的 history API 来实现路由的跳转，并支持浏览器的前进后退等操作。
## Link 编程式导航
Link 组件是最简单的路由导航器，它可以通过设置 to 属性来导航到指定的路由路径。

NavLink 组件（来 react-router-dom）在实现路由导航功能的同时，还提供了一些额外的样式控制功能，例如可以为当前活跃路由添加自定义样式或类名。使用时，将 className 的返回值写成一个函数即可。原因是它接受一个 isActive 参数。
```
// src\App.jsx
<div className="list-group">
  {/* 路由链接 */}
  <NavLink className={({ isActive }) => (isActive ? "list-group-item myCustomClassName" : "list-group-item")} to="/about">
    About
  </NavLink>
  <NavLink className="list-group-item" to="/home">
    Home
  </NavLink>
</div>

// 引入自定义样式内容
.myCustomClassName {
  background: red !important;
}
```
## 编程式导航
```
import { Link, Outlet, useNavigate } from "react-router-dom";
  const navigate = useNavigate();
  function showDetail(m) {
    navigate("detail", {
      replace: false,
      state: {
        id: m.id,
        title: m.title,
        content: m.content,
      },
    });
```
1. 从 react-router-dom 导入 useNavigate。
2. 使用 navigate 进行导航。
3. navigate 使用 state 传参。
4. 
## 声明式路由组件配置 Routes 和 Route
Routes 和 Route 是 react-router-dom 包提供的两个组件。Routes 组件是一个容器，用于定义一组 Route 组件。Route 组件用于定义路由。它包括一个路径（path）和一个组件（element）。当 URL 匹配该路径时，该组件将被渲染到页面上。
```javascript
import { NavLink, Routes, Route, Navigate } from "react-router-dom";
<div className="panel-body">
  {/* 注册路由 */}
  <Routes>
    <Route path="/about" element={<About />}></Route>
    <Route path="/home" element={<Home />}></Route>
    <Route path="/" element={<Navigate to="/about" />}></Route>
  </Routes>
</div>
```

Navigate 是 react-router-dom 4.0+ 版本中的一个组件，它可以通过编程方式导航到一个特定的路由。它的用法有些类似于 Link 组件和 history.push 方法，但它可以根据一些条件来激活导航（只要一渲染就会引起视图变化）。

## 编程式路由表（Programmatic）
声明式 declarative 是在标签中定义路由，编程式则是在 javascript 代码中定义路由。

一开始使用 react-router-config。react-router 支持 useRoutes 钩子，输入数组，返回元素渲染即可（可以认为是包含 Routes 和 Route）

## 嵌套路由
嵌套路由先定义在 children 中，然后在父组件使用 outlet 组件暴露出口。

route 组件的 index 用于标识默认子路由。

outlet 组件。如果有多层嵌套，你可以让子组件复用父组件，在父组件添加 outlet。如果没有，也没关系，会正常全屏切换，只是需要多写相同布局，才能达到同样效果。

V6与 V5 的区别
用 `<Routes> children 形式替代<Switch>`



## 路由传参
params
在定义路由时，我们的 path 需要进行占位 detail/: id/: title/:content
to 直接传入路径
读取 const { id, title, content } = useParams ();

search、query
```
const [search, setSearch] = useSearchParams ();
const id = search.get ("id");
```
search 参数设置后会导致视图刷新，而 state 参数不会。

state 参数
这次不在 link 的 to 参数，而是 state 参数
```
<Link to="detail" state={{ id: m.id, title: m.title, content: m.content }}>
{m.title}
</Link>
```
使用 useLocation 获取：useLocation 是 React Router 中的另一个 Hook，可以获取到当前页面的 URL 信息，并返回一个包含 pathname、search、hash、state 等属性的对象。它的作用是方便在 React 组件中获取 URL 信息，并根据 URL 信息来进行一些操作，例如根据 URL 信息动态加载组件、将 URL 参数作为 props 传递给组件等。

## 结构
1. 掘金上的文章，是在根引入路由，并在路由中包裹 App，再在 App 中书写路由表用来控制，然后对应就是其它组件了。然后定义一个 Home，用来作为后台管理系统的公用布局。
2. 乐哥教程里，是在根就载入，完成了根和 App 的工作，然后在 App 中作为布局。文章的方法更好，利于分层， App 处理全局配置。

编程时路由表
1. 文章类似，在 App 中将声明式路由表替换为 useRoutes 渲染出来的路由表。
2. 使用 react-router-config：也是使用 fc 替代掉 outlet。
3. 乐哥教程里，路由被嵌入到更低一层（只要在根路由下就行），巧妙地代替了 outlet 的位置。在 App 其它地方布局，然后剩余位置放 router。这个逻辑也是可以的。
## 懒加载
React. Suspense 内套懒加载组件。因为懒加载组件不具备组件的功能，直接使用会报错，所以需要被 Suspense 包裹。
## 参考
[手把手教你React-Router6【万字详细长文】 - 掘金](https://juejin.cn/post/7249761605599559741?searchId=20231116173841EE0FB6885899A352EA70)
[React-Router V6 使用详解(干货) - 掘金](https://juejin.cn/post/7033313711947251743?searchId=20231116173821EBEEC3570B511065C772)
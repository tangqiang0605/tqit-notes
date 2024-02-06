redux 为 redux core
redux-toolkit 为 redux 的工具包
redux-thunk 为 redux 的中间件, 使 dispatch 可以接受函数，赋予其执行异步操作的能力
react-redux 为 react 的 redux 绑定库, 使 react 组件可以使用 redux，且当 redux store 发生变化时，可以自动更新 react 组件

作者：小河淌水
链接： https://juejin.cn/post/7248081575320404027
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

## createStore
1. 用于创建 rootStore。
2. 接收 reducer 作为参数。
3. 接收 preloadedState 作为初始状态值。
4. 接收 enhancer 中间件函数。
5. 返回一个 store。提供 dispatch、getState、subscribe 方法。
redux 内部不支持自动更新，需要通过 subscribeAPI 监听 redux 中状态变化，只有变化，就需要重新调用 render
```
componentDidMount() {
    store.subscribe(() => {
      this.forceUpdate();
    });
}

```

作者：jjjona0215
链接： https://juejin.cn/post/7062735963734147079
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
### reducer 函数
1. 接收 state 和 action 参数，返回新的 state。
2. 纯函数。

### 中间间函数
1. 用于增强 dispatch 功能。
2. 最终返回一个增强后的 dispatch（dispatch：接收 action，修改 state）
3. 接收任意参数。
4. next 为上一个中间件加强后的 dispatch（第一个中间件接收的 dispatch 为 store.dispatch）
5. 第一层接收参数用于配置中间件，第二层获取 store，第三层获取到上一层 dispatch，第四层获取到 acion 并返回 dispatch。
```
export default function thunk(extraArgument?: any) {
  return ({ dispatch, getState }) => {
    return (next) => (action) => {
      if (typeof action === "function") {
        return action(dispatch, getState, extraArgument);
      }
      return next(action);
    };
  };
}
```
6. 原有的 dispatch 只支持 action 对象，要让其支持 action 函数，在中间件获取到 action 时，对其进行整理并返回。
7. 这里要求 action 是函数时，接收 dispatch、getState、extraArgument（中间件配置），并返回一个 dispatch。
8. applyMiddleware 原理：
```
dispatch = middleware({getState, dispatch})(store.dispatch)
// 这里middleware就是值thunk()
```

应用：
```
可以接收多个
const store = createStore(reducer, undefined, applyMiddleware(thunk, logger));
```

### dispatch
1. 传入 action 对象，Redux 会应用我们的 reducer 来得到新的 state，更新 state。
2. 使用中间件后，支持一个 action 函数，注入参数 dispatch、getState、extraArgument。

### action
1. 包含属性 type、data（payload）
2. reducer 根据 action 来返回新的 state。
3. 普通 action 为对象，异步 action 为函数。
4. 为了保证每次都是新的 acion，通常使用返回 action 对象的函数（工厂模式）。函数可以接收参数，用来生成 action 的数据部分。

## combineReducers
允许我们对 store 进行合理划分维护，最后可以合回来。
```
import { combineReducers, createStore } from "redux";
import todosReducer from "./features/todos/todosSlice";
import filtersReducer from "./features/filters/filtersSlice";

const rootReducer = combineReducers({
  // Define a top-level state field named `todos`, handled by `todosReducer`
  todos: todosReducer,
  filters: filtersReducer,
});

const store = createStore(rootReducer);
```
原理：前面我们给每个 store 都分配了 key，这里使用这个 key 来防止不同 store 之间的同名冲突。当 dispatch 时，触发所有 reducer，但是每个 reducer 只处理自己对应的 state。

## 引入
在文档中不推荐直接引入 store 对象，而是要在根组件外使用 Provider 来传递 store。
```
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store  from './redux/store.js'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      ｛// 注意看这里，使用props的方式将store传入Provider组件｝
      <Provider store={store}>
        <App />
      </Provider>
  </React.StrictMode>
);
```

## redux-toolkit
redux 工具库。封装了 redux-thunk、reselect 中间件，封装 createSlice 简化 reducer 编写。

基于 redux：
```
const initCounterState = {
  num: 0,
};

const counterReducer = (state = initCounterState, action) => {
  const { number = 1, type } = action;
  switch (type) {
    case "incerate":
      state.num = state.num + number;
      break;
    case "reduce":
      state.num = state.num - number;
  }
  return state;
};

const store = createStore(counterReducer, undefined, applyMiddleware(thunk));

```

## 基于 redux-toolkit
使用 Redux Toolkit 可以在定义 Redux 时让我们免去许多繁琐的步骤，而 UI 组件和数据组件则完全不需要修改。
1. 使用 createAction 替代手写工厂函数。
2. 使用 createReducer 创建 reducer，使用策略模式，而不是单纯的函数+switch。
3. 使用 configureStore 替代 createStore+combineStore。


## 步骤总结
1. 创建 action 常量及其工厂函数。
2. 编写 reducer。
3. 创建 store。
4. Provider 注入 store。
5. connect 函数用于向组件注入 state 和 dispatch 的方法。
```
import {connect} from 'react-redux'
import Counter from '../../components/counter'
import {increament, decreament} from '../../redux/actions'

const mapStateToProps = (state) => {
  return {count: state}
}

const mapDispatchToProps = (dispatch) => {
  return {
    jia: (num) => dispatch(increament(num)),
    jian: (num) => dispatch(decreament(num))
  }
  
}
export default connect(mapStateToProps, mapDispatchToProps)(Counter)
为Counter组件提供count、jia、jian方法。组件从props中读取。
```
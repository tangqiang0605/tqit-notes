CodeMirror 是一个成熟的 web 组件，用于实现网站中的编辑器功能。现存两个主要版本 v5 和 v6，本系列文章主要介绍 CodeMirrorV6，下面简称 cm。

参考文档：[CodeMirror Docs](https://codemirror.net/docs/)。

~~`hlelo`~~

系统指导
## 结构概括
### 模块化
库采用模块化的方式提供构建组件所需的 api。

@codemirror/state, which defines data structures that represent the editor state and changes to that state.

@codemirror/view, a display component that knows how to show the editor state to the user, and translates basic editing actions into state updates.

@codemirror/commands defines a lot of editing commands and some key bindings for them.

codemirror：通用核心，包含行号槽、撤销历史等拓展。

创建一个最小可行的编辑器：
1. 创建一个 EditorState
2. 准备一个待挂载的 Dom 对象
3. 创建一个 EditorView 实现 state （数据） 和 dom （视图）的绑定。此外还接受一个 extensions 数组，用于实现各种拓展功能。

### 函数式编程
库以函数式编程为核心。库的 state 无法通过命令式的写法修改（比如赋值操作），只能通过纯函数（change set）“修改”。我们用一个纯函数接受 state 并返回一个新的 state，这时便存在两个值，函数输入的值为旧值，函数输出的值为新值。

库以命令式编程为外壳。视图组件（view）和命令接口（command）可以将纯函数封装在命令式的 api 中。

### EditorState
更新 state 的灵感来自 Redux 和 Elm。视图 view 由 state 决定。

一次更新 state 的操作称为事务（transaction），事务在调度（dispatch）后生效。事务本质上是一个变量。

```
// view.state.update是修改state的纯函数
let transaction = view.state.update({changes: {from: 0, insert: "0"}})

// transaction接受了纯函数的值，也就是新的state状态
console.log(transaction.state.doc.toString()) // "0123"

// 一旦提交了这个状态，视图将更新。
view.dispatch(transaction)
```
因此，事务可以看成是旧 state 通过纯函数修改后得到的快照，表示新 state，并通过 dispatch 来应用。

Dom 事件（编辑、撤销等）触发事务操作获得新 state，最后应用到视图上。
![[Pasted image 20230818120600.png]]
### 拓展引入
库的拓展是一个返回值为配置 configuration 的函数，可以在创建 EditorState、EditorView 时引入。引入时支持嵌套。读取拓展时，嵌套结构将被扁平化处理，然后按照从高到低的优先级从左往右引入，也可以显式提高其优先级。
```
import {keymap} from "@codemirror/view"
import {EditorState, Prec} from "@codemirror/state"

function dummyKeymap(tag) {
  return keymap.of([{
    key: "Ctrl-Space",
    run() { console.log(tag); return true }
  }])
}

let state = EditorState.create({extensions: [
// 优先级：C > A > B
  dummyKeymap("A"),
  dummyKeymap("B"),
  Prec.high(dummyKeymap("C"))
]})
```

### 文档偏移
文件的偏移概念类比数组中的索引。库使用数字表示内容在文档中的偏移位置，以 UTF16 代码为一个单位。
```
import {Text} from "@codemirror/state"

let doc = Text.of(["line 1", "line 2", "line 3"])
// Get information about line 2
console.log(doc.line(2)) // {start: 7, end: 13, ...}
// Get the line around position 15
console.log(doc.lineAt(15)) // {start: 14, end: 20, ...}
```

## 数据结构
库将文档视作扁平字符并以树形数据结构存储它，以便低代价进行部分更新以及通过行号进行高效索引。这部分将介绍文档相关的概念。

### 文档变更
文档变更（document changes）是一个值，描述了旧文档在哪个偏移位置被哪些字符取代。通过文档变更，我们可以跟踪文档变化，实现撤销历史记录、写作编辑等功能。

### 选中内容
除了文档（document），state 还存储了一组选中内容（selection）。选中内容有两种类型，一种是范围选中（由 anchor 和 head 构成），一种是编辑光标所在位置。
```
EditorSelection.range(0, 4),
EditorSelection.cursor(5)
```

### 配置
每个 state 都有一个对自己配置的私有引用

### facets
facet 是一个拓展点，facet 的值由拓展的值提供。用于读取拓展的配置值或者其它 state。类似计算属性。
```
import {EditorState} from "@codemirror/state"

let state = EditorState.create({
  extensions: [
    EditorState.tabSize.of(16),
    EditorState.changeFilter.of(() => true)
  ]
})
console.log(state.facet(EditorState.tabSize)) // 16
console.log(state.facet(EditorState.changeFilter)) // [() => true]
```
### 事务
通过 state 的 update 方法创建。可用于文档变更、移动选中内容。它可以拥有副作用（effect），比如折叠代码。

## 视图
视图层尽量对 state 保持透明，由 state 驱动。但编辑器的某些方面不能完全用状态中的数据来处理，比如多人协作、文本装饰、光标移动。

### 视口
库不会渲染整个文档，而只渲染位于视口的部分。

### 更新循环
库的视图会尽可能降低其造成的 dom 重绘。调度事务通常只会导致编辑器写入 DOM，而不会读取布局信息。读取（检查视口是否仍然有效，光标是否需要滚动到视图中，等等）是在单独的测量阶段完成的，使用 requestAnimationFrame 进行调度。如有必要，此阶段将继续进行另一个写入阶段。

视图更新时不允许再执行更新操作。当测量阶段仍挂起时，多个更新应用的测量阶段将会合并。

### Dom 结构
Inside that is the content element, which is editable. This has a DOM mutation observer registered on it, and any changes made in there will result in the editor parsing them as document changes and redrawing the affected nodes.
```
<div class="cm-editor [theme scope classes]">
  <div class="cm-scroller">
    <div class="cm-content" contenteditable="true">
      <div class="cm-line">Content goes here</div>
      <div class="cm-line">...</div>
    </div>
  </div>
</div>
```
### 样式与主题
样式注册为 facet 并被 view 读取使用。
### 命令与快捷键
命令可由菜单项、命令面板、快捷键触发执行，代表一个用户行为。它会得到一个 view 作为入参并返回一个布尔值表示是否应用此次的执行结果。命令的效果是强制性的，通常通过调度事务来产生。
## 拓展 CodeMirror
cm 的拓展有多种形式。比如 StateField. define 的返回值，EditorView. theme、ViewPlugin.fromClass的返回值等。
### state
Extensions often need to store additional information in the state.For this purpose, extensions can define additional state fields.

### 修改视图
### 装饰文档
### 拓展的结构
To create a given piece of editor functionality you often need to combine different kinds of extension: a state field to keep state, a base theme to provide styling, a view plugin to manage in- and output, some commands, maybe a facet for configuration.

A common pattern is to export a function that returns the extension values necessary for your feature to work. 
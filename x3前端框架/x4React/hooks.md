以 use 开头的函数被称为 Hook。useState 是 React 提供的一个内置 Hook。你可以在 React API 参考中找到其他内置的 Hook。你也可以通过组合现有的 Hook 来编写属于你自己的 Hook。

Hook 比普通函数更为严格。你只能在你的组件（或其他 Hook）的顶层调用 Hook。如果你想在一个条件或循环中使用 useState，请提取一个新的组件并在组件内部使用它。

来自： [快速入门 – React 中文文档](https://react.docschina.org/learn)

hook 是一个函数，返回特殊的变量或函数供我们直接调用，使用者无需关注内部发生了什么。

常见的 hook
- useState：他返回一个数组，第一个元素是一个变量，第二个元素是改变这一变量的函数，当使用函数时，视图会更新。如果没有 hook，你使用一个普通变量，并定义一个改变变量的普通方法，你执行这个方法修改了变量，但是视图并不会更新。react 会检测 state 的值是否发生改变，如果改变，就会重新渲染，如果 state 是一个对象，则需要改变对象的地址，这些内容 setState 方法都替你做了（合并你修改 state 的内容，并生成新对象进行替换，让 react 能够感应到 state 更新）。注意，在修改 setState 之前，不要修改它的值（你可能会粗心地修改了 state 的值）
- 

## 参考
https://react.docschina.org/reference/react
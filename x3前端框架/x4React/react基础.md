1. jsx 中的标签，如果是小写会被转为原生标签，大部分属性都是一一对应的，除了 className (原来是 js 中有 class、html 中有 class，分开写不冲突，但是 jsx 中 html 和 js 一起写，所以要这样设计，避免冲突）、style、onClick (不使用原生 onclick，因为考虑到了兼容性问题。原生事件三种写法）。
2. 大写则会寻找函数定义组件、类定义组件
3. 状态不可直接更改，更改了开发者工具因为不认可所以也不显示更改后的值。

react 是单向数据流。


可以直接在类中写赋值语句。如 a=1；属于实例对象。加 static 则可赋给类（在原型对象上）。
在类中的方法，全部属于原型对象

babel+react：支持解构 props 对象、jsx 语法


onClick：
1. 解决了兼容性
2. 使用了事件委托。target 事件源，委托对象 currentTarget

非受控组件：现用现取
受控组件：保存数据到状态中。

少用 refs
1. 事件+状态可以替代（受控组件）。

柯里化与不用柯里化
[036_尚硅谷react教程_不用柯里化的写法_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1wy4y1D7JT/?p=36&spm_id_from=pageDriver&vd_source=a192bbc2c82b7725cd9d5149075acda1)
生命周期
mount 挂载
![[Pasted image 20230419214337.png]]
1 和 3 都是只跑一遍。当组件挂载完成，移除。组件更新。


打开 cdn 的连接。ctrl+s。

bootCDN 常用cdn
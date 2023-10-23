vue 实例
1. beforeCreate：vue 实例一切开始创建前。
2. created 创建完毕。未挂载。有 data。
3. beforeMount：一切挂载开始之前。可请求数据。
4. mouted：挂载完毕，可以操作 dom。
5. beforeUpdata：更新视图前。
6. updated。
7. beforeDestory
8. destoryed

vue 组件
和 vue 实例类似。

父子组件
1. 父渲染时，beforeMount 后 子先渲染。父 beforeCreate->父 created->父 beforeMount->子 beforeCreate->子 created->子 beforeMount->子 mounted->父 mounted
2. 父更新时，子不做反应。
3. 子更新时，父先更新。
4. 父销毁时，子先销毁。
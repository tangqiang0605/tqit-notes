vue3实践手册

npm init vue@latest:安装并执行create-vue。

vue create project-name



npm run dev

npm run build



vue模块导出一个对象，包含多个方法。

createApp：传入一个vue组件对象，返回一个vue-app实例。

- use()：使用插件
- component('TodoDeleteButton',TodoDeleteButton)：注册组件
- config.errorHandler=(err)=>{}：应用级错误处理器
- config.grobalProperties
- mount('#app')：渲染
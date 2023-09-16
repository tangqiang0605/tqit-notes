用于声明和识别特殊后缀的模块，比如 vue 文件。

```
delare module '*.vue'{
  const component:Retrun Type <typeof defineComponent>{install:void};
  export default component
}
// 声明vue文件模块导出的都是string对象
```


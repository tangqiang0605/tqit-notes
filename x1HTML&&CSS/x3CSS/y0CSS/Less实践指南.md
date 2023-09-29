## 安装
插件 easy less

配置
``` 
  "less.compile": {
    "compress": true,
    "sourceMap": true,
    "out": "${workspaceFolder}/css/",
    "outExt": ".min.css",
    "autoprefixer":">5%,last 2 Chrome version, not ie 6-9"
  },
```

保存时转化，和 sass 类似。

## 语法
### 变量
@width: 10px; @height: @width + 10px;

### 混入
直接写入类名加括号
定义混入.mixinclassname,使用混入.mixinclassname();

### 嵌套
后代选择器、&占位符

### 导入
@import "library"; *// library.less* @import "typo.css";
如果导入less，拓展名可以省略

## 函数

width: percentage(@width);

## @规则嵌套和冒泡
@ 规则（例如 `@media` 或 `@supports`）可以与选择器以相同的方式进行嵌套。@ 规则会被放在前面，同一规则集中的其它元素的相对顺序保持不变。这叫做冒泡（bubbling）。
```less
.component {
  width: 300px;
  @media (min-width: 768px) {
    width: 600px;
    @media  (min-resolution: 192dpi) {
      background-image: url(/img/retina2x.png);
    }
  }
  @media (min-width: 1280px) {
    width: 800px;
  }
}
```

编译为：

```css
.component {
  width: 300px;
}
@media (min-width: 768px) {
  .component {
    width: 600px;
  }
}
@media (min-width: 768px) and (min-resolution: 192dpi) {
  .component {
    background-image: url(/img/retina2x.png);
  }
}
@media (min-width: 1280px) {
  .component {
    width: 800px;
  }
```
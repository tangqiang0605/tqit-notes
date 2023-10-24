tip：ts 的配置文件 json 是可以写注释的。

```
* 任意文件
** 任意路径
```

目标文件：
```
include
exclude
files
```

常用配置
```
extends 继承配置
target 目标版本
module 模块规范
lib 依赖库如‘dom’
outDir 目标目录
outFile 合并为目标文件
allowJs 是否编译js
checkJs 是否检查语法
removeComments 移除注释
noEmit 不生成文件
noEmitOnError 
alwaysStrict
noImplicitAny 不允许隐式any
noImplicitThis 不允许隐式this（指定this的类型在函数参数中）
strictNullChecks 严格检查空值
strict 开启所有严格检查配置
```

## 开始
- 边编译边运行代码没有先编译后运行的过程，不能在编译时发现错误，而是直到运行时才发生错误。比如 for 误写为死循环。vue、react 等脚手架（vuecli、cra）默认安装了。

eslint 可以解决这个问题。
1. 项目起步
mkdir projectname
cd projectname
yarn init -y

2. 生成配置文件**. eslintrc. json**
npm init @eslint/fonfig
``` 
To check syntax and find problems
浏览器（modulse）nodejs（commonjs）
配置文件json
安装es依赖
yarn
```

## 配置
parser 解析器
底层默认使用 espree 进行 ast 解析（基于 acron），不支持 ts。
@typescript-eslint/parser 将 ts 转化为 espree 能够识别的格式（estree）。

#### `rules-具体代码规则`
`quotes: ["error", "single"],   `
-   `off`或`0`：表示关闭规则
-   `warn`或`1`：表示开启规则，不过违背规则后只抛出warning，而不会导致程序退出
-   `error` 或 `2`：表示开启规则，不过违背规则后抛出 error，程序会退出


#### `extends-继承配置`
extends相当于`继承`另外一份ESLint配置，主要三种情况：
1.  从ESLint本身继承
2.  从类似`eslint-config-xxx`的npm包继承
3.  从ESLint插件继承
![[Pasted image 20230312115030.png]]

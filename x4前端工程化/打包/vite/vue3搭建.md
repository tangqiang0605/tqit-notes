vue3搭建

## 脚手架

node管理

node -v

nvm ls

nvm use 14.10.0

@vue-cli（webpack）

vue -V

vue create vdemo

vite（rollup）

npm init vite（说明vite无需安装）



vue3项目报错：vuter改为volar

v3打包失败：nodejs版本问题

打包后生成的文件带有md5后缀，md5是单向函数对于相同文件内容，md5的内容是一样的。这样只要文件内容改变，文件名也会改变。有的浏览器可能请求时发现名字不变而使用缓存中的旧文件，导致我们内容没有更新。所以实时改名是有好处的。

配了ts在script标签需要添加lang=“ts”属性才不会报错

## 新建项目

1. pnpm：硬链接，节省空间

pnpm create vite projectname --template vue-ts

2. 安装依赖、启动项目

cd projectname、pnpm install、pnpm run dev(rollup搭建本地服务器)

3. vite.config.ts

``` js
export default defineConfig({
    plugins:[vue()]
})
```

``` js
export default defineConfig({
    plugins:[vue()],
    server:{
        host:'localhost',
        port:9999,
        open:true,
    }
})
```

## 代码格式化

eslint、prettier

eslint偏重代码质量、prettier偏重代码风格

1.插件eslint、prettier

2. 安装依赖

``` 
pnpm install eslint eslint-plugin-vue eslint-config-prettier prettier eslint-plugin-import eslint-plugin-prettier eslint-config-airbnb-base -D
```

![image-20230209184931221](D:\tplmydata\tplmydoc\文档图片\image-20230209184931221.png)

3. 配置脚本

``` json
// package.json
{
    "scripts":{
        "lint:create":"eslint --init",
        "lint":"eslint \"src/**/*.{js,vue,ts}\" --fix"
    }
}
```

4. 执行命令lint:create

第二个to check syntax and find problems

es6 module

vue.js

ts

browser、node

JavaScript

yes

pnpm

5. 

6. 安装依赖

``` 
pnpm install typescript @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-import-resolver-alias @types/eslint @types/node -D
```

![image-20230209185748470](D:\tplmydata\tplmydoc\文档图片\image-20230209185748470.png)

7.cjs文件（遵循common语法，用于nodejs。如果遵循module则为mjs）。配置。

8.测试（eslint不允许使用++）

绑定个加加事件

9. 安装插件

pnpm install vite-plugin-eslint -D 

![image-20230209230201485](D:\tplmydata\tplmydoc\文档图片\image-20230209230201485.png)

10viteconfig引入

``` ts
import eslintPlugin from 'vite-plugin-eslint'

export default defineConfig({
    plugins:[vue(),eslintPlugin()]
})
```

11 配置src目录下

``` 
.prettierignore
.prettierrc.cjs
.eslintrcignore
.tsconfig.json
```

12.格式化所有文件

![image-20230209231015581](D:\tplmydata\tplmydoc\文档图片\image-20230209231015581.png)

## git增强

husky：git命令执行时自动修复eslint错误。自动执行script中的lint和prettier-format命令。

![image-20230209231508767](D:\tplmydata\tplmydoc\文档图片\image-20230209231508767.png)

1. 装包
2. 设置命令prepare
3. git init 、执行npm run prepare
4. npx husky add .husky/pre-commit "npx lint-staged"

在_husk新增了一个pre-commit文件

5.package。jsonpeizhi

![image-20230209232153281](D:\tplmydata\tplmydoc\文档图片\image-20230209232153281.png)

## css代码统一

安装stylelint插件

配置settingjson

安装校验库、规则库

配置新文件.stylelintrc.cjs(根目录)

pageagejson配置命令、执行命令

安装sass支持、配置.stylelintrc.cjs

## 开发生产模式

## setting配置文件



## 项目结构

通用

配置文件

代码文件

静态文件夹



vite

public静态

src

index.html

配置文件：vite、ts、package、vscode、git（readme)
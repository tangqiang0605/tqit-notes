[Vite 配置篇：日常开发掌握这些配置就够了！ (qq.com)](https://mp.weixin.qq.com/s/DEaRZ9IsjUP1x-W49lPh6g)
样式：scss、cssmodule、postcss
规范：eslint、prettier、husky、lint-staged、commitlint、commitizen、stylentlint、提交日志生成
仓库：lerna 或 pnpm、yarn 的 monorepo
资源：路径、svg、svg 2 雪碧图

## 起步
pnpm create vite -t vue
pnpm dev

参考：
```
import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import {fileURLToPath,URL} from 'node:url';

export default defineConfig({
	plugins:[vue()],
	resolve:{
		alias:{
			'@':fileURLToPath(new URL('./src',import.meta.url))
		}
	},
	server:{
		cors:true,
		open:true,// 自动打开
		port:5173,
		proxy:{
			'^/api':{
				target:'http://127.0.0.1:8080/',
				changeOrigin:true,
				rewrite:(path)=>path.replace(/^\/api/,'')
			}
		}
	}
})

```

## 推荐插件
vitejs/plugin-legacy 让 vite 支持不支持 esm 的浏览器。

vite-plugin-html 通过搭配 `.env` 文件，可以在开发或构建项目时，对 index. html 注入动态数据，例如替换网站标题。

unplugin-vue-component 组件 （vue 文件）自动按需导入

unplugin-auto-import
vue 3 等插件 hooks（ref、reactive） 自动引入
支持 `vue, vue-router, vue-i18n, @vueuse/head, @vueuse/core` 等自动引入


## 常用配置
css. preprocessorOptions
css. postcss

resolve. alias

是否开启强制依赖预构建。 optimizeDeps.force 或者删除点 vite 文件、 `npx vite --force`

server. host
指定服务器监听哪个 IP 地址。默认值为 `localhost` ，只会监听本地的 `127.0.0.1` 。当我们开发移动端项目时，需要在手机浏览器上访问当前项目。这时候可以将 host 设置为 `true` 或 `0.0.0.0` ，这样服务器就会监听所有地址，包括局域网和公网地址 （同一网络的其他设备可访问）。![[Pasted image 20230312192826.png]]
server. proxy 代理
反向代理也是我们经常会用到的一个功能，通常我们使用它来进行跨域：![[Pasted image 20230312192956.png]]
base
开发或生产环境服务的公共基础路径。可以是以下几种值（字符串）：
-   绝对 URL 路径，例如 `/foo/`
-   完整的 URL，例如 `https://foo.com/`
-   空字符串或 `./`（用于嵌入形式的开发）

build
输出路径、资源路径、base 64 阈值等。

plugins

## 创建工程
1. pnpm create vite
打开资源文件管理器（不用新建文件夹）在准备新建工程的地方的地址输入 cmd 打开命令行工具（git bash 的交互效果不好），创建工程。然后拖到 vscode 打开。pnpm i 安装依赖。选中网址右键。自己打开浏览器检查效果。继续使用命令行工具进行下面的配置

测试：pnpm run dev

2. npm init vite@latest

3. yarn create vite
遇到了一个问题：[(47条消息) yarn create vite报错：文件名、目录名或卷标语法不正确_vite构建 命令语法不正确_劰的劰的博客-CSDN博客](https://blog.csdn.net/Trista_1999/article/details/127693137)
安装依赖 yarn、启动开发服务器 yarn dev
## 样式
![[Pasted image 20230312114110.png]]
### 配置 sass
pnpm i sass -D

vite 自动引入：每个 sass 都自动引入 variable. scss
vite 的 css 配置。css 配置的 preprocessOption 中的 scss 配置自动引入。（已配未测试）
```js
/// normalizePath解决window路径问题
import { defineConfig,normalizePath } from 'vite'
/// 引入path报错：pnpm i @type/node -D
import path from 'path'

const variablePath = normalizePath(path.resolve('./src/assets/styles/variables.scss'))
在scss、vue文件中可以直接使用变量了
export default defineConfig({  
// css 相关的配置  
  css: {
    preprocessorOptions: {
      scss: {
        additonalData: `@import "${variablePath}";`
      }
    }
  }
})
```
测试：修改 style. css 为 scss，改变 maints 对 style 的引入。
结果：scss 可以使用，但是并不会自动引入_variable。~~也不确定支持 scss 是因为我安装了 scss 还是本来就支持。~~安装 sass 即可提供 scss 支持。

### cssmodule
vite 配置文件
```js
css:{  
modules:{  
// 一般我们可以通过generateScopedName属性来对生成的类名进行自定义  
// 其中，name表示当前文件名，local表示类名  
generateScopedName:"[name]__[local]__[hash:base64:5]"  
},  
}
```
测试：index。scss 改为 index。module。scss，审查改动引入前后的类名是否附上哈希。
结果：测试流程不对。不会使用 indexmodulescss 在 class 属性中的写法。

### postcss
vite 对 postcss 有良好的支持
pnpm i postcss autoprefixer postcss-px-to-viewport -D
```js
前缀
import autoprefixer from 'autoprefixer'
px2vw或vh
import postcssPx2Viewport from 'postcss-px-to-viewport'

postcss:{  
plugins:[  
	autoprefixer({overrideBrowserslist: ['Chrome > 40', 'ff > 31', 'ie 11']}),
	postcssPx2Viewport({viewportWidth:375})  
]  
}
```
## 高级语法
### tsx
yarn add @vitejs/plugin-vue-jsx -D
```
/// viteconfig.ts
import vueJsx from '@vitejs/plugin-vue-jsx'
({
	plugins:[
		vueJsx()
	]
})
```
### vue-router
yarn add vue-router@next
定义路由对象并导出
maints 引入路由并 use

### pinia
yarn add pinia
定义 store 对象并导出
在需要的地方引入并使用

### element plus
yarn add element-plus
maints 引入样式
maints 引入默认导出并 use
使用图标
yarn add @element-plus/icons-vue
maints 使用 componet 方法注册


## 代码规范

### eslint
pnpm i eslint -D/  yarn add eslint -D
npx eslint --init (第一个三种选法我都见过)
![[Pasted image 20230312114929.png]]
eslint 基础配置
node:true
如果eslint 对 vue 的支持版本老，将 _extends_ 中的 `'plugin:vue/essential'` 修改为 vue3 的 `'plugin:vue/vue3-essential'` 即可。


集成 ts（需要在初始化中选择 ts，不然就手动安装parser）开启规则
```js
/// .eslintrc.cjs
rules: {  
'@typescript-eslint/ban-ts-comment': 'error',  
'@typescript-eslint/no-explicit-any': 'warn',  
}
```
兼容 prettier
pnpm i eslint-config-prettier eslint-plugin-prettier -D
配置文件

viteconfig
pnpm i vite-plugin-eslint -D
```js
import viteEslint from 'vite-plugin-eslint'  
  
{  plugins:[  viteEslint()  ]  }
```
### prettier
pnpm i prettier -D
```js
// .prettierrc.js  
module.exports = {  
printWidth: 80, //一行的字符数，如果超过会进行换行，默认为80  
tabWidth: 2, // 一个 tab 代表几个空格数，默认为 2 个  
useTabs: false, //是否使用 tab 进行缩进，默认为false，表示用空格进行缩减  
singleQuote: true, // 字符串是否使用单引号，默认为 false，使用双引号  
semi: true, // 行尾是否使用分号，默认为true  
trailingComma: "none", // 是否使用尾逗号  
bracketSpacing: true // 对象大括号直接是否有空格，默认为 true，效果：{ a: 1 }  
};
```

### stylelint
pnpm i stylelint stylelint-prettier stylelint-config-prettier stylelint-config-recess-order stylelint-config-standard stylelint-config-standard-scss -D
```js
// .stylelintrc.js  
module.exports = {  
// 注册 stylelint 的 prettier 插件  
plugins: ['stylelint-prettier'],  
// 继承一系列规则集合  
extends: [  
// standard 规则集合  
'stylelint-config-standard',  
// standard 规则集合的 scss 版本  
'stylelint-config-standard-scss',  
// 样式属性顺序规则  
'stylelint-config-recess-order',  
// 接入 Prettier 规则  
'stylelint-config-prettier',  
'stylelint-prettier/recommended'  
],  
// 配置 rules  
rules: {  
// 开启 Prettier 自动格式化功能  
'prettier/prettier': true  
}  
};
```
pnpm i @amatlash/vite-plugin-stylelint -D（问题：vite、rollup版本不对）
```js
// vite.config.ts  
import viteStylelint from '@amatlash/vite-plugin-stylelint';  
  
// 具体配置  
{  
plugins: [  
// 省略其它插件  
viteStylelint({  
// 对某些文件排除检查  
exclude: /windicss|node_modules/  
}),  
]  
}
```

lint-staged

### husky

commitlint


## 静态文件

### 路径别名
静态文件别名
```js
resolve: {  
// 别名配置  
alias: {  
'@assets': path.join(__dirname, 'src/assets')  
}  
}
```

### svg

### svg 2 雪碧图


### 图片压缩（已废弃）
pnpm i vite-plugin-imagemin -D


## 辅助开发
### 自动引入
再也不用手写引入组合式 api 啦！很方便。
npm i unplugin-auto-import -D
```js
/// vite.config.ts
import AutoImport from 'unplugin-auto-import'
export default defineConfig({
	plugins:[
		AutoImport({
			imports:['vue','vue-router','vuex','pinia']
		})
	]
})

```
```js
tsconfig.json

"include":["auto-imports.d.ts"]
```
### 路径别名
vue 开发过程中，在引入文件时，习惯使用 _@_ 代替 _src_
```js
如果报错， yarn add @types/node -D
import path from 'path';
export default defineConfig({
	resolve:{
		alias:{
			"@":path.resolve(__dirname,'./src')
			可以继续在 alias 中给常用的目录定义其他别名
		}
	},
	"compilerOption":{
		"baseUrl":".",
		"paths":{
			"@/*":["src/*"]
		}
	}
}
```
或使用插件
```
// vite.config.jsimport { defineConfig } from 'vite'import { ViteAliases } from './node_modules/vite-aliases' // 通过名称引入会报错，可能是插件问题export default defineConfig({  plugins: [    ViteAliases()  ]})
```

相应的路径别名如下：

```
src -> @  assets -> @assets  components -> @components  router -> @router  stores -> @stores  views -> @views  ...
```

## 环境配置
参看 vite 环境一文。

# 实例
## Vue 3 自动引入插件
unplugin-auto-import/vite

vite 配置

```
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
// https://vitejs.dev/config/
export default defineConfig ({
  plugins: [vue (), VueJsx (), AutoImport ({
    imports:['vue'],
    dts: "src/auto-import. d. ts"
  })]
})
```
配置完成之后使用 ref reactive watch 等无须 import 导入可以直接使用 



npm install -D tailwindcss@latest postcss@latest autoprefixer@latest

## 使用 TailwindCss

[中文文档 - Tailwind CSS 中文文档](https://www.tailwindcss.cn/docs)

1 创建项目

`npm init vue@latest` 或 `vue create project-name`

2 安装依赖

`npm install -D tailwindcss@latest postcss@latest autoprefixer@latest`

3 生成配置文件

`npx tailwindcss init -p`

4 修改配置文件

``` js
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

5 全局引入 css

`import  ’./tailwind.css'` 名字可自取

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

6 在 html 中使用

``` html
  <div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
    <div class="md:flex">
      <div class="md:flex-shrink-0">
        <img class="h-48 w-full object-cover md:w-48" src="http://n.sinaimg.cn/translate/20170815/OoVn-fyixtym5144510.jpg" alt="Man looking at item at a store">
      </div>
      <div class="p-8">
        <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Case study</div>
        <a href="#" class="block mt-1 text-lg leading-tight font-medium text-black hover:underline">Finding customers
          for your new business</a>
        <p class="mt-2 text-gray-500">Getting a new business off the ground is a lot of hard work. Here are five ideas
          you can use to find your first customers.</p>
      </div>
    </div>
  </div>
```

## 使用 electron

创建项目

`npm init vite@latest`

安装依赖

`npm install electron vite-plugin-electron electron-builder -D`

 配置文件

``` js
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import electron from 'vite-plugin-electron'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), electron({
    main: {
      entry: "electron/index.ts"
    }
  })]
})
```

``` js
// electron/index.ts
// 新建这个文件,electron与src同级
import { app, BrowserWindow } from 'electron'
import path from 'path'
//app 控制应用程序的事件生命周期。
//BrowserWindow 创建并控制浏览器窗口。
 
let win: BrowserWindow | null;
//定义全局变量获取 窗口实例
 
const createWindow = () => {
    win = new BrowserWindow({
        //
        webPreferences: {
            devTools: true,
            contextIsolation: false,
            nodeIntegration: true
            //允许html页面上的javascipt代码访问nodejs 环境api代码的能力（与node集成的意思）
        }
    })
    if (app.isPackaged) {
        win.loadFile(path.join(__dirname, "../index.html"));
    } else {
//VITE_DEV_SERVER_HOST 如果是undefined 换成  VITE_DEV_SERVER_HOSTNAME
        win.loadURL(`http://${process.env['VITE_DEV_SERVER_HOST']}:${process.env['VITE_DEV_SERVER_PORT']}`)
    }
}
//isPackage 不好使换下面的
  //  if(process.env.NODE_ENV != 'development'){
      //  win.loadFile(path.join(__dirname, "../index.html"));
  //  }else{
        //win.loadURL(`http://${process.env['VITE_DEV_SERVER_HOSTNAME']}:${process.env['VITE_DEV_SE//RVER_PORT']}`)
   // }
//在Electron完成初始化时被触发
app.whenReady().then(createWindow)
```

``` js
// package.json
增加main 字段 type 去掉
{
  "name": "electron-vite",
  "private": true,
  "version": "0.0.0",
  "main": "dist/electron/index.js",
  "scripts": {
    "dev": "vite",
    解决乱码问题：
      "dev": "chcp 65001 && vite",
    配置命令
    	"build": "vue-tsc --noEmit && vite build  &&  electron-builder",
    "preview": "vite preview"
  },
  "dependencies": {
    "vue": "^3.2.37"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^3.0.0",
    "electron": "^19.0.10",
    "electron-builder": "^23.1.0",
    "typescript": "^4.6.4",
    "vite": "^3.0.0",
    "vite-plugin-electron": "^0.8.3",
    "vue-tsc": "^0.38.4"
  }
}
```

运行

npm run dev

打包

npm run build

打包详细配置、报错：Error: Module "path" has been externalized for browser compatibility. Cannot

解决方法：渲染进程和主进程通信 [(103条消息) 小满Vue3第三十九章（Vue开发桌面程序Electron）_小满zs的博客-CSDN博客](https://xiaoman.blog.csdn.net/article/details/126063804)

``` json
  "build": {
    "appId": "com.electron.desktop",
    "productName": "electron",
    "asar": true,
    "copyright": "Copyright © 2022 electron",
    "directories": {
      "output": "release/"
    },
    "files": [
      "dist"
    ],
    "mac": {
      "artifactName": "${productName}_${version}.${ext}",
      "target": [
        "dmg"
      ]
    },
    "win": {
      "target": [
        {
          "target": "nsis",
          "arch": [
            "x64"
          ]
        }
      ],
      "artifactName": "${productName}_${version}.${ext}"
    },
    "nsis": {
      "oneClick": false,
      "perMachine": false,
      "allowToChangeInstallationDirectory": true,
      "deleteAppDataOnUninstall": false
    },
    "publish": [
      {
        "provider": "generic",
        "url": "http://127.0.0.1:8080"
      }
    ],
    "releaseInfo": {
      "releaseNotes": "版本更新的具体内容"
    }
  }
```

``` json
nsis配置详细
{"oneClick": false, // 创建一键安装程序还是辅助安装程序（默认是一键安装）
    "allowElevation": true, // 是否允许请求提升，如果为false，则用户必须使用提升的权限重新启动安装程序 （仅作用于辅助安装程序）
    "allowToChangeInstallationDirectory": true, // 是否允许修改安装目录 （仅作用于辅助安装程序）
    "installerIcon": "public/timg.ico",// 安装程序图标的路径
    "uninstallerIcon": "public/timg.ico",// 卸载程序图标的路径
    "installerHeader": "public/timg.ico", // 安装时头部图片路径（仅作用于辅助安装程序）
    "installerHeaderIcon": "public/timg.ico", // 安装时标题图标（进度条上方）的路径（仅作用于一键安装程序）
    "installerSidebar": "public/installerSiddebar.bmp", // 安装完毕界面图片的路径，图片后缀.bmp，尺寸164*314 （仅作用于辅助安装程序）
    "uninstallerSidebar": "public/uninstallerSiddebar.bmp", // 开始卸载界面图片的路径，图片后缀.bmp，尺寸164*314 （仅作用于辅助安装程序）
    "uninstallDisplayName": "${productName}${version}", // 控制面板中的卸载程序显示名称
    "createDesktopShortcut": true, // 是否创建桌面快捷方式
    "createStartMenuShortcut": true,// 是否创建开始菜单快捷方式
    "shortcutName": "SHom", // 用于快捷方式的名称，默认为应用程序名称
    "include": "script/installer.nsi",  // NSIS包含定制安装程序脚本的路径，安装过程中自行调用  (可用于写入注册表 开机自启动等操作)
    "script": "script/installer.nsi",  // 用于自定义安装程序的NSIS脚本的路径
    "deleteAppDataOnUninstall": false, // 是否在卸载时删除应用程序数据（仅作用于一键安装程序）
    "runAfterFinish": true,  // 完成后是否运行已安装的应用程序（对于辅助安装程序，应删除相应的复选框）
    "menuCategory": false, // 是否为开始菜单快捷方式和程序文件目录创建子菜单，如果为true，则使用公司名称
}
```


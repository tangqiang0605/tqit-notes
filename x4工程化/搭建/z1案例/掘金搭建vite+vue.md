## 概述

[Vue3.3 + Vite4.3 + Element-Plus + TypeScript 从0到1搭建企业级后台管理
系统（前后端开源） - 掘金](https://juejin.cn/post/7228990409909108793)
![[Pasted image 20230712201904.png]]
![[Pasted image 20230712202237.png]]
## 创建项目

```
pnpm create vite your-project-name -t vue-ts
cd your tab
pnpm i 
pnpm dev
```
安装失败，报错 vite 包未找到。原因是我使用的是国内镜像，npm 在国内镜像可以找到包，但是 pnpm 可能找不到。
切换回官方镜像
`pnpm config set registry https://registry.npmjs.org/`
查看目前的地址
`pnpm get registry`
参考文章： https://article.juejin.cn/post/7245838232012488764
`pnpm dev`
结果：正常启动。

快速 vue 模板：v 3tss

## vscode
安装两个 volar，禁用vetur
## 配置 vite
### 更改导出函数。
```
import { ConfigEnv,UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default ({ mode }: ConfigEnv): UserConfig => {
  return {
    plugins: [vue()],
  }
}
```
### 配置别名
vite
```
import path from "path"

const pathSrc = path.resolve(__dirname, "src")

  resolve: {
    alias: {
      "@":pathSrc
    }
  }
```
pnpm i -D @types/node
ts
```
"compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@/*":["src/*"]
    }
  },
```
## 环境变量与代理
1. 环境变量文件
![[Pasted image 20230712220206.png]]
```
# 变量必须以 VITE_ 为前缀才能暴露给外部读取
VITE_APP_TITLE = 'vue3-element-admin'
VITE_APP_PORT = 3000
VITE_APP_BASE_API = '/dev-api'

VITE_APP_TITLE = 'vue3-element-admin'
VITE_APP_PORT = 3000
VITE_APP_BASE_API = '/prod-api'

```
1. 环境变量智能提示。所有环境文件的变量可多可少，看你怎么定义。
```
// src/types/env.d.ts
interface ImportMetaEnv {
  /**
   * 应用标题
   */
  VITE_APP_TITLE: string;
  /**
   * 应用端口
   */
  VITE_APP_PORT: number;
  /**
   * API基础路径(反向代理)
   */
  VITE_APP_BASE_API: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

```

### 代理
这是生产环境下的反向代理。生产环境需要在 nginx 中配置。
```
  const env = loadEnv(mode, process.cwd());

  server: {
    open: true,
    // 开启局域网测试，但是在实验室手机都无法访问，只有自己电脑可以。回宿舍试试。
    host: '0.0.0.0',
    port: Number(env.VITE_APP_PORT),
    proxy: {
      [env.VITE_APP_BASE_API]: {
        target: "http://vapi.youlai.tech",
        changeOrigin: true,
        rewrite:path=>path.replace(new RegExp('^'+env.VITE_APP_BASE_API),'')
    }
  }
  },

将/dev-api/api/v1/users/me改为/dev-api/api/v1/users/me（正则），并加上target。
根据不同环境使用不同的port和api。

发送请求时，不管是在什么服务器上，都会把请求改代理。
示例：
baseurl：设为/dev-api
url：/api/v1/users/me
因为没有域名，这时发送请求默认会使用托管代码的服务器，如
localhost:3000/dev-api/api/v1/users/me
代理会改掉域名，并对域名后面部分进行正则替换
target+正则结果
http://vapi.youlai.tech/api/v1/users/me
```
## 安装组件库
```
pnpm i element-plus
pnpm i -D unplugin-icons
```
### 配置自动导入
下载
```
pnpm i -D unplugin-auto-import unplugin-vue-components
```
配置 vite，运行时会自动生成 ts 类型声明文件
```
import AutoImport from "unplugin-auto-import/vite"
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";

    plugins: [vue(),
      AutoImport({
    // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
    imports: ["vue"],
    eslintrc: {
      enabled: true, // 是否自动生成 eslint 规则，建议生成之后设置 false 
      filepath: "./.eslintrc-auto-import.json", // 指定自动导入函数 eslint 规则的文件
    },    
                resolvers: [
          // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
          ElementPlusResolver(),
          // 自动导入图标组件
          IconsResolver({}),
        ],
        vueTemplate: true, // 是否在 vue 模板中自动导入
        dts: path.resolve(pathSrc, 'types', 'auto-imports.d.ts') // 自动导入组件类型声明文件位置，默认根目录
      
  }),
      Components({
        resolvers: [
          // 自动导入 Element Plus 组件
          ElementPlusResolver(),
          // 自动注册图标组件
          IconsResolver({
            enabledCollections: ["ep"] // element-plus图标库，其他图标库 https://icon-sets.iconify.design/
          }),
        ],
        dts: path.resolve(pathSrc, "types", "components.d.ts"), //  自动导入组件类型声明文件位置，默认根目录
      }),
      Icons({
        // 自动安装图标库
        autoInstall: true,
      }),
    
    
    
    ],
```


~~配置 ts （自带）~~
示例代码
```
<!-- src/components/HelloWorld.vue -->
<div>
  <el-button type="success"><i-ep-SuccessFilled />Success</el-button>
  <el-button type="info"><i-ep-InfoFilled />Info</el-button>
  <el-button type="warning"><i-ep-WarningFilled />Warning</el-button>
  <el-button type="danger"><i-ep-WarnTriangleFilled />Danger</el-button>
</div>

```
# 配置 linters
[【vue3-element-admin】ESLint+Prettier+Stylelint+EditorConfig 约束和统一前端代码规范 - 掘金](https://juejin.cn/post/7241184271318204477)

vscode 安装插件eslint
```
// .vscode/setting.json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true, // 开启eslint自动检测
    "source.fixAll.stylelint": true // 开启 Stylelint 保存自动检测
  },
  // Stylelint 校验文件
  "stylelint.validate": ["css", "scss", "vue", "html"],
  "editor.defaultFormatter": "esbenp.prettier-vscode" // 指定 prettier 为所有文件默认格式化器
}
```
安装 eslint 依赖、忽略文件、配置文件、配置脚本、测试。
```
更改parser
新增extends
    "./.eslintrc-auto-import.json"
去除规则
    "vue/multi-word-component-names": "warn"
```
安装 prettier 依赖、配置文件、忽略文件、配置脚本、测试。
安装 stylelint 系列依赖、配置文件、忽略文件、配置脚本、测试 css 顺序。
# 配置提交规范
[【vue3-element-admin】Husky + Lint-staged + Commitlint + cz-git 配置 Git 提交规范 - 掘金](https://juejin.cn/post/7241562753164230717)

提交钩子接口 husky
`npx husky-init`
提交时对暂存区运行 linters。安装依赖、配置 packagejson、配置脚本、修改 pre-commit 钩子。
提交信息规范化 commitlint。安装依赖，配置文件、生成 husky 钩子。提交测试 git commit -m "aa";
交互式 commitlint 适配器：cz-git。安装依赖，配置 packagejson、配置 commitlint. config. cjs、配置脚本，尝试执行脚本。

## 代码提交规范
1. cz-git 要求提交前需要先 add。
2. commitlint 要求提交信息规范:
`<type>(<scope>): <subject>`，type 和 subject 默认必填
![[Pasted image 20230713204611.png]]
3. 提交时选择类型，然后可以跳过 scope，有填写 subject（描述）就好。
## 整合图标组件
```
pnpm i -D fast-glob@3.2.11 vite-plugin-svg-icons@2.0.1

// src/main.ts
import 'virtual:svg-icons-register';

// vite.config.ts
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';

plugins: [
             createSvgIconsPlugin({
                 // 指定需要缓存的图标文件夹
                 iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
                 // 指定symbolId格式
                 symbolId: 'icon-[dir]-[name]',
             })
         ]
```
图标组件
```
<!-- src/components/SvgIcon/index.vue -->
<script setup lang="ts">
const props = defineProps({
  prefix: {
    type: String,
    default: "icon",
  },
  iconClass: {
    type: String,
    required: false,
  },
  color: {
    type: String,
  },
  size: {
    type: String,
    default: "1em",
  },
});

const symbolId = computed(() => `#${props.prefix}-${props.iconClass}`);
</script>

<template>
  <svg
    aria-hidden="true"
    class="svg-icon"
    :style="'width:' + size + ';height:' + size"
  >
    <use :xlink:href="symbolId" :fill="color" />
  </svg>
</template>

<style scoped>
.svg-icon {
  display: inline-block;
  outline: none;
  width: 1em;
  height: 1em;
  vertical-align: -0.15em; /* 因icon大小被设置为和字体大小一致，而span等标签的下边缘会和字体的基线对齐，故需设置一个往下的偏移比例，来纠正视觉上的未对齐效果 */
  fill: currentColor; /* 定义元素的颜色，currentColor是一个变量，这个变量的值就表示当前元素的color值，如果当前元素未设置color值，则从父元素继承 */
  overflow: hidden;
}
</style>

```

[iconfont-阿里巴巴矢量图标库](https://www.iconfont.cn/collections/detail?spm=a313x.7781069.1998910419.d9df05512&cid=45542)下载图标用于测试
```
<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1689167046443" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2118" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><path d="M850.14 490.866h-63.4v-169.07c0-46.706-37.83-84.535-84.536-84.535h-169.07V173.86c0-58.33-47.34-105.669-105.67-105.669s-105.668 47.34-105.668 105.669v63.4h-169.07c-46.705 0-84.112 37.83-84.112 84.536l-0.212 160.616h63.19c62.978 0 114.122 51.144 114.122 114.122S194.57 710.656 131.592 710.656h-63.19l-0.21 160.617c0 46.705 37.829 84.535 84.534 84.535h160.616v-63.401c0-62.978 51.144-114.122 114.123-114.122s114.122 51.144 114.122 114.122v63.4h160.616c46.706 0 84.535-37.829 84.535-84.534V702.204h63.401c58.33 0 105.669-47.34 105.669-105.669s-47.34-105.67-105.668-105.67z" p-id="2119"></path></svg>
```
使用方法
```
    <svg-icon icon-class="block"/>
    <svg-icon icon-class="图标名"/>
```

## sass
```
只要下载sass开发依赖即可，vite对sass有开箱即用的支持。
pnpm i -D sass

额外配置sass自动引入的头文件，可以根据需要再引入mixin等。
// vite.config.ts
return对象的顶级属性的UserConfig的顶级属性。
css: {
    // CSS 预处理器
    preprocessorOptions: {
        //define global scss variable
        scss: {
            javascriptEnabled: true,
            additionalData: `@use "@/styles/variables.scss" as *;`
        }
    }
}

```
测试
```
// src/styles/variables.scss
$bg-color:red;
<!-- src/components/HelloWorld.vue -->
<template>
  <div class="box" />
</template>

<style lang="scss" scoped>
.box {
  width: 100px;
  height: 100px;
  background-color: $bg-color;
}
</style>
```
## unocss
```
pnpm install -D unocss

// vite.config.ts
import UnoCSS from 'unocss/vite'

export default {
  plugins: [
    UnoCSS({ /* options */ }),
  ],
}

// src/main.ts
import 'uno.css'

```
unocss 插件与智能提示
[UnoCSS 插件智能提示不生效解决\_有来技术的博客-CSDN博客](https://blog.csdn.net/u013737132/article/details/129212770)

## pinia
```
pnpm i pinia

// src/main.ts
import { createPinia } from "pinia";
import App from "./App.vue";

createApp(App).use(createPinia()).mount("#app");

```
使用
1. 导出定义 store 的函数的返回值，在导入的模块中，调用这个返回值就可以获得该 store。定义 store 函数的第二个参数也可以是一个类似 setup 的函数。
```
export const usexxxstore=defineStore("xxx",{
	状态
	state:()=>({
		count:0
	}),
	计算属性
	getters:{
		double:(state)=>state.count*2,
	},
	业务操作
	actions:{
		increment(){
			this.count++;
		}
	}
})
```
2. 使用
```
import {usexxxstore} from '@/store/counter'
const counter=useCounterStore()
counter.count++
// 自动补全！ ✨
counter.$patch({ count: counter.count + 1 })
// 或使用 action 代替
counter.increment()
```
3. ts
	1. 定义 state 函数的返回值类型。
1. 个人规范
	1. 使用选项式定义 store 而不是组合式，组合式比较复杂和冗余。
	2. 读取状态直接读取。更改。
	3. patch 用于更改，也可以替代 actiond 的功能。
	4. 涉及复杂业务时才使用 action 
	5. 读取状态总是作为计算属性的一部分，应该抽为 getters
	6. 用 this. 状态来访问状态。
![[Pasted image 20230712215852.png]]

## axios
1. utils、request. ts 创建实例
2. 创建拦截器
3. 数据流：
	1. vue 调 store 调 api 调 request
	2. vue 调 api 调 request

## 指令
进行 dom 代码复用。比如按钮权限。

## 全局注册
store 和 directive 都用 index 导出一个接收 app 的函数进行全局批量注册。注册插件 use、注册指令 directive、注册组件 component。
```
export function setupDirective(app: App<Element>) {
  // 使 v-hasPerm 在所有组件中都可用
  app.directive('hasPerm', hasPerm);
  app.directive(指令2);
  app.directive(指令3);
  ...
}
main.ts
setupDirective(app);
```

## stylelint
[CSS书写规范和顺序-百度经验](https://jingyan.baidu.com/article/647f0115cf48957f2148a8a3.html) 书写顺序规范
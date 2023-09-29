
[Vue3 Vite3 多环境配置 - 基于 vite 创建 vue3 全家桶项目(续篇） (qq.com)](https://mp.weixin.qq.com/s/ADsPzdDwmwDHVn1cyAdW5A)

涉及配置 
packagejson 的 script
viteconfig.ts 的 base、envDir

在项目或产品的迭代过程中，通常会有多套环境，常见的有：
- _dev_：开发环境
- _sit_：集成测试环境
- _uat_：用户接收测试环境
- _pre_：预生产环境
- _prod_：生产环境
环境之间配置可能存在差异，如**接口地址**、**全局参数**等。

在基于 _vue-cli （webpack）_的项目中只需要
1、**添加_.env.xxx_文件**
2、在 _package.json_ 的 _scripts_ **启动或打包命令中指定 _mode_ 参数**
3、获取环境变量时**使用 _process.env.xxx_**。

_vite_ 使用方式类似，但获取环境变量使用 _import.meta.env_。

### import. meta. env

```js
/// main. ts
const env=import.meta.env;
console.log(env);
```
 
 _import.mata.env_ 中默认包括五个内置环境变量：
 ![[Pasted image 20230312163235.png]]（yarn dev）
BASE_URL：部署应用时的基本 URL，在 vite 的配置文件 _vite.config.ts_ 中的 _base_ 属性指定；
DEV：是否是开发环境（即是否通过 _vite_ 启动服务运行）
MODE：应用的运行模式。由于我们是通过 _yarn dev_ 启动服务，而 _yarn dev_ 本质是执行 _vite_ 启动，**未显式执行 _mode_，故 MODE 的值缺省为 _development_.**
PROD：是否是生产环境（即是否通过 _vite build_ 构建）
SSR：是否是服务端渲染模式。

### mode 参数
![[Pasted image 20230312163453.png]]

### 环境文件
Vite 使用 _dotenv_ 从环境文件目录中加载环境文件，默认情况下，环境文件目录为项目的根目录，即把环境文件放在项目根目录下。在 vite 中，可以通过配置 _envDir_ 属性指定环境文件目录。
```js
/// viteconfigts
envDir: path.resolve(__dirname, './env')
```
 环境文件命名如下：
全局：无论是哪种模式，_.env_ 文件都会被加载
.env               # 所有情况下都会加载
.env.local       # 所有情况下都会加载，但会被 git 忽略
部分：如果 key 与全局冲突，会覆盖掉全局的 key。
.env.[mode]   # 只在指定模式下加载
.env.[mode].local   # 只在指定模式下加载，但会被 git 忽略
例子：
• 开发环境，mode 为 _dev_，文件名为 _.env.dev_
• 测试环境，mode 为 _uat_，文件名为 _.env.uat_
• 生产环境，mode 为 _prod_，文件名为 _.env.prod_
![[Pasted image 20230312163901.png]]
**环境变量需要以 _VITE__ 开头才会暴露到 _import.meta.env_ 中，作为其属性，与固有的五个属性并列。**
**_.env.[mode].local_  优先级最高。**

## ts 提示
手动给 import. meta. env 对象补充属性，使其具备智能提示。
![[Pasted image 20230312164313.png]]








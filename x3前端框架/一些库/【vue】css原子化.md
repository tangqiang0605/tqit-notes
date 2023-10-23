- 一、制作原子化css

  ### 简单介绍

  css原子化：[Let’s Define Exactly What Atomic CSS is | CSS-Tricks - CSS-Tricks](https://css-tricks.com/lets-define-exactly-atomic-css/)。

  如果将编程语言（c/c++等）的基本思想应用于超文本语言（html/css等），能使后者的开发效率大大提高。

  什么是css原子化？先让我们把目光转到编程语言的一个基础概念——函数。函数可以增加我们代码的复用性。举一个简单的例子，我们定义一个判断质数的函数isPrime()，一个判断非质数的函数isNotPrime()，再定以一个将数字加入数组的函数push()，这些足够小的函数，我们暂且称他们为原子函数。通过原子函数，我们可以轻松地构造一个将质数加入数组的“复杂”函数：只要调用isPrime和push即可；创建一个将非质数加入数组的函数亦是如此。

  css原子化与之类似。我们编写一些足够小的类选择器，暂且称其为原子选择器，并将他们挂载到需要的dom上。

  css原子化还有另一个核心概念，就是css类名语义化，这也是原子化的依据。我们可以编写一个名为display-inline类选择器，其属性则是display:inline，类似的，还可以定义display-flex类选择器，包含一个属性：display:flex。

  当在css文件中完成一系列定义后，在html中书写页面的过程将变得十分流畅，效率也得到到极大的提高，我们像调用函数一样调用类选择器：由传统的先挂载选择器后书写一个属性丰富的选择器，转变为：当我们定义一个dom对象后，根据需要，给它挂载上不同的类选择器。

  ### 传统实现

  借助scss预处理器（[Sass世界上最成熟、稳定和强大的CSS扩展语言 | Sass中文网](https://www.sass.hk/)），我们可以快速地完成定义原子的任务：

  ```css
  // style.scss
  
  @for $i from 1 through 10 {
    .margin-#{$i} {
      margin: $i / 4 rem;
    }
  }
  ```

  编译结果为：

  ```css
  .margin-1 { margin: 0.25 rem; }
  .margin-2 { margin: 0.5 rem; }
  /* ... */
  .margin-10 { margin: 2.5 rem; }
  ```

  ## 二、集成TailwindCSS

  ### 简单介绍

  让人兴奋的是，css原子并不需要我们定义，市面上已经有为我们准备好的基于css原子化思想的css框架。而网页开发者的工作，就是将其引入到项目中，然后在html中根据需要引入框架提供的css选择器即可。正如Tailwind CSS框架首页所说：Rapidly build modern websites without ever leaving your HTML.

  常见的这类框架有：Tailwind CSS、Windi CSS、Tachyons等。有些ui库也在其中运用了这种思想：比如Bootstrap、Chakra UI。

  官方文档：[Tailwind CSS](https://tailwindcss.com/)

  基于css原子化思想构建的项目集合：https://tailwindcss.com/showcase。

  TailwindCss为开发者提供丰富的css类名，以快速实现样式控制，直接在dom上使用即可（和animate.css插件类似）。

  ### 创建项目

  `npm init vue@latest`	或	`vue create project-name`

  ### 安装依赖

  `npm install -D tailwindcss@latest postcss@latest autoprefixer@latest`

  ### 生成配置文件

  `npx tailwindcss init -p`

  ### 修改配置文件

  ```js
  // tailwind.config.js
  module.exports = {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
      extend: {},
    },
    plugins: [],
  }
  ```

  ### 全局引入css
  ```css
  /* tailwind.css，名字位置随意，只要在maints中正确引入即可 */
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  ```
  ```js
  // main.js/main.ts
  import  ’./tailwind.css'
  ```

  ### 使用示例

  代码：

  ```html
    <div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div class="md:flex">
        <div class="md:flex-shrink-0">
          <img class="h-48 w-full object-cover md:w-48" src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201702%2F09%2F20170209103108_VrThc.jpeg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1671277226&t=160336a6adb676071a555f1915a9c86d" alt="Man looking at item at a store">
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

  效果：

  ![在这里插入图片描述](https://img-blog.csdnimg.cn/9a90d26457494ab292fc05fd13681577.png#pic_center)


  然而，TailwindCSS在提供充足的css原子的同时，也增大了项目的体积（生成了一个几MB的css文件，包括很多没有使用的原子）。为了解决这个问题，Tailwind采用生成再清除的方法：在生成构建时，TailwindCSS使用PurgeCSS（[PurgeCSS - Remove unused CSS | PurgeCSS](https://purgecss.com/)）去除没有被使用的css类，以减少生成的css文件的体积。

  ## 三、unocss通用框架

  ### 简单介绍

  官方文档：[unocss/unocss: The instant on-demand atomic CSS engine. (github.com)](https://github.com/unocss/unocss)

  开发者文章：[重新构想原子化CSS - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/425814828)。

  UnoCSS，通过预设，可以模拟大多数已有原子化 CSS 框架的功能。例如，默认的 `@unocss/preset-uno` 预设（**实验阶段**）是一系列流行的原子化框架的通用超集，包括了 Tailwind CSS，Windi CSS，Bootstrap，Tachyons 等。

  > 现在能用吗？
  >
  > 简而言之：可以，但有注意事项。
  >
  > UnoCSS 仍处于实验阶段，但由于其精简的设计，生成的结果已经非常可靠了。需要注意的一点是，API 还没有最终定案，虽然我们会遵循 semver 的进行版本发布，但是还请为破坏性改动做好准备。
  >
  > 注意：它并非被设计成 Windi CSS 或 Tailwind 的替代品（考虑等待 Windi CSS v4）。我们不建议将现有项目完全迁移到 UnoCSS。你可以在新的项目中试用它，或者将它作为你现有 CSS 框架的补充（例如，禁用默认预设，只使用纯 CSS 图标的预设，或者自定义你的规则）。

  个人认为：如果工具的设计和使用理念符合你的开发习惯，你可以尝试使用它。

  ### 创建项目

  建议使用vite构建项目并集成unocss而不是使用vue-cli来构建项目。（vite基于rollup而vue-cli基于webpack，而unocss的webpack版本功能较少）

  ### 安装依赖

  `npm i -D unocss @unocss/preset-uno`

  ### 配置插件

  ```js
  // vite.config.ts
  import { defineConfig } from 'vite'
  import vue from '@vitejs/plugin-vue'
  import Unocss from '@unocss/vite'
  import { presetUno } from 'unocss'
  
  export default defineConfig({
    plugins: [
      vue(),
      Unocss({
        presets: [
          presetUno()
        ]
        /* options */
      }),]
  })
  
  
  ```

  ### 全局引入css

  ```js
  // main.js/main.ts
  import 'uno.css'
  ```

  ### 使用示例

  unocss的一个重要概念就是“预设”（preset），你可以在官方文档中获取更多关于预设的信息，它能够为我们提供更多方便实用的功能。但如果你只是需要TailwindCSS的功能以及unocss的性能，你只需要完成“配置插件”中的内容，并在html中使用TailwindCSS官方文档提供的类名即可。

  1. 配置

  ```js
  // vite.config.ts
  import { defineConfig } from 'vite'
  import vue from '@vitejs/plugin-vue'
  import Unocss from '@unocss/vite'
  import { presetUno,presetAttributify,presetIcons} from 'unocss'
  // 这三个预设对应unocss的常见特色功能，分别是
  // presetAttributify，属性语义化，直接在属性上写样式！(<div hover="op80">)
  // presetIcons,实现不需要JavaScript的纯css图标。<a i-carbon-logo-github></a>
  // presetUno就是缺省的配置项，如果你需要配置其他预设，就应该显式引用它。
  // 如果你只是想使用TailwindCSS等框架的内容，不需要上面的功能，
  // 你甚至不需要引入这些文件、不对vite的插件进行更多的配置，就可以直接在html中使用它。
  
  export default defineConfig({
    plugins: [
      vue(),
      Unocss({
        // 自定义css：
        // rules可以自定义原子css
          	// shortcuts可以给多个原子css组合取一个别名，方便使用
        rules: [['custom-rule', { color: 'red' }]],
        shortcuts: {
          'custom-shortcut': 'text-lg text-orange hover:text-teal',
        },
        // 预设
        presets: [
          presetUno(),
          presetAttributify(),
          presetIcons({
            scale: 1.2,
            cdn: 'https://esm.sh/',
          }),
        ],
      }),
    ]
  })
  
  
  ```

  2. 使用

  ```html
  <div h-full text-center flex select-none all:transition-400>
    <div ma>
      <div text-5xl fw100 animate-bounce-alt animate-count-infinite animate-duration-1s>
        unocss
      </div>
      <div op30 text-lg fw300 m1>
        The instant on-demand Atomic CSS engine.
      </div>
      <div m2 flex justify-center text-2xl op30 hover="op80">
        <a
          i-carbon-logo-github
          text-inherit
          href="https://github.com/unocss/unocss"
          target="_blank"
        ></a>
      </div>
    </div>
  </div>
  <div absolute bottom-5 right-0 left-0 text-center op30 fw300>
    on-demand · instant · fully customizable
  </div>
  ```

  3.  查看效果：[Unocss Playground](https://uno.antfu.me/play/)演练场。

  4. 图标预设：

     presetIcons，引用纯css图标（参考上面的示例）。你可以从[Iconify](https://icon-sets.iconify.design/)项目（包含一百余个热门图标集合：Material Design Icons， Ant Design Icons 等等）获得属性的名字：属性格式：i-图标库-图标名。可以看到图标名称为carbon:logo-github，对应属性i-carbon-logo-gihub。`npm i -D @iconify-json/ic`

     >[Icônes (icones.js.org)](https://icones.js.org/)：这个网站可以更方便地查看Iconify项目中的图标集。

  5. 全部预设

  | Official Presets                                             | Description                                                  |
  | ------------------------------------------------------------ | ------------------------------------------------------------ |
  | [@unocss/preset-uno](https://github.com/unocss/unocss/tree/main/packages/preset-uno) | The default preset (right now it's equivalent to `@unocss/preset-wind`). |
  | [@unocss/preset-mini](https://github.com/unocss/unocss/tree/main/packages/preset-mini) | The minimal but essential rules and variants.                |
  | [@unocss/preset-wind](https://github.com/unocss/unocss/tree/main/packages/preset-wind) | Tailwind / Windi CSS compact preset.                         |
  | [@unocss/preset-attributify](https://github.com/unocss/unocss/tree/main/packages/preset-attributify) | Provides [Attributify Mode](https://github.com/unocss/unocss/tree/main/packages/preset-attributify#attributify-mode) to other presets and rules. |
  | [@unocss/preset-icons](https://github.com/unocss/unocss/tree/main/packages/preset-icons) | Use any icon as a class utility.                             |
  | [@unocss/preset-web-fonts](https://github.com/unocss/unocss/tree/main/packages/preset-web-fonts) | Web fonts at ease.                                           |
  | [@unocss/preset-typography](https://github.com/unocss/unocss/tree/main/packages/preset-typography) | The typography preset.                                       |
  | [@unocss/preset-tagify](https://github.com/unocss/unocss/tree/main/packages/preset-tagify) | Tagify Mode for UnoCSS.                                      |
  | [@unocss/preset-rem-to-px](https://github.com/unocss/unocss/tree/main/packages/preset-rem-to-px) | Converts rem to px for utils.                                |

  | Community Presets                                            | Description                                                  |
  | ------------------------------------------------------------ | ------------------------------------------------------------ |
  | [unocss-preset-scalpel](https://github.com/macheteHot/unocss-preset-scalpel) | Scalpel Preset by [@macheteHot](https://github.com/macheteHot/). |
  | [unocss-preset-chroma](https://github.com/chu121su12/unocss-preset-chroma) | Gradient Preset by [@chu121su12](https://github.com/chu121su12). |
  | [unocss-preset-scrollbar](https://github.com/action-hong/unocss-preset-scrollbar) | Scrollbar Preset by [@action-hong](https://github.com/action-hong). |
  | [unocss-applet](https://github.com/unocss-applet/unocss-applet) | Using UnoCSS in applet (UniApp / Taro) by [@zguolee](https://github.com/zguolee). |
  | [unocss-preset-weapp](https://github.com/MellowCo/unocss-preset-weapp) | Wechat MiniProgram Preset for [UniApp](https://uniapp.dcloud.io/) and [Taro](https://taro-docs.jd.com/taro/docs) by [@MellowCo](https://github.com/MellowCo). |
  | [unocss-preset-heropatterns](https://github.com/Julien-R44/unocss-preset-heropatterns) | Preset that integrates [Hero Patterns](https://heropatterns.com/) by [@Julien-R44](https://github.com/Julien-R44). |
  | [unocss-preset-flowbite](https://github.com/Julien-R44/unocss-preset-flowbite) | Port of of [Flowbite Tailwind plugin](https://github.com/themesberg/flowbite) for UnoCSS by [@Julien-R44](https://github.com/Julien-R44). |
  | [unocss-preset-forms](https://github.com/Julien-R44/unocss-preset-forms) | Port of [@tailwindcss/forms](https://github.com/tailwindlabs/tailwindcss-forms) for UnoCSS by [@Julien-R44](https://github.com/Julien-R44). |
  | [unocss-preset-extra](https://github.com/MoomFE/unocss-preset-extra) | [Animate.css](https://animate.style/) Preset and some other rules by [@Zhang-Wei-666](https://github.com/Zhang-Wei-666). |
  | [unocss-preset-daisy](https://github.com/kidonng/unocss-preset-daisy) | daisyUI Preset by [@kidonng](https://github.com/kidonng).    |
  | [unocss-preset-primitives](https://github.com/zirbest/unocss-preset-primitives) | Like [headlessui-tailwindcss](https://github.com/tailwindlabs/headlessui/tree/main/packages/%40headlessui-tailwindcss) , radix-ui , custom for UnoCSS By [@zirbest](https://github.com/zirbest). |
  | [unocss-preset-theme](https://github.com/Dunqing/unocss-preset-theme) | Preset for automatic theme switching by [@Dunqing](https://github.com/Dunqing) |

  | Community Frameworks                     | Description                                                  |
  | ---------------------------------------- | ------------------------------------------------------------ |
  | [Anu](https://github.com/jd-solanki/anu) | DX focused utility based vue component library by [@jd-solanki](https://github.com/jd-solanki) |
  6. 使用daisyUI预设[【css】使用daisyUI_46590928的博客-CSDN博客](https://blog.csdn.net/weixin_46590928/article/details/127928968)

  7. 使用Animate.css预设[【css】使用Animate.css_46590928的博客-CSDN博客](https://blog.csdn.net/weixin_46590928/article/details/127941137)
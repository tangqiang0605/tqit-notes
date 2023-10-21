理念：功能优先（原子化）、移动优先（响应式）、设计系统（设计规范）。

1. 如果是复杂的选择器使用@apply
2. 如果是多次使用如多个 li 可以使用apply

### 原子

常用的 TailwindCSS 类（配合 daisyUI）

h-xxx

w-xxx

p-xxx

m-xxx

flex-xxx

text-xxx

font-xxx

shadow

bg-primary?

text-primary-content?

bg-base-100?

rounded-box?

items-stretch

rounded-btn
# 基础
我直觉地认为，tailwind 的缩写思想和 emmet 是类似的。

主题配置：根据网站主题的需要设置一些原子类的自定义样式的尺寸。

状态变体：伪类

插件：提供一系列功能类

变体：响应式前缀、状态前缀、黑夜模式前缀等。
```html
<button class="lg:dark:hover:bg-white ...">
  <!-- ... -->
</button>
```

## 响应式设计
根据常用的设备分辨率方案，默认内置了 5 个断点（可在配置文件中自定义为其他值）响应式前缀。
| 断点前缀 | 最小宽度 | CSS                                  |
| -------- | -------- | ------------------------------------ |
| `sm`     | 640px    | `@media (min-width: 640px) { ... }`  |
| `md`     | 768px    | `@media (min-width: 768px) { ... }`  |
| `lg`     | 1024px   | `@media (min-width: 1024px) { ... }` |
| `xl`     | 1280px   | `@media (min-width: 1280px) { ... }` |
| `2xl`    | 1536px   | `@media (min-width: 1536px) { ... }` |

移动优先
tailwind是移动优先的（使用min-width）。**使用无前缀的功能类来定位移动设备，并在较大的断点处覆盖它们**
```html
<!-- This will center text on mobile, and left align it on screens 640px and wider -->
<div class="text-center sm:text-left"></div>
```

因此，通常最好先为移动设备设计布局，接着在 `sm` 屏幕上进行更改，然后是 `md` 屏幕，以此类推。**（从左往右，从小到大）**。

如果您只想在一个断点上应用某个功能类，解决方案是在更大的断点上添加另一个功能类，用来抵消前一个功能类的效果。

自定义断点{theme:{screen:{'tablet':'640px'}}}

## 悬停、焦点和其它状态
也是前缀定义。

有个表，记录了一些类默认开启的伪类。

```html
<button class="bg-red-500 hover:bg-red-700 ...">
  Hover me
</button>
```

配置变体，{variants:{extend:{类名:[支持的变体]}}}

为自定义功能类生成变体。自定义功能类生成状态变体：我们自己写了一个类用在class上，我们可以像之前用伪类，或者用@variants修饰，然后就也可以在class用变体前缀了。

创建自定义变体：在配置中引入插件进行配置某种伪类状态。然后就可以被功能类使用了（自定义功能类仍需要配置这种变体）。

## 深色模式

默认不开启，需要先开启才生效。同时，用户系统开启深色模式才可以看到效果（可以改为手动而不是系统）

配置开启{darkMode:'media'系统‘class’手动}。

``` html
<div class="bg-white dark:bg-gray-800">
  <h1 class="text-gray-900 dark:text-white">Dark mode is here!</h1>
  <p class="text-gray-600 dark:text-gray-300">
    Lorem ipsum...
  </p>
</div>
```

# 自定义主题

## @layer

使用 `@layer` 指令告诉 Tailwind 一组自定义样式应该属于哪个 “bucket”。可用的层有 `base`, `components` 和 `utilities`。Tailwind会自动将 `@layer` 指令中的所有 CSS 移至与相应 `@tailwind` 规则相同的位置，因此您不必担心以特定顺序编写 CSS 来避免特定性问题。

在 `@layer` 指令中包装的任何自定义 CSS 也会告诉 Tailwind 在清除该层时考虑那些样式。阅读 [关于生产优化的文档](https://www.tailwindcss.cn/docs/optimizing-for-production) 来了解更多详情。

## 基础样式@layer

Tailwind 包含了一系列有用的开箱即用的基础样式，我们称之为 [Preflight](https://www.tailwindcss.cn/docs/preflight)，他实际上是 [modern-normalize](https://github.com/sindresorhus/modern-normalize)，外加少些额外的样式。

如果要将某些基本样式应用于**特定元素**，最容易的方法是将其简单地添加到 CSS 中。

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  h1 {
    @apply text-2xl;
  }
  h2 {
    @apply text-xl;
  }
}
```

通过使用 `@layer` 指令，Tailwind 将自动将这些样式移到 `@tailwind base` 的同一位置，以避免出现一些意外问题。

使用 `@layer` 指令还能告诉 Tailwind 在清除基础样式时考虑这些样式。阅读我们的 [关于生产优化的文档](https://www.tailwindcss.cn/docs/optimizing-for-production) 以了解更多信息。

最好使用 [@apply](https://www.tailwindcss.cn/docs/functions-and-directives#apply) 或者 [theme()](https://www.tailwindcss.cn/docs/functions-and-directives#theme) 来定义这些样式，以避免意外偏离您的设计系统。

您可以使用相同的方式为您正在使用的任何自定义字体添加 `@font-face` 规则。

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  @font-face {
    font-family: Proxima Nova;
    font-weight: 400;
    src: url(/fonts/proxima-nova/400-regular.woff) format("woff");
  }
  @font-face {
    font-family: Proxima Nova;
    font-weight: 500;
    src: url(/fonts/proxima-nova/500-medium.woff) format("woff");
  }
}
```

## 插件配置方式

您还可以通过 [编写插件](https://www.tailwindcss.cn/docs/plugins#adding-base-styles) 并使用 `addBase` 函数来添加基础样式：

```js
// tailwind.config.js
const plugin = require('tailwindcss/plugin')

module.exports = {
  plugins: [
    plugin(function({ addBase, theme }) {
      addBase({
        'h1': { fontSize: theme('fontSize.2xl') },
        'h2': { fontSize: theme('fontSize.xl') },
        'h3': { fontSize: theme('fontSize.lg') },
      })
    })
  ]
}
```

使用 `addBase` 添加的样式将会与 Tailwind 的其它基础样式一起添加到 `base` 层中。

# 自定义组件

## 提取组件@layer@apply

提取组件：对于经常同时出现的一组功能类，如果是大组件，我们可以把他们定义为组件重复使用（借助框架），如果是小组件，可以使用@apply。

```html
<button class="btn-indigo">
  Click me
</button>

<style>
  .btn-indigo {
    @apply py-2 px-4 bg-indigo-500 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75;
  }
</style>
```

注意，类是根据其在原始 CSS 中（官方的定义中）的位置而不是根据在 `@apply` 指令之后列出它们的顺序来应用的。这是为了确保使用 `@apply` 提取类列表时得到的行为与直接在 HTML 中列出的类的行为相匹配。

```css
/* Input */
.btn {
  @apply py-2 p-4;
}
如果您要对功能类的应用顺序进行细粒度的控制，请使用多个 `@apply` 语句：
/* Input */
.btn {
  @apply py-2;
  @apply p-4;
}
```

@apply引入会过滤取消！important，除非加上！important在@apply中，@apply语句没有important输出的类则没有。在sass中要用插值#(!important)详情看文档函数与指令@apply。

使用layer分层会更好（避免意外的特定性问题）

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .btn-blue {
    @apply py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75;
  }
}
```

## 插件配置方式

除了直接在 CSS 文件中编写组件类外，您还可以通过编写自己的插件将组件类添加到 Tailwind 中 ：（依赖tailwind的相关组件库的原理）基于tailwindcss的组件库：tailwindui、headlessui、daisyui。

```js
// tailwind.config.js
const plugin = require('tailwindcss/plugin')

module.exports = {
  plugins: [
    plugin(function({ addComponents, theme }) {
      const buttons = {
        '.btn': {
          padding: `${theme('spacing.2')} ${theme('spacing.4')}`,
          borderRadius: theme('borderRadius.md'),
          fontWeight: theme('fontWeight.600'),
        },
        '.btn-indigo': {
          backgroundColor: theme('colors.indigo.500'),
          color: theme('colors.white'),
          '&:hover': {
            backgroundColor: theme('colors.indigo.600')
          },
        },
      }

      addComponents(buttons)
    })
  ]
}
```



# 自定义功能类

## 自定义功能类@layer

将自己的功能类添加到 Tailwind 的最简单的方式是直接添加到您的 CSS 中。通过使用 `@layer` 指令， Tailwind 将自动把这些样式移动到 `@tailwind utilities` 相同的位置，以避免出现意外的未知问题。

使用 `@layer` 指令也会指示 Tailwind 在清除 `功能类` 层时考虑这些样式。阅读我们的 [生产优化文档](https://www.tailwindcss.cn/docs/optimizing-for-production)以了解更多信息。

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer utilities {
  .scroll-snap-none {
    scroll-snap-type: none;
  }
  .scroll-snap-x {
    scroll-snap-type: x;
  }
  .scroll-snap-y {
    scroll-snap-type: y;
  }
}
```

## 变体 

### 生成响应式变体

如果您想根据您的 `tailwind.config.js` 定义的断点创建功能类的变体，请将您的功能类放在 `@variants` 指令中，并把 `responsive` 添加到变体列表中。

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer utilities {
  @variants responsive {
    .scroll-snap-none {
      scroll-snap-type: none;
    }
    .scroll-snap-x {
      scroll-snap-type: x;
    }
    .scroll-snap-y {
      scroll-snap-type: y;
    }
  }
}
```

### 生成深色模式变体

如果您想生成您自己的功能类的 [dark mode variants](https://www.tailwindcss.cn/docs/dark-mode)，首先确保在您的 `tailwind.config.js` 文件中 `darkMode` 被设置为 `media` 或者 `class`。

```js
// tailwind.config.js
module.exports = {
  darkMode: 'media'
  // ...
}
```

下一步，将您的功能类放在 `@variants` 指令中，并且把 `dark` 添加到变体列表中。

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer utilities {
  @variants dark {
    .filter-none {
      filter: none;
    }
    .filter-grayscale {
      filter: grayscale(100%);
    }
  }
}
```

Tailwind 将自动生成每个自定义功能类的前缀版本，您可以有条件地应用这些样式到不同的状态上：

```html
<div class="filter-grayscale dark:filter-none"></div>
```

Learn more about dark mode utilities in the [dark mode documentation](https://www.tailwindcss.cn/docs/dark-mode).

### 生成状态变体

如果您想为您的功能类生成 [状态变体](https://www.tailwindcss.cn/docs/hover-focus-and-other-states)，请将您的功能类放在 `@variants` 指令中，并列出您想启用的变体：

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer utilities {
  @variants hover, focus {
    .filter-none {
      filter: none;
    }
    .filter-grayscale {
      filter: grayscale(100%);
    }
  }
}
```

Tailwind 将自动生成每个自定义功能类的前缀版本，您可以有条件地应用这些样式到不同的状态上：

```html
<div class="filter-grayscale hover:filter-none"></div>
```

状态变体的生成顺序与您在 `@variants` 指令中列出的顺序相同，因此，如果您希望一个变体优先于另一个变体，请确保这个变体最后被列出：

```css
/* Focus will take precedence over hover */
@variants hover, focus {
  .filter-grayscale {
    filter: grayscale(100%);
  }
  /* ... */
}

/* Hover will take precedence over focus */
@variants focus, hover {
  .filter-grayscale {
    filter: grayscale(100%);
  }
  /* ... */
}
```

在 [状态变体文档](https://www.tailwindcss.cn/docs/hover-focus-and-other-states) 中了解更多关于状态变体的信息。

## 插件配置方式

除了直接在 CSS 文件中添加新的功能类外，您还可以通过编写自己的插件将功能类添加到 Tailwind ：

```js
// tailwind.config.js
const plugin = require('tailwindcss/plugin')

module.exports = {
  plugins: [
    plugin(function({ addUtilities }) {
      const newUtilities = {
        '.filter-none': {
          filter: 'none',
        },
        '.filter-grayscale': {
          filter: 'grayscale(100%)',
        },
      }

      addUtilities(newUtilities, ['responsive', 'hover'])
    })
  ]
}
```



# 编辑器支持

## IntelliSense for VS Code

The official [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) extension for Visual Studio Code enhances the Tailwind development experience by providing users with advanced features such as autocomplete, syntax highlighting, and linting.

![img](D:\tplmydata\tplmydoc\文档图片\intellisense.0bd2cbf8c277e6c1330e345ab3cd7684.png)

- **Autocomplete**. Intelligent suggestions for class names, as well as [CSS functions and directives](https://www.tailwindcss.cn/docs/functions-and-directives).
- **Linting**. Highlights errors and potential bugs in both your CSS and your markup.
- **Hover Previews**. See the complete CSS for a Tailwind class name by hovering over it.
- **Syntax Highlighting**. Provides syntax definitions so that Tailwind features are highlighted correctly.

Check out the project [on GitHub](https://github.com/tailwindcss/intellisense) to learn more, or [add it to Visual Studio Code](vscode:extension/bradlc.vscode-tailwindcss) to get started now.
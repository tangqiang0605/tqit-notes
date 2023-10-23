# vue3文档笔记

## 一、认识vue

### 响应式

- vue的两个核心功能之一
- 自动跟踪JavaScript**状态**变化并在发生改变时响应式地更新dom。

``` js
import { createApp } from 'vue'

createApp({
  data() {
    return {
      count: 0
    }
  }
}).mount('#app')

```

### 声明式渲染

- vue的两个核心功能之二
- 基于标准html拓展的模板语法

``` <div id="app">
  <button @click="count++">
    Count is: {{ count }}
  </button>
</div>
```

### vue的使用场景

以用不同的方式使用 Vue：

- 无需构建步骤，渐进式增强静态的 HTML
- 在任何页面中作为 Web Components 嵌入
- 单页应用 (SPA)
- 全栈 / 服务端渲染 (SSR)
- Jamstack / 静态站点生成 (SSG)
- 开发桌面端、移动端、WebGL，甚至是命令行终端中的界面

https://cn.vuejs.org/guide/extras/ways-of-using-vue.html文档：使用vue的多种方式

### 单文件组件sfc

- vue的单文件组件将前端三剑客封装在同一个文件中。
- vue的标志性功能
- 推荐配合构建工具使用
- https://cn.vuejs.org/guide/scaling-up/sfc.html文档：单文件组件的用法及用途

``` vue
<script>
export default {
  data() {
    return {
      count: 0
    }
  }
}
</script>

<template>
  <button @click="count++">Count is: {{ count }}</button>
</template>

<style scoped>
button {
  font-weight: bold;
}
</style>

```

### 选项式api

- vue组件的api风格之一
- es6模块化的默认导出一个对象。（methods属性，data方法，生命周期方法）
- 选项式 API 是在组合式 API 的基础上实现的
- 当你不需要使用构建工具，或者打算主要在低复杂度的场景中使用 Vue，例如渐进增强的应用场景，推荐采用选项式 API。(快速上手)

``` vue
<script>
export default {
  // data() 返回的属性将会成为响应式的状态
  // 并且暴露在 `this` 上
  data() {
    return {
      count: 0
    }
  },

  // methods 是一些用来更改状态与触发更新的函数
  // 它们可以在模板中作为事件监听器绑定
  methods: {
    increment() {
      this.count++
    }
  },

  // 生命周期钩子会在组件生命周期的各个不同阶段被调用
  // 例如这个函数就会在组件挂载完成后被调用
  mounted() {
    console.log(`The initial count is ${this.count}.`)
  }
}
</script>

<template>
  <button @click="increment">Count is: {{ count }}</button>
</template>
```



### 组合式api

- vue组件的api风格之二
- 组合式 API 的核心思想是直接在函数作用域内定义响应式状态变量，并将从多个函数中得到的状态组合起来处理复杂问题。
- 在[组合式 API FAQ](https://cn.vuejs.org/guide/extras/composition-api-faq.html) 章节中，你可以了解更多关于这两种 API 风格的对比以及组合式 API 所带来的潜在收益。
- 当你打算用 Vue 构建完整的单页应用，推荐采用组合式 API + 单文件组件。

``` vue
<script setup>
import { ref, onMounted } from 'vue'

// 响应式状态
const count = ref(0)

// 用来修改状态、触发更新的函数
function increment() {
  count.value++
}

// 生命周期钩子
onMounted(() => {
  console.log(`The initial count is ${count.value}.`)
})
</script>

<template>
  <button @click="increment">Count is: {{ count }}</button>
</template>
```

## 二、构建开发

### 使用构建工具

- 基于vite构建的单页应用（使用sfc）：nodejs（npm）+vite（createvue）+vue3+vscode（volar）

- nodejs+npm:`npm init vue@latest`安装打开脚手架、`npm install`安装依赖、`npm run dev`调用命令行运行dev脚本

- [create-vue](https://github.com/vuejs/create-vue)，它是 Vue 官方的项目脚手架工具。
- 非构建步骤使用组合式api，通过setup选项（setup方法）使用组合式api。也没有sfc，js代码中导出对象用template属性。

### 通过cdn（script标签）

- 通过script标签，使用了 [unpkg](https://unpkg.com/)
- 也可以使用任何提供 npm 包服务的 CDN，例如 [jsdelivr](https://www.jsdelivr.com/package/npm/vue) 或 [cdnjs](https://cdnjs.com/libraries/vue)。也可以下载此文件并自行提供服务。
- 不涉及“构建步骤”（没有像脚手架需要设置一些东西）
- 无法使用单文件组件 (SFC) 语法。
- 接近原生
- 需要挂载点

``` html
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>

<div id="app">{{ message }}</div>

<script>
  const { createApp } = Vue
  
  createApp({
    data() {
      return {
        message: 'Hello Vue!'
      }
    }
  }).mount('#app')
</script>
```

### 使用 ES 模块（原生基础上的原生）

- 原生es模块使用vue
- type=module和来自cdn的import（来自哪里不重要，重要是import语法。对比一下上面的原生）
- 题外话：nodejs的comonjs概念和es6的模块化概念。

``` html
<div id="app">{{ message }}</div>

<script type="module">
  import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
  
  createApp({
    data() {
      return {
        message: 'Hello Vue!'
      }
    }
  }).mount('#app')
</script>

```

- 题外话：如果直接在浏览器中打开了上面的 `index.html`，你会发现它抛出了一个错误，因为 ES 模块不能通过 `file://` 协议工作。为了使其工作，你需要使用本地 HTTP 服务器通过 `http://` 协议提供`index.html`。要启动一个本地的 HTTP 服务器，请先安装 [Node.js](https://nodejs.org/zh/)，然后从命令行在 HTML 文件所在文件夹下运行 `npx serve`。或者其他方法。（用文件打开的html不支持es模块）
- 文件拆分（在html中导入es默认导出对象并应用到createApp中）
- 题外话：组件中的模板高亮（如果你正在使用 VSCode，你可以安装 [es6-string-html](https://marketplace.visualstudio.com/items?itemName=Tobermory.es6-string-html) 扩展，然后在字符串前加上一个前缀注释 `/*html*/` 以高亮语法。）

``` html
<!-- index.html -->
<script type="module">
  import { createApp } from 'vue'
  import MyComponent from './my-component.js'

  createApp(MyComponent).mount('#app')
</script>
```

``` javascript
// my-component.js 组件
export default {
  data() {
    return { count: 0 }
  },
    模板，组件中的模板
  template: `<div>count is {{ count }}</div>`
}
```

## 三、创建应用

### 应用实例

- 步骤一、1、es默认导出的对象或2、vue文件对象。vm(或vue，是一个组件)，步骤二、被createApp函数作为参数生成app对象（根组件、单页面应用、应用实例）。

``` js
import { createApp } from 'vue'

const app = createApp({
  /* 根组件选项 */
})
```

``` js
import { createApp } from 'vue'
// 从一个单文件组件中导入根组件
import App from './App.vue'

const app = createApp(App)
```

- 应用实例会暴露一个 `.config` 对象允许我们配置一些应用级的选项，例如定义一个应用级的错误处理器，它将捕获所有由子组件上抛而未被处理的错误。应用实例还提供了一些方法来注册应用范围内可用的资源，例如注册一个组件。(应用实例的config和component属性。在mount方法前完成)

``` js
app.config.errorHandler = (err) => {
  /* 处理错误 */
}
```

``` js
app.component('TodoDeleteButton', TodoDeleteButton)
```

### 挂载应用

- 步骤三、挂载到html标签上。应用实例的mount方法接受一个容器（可以是一个实际的 DOM 元素或是一个 CSS 选择器字符串）
- 应用根组件的内容将会被渲染在容器元素里面。容器元素自己将**不会**被视为应用的一部分。
- `.mount()` 方法应该始终在整个应用配置和资源注册完成后被调用。
- 不同于其他资源注册方法，它的返回值是根组件实例而非应用实例。
- 当在未采用构建流程的情况下使用 Vue 时，我们可以在挂载容器中直接书写根组件模板（使用template属性选项）当根组件没有设置 `template` 选项时，Vue 将自动使用容器的 `innerHTML` 作为模板。

## 三、

### 模板语法（html）

- Vue 会将模板编译成高度优化的 JavaScript 代码
- 结合响应式系统，当应用状态变更时，Vue 能够智能地推导出需要重新渲染的组件的最少数量，并应用最少的 DOM 操作。
- 如果你对虚拟 DOM 的概念比较熟悉，并且偏好直接使用 JavaScript，你也可以结合可选的 JSX 支持[直接手写渲染函数](https://cn.vuejs.org/guide/extras/render-function.html)而不采用模板。但请注意，这将不会享受到和模板同等级别的编译时优化。
- 指令，特殊的html标签属性，值为JavaScript**单一表达式**（可以被求值被return的表达式） 且以组件为作用域解析执行。模板中的表达式将被沙盒化，仅能够访问到[有限的全局对象列表](https://github.com/vuejs/core/blob/main/packages/shared/src/globalsWhitelist.ts#L3)。该列表中会暴露常用的内置全局对象，比如 `Math` 和 `Date`。没有显式包含在列表中的全局对象将不能在模板内表达式中访问，例如用户附加在 `window` 上的属性。然而，你也可以自行在 [`app.config.globalProperties`](https://cn.vuejs.org/api/application.html#app-config-globalproperties) 上显式地添加它们，供所有的 Vue 表达式使用。
- 文本插值：Mustache语法。v-html。v-bind。
- 【绑定】`v-bind` 如果绑定的值是 `null` 或者 `undefined`，那么该 attribute 将会从渲染的元素上移除。
- 【绑定】布尔型属性： 在时，值为[真值](https://developer.mozilla.org/en-US/docs/Glossary/Truthy)或一个空字符串布尔存在。布尔存在为真，不在为假。

``` html
<button :disabled="isButtonDisabled">Button</button>
```

- 【绑定】绑定多个属性（直接上vbind，语法：赋给vbind一个对象）

``` js
const objectOfAttrs = {
  id: 'container',
  class: 'wrapper'
}
```

``` html
<div v-bind="objectOfAttrs"></div>
```

- 【绑定】绑定函数（单一表达式
- 【绑定】绑定在表达式中的方法在组件每次更新时都会被重新调用，因此**不**应该产生任何副作用，比如改变数据或触发异步操作。

``` html
<span :title="toTitleDate(date)">
  {{ formatDate(date) }}
</span>
```

- 【绑定】vbind对于class和style属性的功能增强。

``` vue
<div :class="{ active: isActive }"></div>

<div
  class="static"
  :class="{ active: isActive, 'text-danger': hasError }"
></div>

const classObject = reactive({
  active: true,
  'text-danger': false
})
<div :class="classObject"></div>

<div :class="[activeClass, errorClass]"></div>
<div :class="[isActive ? activeClass : '', errorClass]"></div>

<div :class="[{ active: isActive }, errorClass]"></div>

```

``` vue
<!-- MyComponent 模板使用 $attrs 时 -->
<p :class="$attrs.class">Hi!</p>
<span>This is a child component</span>
推荐使用 camelCase，但 :style 也支持 kebab-cased 形式的 CSS 属性 key (对应其 CSS 中的实际名称)
<div :style="{ 'font-size': fontSize + 'px' }"></div>
直接绑定一个对象
<div :style="styleObject"></div>
绑定数组
<div :style="[baseStyles, overridingStyles]"></div>
```



- 动态参数。参数规定：动态参数中表达式的值应当是一个字符串，或者是 `null`。特殊值 `null` 意为显式移除该绑定。其他非字符串的值会触发警告。语法规定：动态参数表达式因为某些字符的缘故有一些语法限制，比如空格和引号，在 HTML attribute 名称中都是不合法的。需要避免在名称中使用大写字母，因为浏览器会强制将其转换为小写（eventName->eventname，而eventName变量不起作用）

``` javascript
<!-- 简写 -->
<a :[attributeName]="url"> ... </a>

<!-- 简写 -->
<a @[eventName]="doSomething">
    
<!-- 使用了引号，这会触发一个编译器警告 -->
<a :['foo' + bar]="value"> ... </a>
如果你需要传入一个复杂的动态参数，我们推荐使用计算属性替换复杂的表达式
```

- vfor
- Vue 默认按照“就地更新”的策略来更新通过 `v-for` 渲染的元素列表。当数据项的顺序改变时，Vue 不会随之移动 DOM 元素的顺序，而是就地更新每个元素，确保它们在原本指定的索引位置上渲染。（位置上

``` js
遍历数组
<li v-for="(item, index) in items">
  {{ parentMessage }} - {{ index }} - {{ item.message }}
</li>
遍历对象
<li v-for="(value, key, index) in myObject">
  {{ index }}. {{ key }}: {{ value }}
</li>
```



### 计算属性

- 让模板语法没那么臃肿
- 接受get回调函数的函数返回一个计算属性ref。根据其中的响应式变量变化而更新。

``` js
const publishedBooksMessage = computed(() => {
  return author.books.length > 0 ? 'Yes' : 'No'
})
```

``` vue
<script setup>
import { ref, computed } from 'vue'

const firstName = ref('John')
const lastName = ref('Doe')

const fullName = computed({
  // getter
  get() {
    return firstName.value + ' ' + lastName.value
  },
  // setter
  set(newValue) {
    // 注意：我们这里使用的是解构赋值语法
    [firstName.value, lastName.value] = newValue.split(' ')
  }
})

使用：
fullName.value = 'John Doe'
</script>
```

- **不要在 getter 中做异步请求或者更改 DOM**getter 的职责应该仅为计算和返回该值。在之后的指引中我们会讨论如何使用[监听器](https://cn.vuejs.org/guide/essentials/watchers.html)根据其他响应式状态的变更来创建副作用。
- 避免直接修改计算属性值

### 响应式基础（js）

- 使用 [`reactive()`](https://cn.vuejs.org/api/reactivity-core.html#reactive) 函数创建一个响应式对象或数组

- 响应式对象其实是 [JavaScript Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)，其行为表现与一般对象相似。不同之处在于 Vue 能够跟踪对响应式对象属性的访问与更改操作。（普通对象与响应式对象）
- 要在组件模板中使用响应式状态，需要在 `setup()` 函数中定义并返回。

``` js
import { reactive } from 'vue'

export default {
  setup() {
    const state = reactive({ count: 0 })

    function increment() {
      state.count++
    }

    // 不要忘记同时暴露 increment 函数
    return {
      state,
      increment
    }
  }
}
```

- 当使用单文件组件（SFC）时，我们可以使用 `<script setup>` 来大幅度地简化代码。(直接定义变量和方法即可用，只不过普通的变量没有响应式)。
- 对同一个原始对象调用 `reactive()` 会总是返回同样的代理对象（但该原始对象和代理对象是两个不同的对象，后者由前者复制升级而来）。对一个已存在的代理对象调用 `reactive()` 会返回其本身。

``` js
const proxy = reactive({})

const raw = {}
proxy.nested = raw

console.log(proxy.nested === raw) // false
```

- reative:仅对对象类型有效（对象、数组和 `Map`、`Set` 这样的[集合类型](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects#使用键的集合对象)），而对 `string`、`number` 和 `boolean` 这样的 [原始类型](https://developer.mozilla.org/zh-CN/docs/Glossary/Primitive) 无效。
- reative: Vue 的响应式系统是通过属性访问进行追踪的。（响应性无法通过赋值传递。包括普通赋值、解构赋值、函数传参，本质都是赋值）
- `reactive()` 的种种限制归根结底是因为 JavaScript 没有可以作用于所有值类型的 “引用” 机制。（reactive只对有引用的数据起作用）

``` js
let state = reactive({ count: 0 })

// 上面的引用 ({ count: 0 }) 将不再被追踪（响应性连接已丢失！）
上面是一个对象引用，下面是新的对象引用。换了一个引用。
state = reactive({ count: 1 })

const state = reactive({ count: 0 })

// n 是一个局部变量，同 state.count
// 失去响应性连接
let n = state.count
// 不影响原始的 state
n++

// count 也和 state.count 失去了响应性连接
state是reactive对象，但他的属性不是，传值时按值传参。
let { count } = state
// 不会影响原始的 state
count++

// 该函数接收一个普通数字，并且
// 将无法跟踪 state.count 的变化
赋给了函数的普通参数（这个参数是一个一个普通的变量）
callSomeFunction(state.count)
```

- ref：接受任何参数。（通过将参数挂载到一个带有value值的对象上）`ref()` 将传入参数的值包装为一个带 `.value` 属性的 ref 对象。当值为对象类型时，会用 `reactive()` 自动转换它的 `.value`。ref将一个普通变量包装为对象，普通变量的值挂载到对象的value属性上。在使用这个对象时，用的是对象的地址和普通变量的值（ ref 在**模板**中作为顶层属性（即被赋值的对象名）被访问时，它们会被自动“解包”）。另外，这个普通变量也可以是对象的引用，无伤大雅。
- ref：value里的值可以替换。
- ref：赋值不丢失响应性。`ref()` 让我们能创造一种对任意值的 “引用”，并能够在不丢失响应性的前提下传递这些引用。
- ref自动解包。 ref 在模板中作为**顶层属性**（不带点）被访问时，它们会被自动“解包”。如果一个 ref 是文本插值（即一个 `{{ }}` 符号）计算的最终值，它也将被解包。当一个 `ref` 被嵌套在一个响应式**对象**中，作为属性被访问或更改时，它会自动解包，因此会表现得和一般的属性一样（只有当嵌套在一个深层响应式对象内时，才会发生 ref 解包。当其作为[浅层响应式对象](https://cn.vuejs.org/api/reactivity-advanced.html#shallowreactive)的属性被访问时不会解包）。跟响应式对象不同，当 ref 作为响应式数组或像 `Map` 这种原生集合类型的元素被访问时，不会进行解包。

``` javascript
const objectRef = ref({ count: 0 })
const objectRea = ref({ count: 0 })

// 这是响应式的替换
不太理解。和reactive对比。整个对象的引用没有改变。
objectRef.value = { count: 1 }
objectRea = { count: 1 }

const obj = {
  foo: ref(1),
  bar: ref(2)
}

// 该函数接收一个 ref
// 需要通过 .value 取值
// 但它会保持响应性
因为如果是基本类型，传参是按值，而包装成对象后，是按引用传参，还是同一个东西。符合js语法。
callSomeFunction(obj.foo)

// 仍然是响应式的
ref对象，按引用传参
const { foo, bar } = obj
```



### Dom更新时机

- 当你更改响应式状态后，DOM 会自动更新。然而，你得注意 DOM 的更新并不是同步的。相反，Vue 将缓冲它们直到更新周期的 “下个时机” 以确保无论你进行了多少次状态更改，每个组件都只需要更新一次。(意思是，被跟踪的状态发生改变时，会执行一次代码，其中不管再改多少次代码都不会触发更新了，代码都执行完，dom更新，有点像防抖。nextTick可以保证代码在dom更新后执行。代码一般都是在dom更新前执行完)

- 若要等待一个状态改变后的 DOM 更新完成，你可以使用 [nextTick()](https://cn.vuejs.org/api/general.html#nexttick) 这个全局 API：

``` js
import { nextTick } from 'vue'

function increment() {
  state.count++
  nextTick(() => {
    // 访问更新后的 DOM
  })
}
```

### 组件

- 组件有多个根元素，元素通过`$attrs` 属性来实现指定class给谁。组件只有一个根元素时，默认根元素。

``` js
<!-- MyComponent 模板使用 $attrs 时 -->
<p :class="$attrs.class">Hi!</p>
<span>This is a child component</span>
```








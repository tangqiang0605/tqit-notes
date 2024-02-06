## 引入
在上一篇文章中，我们分析了如何二次封装 el-table，以提高表格的书写效率和维护性。封装后想使用表格，只需要传入配置参数，即可完成表格的定制，不需要书写大段代码，而且还支持 el-table、el-table-item 的全部配置，十分方便。
```html
<CustomTable :table-data="tableData" :table-headers="tableHeaderMapper"></CustomTable>
```

这次，我们也将对 el-form 进行二次封装，使其达到类似的效果！
```html
<CustomForm :form="form" :form-item="items"></CustomForm>
```

上一期传送门：[【Vue3】el-table 组件二次封装，看这一篇就够了 - 掘金](https://juejin.cn/post/7301569815827103755)


## 功能需求分析
### 效果
直接使用 el-form 表单需要书写很多代码，我们可以将这些配置抽取为一个对象，并传递给我们二次封装的组件，简化表格的书写。

直接书写：
```html
  <el-form :model="form" label-width="120px">
    <el-form-item label="Activity name">
      <el-input v-model="form.name" />
    </el-form-item>
    <el-form-item label="Instant delivery">
      <el-switch v-model="form.delivery" />
    </el-form-item>
    <el-form-item label="Activity form">
      <el-input v-model="form.desc" type="textarea" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">Create</el-button>
      <el-button>Cancel</el-button>
    </el-form-item>
```

封装后的写法：
```html
<CForm :form="form" :form-item="items" label-width="120px">
	<template #default-button>
	  <el-button type="primary" @click="onSubmit">Create</el-button>
	  <el-button>Cancel</el-button>
	</template>
</CForm>
```

CForm 组件是根据其 form-item 属性绑定的 items 对象生成表单的内容的，items 的值如下：
```javascript
const items = ref({
  name: {
    label: "Activity name",
    inner: "el-input"
  },
  delivery: {
    label: "Instant delivery",
    inner: "el-switch",
  },
  desc: {
    label: "Activity form",
    inner: {
	  inner:'el-input',
      type: "textarea",
    },
  },
  button: {
    label: "",
  },
});
```
items 可以是 ref 对象或者普通对象，其每个属性表示一个表单项，每个表单项对应生成一个 el-form-item，表单项的属性就是 el-form-item 的属性。

### el-form 的表单结构
我们先来分析一下 el-form 的结构。

1. el-form：提供一个默认插槽，插槽的子元素都是 el-form-item（也可以是其它组件，但是没有意义）。

2. el-form-item：提供多种插槽，最常用的也是默认插槽。

3. 表单组件：最后，在 el-form-item 的默认插槽中使用我们的表单组件，比如 el-input、el-switch、el-date-picker 等，或者在插槽中继续嵌套多层组件。
![Pasted image 20231119093734.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/18b608483f3e4bd78d7674e097401a05~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=909&h=851&s=43451&e=png&b=fefefe)
如果 el-form-item 下只有一个表单组件，我们可以将其抽取出来，在我们的 items 上定义。如果是复杂组合，无法用属性表示，则可以利用插槽实现：
```html
<template>
	<CForm :form="form" :form-item="items" label-width="120px">
		<template #default-age>
		  <el-col :span="11">
	        <el-time-picker v-model="form.date1"/>
	        <span class="text-gray-500">-</span>
	        <el-time-picker v-model="form.date2"/>
		</template>
	</CForm>
</template>

<script setup>
const items={
   // 方式一：根据 inner 生成表单组件
	name:{
		inner:'el-input'
	},
	// 方式二：此处没有内容，内容在template的插槽中。
	age:{}
}
</script>
```

### 需要实现的功能
我们的自定义组件 CForm 要实现以下功能：
1. 支持 el-form 的所有属性。
2. 支持 el-form 的所有事件。
3. 支持 el-form 实例上暴露的所有方法，比如表单验证。
4. 支持 el-form 的插槽（只有一个默认插槽）。
5. 支持 el-form-item 的所有属性。
6. 支持 el-form-item 的所有事件。
7. 支持 el-form-item 实例上暴露的所有方法。
8. 支持 el-form-item 的所有插槽。

### el-form 实现思路
Vue 支持透传，所以只要把 el-form 作为自定义组件的顶层组件，就可以实现： 支持 el-form 的所有属性、支持 el-form 的所有事件。

然后是 el-form 插槽。我们直接在 el-form 中生成 el-form-item，不对外提供插槽（没有必要，不过也可以实现，这只是一种实现方式）。

el-form 的暴露方法需要在 el-form 的实例上获取，而我们使用自定义组件，只能获取自定义组件的实例。我们可以在组件中获取 el-form 的实例，然后再暴露出去，就可以在自定义组件的实例上获取到暴露的 form 实例，使用 el-form 实例的 api 了。

### el-form-item 实现思路
我们根据 items 的值在 el-form 中生成 el-form-item。与上一期的 el-table-item 不同（el-table-item 一般不需要绑定事件），这次我们大概率会在 el-form-item 上绑定事件。所以我们需要在 items 定义属性的同时，还需要定义事件。综上，items 的结构应该是：items 包含多个属性，每个属性代表一个表单项，同时，每个属性的值都是一个对象，包含三类属性，分别是项的属性、项的内部组件、项的事件。
```
{
	某个表单项：{
		...attrs:el-form-item的一般属性
		event: el-form-item的事件
		inner: el-form-item内的表单组件
	}
}
```

在二次封装 el-table 的时候，我们将 inner 的值绑定到 component 组件的 is 属性上，实现组件生成，并通过 v-bind 批量绑定 el-table-item 的所有属性。在这里也是类似的。

但是，如何绑定事件？Vue 的模板语法并没有提供相应的方法来批量绑定多个事件，只能一个一个绑定，这样肯定是不行的，因为我们要绑定所有表单组件的方法！

模板语法不行，那我们可以试试使用 jsx 写法：
```html
<div onClick={()=>console.log('click!')}>按钮</div>
```

在 jsx 中，事件可以看成是特殊的属性（以 on 开头），我们可以像绑定属性一样绑定事件，这样问题就解决了。所以接下来我们都会使用 jsx 来编写我们的自定义组件！

## jsx 写法
create-vue 和 Vue CLI 都有预置的 JSX 语法支持。不过，这里我使用的是 vite 创建的 vue 项目，不支持直接使用 jsx，所以需要额外配置。

方法十分简单，安装包 @vitejs/plugin-vue-jsx 后，（`pnpm i @vitejs/plugin-vue-jsx -D`），在 vite. config. ts 作为插件引入即可。
```javascript
// vite.config.ts
import { defineConfig } from "vite";
import vueJsx from "@vitejs/plugin-vue-jsx";

export default defineConfig({
  plugins: [
    vueJsx(),
    // ...
  ],
});
```

如何在 vue 中写 jsx？Vue3 支持很多种写法（模板语法、渲染函数、jsx 等），最终都会编译为原生代码（html、css、JavaScript），这些写法并无优劣，看个人喜好。

这里我选择使用选项式+渲染函数的语法，和 Vue2 的选项式语法比较接近。
```html
// Vue2选项式写法
<template>
	<div>天气好</div>
</template>
<script>
export default {
	data:()=>{...}
}
</script>
```
渲染函数写法即用渲染函数替代 template。这时我们往往需要渲染函数的帮助。
```html
// 没有 template 了，使用 render 函数的返回值作为页面
<script>
export default {
	render(){
		return h('div','天气好')
	}
}
</script>
```

render 函数可以简写在 setup 函数上（作为返回值）。
```html
<script>
export default {
	setup(){
		return ()=>{return h('div','天气好')}
	}
}
</script>
```

显然渲染函数的写法不够直观，我们可以使用 jsx 替代！
```html
<script>
export default {
	setup(){
		return ()=><div>天气好</div>
	}
}
</script>
```

以上，我们都是在 vue 文件中书写的，可以看到文件中只有一个 script 标签，所以我们干脆不写这个标签了！只需要将后缀名改为 tsx。
```javascript
// CForm.tsx
export default {
	setup(){
		return ()=><div>天气好</div>
	}
}
```
后面为了有语法提示，我使用了工厂函数 defineComponent。
```javascript
import { defineComponent } form 'vue'
export default defineComponent({
	setup(){
		return ()=><div>天气好</div>
	}
})
```

在 App. vue 中像 Vue 组件一样引入和使用：
```html
<template>
  <CForm />
</template>

<script lang="tsx" setup>
import CForm from "./CForm";
</script>
```

## 完成 el-form 功能
首先我们通过 props 选项定义组件接收的参数。
```
  props: {
    form: Object
  },
```

然后使用 setup 函数的参数接收传过来的 props、attrs、slots，将 props 上的 form 绑定到 el-form 上，实现数据绑定。将 attrs 绑定到 el-form 上，实现属性透传。将 el-form 的 ref 提取出来，通过 expose 函数对外暴露，当父组件获取我们自定义组件的 ref 实例时，将会在 ref 上看到这个属性。
```javascript
// CForm.tsx
import { defineComponent, ref } from 'vue'

interface CFormProp {
  form: any,
}

export default defineComponent({
  props: {
    form: Object,
  },
  setup(prop: CFormProp, { attrs, expose }) {
    const formRef = ref({})
    expose({ formRef })

    return () => <>
      <el-form model={prop.form} ref={formRef} {...attrs}>
        我的表单
      </el-form>
    </>
  }
})
```

这里有几点注意：
1. jsx 的绑定语法是：`属性={绑定的变量}`，模板语法是 `:属性="绑定的变量"`，二者存在区别。
2. jsx 的批量绑定语法是：`{...对象}`，模板语法的批量绑定语法是 `v-bind="对象"`。
4. 绑定在组件上的事件也包含在 attrs 中，以 on 开头，所以直接绑定属性的时候同时完成了事件绑定。


现在，我们实现了表单最外层 el-form 的功能，支持绑定 el-form 的属性、事件、暴露的方法。
```html
// App.vue
<template>
  <CForm :form="form" ref="formRef"> </CForm>
</template>

<script lang="tsx" setup>
import CForm from "./CForm";
import { onMounted, ref } from "vue";
const form = ref<any>({});
const formRef = ref();
onMounted(() => console.log(formRef.value.formRef));
</script>
```

接下来我们来完成 el-form 的插槽和 el-form-item 的生成功能。

## 绑定 el-form-item 的属性
我们定义接受一个 formItem 参数，用来在 el-form 中生成 el-form-item。
```
props:{
	form: Object,
	formItem: Object
}
```
根据 formItem 生成 el-form-item：我们定义了一个 newFormItem 对象，该对象的值根据 formItem 的值更新，newFormItm 的每个属性值都是表单项对象，表单项对象的每个属性对应表单项 el-form-item 的属性。
```javascript
import { defineComponent, ref, onBeforeUpdate } from 'vue'
import { set, has, defaultsDeep, mapKeys, startCase, toPairs, omit } from 'lodash-es'
interface CFormProp {
  form: any,
  formItem: any,
}

export default defineComponent ({
  props: {
    form: Object,
    formItem: Object
  },
  setup (prop: CFormProp, { attrs, expose }) {
    // 根据配置生成渲染所需数据
    const newFormItem = ref({});

    const genNewItemForm = () => {
      const keys = Object.keys(prop.formItem);
      newFormItem.value = { ...prop.formItem };
      for (let key of keys) {
        // 预处理
        let column = prop.formItem[key];
        if (typeof column === "string") {
          set(newFormItem.value, key, {
            key: key,
            prop: key,
            label: column,
            inner: { is: 'el-input', event: {} },
          });
        }
        if (typeof column === "object") {
          // 设置默认属性
          defaultsDeep(column, {
            key: key,
            prop: key,
            label: key,
            inner: { is: 'el-input', event: {} }
          })
        }
      }
    }
    genNewItemForm()
    onBeforeUpdate(genNewItemForm)

    const formRef = ref({})
    expose({ formRef })

    return () => <>
      <el-form model={prop.form} ref={formRef} {...attrs}>
        {
          toPairs(newFormItem.value).map(([key, value]: [string, any]) => {
            return <>
              <el-form-item {...value}>
                <el-input></el-input>
              </el-form-item>
            </>
          })
        }
      </el-form>
    </>
  }
})

```

代码很简单，我们分两部分来看，第一部分是我们定义了一个 newFormItem 对象，该对象通过 genNewFormItem 进行更新，第一次渲染时和 beforeUpdate 时被调用。在 genNewFormItem 方法中，我们进行了简单的处理，保证 items 每一个键都可以对应一个对象，都包含 key、label、prop 属性，方便后面直接将对象绑定在 el-form-item 上。
```javascript
{
	name:{
		key:'name',
		label:"姓名",
		prop:'name'
	}
}
```

在第二部分，我们使用了 lodash 库的 toPairs 方法。在 jsx 中，使用了 map 遍历替代 v-for 遍历，然而， map 方法只支持遍历数组，所以我们需要先使用 toPairs 将 newFormItem 对象转换为数组。遍历后我们可以得到 items 中每个属性的键 key 和值 value，value 就是处理后包含 key、label、prop 等 el-form-item 属性的表单项对象，我们对其进行绑定。
```html
<el-form-item {...value}></el-form-item>
```

这样，我们就支持 el-form-item 的所有属性了。

用法：
```html
// App.vue
<template>
  <CForm :form="form" ref="formRef" :form-item="items"> </CForm>
</template>

<script lang="tsx" setup>
import CForm from "./CForm";
// ...
const items={
	name:{
		label:"姓名",
		'label-width':'120px' // 将绑定到表单项的属性上
	}
	age:'年龄'
}
</script>
```

## 绑定 el-form-item 的事件和暴露事件
暴露事件十分简单，我们定义一个对象，对象的每个属性对应每个表单项的 ref 实例并绑定在 el-form-item 上即可。

绑定事件则需要我们定义在 event 属性上，然后将事件名变为首字母大写，再添加上“on”前缀，最后也绑定在 el-form-item 上面。
```javascript
import { defineComponent, ref, onBeforeUpdate } from 'vue'
import { set, has, defaultsDeep, mapKeys, startCase, toPairs, omit } from 'lodash-es'
interface CFormProp {
  form: any,
  formItem: any,
}

export default defineComponent ({
  props: {
    form: Object,
    formItem: Object
  },
  setup (prop: CFormProp, { attrs, expose }) {
    const formItemRef: any = {}
    // 根据配置生成渲染所需数据
    const newFormItem = ref({});

    const genNewItemForm = () => {
      const keys = Object.keys(prop.formItem);
      newFormItem.value = { ...prop.formItem };
      for (let key of keys) {
        // 预处理
        set(formItemRef, key, ref())
        // 预处理
        let column = prop.formItem[key];
        if (typeof column === "string") {
          set(newFormItem.value, key, {
            key: key,
            prop: key,
            label: column,
          });
        }
        if (typeof column === "object") {
          // 设置默认属性
          defaultsDeep(column, {
            key: key,
            prop: key,
            label: key,
          })

          if (has(column, 'event')) {
            if (Object.keys(column.event)) {
              column.event = mapKeys(column.event, (_, key) => 'on' + startCase(key))
            }
          }
        }
      }
    }
    genNewItemForm()
    onBeforeUpdate(genNewItemForm)

    const formRef = ref({})
    expose({ formRef, formItemRef })

    return () => <>
      <el-form {...attrs} model={prop.form} ref={formRef}>
        {
          toPairs(newFormItem.value).map(([key, value]: [string, any]) => {
            return <>
              <el-form-item {...omit(value, ['event'])} {...value.event} ref={formItemRef[key]}>
                <el-input></el-input>
              </el-form-item>
            </>
          })
        }
      </el-form>
    </>
  }
})
```
几点注意：
1. 我们定义了一个 formItemRef 对象，其每一个属性都是对应表单项的 ref 实例，在 el-form-item 上通过绑定 ref 实现。
2. 原本我们直接绑定了 value，现在需要排除 value 中的 event 属性，然后额外绑定 value. event 中的属性（即事件）。omit 函数来自 lodash 库，用于返回一个新的不包含排除属性的对象。

## el-form-item 的 prop 属性
Element-Plus 的官方文档是这样定义 el-form-item 的 prop 属性：model 的键名。它可以是一个属性的值 (如 a.b.0 或 `[a', 'b', '0']`)。在定义了 validate、resetFields 的方法时，该属性是必填的。

该属性可以用来指定该表单项对应表单组件绑定的值相对表单对象 form 的属性值的位置。比如 prop=“name”，表示该项的值对应 form. name。prop 支持多层嵌套取值，比如 form. name. first。熟悉 lodash 库的小伙伴不难发现，该 prop 就是一个符合 lodash 对象方法的 path 值，通过字符串或者数组来指定属性 path。

所以，在我们的 items 的表单项中，也支持该属性。但在此基础上，我们还实现了自动绑定 el-form-item 内部的表单组件的 v-model 绑定值，即 `form[prop]`。

然而，我们无法直接通过 `form[prop]` 的写法属性绑定 prop 为'a.b'的情况，因为它会被认定为单独的一个属性名‘a.b’，而不是属性 a 下的属性 b，同时，prop 也不能是数组，因为对象的键必须是字符串，如果传入数组，会先被转换为字符串，比如 `['a','b'].toString()` 结果为 `a,b`。

但是我们可以借助 Proxy 和 lodash 的 get、set 方法实现 v-model 绑定任意路径。代码如下：

```javascript
import { defineComponent, ref, onBeforeUpdate } from 'vue'
import { set, get, has, defaultsDeep, mapKeys, startCase, toPairs, omit } from 'lodash-es'
interface CFormProp {
  form: any,
  formItem: any,
}

const pathArrToString = (arr: Array<string | number>) => {
  return arr.reduce ((pre: string | number, cur: string | number) => {
    if (isNaN(Number(cur))) {
      return pre + "." + cur;
    } else {
      return pre + "[" + cur + "]";
    }
  });
}

export default defineComponent({
  props: {
    form: Object,
    formItem: Object
  },
  setup(prop: CFormProp, { attrs, expose }) {
    // ...
    
    // 代理form，用于在v-model上使用prop表示路径
    const proxys: any = new Proxy(prop.form, {
      get: function (target, property) {
        return get(target, property)
      },
      set: function (target, property, value) {
        set(target, property, value)
        return true;
      }
    })
    
    const genNewItemForm = () => {
      const keys = Object.keys(prop.formItem);
      newFormItem.value = { ...prop.formItem };
      for (let key of keys) {
        // 预处理
        set(formItemRef, key, ref())
        // 预处理
        let column = prop.formItem[key];
        if (typeof column === "string") {
          set(newFormItem.value, key, {
            key: key,
            prop: key,
            label: column,
            inner: { is: 'el-input', event: {} },
          });
        }
        if (typeof column === "object") {
          // 设置默认属性
          defaultsDeep(column, {
            key: key,
            prop: key,
            label: key,
            inner: { is: 'el-input', event: {} }
          })

          if (has(column, 'event')) {
            if (Object.keys(column.event)) {
              column.event = mapKeys(column.event, (_, key) => 'on' + startCase(key))
            }
          }

          // 处理prop属性
          if (Array.isArray(column['prop'])) {
             column['prop'] = pathArrToString(column['prop'])
          }
    }

    return () => <>
      <el-form {...attrs} model={prop.form} ref={formRef}>
        {
          toPairs(newFormItem.value).map(([key, value]: [string, any]) => {
            return <>
              <el-form-item {...omit(value, ['event','prop'])} {...value.event} ref={formItemRef[key]}>
                <el-input v-model={proxys[value.prop]}></el-input>
              </el-form-item>
            </>
          })
        }
      </el-form>
    </>
  }
})

```
几点注意：
1. 我们使用 pathArrToString 函数将 prop 统一转换为字符串。
2. 在 el-input 上，我们使用 v-model 绑定 proxys 对象，而获取 proxys 对象时，会使用 lodash 的 get、set 方法去找到 form 上正确的 prop 路径的值。

## 自定义更多表单项功能
在前面，我们完成了 el-form-item 属性、事件、暴露事件的绑定。这里我们还可以根据需要在 genNewFormItem 中做更多的事情。比如，稍加处理，我们可以给表单列新增一个属性，default，用来指定表单的默认值。
```javascript
if (has (column, "default")) {
	set(prop.form, column.prop, column.default);
}
```
在渲染时排除这个属性，因为它并不是 el-form-item 的属性，而是我们给 items 提供支持的属性。
```html
<el-form-item {...omit(value, ['event','prop','default'])} {...value.event} ref={formItemRef[key]}>
	<el-input v-model={proxys[value.prop]}></el-input>
</el-form-item>
```

## inner 属性
现在，我们来完成最后一部分，el-form-item 里面的表单组件。这里我们定义了一个 inner 属性，该属性可以是一个字符串，表示在 el-form-item 中应用什么样的组件。
```javascript
import { defineComponent, ref, onBeforeUpdate } from 'vue'
import { get, set, has, toPairs, omit, mapKeys, startCase, kebabCase, defaultsDeep } from 'lodash-es'

const pathArrToString = (arr: Array<string | number>) => {/*...*/}

export default defineComponent ({
  props: {...},
  setup(prop: CFormProp, { expose, attrs, slots }) {
    const formItemRef: any = {}
    // 根据配置生成渲染所需数据
    const newFormItem = ref({});

    // 代理form，用于在v-model上使用prop表示路径
    const proxys: any = new Proxy(...)

    const genNewItemForm = () => {
      const keys = Object.keys(prop.formItem);
      newFormItem.value = { ...prop.formItem };
      for (let key of keys) {
        // 预处理
        set(formItemRef, key, ref())
        // 预处理
        let column = prop.formItem[key];
        if (typeof column === "string") {...}
        
        if (typeof column === "object") {
          // 设置默认属性
          defaultsDeep(column, {
            key: key,
            prop: key,
            label: key,
            inner: { is: 'el-input', event: {} }
          })

          if (has(column, 'event')) {...}

          // 处理prop属性
          if (Array.isArray(column['prop'])) {
            column['prop'] = pathArrToString(column['prop'])
          }

          // 处理default属性。
          // 直接对form进行修改，赋初始值，在保证有prop后进行。prop标识属性在form中的位置
          if (has(column, "default")) {
            set(prop.form, column.prop, column.default);
          }

          // 处理inner属性
          if (has(column, 'inner') && !has(column, 'slot')) {
            if (typeof column.inner === 'string') {
              set(column, 'inner', { is: column.inner, event: {} })
            }
            if (has(column, 'inner.is.name')) {
              // inner.is支持具名组件
              column.inner.is = kebabCase(column.inner.is.name)
            }
            // if(has(column.inner.event))
            if (Object.keys(column.inner.event)) {
              column.inner.event = mapKeys(column.inner.event, (_, key) => 'on' + startCase(key))
            }
          }
        }
      }
    }
    genNewItemForm()
    onBeforeUpdate(genNewItemForm)

    const formRef = ref({})
    expose({ formRef, formItemRef })

    // 渲染inner组件
    const genInner = (type: string, prop: string, attrs: any, events: any) => {
      switch (type) {
        case 'el-input':
          return <el-input v-model={proxys[prop]} {...attrs} {...events}></el-input>
        case 'el-switch':
          return <el-switch v-model={proxys[prop]} {...attrs} {...events}></el-switch>
        case 'el-date-picker':
          return <el-date-picker v-model={proxys[prop]} {...attrs} {...events}></el-date-picker>
        default:
          break;
      }
    }

    return () => <>
      <el-form model={prop.form} ref={formRef} {...attrs}>
        {
          toPairs (newFormItem. value). map (([key, value]: [string, any]) => {
            return <>
              <el-form-item {...omit(value, ['default', 'inner', 'prop', 'event'])} {...value.event} ref={formItemRef[key]}>
                {genInner (value. inner. is, value. prop, { ...omit (value. inner, ['is', 'event']) }, { ... value. inner. event })}
              </el-form-item>
            </>
          })
        }
      </el-form>
    </>
  }
})
```

逻辑可能有点小复杂，但总的来说就是，如果传入一个 inner 字符串，就绘制为一个表单组件，如果是一个 inner 对象，就读取其 is 的值渲染组件，event 作为绑定的事件，其它属性作为组件的属性。

## 插槽
插槽的写法就比较简单了。可以参考上一期封装 el-table 的写法。这里通过 setup 的 slots 参数可以读取到一个对象，每个 key 对应插槽名，每个值对应渲染函数。在 genNewFormItem 中处理时，将 slots 中所有的插槽进行匹配，选出属于当前表单项的插槽，最后在渲染表单项时顺便渲染属于表单项的插槽就行。

比如：传入插槽
```
{
	default-name: f
	header-name: f
}
```
在执行 genNewFormItem 时，就将这个插槽归为表单项 name 的 default 插槽和 header 插槽，将值 f 赋给表单项下的 slot。

剩下就是在渲染时判断，如果 value 对象有 slot，就渲染 slot，如果没有，才渲染 inner。
```javascript
import { defineComponent, ref, onBeforeUpdate } from 'vue'
import { get, set, has, toPairs, omit, mapKeys, startCase, kebabCase, defaultsDeep } from 'lodash-es'

const pathArrToString = (arr: Array<string | number>) => {/*...*/}

export default defineComponent({
  props: {...},
  setup(prop: CFormProp, { expose, attrs, slots }) {
    const formItemRef: any = {}
    // 根据配置生成渲染所需数据
    const newFormItem = ref({});

    // 代理form，用于在v-model上使用prop表示路径
    const proxys: any = new Proxy(...)

    const genNewItemForm = () => {
      const keys = Object.keys(prop.formItem);
      newFormItem.value = { ...prop.formItem };
      for (let key of keys) {
        // 预处理
        set(formItemRef, key, ref())
        // 预处理
        let column = prop.formItem[key];
        if (typeof column === "string") {...}
        
        if (typeof column === "object") {
          // ...

          // 处理slot属性，slot属性为一个插槽对象
          const slotKeys = Object.keys(slots);
          for (let key of slotKeys) {
            const res = key.match(/^(\S+)-(\S+)/);
            if (res && res[2] == column.key) {
              if (!has(column, "slot")) {
                set(column, "slot", {});
              }
              set(column.slot, res[1], slots[key]);
            }
          }
          if (has(column, 'slot') && has(column, 'inner')) {
            console.warn('slot已存在，inner将不被渲染')
          }

          // 处理inner属性
          if (has(column, 'inner') && !has(column, 'slot')) {...}
        }
      }
    }
    genNewItemForm()
    onBeforeUpdate(genNewItemForm)

    const formRef = ref({})
    expose({ formRef, formItemRef })

    // 渲染inner组件
    const genInner = (type: string, prop: string, attrs: any, events: any) => {
      switch (type) {
        case 'el-input':
          return <el-input v-model={proxys[prop]} {...attrs} {...events}></el-input>
        case 'el-switch':
          return <el-switch v-model={proxys[prop]} {...attrs} {...events}></el-switch>
        case 'el-date-picker':
          return <el-date-picker v-model={proxys[prop]} {...attrs} {...events}></el-date-picker>
        default:
          break;
      }
    }

    // 设置 slot 或 inner
    const getSlotorInner = (value: any) => {
      if (value. slot) {
        return value.slot;
      } else {
        return genInner(value.inner.is, value.prop, { ...omit(value.inner, ['is', 'event']) }, { ...value.inner.event })
      }
    }

    return () => <>
      <el-form model={prop.form} ref={formRef} {...attrs}>
        {
          toPairs(newFormItem.value).map(([key, value]: [string, any]) => {
            return <>
              <el-form-item {...omit(value, ['default', 'inner', 'prop', 'event'])} {...value.event} ref={formItemRef[key]}>
                {getSlotorInner(value)}
              </el-form-item>
            </>
          })
        }
      </el-form>
    </>
  }
})
```
这里要注意 jsx 中插槽的写法：
```jsx
setup(prop,{slots}){
	return <>{slots}</>
}
```
直接将插槽对象放进去就可以。但是如果一个标签中放入了一个插槽，就不能放其它东西了。所以这里我们用 getSlot or Inner 方法来判断这个地方是放 slot 还是 inner。

## 总结
本篇文章我们通过配置支持 jsx 的开发环境，实现了事件的批量绑定。和之前的写法十分类似，我们接收一个对象，并在组件内对对象进行一些处理，最终根据处理结果生成表单的子元素。该自定义组件支持 el-form、el-form-item 的所有属性、事件、暴露事件和插槽，在兼具高定制性的同时，又简化了表单的创建。

仓库地址： [GitHub - tangqiang0605/el-form-package-demo](https://github.com/tangqiang0605/el-form-package-demo)
## 参考
[Form 表单 | Element Plus](https://element-plus.org/zh-CN/component/form.html#formitem-attributes)

[渲染函数 & JSX | Vue.js](https://cn.vuejs.org/guide/extras/render-function.html#render-functions-jsx)

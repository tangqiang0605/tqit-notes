# vue3小满

eventloop

宏任务后微任务这样循环，script是 第一个宏任务。

1.宏任务
script(整体代码)、setTimeout、setInterval、UI交互事件、postMessage、Ajax

2.微任务
Promise.then catch finally、MutaionObserver、process.nextTick(Node.js 环境)

vue3插件

编写模块，导出含install的对象或function，app.use这个导出对象会自动注入app对象。可以在模块里绑定全局属性呀，做一些操作什么的。



全局属性

app.config.globalProperties对象

读取vue.getCurrentInstance().appContext.config.globalProperites

全局属性2

app.provide('name',value)

const a=inject('name',default-value);

全局属性3

store

全局属性4

event bus 或mitt

小彩蛋Vue3自动引入插件
unplugin-auto-import/vite

vite配置

```
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),VueJsx(),AutoImport({
    imports:['vue'],
    dts:"src/auto-import.d.ts"
  })]
})
```
配置完成之后使用ref reactive watch 等 无须import 导入 可以直接使用 

## 组合式api

1. 在setup里面定义的变量都会被导出。模板template可以直接使用。

2. 非响应对象和响应式对象都可以嵌入模板。但前者值改变时，视图不会更新。

3. 基本类型用ref包装，数组对象类型用reative包装。如果数组对象使用ref会自动调用reative。

4. ref在脚本中要通过.value调用。在模板中会自动解包。

5. shallowRef、shallowReative只追踪第一层的变化。

6. triggerRef(可以是普通属性)：手动强制更新视图。

7.  ``` js
    customerRef((track,trigger)=>{
    	return {
            get(){
                track()
                return value;
            },
            set(){
                trigger();
                手动更新视图
            }
        }
    })，
    ```

8. readonly传入一个reative对象，包装为只读。

9. isRef、toRaw（响应式对象转为普通对象）

10. toRef、toRefs：toRefs循环调用toRef，接受一个reative，返回一个对象，该对象的所有属性是对这个reative所有属性的ref包装（如果属性是对象，ref会自动调用reatvie）。不要试图使用toRef将基本类型转换为ref对象，这并不起作用。...toRefs常用于setup函数的return的对象中，如果你使用setup语法糖，toRefs也很少使用了。

11. computed。一般用来封装一个 响应式对象？如果值没有改变，将使用缓存中的值。

    ``` js
    let m = computed (()=>{
        return price.value;
    })
    ```

12. watchEffect。和computed是类似的（指不需要指定监听对象）。注意watchEffect是非惰性的（会自动调用一次）

13. watch。指定监听对象。参数：监听源、callback(newVal,oldVal)、option对象。

    1. 可以直接监听响应式对象，会隐式转换为深度监听。如果是其属性，需要以getter函数形式：()=>message.namea
    2. option属性：immediate是否立即调用一次默认关闭，deep：是否开启深度监听默认开启。

14. 常用生命周期钩子：onMounted
15. hook库：vueuse。工具库，黑夜模式，滚动，节流防抖，fetch。
16. 自定义hook（不懂）

## 组件

14. 组件作用域

    全局app.component(com-name)

    局部import使用

    递归组件

    

    

    ### 动态组件 

    就是：让多个组件使用同一个[挂载](https://so.csdn.net/so/search?q=挂载&spm=1001.2101.3001.7020)点，并动态切换，这就是动态组件。

```
  原理
  <component :is="A"></component>
  实践
  const tab = reactive<Com[]>([{
    name: "A组件",
    comName: markRaw(A)
}, {
    name: "B组件",
    comName: markRaw(B)
}])
```

使用keep-alive组件缓存状态（配合component使用）

``` vue
<KeepAlive>vue中使用这个</KeepAlive>
dom使用keep-alive
<keep-alive><component :is="view"></component></keep-alive>
```

keep-alive 属性
```
 <keep-alive :include="" :exclude="" :max=""></keep-alive>
```
include 和 exclude 允许组件有条件地缓存。二者都可以用逗号分隔字符串、正则表达式或一个数组来表示：值为vue组件的name值（setup无需手动声明）

max

```
<keep-alive :max="10">
<component :is="view"></component>
```

对应的vue组件多了两个可以使用的生命周期

以通过 [`onActivated()`](https://cn.vuejs.org/api/composition-api-lifecycle.html#onactivated) 和 [`onDeactivated()`](https://cn.vuejs.org/api/composition-api-lifecycle.html#ondeactivated)

### 异步组件

在大型应用中，我们可能需要将应用分割成小一些的代码块 并且减少主包的体积，这时候就可以使用异步组件。

1. `<suspense>` 组件有两个插槽。它们都只接收一个直接子节点。`default` 插槽里的节点会尽可能展示出来。如果不能，则展示 `fallback` 插槽里的节点。

   ``` js
        <Suspense>
               <template #default>
                   <Dialog>
                       <template #default>
                           <div>我在哪儿</div>
                       </template>
                   </Dialog>
               </template>
    
               <template #fallback>
                   <div>loading...</div>
               </template>
           </Suspense>
   ```

2. 顶层await

   子组件在setup中使用await

   父组件引用时不通过import而通过defineAsyncComponent

   ``` js
   import { defineAsyncComponent } from 'vue'
   const Dialog = defineAsyncComponent(() => import('../../components/Dialog/index.vue'))
   ```

   

### 插槽

如果只有一个插槽，可以直接书写：《子组件》插槽内容《/子组件》

1. 子组件设置插槽slot name

   ``` js
       <div>
           <slot name="header"></slot>
           <slot></slot>
    
           <slot name="footer"></slot>
       </div>
   ```

2. 父组件填充插槽template v-slot

   ``` js
           <Dialog>
               简写
               <template #header>
                  <div>1</div>
              </template>
   缺省v-slot===具名插槽v-slot:default
              <template v-slot>
                  <div>2</div>
              </template>
   动态插槽
              <template #[footer]>
                  <div>3</div>
              </template>
           </Dialog>
   let footer=ref('footer');
   ```

3. 插槽里可以有默认值，父组件调用时不插入任何内容时会显示默认值。插槽作用域，参考父子传参。

### 传参

#### 父子

14. 父子组件传参：

    1. 子通过defineProps接受传值（defineProps无需import）。返回一个包含这些属性的对象。

        ``` js
       非ts
       defineProps({
           title:{
               default:"",
               type:string
           },
           data:Array
       })
       ts
       
       defineProps<{
           title:string,
           data:number[]
       }>()
       带默认值的
       type Props={
           title?:string,
           data?:number[]
       }
       ts注入默认值
       withDefaults(defineProps<Props>(),{
           title:'zhangsan',
           data:()=>[1,2,3]
       })
       ```

    2. 子传父：defineEmits派发事件

       1. ``` js
          子组件
          const emit=defineEmits(['on-click'])
          触发
          emit('on-click','hello')
          ```

       2. ``` js
          父组件
          <SonComponent @on-click='handler'></SonComponent>
          function handler(say){
              console.log(say);
          }
          ```

    3. 子传父：defineExpose暴露属性通过ref读取

       1. ``` js
          子组件
          defineExpose({
              要暴露的变量
          })
          ```

       2.  ``` js
          父组件
          <SonComponent ref="son"></SonComponent>
          console.log(son)
          读取子传过来的数据
          ```

          3. 也可以通过节点属性读取

             vnode.component.exposed.暴露的变量

    4. 子传父：作用域插槽

       1. ``` js
          <slot :data1="item1" :data2="item2"></slot>
          data任取
          子定义item数据
          ```

       2. ``` js
          父取值
                   <Dialog>
          
                      <template #default="data">
                          <div>data.data1</div>
                      </template>
                  </Dialog>
          ```

    5. 父传子：provide、inject

    ``` js
    import { provide } from 'vue'
    
    provide(/* 注入名 */ 'message', /* 值 */ 'hello!')
    ```

    第二个参数是提供的值，值可以是任意类型，包括响应式的状态，比如一个 ref。提供的响应式状态使后代组件可以由此和提供者建立响应式的联系。子组件：const value = inject('message', '这是默认值')

    6. 父传子：自定义v-model

    | 父                  | 自定义子组件               |                                    |
    | ------------------- | -------------------------- | ---------------------------------- |
    | v-model=’value‘     | 接收defineProps            | 缺省：modelValue。xxx.             |
    | v-model:xxx='value' | 派发define(’update‘,value) | 缺省update:modelValue。update:xxx  |
    |                     | 修饰defineProps            | 缺省：modelModifiers。xxxModifiers |
    |                     |                            |                                    |

    7. 父传子：透传

#### 兄弟

1. 借助父组件

   子1组件派发事件通过App.vue 接受子1组件派发的事件然后在Props 传给子2组件 也是可以实现的

   缺点就是比较麻烦 ，无法直接通信，只能充当桥梁

2. event bus运用了JS设计模式之发布订阅模式

创建Bus.js。挂载一个vue实例。import Vue from ’vue';export default new Vue();

组件A发布事件：导入Busjs实例化import Bus from '@/comon/bus';Bus.$emit('event-name','hello');

组件B订阅事件：import Bus from ‘@/common/bus';Bus.$on('event-name',handler(data))。

vue3中已经移除了e m i t , emit,emit,on等方法，可以自己实现一个。

``` js
class Bus {
	list: { [key: string]: Array<Function> };
	constructor() {
		// 收集订阅信息,调度中心
		this.list = {};
	}

	// 订阅
	$on(name: string, fn: Function) {
		this.list[name] = this.list[name] || [];
		this.list[name].push(fn);
	}

	// 发布
	$emit(name: string, data?: any) {
		if (this.list[name]) {
      		this.list[name].forEach((fn: Function) => {
        	fn(data);
      });
    }
	}

	// 取消订阅
	$off(name: string) {
		if (this.list[name]) {
			delete this.list[name];
		}
	}
}
export default Bus;
```

3.mittjs

[(105条消息) Vue3.x 推荐使用 mitt.js_文摘资讯的博客-CSDN博客](https://blog.csdn.net/gtLBTNq9mr3/article/details/117887282?spm=1001.2101.3001.6650.1&utm_medium=distribute.pc_relevant.none-task-blog-2~default~CTRLIST~Rate-1-117887282-blog-125453908.pc_relevant_multi_platform_whitelistv3&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2~default~CTRLIST~Rate-1-117887282-blog-125453908.pc_relevant_multi_platform_whitelistv3&utm_relevant_index=2)

npm i mitt

导入mitt函数并实例化使用其emit、on、off、clear方法。

实例化的对象可以挂载为全局属性或导出为busjs或在组件中导入并实例化使用。

#### store

全局共享

### transtion动画组件

1. 作用：包装组件，为组件提供进入和离开的过渡。

使用v-if、v-show的组件、动态组件切换时，组件根节点。

3. 使用animate更为常用https://animate.style/

通过自定义class 结合css动画库animate css

安装库 npm install animate.css

引入 import 'animate.css'

        <transition
            leave-active-class="animate__animated animate__bounceInLeft"
            enter-active-class="animate__animated animate__bounceInRight"
        >
            <div v-if="flag" class="box"></div>

2. 组件属性

trasnsition props

过渡类名：使用name属性指定一个名字，然后在style中定义这六个类

v-enter-from：定义进入过渡的开始状态。在元素被插入之前生效，在元素被插入之后的下一帧移除。

v-enter-active：定义进入过渡生效时的状态。在整个进入过渡的阶段中应用，在元素被插入之前生效，在过渡/动画完成之后移除。这个类可以被用来定义进入过渡的过程时间，延迟和曲线函数。

v-enter-to：定义进入过渡的结束状态。在元素被插入之后下一帧生效 (与此同时 v-enter-from 被移除)，在过渡/动画完成之后移除。

v-leave-from：定义离开过渡的开始状态。在离开过渡被触发时立刻生效，下一帧被移除。

v-leave-active：定义离开过渡生效时的状态。在整个离开过渡的阶段中应用，在离开过渡被触发时立刻生效，在过渡/动画完成之后移除。这个类可以被用来定义离开过渡的过程时间，延迟和曲线函数。

v-leave-to：离开过渡的结束状态。在离开过渡被触发之后下一帧生效 (与此同时 v-leave-from 被移除)，在过渡/动画完成之后移除。

或通过这些属性自己指定类名，和上面是一一对应的。

- `enter-from-class`

- `enter-active-class`

- `enter-to-class`

- `leave-from-class`

- `leave-active-class`

- `leave-to-class`

- 过渡时间

- ``` js
  <transition :duration="1000">...</transition>
  
  <transition :duration="{ enter: 500, leave: 800 }">...</transition>
  ```

4. transition 生命周期8个（如果要使用https://greensock.com/。gsap动画库的话（配合js））
     @before-enter="beforeEnter" //对应enter-from
     @enter="enter"//对应enter-active
     @after-enter="afterEnter"//对应enter-to
     @enter-cancelled="enterCancelled"//显示过度打断
     @before-leave="beforeLeave"//对应leave-from
     @leave="leave"//对应enter-active
     @after-leave="afterLeave"//对应leave-to
     @leave-cancelled="leaveCancelled"//离开过度打断
   当只用 JavaScript 过渡的时候，在 enter 和 leave 钩子中必须使用 done 进行回调

结合gsap 动画库使用 GreenSock

const beforeEnter = (el: Element) => {
    console.log('进入之前from', el);
}
const Enter = (el: Element,done:Function) => {
    console.log('过度曲线');
    setTimeout(()=>{
       done()
    },3000)
}
const AfterEnter = (el: Element) => {
    console.log('to');
}

通过这个属性可以设置初始节点过度 就是页面加载完成就开始动画 对应三个状态

```vbnet
appear-active-class=""
appear-from-class=""
appear-to-class=""
appear
```

### Teleport传送组件

将组件用teleport包装。不受父级`style`、`v-show`等属性影响，但`data`、`prop`数据依旧能够共用。

to属性：指定挂载的父组件。属性选择器class、id等。

disabled属性：出现则为true，to属性不生效（不挂载teleport？）

``` html
<Teleport to="body">
    <Loading></Loading>
</Teleport>
```



## 模板

### 自定义指令

[(105条消息) 学习Vue3 第二十七章（自定义指令directive）_小满zs的博客-CSDN博客](https://xiaoman.blog.csdn.net/article/details/123228132)

[自定义指令 | Vue.js (vuejs.org)](https://cn.vuejs.org/guide/reusability/custom-directives.html)s

### 组件库

收藏夹edge、vue组件库

### 作用域样式

style scoped

#### 样式穿透

改变scoped加属性选择器的地方。

主要是用于修改很多vue常用的组件库（element, vant, AntDesigin），虽然配好了样式但是还是需要更改其他的样式，就需要用到样式穿透。

style scoped原理

1.html：给每个dom加上data-v-哈希唯一属性

2.css：给每个css选择器末尾加上当前组件的data选择器[data-v-hash]。

3. 包含子组件，只对组件最外层进行以上操作。

一般情况下，我们可以修改组件属性。但是如果嵌套多层，比如后代选择器，.ipt input。scoped会在末尾加【data-v-hash】属性选择器（可以通过f12查看css样式），但我们是想让他给ipt加，这个时候给input加上':deep(input)'，属性选择器就会加在.ipt上。

给组件库修改属性

<el-input class="ipt"></el-input>

.ipt {

​	input{

background:red;

}

}

不会生效，因为是.ipt input[data-v-hash]

使用:deep(input)

生成为.ipt[data-v-hash] input。

#### 插槽选择器

 默认情况下，作用域样式不会影响到 `<slot/>` 渲染出来的内容，因为它们被认为是父组件所持有并传递进来的。插槽内挂载 属性无效。

使用:slotted(css选择器)

``` css
<style scoped>
 :slotted(.a) {
    color:red
}
</style>
```

#### 全局选择器

:global(css-selector)等同不加scoped

#### 动态css：v-bind

script：const red=ref（‘red’）

css：color：v-bind（red）

color：v-bind（‘red.value'）对象需要加引号

#### css-module

template中使用：

style module>将生成的 CSS 类们作为 $style 对象的属性暴露给本组件。

缺省：$style，module有值：xxx

使用class=“xxx.header"

多个class="[xxx.header,xxx.red]"

script中使用：

组合式api：useCssModule

如果你是在script中绘制页面（tsx或render函数），可以通过useCssModule('module-value')实例化对象。

### jsx

### h函数

编写页面的三种方式：template、jsx、函数式编程（h函数）

## 没看懂

### 学习Vue3 第三十五章（Evnet Loop 和 nextTick）

### 第二十二章（transition-group过度列表）

[学习Vue3 第二十八章（自定义Hooks）](https://xiaoman.blog.csdn.net/article/details/123271189)

## 以后再看

### 小满Vue3第三十六章（Vue如何开发移动端）
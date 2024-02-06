开发后台管理系统，在业务上接触的最多就是表单（输入）和表格（输出）了。对于使用 Vue 框架进行开发的同学来说，组件库 Element 是肯定会接触的，而其中的 el-table 和 el-form 更是管理系统中的常客。

然而，一旦项目的表格或表单多起来，每个不同的配置，以及多一个字段少一个字段，都要在 template 中重新写一大段组件代码，显得非常麻烦。或许你会考虑将这些代码封装起来，可是又会发现，封装的表格、表单大多数只在一处地方使用，还不如不封装呢。到底要如何封装，可以让每处使用 el-table 或 el-form， 都可以复用相同的组件，减少代码量的同时又具备高度的可定制性？

本文章将会按照从无到有的步骤，按照封装组件常用的思路来封装 el-table，并且实现封装完成的组件支持 el-table 的全配置。在封装的过程中，你将会看到：
- 如何抽取组件。
- 巧用属性透传。
- v-html、component 组件、h 函数、动态组件的应用。
- 具名插槽、作用域插槽。
- v-bind 的妙用。
- 实现插槽透传的方法。

## 一般的组件封装思路
以下是 el-table 在项目中常用的写法：el-table 接受一个数组 data 作为数据，在 el-table 元素中插入多个 el-table-column 组件，用于定义列的名称（label），数据来源（prop），以及其它列的定制配置（width 等）。在实际项目中，往往不止几行 column，甚至三四十行都有可能（不过一般超过十行，最好考虑把次要的信息放在详情中展示，而不是全部列在表格上，除非是业务需要在表格上浏览所有数据），而且每个 column 都可能会有不同的配置，比如排序、fix、不同宽度、插入增删改按钮等，这就使得一个表格的代码会变得又长又复杂，如果还要写其它业务功能，会大大地降低模板代码的可读性。
```html
<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="a" label="aName" width="180" />
    <el-table-column prop="b" label="bName" width="180" />
    <el-table-column prop="c" label="cName" width="180" />
    <el-table-column prop="d" label="dName" width="180" />
    <el-table-column prop="e" label="eName" width="180" />
    <el-table-column prop="f" label="fName" width="180" />
    <el-table-column prop="g" label="gName" width="180" />
    <el-table-column prop="h" label="hName" width="180" />
    <el-table-column prop="i" label="iName" width="180" />
  </el-table>
</template>

<script lang="ts" setup>
const tableData = new Array(9).fill({
  a: "2016-05-03",
  b: "Tom",
  c: "No. 189, Grove St, Los Angeles",
  d: "No. 189, Grove St, Los Angeles",
  e: "2016-05-03",
  f: "Tom",
  g: "No. 189, Grove St, Los Angeles",
  h: "2016-05-03",
  i: "Tom",
});
</script>
```

当然，这种情况，一般都会将它抽取为组件：
```html
// CustomTable.vue
<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="a" label="aName" width="180" />
    <el-table-column prop="b" label="bName" width="180" />
    <el-table-column prop="c" label="cName" width="180" />
    <el-table-column prop="d" label="dName" width="180" />
    <el-table-column prop="e" label="eName" width="180" />
    <el-table-column prop="f" label="fName" width="180" />
    <el-table-column prop="g" label="gName" width="180" />
    <el-table-column prop="h" label="hName" width="180" />
    <el-table-column prop="i" label="iName" width="180" />
  </el-table>
</template>

<script lang="ts" setup>
defineProps<{
  tableData: Array<any>;
}>();
</script>
```

然后在页面中使用：
```html
// App.vue
<template>
  <CustomTable :tableData="tableData"></CustomTable>
</template>

<script lang="ts" setup>
import CustomTable from "./CustomTable.vue";
const tableData = new Array(9).fill({
  a: "2016-05-03",
  b: "Tom",
  c: "No. 189, Grove St, Los Angeles",
  d: "No. 189, Grove St, Los Angeles",
  e: "2016-05-03",
  f: "Tom",
  g: "No. 189, Grove St, Los Angeles",
  h: "2016-05-03",
  i: "Tom",
});
</script>
```

一般封装的过程到这里就结束了。可见，这种封装既将表格从页面中抽取出来方便单独维护，又提高了页面代码的可读性。然而，这种封装方式并没有解决开篇提到的书写重复代码的问题，而且还比没有封装多了一些操作，其实仍然是一种“体力活”。
## 封装表格数据Api
为了后面演示方便，先将表格数据的 api 封装起来。
```javascript
// src/api/index.ts
export function getData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: new Array(9).fill({
          a: "2016-05-03",
          b: "Tom",
          c: "No. 189, Grove St, Los Angeles",
          d: "No. 189, Grove St, Los Angeles",
          e: "2016-05-03",
          f: "Tom",
          g: "No. 189, Grove St, Los Angeles",
          h: "2016-05-03",
          i: "Tom",
        }),
      });
    }, 200);
  });
}
```
同时，组件的位置也改为 `src/components/custom-table/index.vue`。
```html
// App.vue
<template>
  <CustomTable :tableData="tableData"></CustomTable>
</template>

<script lang="ts" setup>
import CustomTable from "./components/custom-table/index.vue";
import { getData } from "./api/index";
import { onMounted, ref } from "vue";
const tableData = ref<any>([]);
onMounted(() => {
  getData().then((res: any) => {
    tableData.value = res.data;
  });
});
</script>

```
## v-for 复用 el-table-column

先回到最初的代码，来解决 el-table-column 复用的问题。首先暂时不考虑 el-table-column 定制化属性的需求，先把下面的代码量减少，如何实现？很简单，使用 v-for：
```html
// src\components\custom-table\index.vue
<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column
      v-for="column in tableHeaders"
      :key="column"
      :prop="column"
      :label="column + 'Name'"
      width="180"
    ></el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import { computed } from "vue";
const prop = defineProps<{
  tableData: Array<any>;
}>();
const tableHeaders = computed(() => Object.keys(prop.tableData[0] || {}));
</script>
```

这里，我们使用数据的 key 作为列名，数据有多少个字段，就可以显示多少列，当数据的列数发生改变时，还不需要修改任何代码。

## 自定义列名和列的属性
### 自定义列名
然而，数据的 key 作为列名的情况很少（至少在我们这里，一般是使用中文作为列名的），这就需要我们使用可定制的列名，并且，如果我们不想展示某些字段，上面的写法也是做不到的（它会显示数据的所有字段）。

这时候，我们只需要一个映射（mapper）就可以解决这些问题。该对象的每一个属性对应每一列的 prop、key，值对应列的列名 label。
```javascript
// App.vue
// 定义新的Header结构，key为column的prop/key，value为column的label
const tableHeaderMapper = {
  a: "列a",
  b: "列b",
  c: "列c",
  d: "列d",
  e: "列e",
  f: "列f",
  g: "列g",
  h: "列h",
  i: "列i",
};
```

遍历并绑定：
```html
// src\components\custom-table\index.vue
<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column
      v-for="(value, key) in tableHeaders"
      :key="key"
      :prop="key"
      :label="value"
    ></el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
export type Mapper<T> = {
  [P in keyof T as string]?: string;
};
defineProps<{
  tableData: Array<any>;
  tableHeaders: Mapper<any>;
}>();
</script>
```

使用：
```html
  <CustomTable :tableData="tableData" :table-headers="tableHeaderMapper"></CustomTable>
```

### v-bind 绑定所有属性
在 Vue 中，可以使用 v-bind 直接绑定对象，简化很多代码：
```html
<el-table-column
  :key="key"
  :prop="key"
  :label="value"
></el-table-column>
```
等同：
```html
<el-table-column
  v-bind="{key:key,prop:key,label:value}"
></el-table-column>
```

所以，我们其实可以这样定义 tableHeaders！
```javascript
const tableHeaderMapper = {
  a: {
	  label: "列a",
	  key: "a",
	  prop: "a"
  },
  ...
};
```

改写组件代码：
```html
// src\components\custom-table\index.vue
// v-bind 直接绑定一个对象
<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column
      v-for="column in tableHeaders"
      v-bind="column"
    ></el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
export type Mapper<T> = {
  [P in keyof T as string]?: object; // 从string类型改为object类型
};
defineProps<{
  tableData: Array<any>;
  tableHeaders: Mapper<any>;
}>();
</script>
```

如果觉得重复写 key、prop 太冗余，又或者想兼容之前自定义列名的写法，可以在自定义组件中对 tableHeaders 进行处理，生成 newTableHeaders。
```javascript
// src\components\custom-table\index.vue
<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column
      v-for="column in newTableHeader"
      v-bind="column"
    ></el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUpdate } from "vue";
export type Mapper<T> = {
  [P in keyof T as string]?: string | object;
};
const prop = defineProps<{
  tableData: Array<any>;
  tableHeaders: Mapper<any>;
}>();
const newTableHeader = ref<any>({});
const genNewTableHeader = () => {
  newTableHeader.value = { ...prop.tableHeaders };
  const rawAttr = prop.tableHeaders;
  for (let key in rawAttr) {
    let column = rawAttr[key];
    if (typeof column === "string") {
      Reflect.set(newTableHeader.value, key, {
        key: key,
        prop: key,
        label: column,
      });
    }

    // 其实此时一定是对象了，此处判断是用于ts类型收窄
    if (typeof column === "object") {
      // 设置默认的key
      if (!Reflect.has(column, "key")) {
        Reflect.set(column, "key", key);
      }
      if (!Reflect.has(column, "label")) {
        Reflect.set(column, "label", key);
      }
      // 设置默认的prop，如果该列是多选项，则不需要prop
      if (
        !Reflect.has(column, "prop") &&
        !(
          Reflect.has(column, "type") &&
          Reflect.get(column, "type") == "selection"
        )
      ) {
        Reflect.set(column, "prop", key);
      }
    }
  }
  console.log(newTableHeader.value);
};
onMounted(genNewTableHeader);
onBeforeUpdate(genNewTableHeader);
</script>
```

使用：
```javascript
// App.vue
const tableHeaderMapper = {
  a: {
    label: "列a",
    width: "200",
  },
  b: "列b",
  c: "列c",
  d: "列d",
  e: "列e",
  f: "列f",
  g: "列g",
  h: "列h",
  i: "列i",
};
```

到这里，对 el-tabl 的封装已经相对完善了，我们不需要书写复杂的 el-table-column，只需传入 tableData 和 tableHeaders，就可以自由定制我们的表格列了。

## 表格透传
我们解决了表格列属性问题，现在，如果我们还想要表格属性和表格列属性一样可以自由传入，如何实现？

### 属性、样式、事件透传
Vue 天然支持属性、样式、事件透传，我们直接在 CustomeTable 上书写我们想要的 el-table 属性或事件即可！
```html
// App.vue
<template>
  <CustomTable
    :tableData="tableData"
    :table-headers="tableHeaderMapper"
    v-loading="loading"
  ></CustomTable>
</template>

<script lang="ts" setup>
...
const loading = ref(false);
onMounted(() => {
  loading.value = true;
  getData().then((res: any) => {
    tableData.value = res.data;
    loading.value = false;
  });
});
</script>
```

### 插槽透传
仔细观察 el-table 属性，发现它还支持三个插槽：默认插槽、append、empty。我们的 CustomTable 也要支持！

先回顾以下我们的 CustomTable。在 custom-table/index. vue 中，我们并没有书写 slot 标签，所以在 App. vue 中往 CustomTable 插入标签是不会被渲染的，所以我们需要给 CustomTable 添加 slot 插槽，要添加什么样的插槽呢？和 el-table 提供同名的插槽，并在 custom-table/index. vue 中的 el-table 中插入。即，CustomTable 提供插槽，App. vue 写入插槽，CustomTable 读取到插槽，并把插槽的内容写入 el-table 中。插槽的内容是这样传递的：App. vue -> CustomTable -> el-table。

在 CustomTable 中开始写插槽前，会发现，我们已经使用了 el-table 的插槽，将我们 v-for 生成的 column 插入到 el-table 的默认插槽中了。这个时候，我们需要改变我们的写法：将 column 的生成也拆分为组件！然后传入给 CustomTable，而 CustomTable 的职责则变为：只负责从 App. vue 传递插槽给 el-table。符合单一职责的封装原则！

```html
// 新的CustomTable，只负责传递插槽
<template>
  <el-table :data="tableData" style="width: 100%">
    <slot></slot>
  </el-table>
</template>

<script lang="ts" setup>
defineProps<{
  tableData: Array<any>;
}>();
</script>
```

新建 src/components/custom-column/index. vue，修改少许代码。
```html
// 抽取为CustomColumn
<template>
  <el-table-column
    v-for="column in newTableHeader"
    v-bind="column"
  ></el-table-column>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUpdate } from "vue";
export type Mapper<T> = {
  [P in keyof T as string]?: string | object;
};
const prop = defineProps<{
  tableHeaders: Mapper<any>;
}>();
const newTableHeader = ref<any>({});
const genNewTableHeader = () => {
  newTableHeader.value = { ...prop.tableHeaders };
  const rawAttr = prop.tableHeaders;
  for (let key in rawAttr) {
    let column = rawAttr[key];
    if (typeof column === "string") {
      Reflect.set(newTableHeader.value, key, {
        key: key,
        prop: key,
        label: column,
      });
    }

    // 其实此时一定是对象了，此处判断是用于ts类型收窄
    if (typeof column === "object") {
      // 设置默认的key
      if (!Reflect.has(column, "key")) {
        Reflect.set(column, "key", key);
      }
      if (!Reflect.has(column, "label")) {
        Reflect.set(column, "label", key);
      }
      // 设置默认的prop，如果该列是多选项，则不需要prop
      if (
        !Reflect.has(column, "prop") &&
        !(
          Reflect.has(column, "type") &&
          Reflect.get(column, "type") == "selection"
        )
      ) {
        Reflect.set(column, "prop", key);
      }
    }
  }
  console.log(newTableHeader.value);
};
onMounted(genNewTableHeader);
onBeforeUpdate(genNewTableHeader);
</script>
```

使用：
```html
// App.vue
<template>
  <CustomTable :tableData="tableData" v-loading="loading">
    <CustomColumn :table-headers="tableHeaderMapper"></CustomColumn>
  </CustomTable>
</template>

<script lang="ts" setup>
import CustomColumn from "./components/custom-column/index.vue";
...
```

上面我们只是支持传递默认插槽，现在我们让 CustomTable 将所有插槽原封不动传给 el-table，实现“插槽透传“！
```html
// src\components\custom-table\index.vue
<template>
  <el-table :data="tableData" style="width: 100%">
    <template v-for="slot in Object.keys($slots)" #[slot]>
      <slot :name="slot"></slot>
    </template>
  </el-table>
</template>

<script setup lang="ts">
defineProps<{
  tableData: Array<any>;
}>();
</script>
```
Vue 中并没有实现插槽透传的方法，我们做的其实是插槽传递，而非透传，但对于组件的使用者来说，这种传递方法看起来和透传无异！

到了这一步，我们的 CustomTable 的基础功能就算封装完成啦！支持 el-tabled 的所有属性和插槽。如有需要，可以在 CustomTable 的基础上进行修改，设计出我们自己的专属 Table！

## 在列中插入子元素
表格列中重要的一个内容，就是插入各种按钮（增删改）、图片、进度条以及其它元素，来实现表格的可操作性、数据可视化。在 el-table-column 中，我们想插入元素，直接使用插槽即可。然而，这里并不能完全照搬表格的插槽传递的方法，因为你很快就会发现，CustomColumn 只有一个，而 el-table-column 却有很多个，我怎么知道插入 CustomColumn 的插槽是属于哪个 el-table-column 的！

### 非插槽写法 v-html
如何在不同的 column 插入元素？很快我们就会想起我们是如何在不同 column 中定义不同的列名，对，tableHeaders！我们可以给 tableHeaders 定义一个属性，只要写到这个属性中，就插入到对应的列的位置上！我们暂且称这个属性为 inner。
```javascript
const tableHeaderMapper = {
  a: {
    label: "列a",
    width: "200",
    inner: xxx
  },
```
接下来就是如何读取 inner 并插入了，我们很容易就想起 v-html：
```html
// CustomColumn
<template>
  <el-table-column v-for="column in newTableHeader" v-bind="column">
    <div v-if="column.inner" v-html="column.inner"></div>
  </el-table-column>
</template>
```

inner 的值为字符串：
```javascript
const tableHeaderMapper = {
  a: {
    label: "列a",
    inner: "<h1>hello</h1>",
  },
```

在字符串中写 html，显然不是很方便，而一说到字符串中写 html，我们自然而然就会想到 jsx！那么这里我们能否接受 jsx 呢？显然不能，但是可以接受一个返回组件的函数吗？可以一试！
```javascript
const tableHeaderMapper = {
  a: {
    label: "列a",
    inner: h('h1','function component!'),
  },
```
直接运行，可以看到对应列显示：
![[Pasted image 20231115215447.png]]
其实就是输出一个组件对象。如何应用这个对象？不妨试试 component。
```html
// CustomColumn
<template>
  <el-table-column v-for="column in newTableHeader" v-bind="column">
    <div v-if="typeof column.inner == 'string'" v-html="column.inner"></div>
    <component v-else :is="column.inner"></component>
  </el-table-column>
</template>
```
![[Pasted image 20231115215628.png]]
好极了。

既然支持 h 渲染函数，能否支持导入的组件？
```javascript
const tableHeaderMapper = {
  a: {
    label: "列a",
    width: "200",
    inner: CustomButton,
```

component 也是支持的：
![[Pasted image 20231115215913.png]]

### 插槽写法
如何在 CustomColumn 的插槽中区分不同的插槽？其实也很简单，规定一个格式，使用不同的后缀即可。比如，a 列的插槽为 default-a，b 列的插槽为 default-b。我们可以使用 useSlots 读取传入 CustomColumn 中的所有插槽，并使用正则进行匹配。
```javascript
const slots = useSlots();
const slotKeys = Object.keys(slots);
for(let key of keys){
	const res = key.match(/^(\S+)-(\S+)/);
	console.log(res);
}
```
假设传入：
```html
    <CustomColumn :table-header="tableHeaderMapper">
      <template #default-a> I am slot of a </template>
    </CustomColumn>
```
输出：
```javascript
const slots = useSlots() // { 'default-a': V_node }
const slotKeys = Object.keys(slots); // ['default-a']
for(let key of keys){
	const res = key.match(/^(\S+)-(\S+)/);
	console.log(res); // ['default-a','default','a']
}
```
根据 res 的值，我们可以很快确定插槽是属于哪一列的、哪一种类型的插槽。

插槽能够区分和读取了，接下来如何插入？

试想一下我们之前是如何插入列的 inner 属性的，很快就有思路了。
```html
// CustomColumn
<template>
  <el-table-column v-for="column in newTableHeader" v-bind="column">
    <template v-for="(value, key) in column.slot" #[key]>
      <slot :name="value">
        <div v-if="column.inner && String(key) == 'default'">
          <div
            v-if="typeof column.inner == 'string'"
            v-html="column.inner"
          ></div>
          <component v-else :is="column.inner"></component>
        </div>
      </slot>
    </template>
    <!-- <div v-if="typeof column.inner == 'string'" v-html="column.inner"></div> -->
    <!-- <component v-else :is="column.inner"></component> -->
  </el-table-column>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUpdate, useSlots } from "vue";
...
const slots = useSlots();
const newTableHeader = ref<any>({});
const genNewTableHeader = () => {
  newTableHeader.value = { ...prop.tableHeaders };
  const rawAttr = prop.tableHeaders;
  for (let key in rawAttr) {
	...
    if (typeof column === "object") {
      // 设置默认的key
      ...
      // 设置默认的prop，如果该列是多选项，则不需要prop
      ...
      // 处理插槽
      const slotKeys = Object.keys(slots);
      for (let key of slotKeys) {
        const res = key.match(/^(\S+)-(\S+)/);
        // 查找不到则res为null
        if (res && res[2] == Reflect.get(column, "key")) {
          if (!Reflect.has(column, "slot")) {
            Reflect.set(column, "slot", {});
          }
          Reflect.set(Reflect.get(column, "slot"), res[1], res[0]);
        }
      }
    }
  }
  console.log(newTableHeader.value);
};
...
</script>
```
这里我们预先处理 slots，和 inner 属性类似，在渲染 column 时，如果有 inner 就渲染 inner。我们在 column 对象（column 对象位于 newTableHeaders 上）上绑定了一个 slot 属性，在渲染 column 时，如果有 slot 就渲染 slot。

兼容 inner 和 slot：因为 inner 也是渲染在 default 上，所以上面的代码需要将 inner 注释掉，以免冲突。这里我选择在 slot 存在的情况下，忽略 inner（你也可以选择其它处理方式，比如二者存在时，都渲染出来，或者存在 inner，就忽略slot）。
```html
// CustomColumn
<template>
  <el-table-column v-for="column in newTableHeader" v-bind="column">
    <template v-for="(value, key) in column.slot" #[key]>
      <slot :name="value">
        <div v-if="column.inner && String(key) == 'default'">
          <div
            v-if="typeof column.inner == 'string'"
            v-html="column.inner"
          ></div>
          <component v-else :is="column.inner"></component>
        </div>
      </slot>
    </template>
    <template v-if="!column.slot" #default>
      <div v-if="column.inner">
        <div v-if="typeof column.inner == 'string'" v-html="column.inner"></div>
        <component v-else :is="column.inner"></component>
      </div>
    </template>
  </el-table-column>
</template>
```

### 插槽作用域
在点击按钮时（修改列、删除列），我们需要得到点击对应列的信息，该信息是通过插槽作用域实现的。
```html
// CustomColumn
<template>
  <el-table-column v-for="column in newTableHeader" v-bind="column">
    <template v-for="(value, key) in column.slot" #[key]="scope">
      <slot :name="value" v-bind="scope">
        <div v-if="column.inner && String(key) == 'default'">
          <div
            v-if="typeof column.inner == 'string'"
            v-html="column.inner"
          ></div>
          <component v-else :is="column.inner"></component>
        </div>
      </slot>
    </template>
    <template v-if="!column.slot" #default>
      <div v-if="column.inner">
        <div v-if="typeof column.inner == 'string'" v-html="column.inner"></div>
        <component v-else :is="column.inner"></component>
      </div>
    </template>
  </el-table-column>
</template>
```
这里使用 template 的 ` #插槽 =“xxx” `读取了 el-table-column 提供的列信息并保存 xxx 为 scope，然后又使用 v-bind 将 scope 通过 slot 的属性传递给 CustomColumn 的使用者。
```html
// App.vue 使用scope可以读取对应的列的信息
<template>
  <CustomTable :tableData="tableData" v-loading="loading">
    <template #empty>暂无数据</template>
    <CustomColumn :table-headers="tableHeaderMapper">
    // 使用scope.$index读取该列在表格中的索引
      <template #default-a="scope"> I am slot of a {{ scope.$index }}</template>
    </CustomColumn>
  </CustomTable>
</template>
```
关于 scope 对象的取值可以查阅 Element 的文档（[Table 表格 | Element Plus](https://element-plus.org/zh-CN/component/table.html#table-column-%E6%8F%92%E6%A7%BD)）
![[Pasted image 20231115222313.png]]

## 总结
本文章通过通俗易懂、循序渐进的方法，介绍了如何对 el-table 进行基础性的二次封装，让我们使用表格的代码量减到最少的同时，又具备极高的可定制性和可维护性。同时，又在封装的过程中掌握了 v-for、v-if、v-else、v-html、v-slot 等内置的用法、属性透传和插槽的概念，如果阅读后有所收获，不妨给文章点赞，鼓励一下作者！

代码仓库地址：[Site Unreachable](https://github.com/tangqiang0605/el-table-demo)
## 参考
[列表渲染 | Vue.js](https://cn.vuejs.org/guide/essentials/list.html#v-for-with-an-object)
[模板语法 | Vue.js](https://cn.vuejs.org/guide/essentials/template-syntax.html#attribute-bindings)
[插槽 Slots | Vue.js](https://cn.vuejs.org/guide/components/slots.html)

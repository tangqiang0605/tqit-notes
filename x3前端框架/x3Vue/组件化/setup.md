

setup 是一个语法糖，script 不用 setup 时，通过 export 暴露给 template。
```
import {defineComponent} from 'vue'

export default defineComponent({
	setup(){
		onMounted(()=>{
		
		})
	}
})
```
相当于 vue 2 中的 beforeCreate 和 created。 
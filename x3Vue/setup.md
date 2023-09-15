setup 是一个语法糖
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
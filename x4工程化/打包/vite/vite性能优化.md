分包
```js
  // export default defineConfig({

    "build": {

      "minify": false,

      "rollupOptions": {

        "output": {

          "manualChunks": (id: string) => {

            if (id.includes('node_modules')) {

              // return 'vendor';

              return id.toString().split("node_modules/")[1].split("/")[0].toString();

            }

          }

        }

      }

    },
```
测试
yarn add lodash @types/lodash 
```js
/// main.ts
import { forEach } from 'lodash'
let list: Array<any> = [];

forEach(list, (item: any) => {
  console.log(item, "item")
})
```
## 项目搭建
`pnpm create vite form-c -t vue-ts`
```
pnpm install -D unplugin-auto-import unplugin-vue-components 

```


```
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";

plugins: [
  AutoImport({
    imports: ["vue"],
    dts: path.resolve("src", "types", "auto-imports.d.ts"), 
  }),
  Components({
    dts: path.resolve("src", "types", "components.d.ts"), 
  }),
]
```
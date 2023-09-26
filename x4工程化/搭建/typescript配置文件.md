## 参考文章
[手把手教你用Rollup构建一个前端个人工具函数库 摇树优化 一键生成文档站点 - 掘金](https://juejin.cn/post/7245584147456426045?searchId=202308051032531AC551C83198476C662C#heading-7)
```
{
  "compilerOptions": {
    "allowJs": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "noEmit": true,
    "resolveJsonModule": true,
    "forceConsistentCasingInFileNames": true,
    "sourceMap": true,
    "strict": true,
    "target": "esnext",
    "isolatedModules": true,
    "useDefineForClassFields": true,
    "jsx": "preserve",
    "lib": [
      "esnext",
      "dom"
    ],
    "baseUrl": ".",
    "paths": {
      "src/*": [
        "src/*"
      ]
    }
  },
  "exclude": [
    "dist",
    "node_modules"
  ]
}

```
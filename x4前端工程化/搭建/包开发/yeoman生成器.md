https://juejin.cn/post/7196852501190082616#heading-5
[使用Yeoman快速搭建项目脚手架 - 掘金](https://juejin.cn/post/7011437760812679181?searchId=202308020000564D2F80EBEC7ECF4493F7)
https://juejin.cn/post/7195080019394166842?searchId=20230714154025B430F5598F9D2735BFC9#heading-8
这个
1. 建
2. 作为模板
- 编译 tsc
- 运行测试 jest
- 格式检查 eslint、格式修复 prettier
- 仓库规范：husky+lint-staged+commitlint

```
pnpm install -D eslint-plugin-node eslint-plugin-prettier eslint-config-prettier eslint-plugin-node @babel/eslint-parser
```

1. 修改 ignore。coverage
2. 修改 packagejson，去掉 git add
3. 
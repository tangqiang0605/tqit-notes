## 配置清单
- 编译 tsc
- 运行测试 jest
- 格式检查 eslint、格式修复 prettier
- 仓库规范：husky+lint-staged+commitlint

## 步骤
pnpm init
package. json
```json
"main": "dist/index.js",
"types": "dist/types/index.d.ts",
"type": "module",
"lint-staged": {
"**/*.{js,jsx,tsx,ts}": [
  "pnpm lint",
  "git add ."
]
},
"scripts": {
"lint": "eslint src --ext .js,.ts --cache --fix",
"test:tsc": "pnpm build && node dist/index.js",
"dev": "tsc --watch",
"build": "tsc src/index",
"prepare": "husky install",
"test:c":"jest --coverage"
},
```

安装 tsc
pnpm i typescript -D
npx tsc --init
```js
  rootDir: ./src// 1
  module: esnext// 0
  outDir: ./dist// 3
  declaration: true
  sourceMap:true
  declarationDir: ./dist/types
  moduleResolution: node// 0
  }
  include: src// 2
```
测试 pnpm build
```js
/// src/index.ts
const calc = (a: number, b: number) => {
  return a - b
}
console.log(calc(1024, 28))
export default calc;
```

安装jest
```
pnpm i jest @types/jest ts-node@9.1.1 ts-jest -D
```
npx jest --init
配置 jestconfigts
preset: 'ts-jest'
测试 pnpm test
```js
/// __tests__/calc.spec.ts
import calc from '../src'
test('The calculation result should be 996.', () => {
  expect(calc(1024, 28)).toBe(996)
})
```

安装 eslint、prettier
![image-20230316225832877](C:\Users\taipanlan\AppData\Roaming\Typora\typora-user-images\image-20230316225832877.png)
pnpm i eslint prettier eslint-config-prettier eslint-plugin-prettier -D
新建. prettier. json
{
  "semi":true
}
npx eslint --init
eslintrc. cjs
extends、plugins 尾增 prettier
rules 新增"prettier/prettier": "error"
测试 pnpm lint

初始化 git 仓库
新建 gitignore
node_modules
dist
.eslintcache
coverage

pnpm i husky @commitlint/config-conventional @commitlint/cli lint-staged -D
npx husky install
npx husky add .husky/pre-commit "npx --no -- lint-staged"
npx husky add .husky/pre-commit "pnpm test"
npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'

创建. commitlintrc，并写入配置
```js
{
  "extends": [
    "@commitlint/config-conventional"
  ]
}
```
测试
提交暂存未通过 lint 的代码
提交暂存不包含不过 lint 的代码
提交暂存不包含不过 lint 的代码，规范提交 feat
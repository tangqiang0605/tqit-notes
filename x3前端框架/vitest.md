```
pnpm i vitest -D
```

test/index. spec. ts

npx vitest
```
配置
tsconfig.ts
增加tests/*路径
types:[vitest/globals]
vite.config.ts
配置
/// <reference types="vitest" />
{test:{globals:true}}
```

1. 报错。路径写错了。正确路径"../src/components/aaa.vue"

## Component Test
安装@vue/test-utils -D、jsdom -D
```
配置vite
{
	test:{
		environment:'jsdom'
	}
}
```
示例
```
import comp from "../src/components/aaa.vue";
import { mount } from "@vue/test-utils";
test("equal", () => {
  const wrapper = mount(comp);
  expect(wrapper.text()).toContain("hello");
});

```
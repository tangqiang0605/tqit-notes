
tsconfig 的 extends 字段可以直接写 npm 包名，使用其 tsconfig。

可以参考的库[Site Unreachable](https://github.com/tsconfig/bases/)

参考开发：[解读TSConfig | 编程时光](https://www.coding-time.cn/ts/advance/%E8%A7%A3%E8%AF%BBTSConfig.html#%E5%AE%9A%E5%88%B6%E5%8C%96tsconfig-base)

注意：
1. 测试时要把测试项目的 tsconfig 清空，因为其配置会覆盖 extends 的。
2. 包不应该包含路径，不然生成的是在包所在的 tsconfig 的路径下。

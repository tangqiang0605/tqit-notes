## 如何调用
1. 如果是全局包，通过其注册的 bin 命令进行调用。
2. 如果是开发依赖，需要添加 npx 前缀或者先写在 scripts 中然后使用 npm run 调用对应的脚本。
3. 来自依赖的脚本命令可以用 `npm explore <pkg> -- npm run <stage>` 运行。
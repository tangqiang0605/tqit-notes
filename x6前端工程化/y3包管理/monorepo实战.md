本篇系[从0开始使用pnpm构建一个Monorepo方式管理的demo - 掘金](https://juejin.cn/post/7115058575801581605)的笔记。

## 搭建 monorepo
1. 初始化项目。
2. 创建 pnpm-workspace. yaml 文件。
```
packages:
	- 'packages/**'
```
3. 子项目 packagejson：切换到子项目进行初始化和下载。
4. 或者使用 filter：`pnpm -f <package_selector> <command>`
```shell
pnpm -F @packages/components add lodash
# @*默认最新版本
pnpm -filter @packages/components add @packages/utils@*
```
对应的 package
```
{
	"dependencies":{
		"lodash":"^4.17.21",
		"@packages/utils":"workspace: *",
	}
}
```
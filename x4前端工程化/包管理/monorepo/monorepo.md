1. 项目可能涉及到多个仓库。
2. 传统 MultiRepo 用于多仓库开发存在弊端。
3. 新的项目管理方式 monorepo 可以解决这个问题。

传统的 MultiRepo 模式，即每个项目对应一个单独的仓库来分散管理。
Monorepo 把多个项目放在一个仓库里面。根目录放置 packagejson 和 packages 各个子仓库。

## MultiRepo 之痛
1. 代码复用。
	1. 多个项目 copy 同一份代码。
	2. 抽取为 npm。但是步骤麻烦。小修改就要重新发布安装。
2. 版本管理：多个项目依赖某个工具包，工具包更新，有的项目也更新，有的没有更新。问题：更新不及时。
3. 项目基建：每个项目都要自己的基建。而且可能构建、部署和发布的规范不同。

## Monorepo 收益
1. 工作流的一致性。一处改动，其它项目立马更新。
2. 复用同一套基建。

## Monorepo 落地
1. 在实际场景来落地 Monorepo，需要一套完整的工程体系来进行支撑。因为基于 Monorepo 的项目管理，绝不是仅仅代码放到一起就可以的，还需要考虑项目间依赖分析、依赖安装、构建流程、测试流程、CI 及发布流程等诸多工程环节，同时还要考虑项目规模到达一定程度后的性能问题，比如项目构建/测试时间过长需要进行增量构建/测试、按需执行 CI 等等，在实现全面工程化能力的同时，也需要兼顾到性能问题。
2. 比较底层的方案比如 lerna，封装了 Monorepo 中的依赖安装、脚本批量执行等等基本的功能，但没有一套构建、测试、部署的工具链，整体 Monorepo 功能比较弱，但要用到业务项目当中，往往需要基于它进行顶层能力的封装，提供全面工程能力的支撑。
3. 当然也有一些集成的 Monorepo 方案，比如 nx (官网写的真心不错，还有不少视频教程)、rushstack，提供从初始化、开发、构建、测试到部署的全流程能力，有一套比较完整的 Monorepo 基础设施，适合直接拿来进行业务项目的开发。不过由于这些顶层方案内部各种流程和工具链都已经非常完善了，如果要基于这些方案来定制，适配和维护的成本过高，基本是不可行的。

## npm workspace
workspace 是 monorepo 的基础
```
// package.json
{
	"workspace":[
		"packages/module-a",
		"packages/module-b"
	]
}
```
安装依赖到某个包
```
npm install lodash -w react-app
npm install
```
运行某个 package 的命令
```
在module下运行test
npm run test --worksapces=module-a
```
全局运行所有包的命令
```
npm run test --workspace
npm run test -w
yarn workspaces run test
```

## pnpm workspace
```
// pnpm-workspace.yaml
packages:
	- 'packages/*'
	- 'component/**'
	- '!**/test/**'
```

## 版本管理
当一个被多个包使用的包修改时，这些使用该包的包都需要修改对于这个包引用的最新版本，比较麻烦。版本的自动管理 lerna/changeset。
lerna 包含了 workspace 的部分功能（安装依赖），同时也包含版本的管理

changeset 不仅包含了版本的管理，同时也会生成修改日志，这对于一个好用的 npm package 来说至关重要。pnpm 在官网就推荐使用 changeset

## 任务管理
nx 或 turborepo 是通过什么机制实现运行任务时间加速呢？

本地缓存：如果 package 运行过一次，并且这个 package 所依赖的 package 都没有发生过任何改动，那么基本可以断定这个 package build 的结果也不会发生变化，直接采用上次 build 结果这样就实现了执行任务的加速

共享缓存：nx 或 turborepo 都支持将构建的结果上传只云端，这样如果同事小强如果曾经构建过某个 package，并且我没有任何改动，那么我就无需重新构建，nx/turborepo 会自动从云端下载缓存供我使用

作者：Focusbe
链接： https://juejin.cn/post/726187789305667642 
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
## 最简单的 monorepo 教程
1. 安装 pnm
2. 使用 pnpm 初始化和安装依赖
3. 配置 pnpm-orkspace. yaml 文件（核心）
4. 打开对应的目录安装赖

## 参考
神三元的[现代前端工程为什么越来越离不开 Monorepo? - 掘金](https://juejin.cn/post/6944877410827370504)
npm 的架构是什么呢？
他的嵌套结构是如何发生的呢？
他的缓存机制是什么呢？
在执行 npm install 的过程中又发生了什么呢？

名词：
A 的依赖 B。安装了 A，会安装 B。

## 版本
nvm 可下载最低版本 0.9.10
![[Pasted image 20230726161035.png]]

## 依赖结构
### 嵌套结构
v1v2 采用了直接的嵌套结构。
1. 简单
2. 结构清晰
3. 解决了不同版本的嵌套冲突
产生问题：
1. Dependency Hell 问题：重复安装（相同子节点）
2. 层级过深，甚至超出操作系统的处理范围。
其它问题：
1. SemVer 版本管理使得依赖的安装不确定
2. 缓存能力存在问题，且无离线模式

### 扁平化
1. hoist 机制提升顶级依赖。

存在问题：
1. 幽灵依赖：依赖的依赖可以被使用，但是根 packagejson 并没有记录。比如我的项目使用了 arco，但是 arco 的子依赖有 dayjs，那么根据扁平化，dayjs 就会被放在 node_modules 的首层。
2. 依赖分身：依赖的某个版本已经被提升，剩下的其它版本无法提升
3. 依赖不幂等：不确定性，安装顺序不同，提升的依赖的版本也不同。导致产生结构问题。（在没有 packagelockjson 的情况下，根据字典序安装）

### 锁文件
1. v 3 解决依赖不幂等的问题的方法：npm-shrinkwrap.json 文件。
2. 受 yarn 启发，v 5 设计了 package-lock. json 文件。
3. ![[Pasted image 20230726111016.png]]
integrity 是本包的 hash 值。
依赖在 requires，如果没有被提升，也会出现在 dependencies 中。

## npm cache
1. pacote 子系统：获取包的元数据，查找缓存，下载安装。
2. make-fetch-happen 子系统：v 5 开始。

# yarn
1. 通过 packagejson 可找到顶层依赖和 semVer 版本名
2. 通过
# pnpm
1. 解决了幽灵依赖、依赖分身、节省空间。
2. 在不支持软链接的环境中，无法使用 pnpm，比如 Electron 应用。
### hard link
hard link 使得用户可以通过不同的路径引用方式去找到某个文件。hard links 指通过索引节点来进行连接。删除其中任何一个都不会影响另外一个的访问。
pnpm 会在全局 store 里存储硬链接，不同的项目可以从全局 store 寻找到同一个依赖，大大地节省了磁盘空间。

Symbolic link 也叫软连接，可以理解为快捷方式。删除文件会影响 symlink 的内容，文件删除后再恢复内容，但是仍然会和 symlink 保持同步，链接文件甚至可以链接不存在的文件，这就产生一般称之为”断链”的现象。

执行 pnpm install。你会发现它打印了这样一句话：包是从全局 store 硬连接到虚拟 store 的，这里的虚拟 store 就是 node_modules/. pnpm。也就是将包复制到项目下。

node_modules 下是树状结构，而. pnpm 是扁平化的。

## 参考
[彻底了解npm——架构、进化史及原理解析 - 掘金](https://juejin.cn/post/7245201923506094140?searchId=20230725213536392558E1A4B81F242684)
[📓 聊聊依赖管理 - 掘金](https://juejin.cn/post/7196635893971877948?from=bytetech)
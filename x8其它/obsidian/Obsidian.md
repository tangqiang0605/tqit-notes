

简称 ob。


移动文件夹到根目录（拖拽到仓库名那里）


## 基础操作
分屏：右键标签
新建文件：右键目标位置。
新建笔记：ctrl+p：日记
ctrl+p：仓库：打开其他仓库
ctrl+p：日记：创建或打开日记
ctrl+l：生成代办 or 划掉代办

## 为什么是obsidian
迁移容易：打开其他仓库、右键仓库在资源文件管理器中显示。可以看到每个 obsidian 仓库的文件结构：md 文件和 obsidian 的配置文件。obsidian 以仓库（工作区）为单位，有单独的配置文件夹，这使得仓库内容转移到其他平台都非常方便。

Obsidian 是本地化的，但是配合 github/gitee，可以很方便地实现云端储存。

安装包小。中文。免费。界面精美的 markdonw 编辑器。启动速度快。比 typora 舒适的换行效果。

特色功能
1. 无限层级文件夹
2. 标签系统
3. 特色功能：双向链接。适合碎片信息记录。
4. 花里胡哨的关联图

缺点
2. 无法对文件夹进行排序。通过添加一个导航文件来弥补。（或者插件？）
3. 打开文件不是在新标签页打开而是覆盖原来打开的文件。。。

## 

## 仓库配置

不同的仓库的配置不同。新仓库都是使用默认配置。不同仓库的设置是隔离的。使用其他仓库的配置，可以将仓库的配置文件夹覆盖默认配置的文件夹。

常用配置：

文件与链接：设置新文件放在未整理的笔记文件夹中。设置图片、附件在附件文件夹中。



## 仓库插件
幻灯片（自带）用于将文件转换为 ppt 展示。用法：三个减号作为分割线。右上角、开始展示。

style settings 配合 blut topaz 主题。

easy typing 转化中英文输入十分方便。

emoji toolbar 使用快捷键（这里我设置为 Ctrl+U）来输入不常用的表情。使用 emoji shortcodes 来使用记得名字的常用表请😀原来就有冒号加表情名称的用法，但是没有提示。emoji toolbar 更常用，因为搜索更准。

mdx as md 用来查看和编辑 mdx 文件。需要打开设置：文件与链接，检查所有类型文件。

advance table 用于快速创建表格。输入竖线创建表格，按 tab 创建新列，回车创建新行。

## 常见问题
1. 无法移动过大的文件夹到另一个文件夹中。
原因：
可以移动。只是使用不熟练。
解决方法：或使用文件资源管理器。

2. 无法访问社区、使用主题下载、插件下载等功能。
[不需要VPN与翻墙，完美解决obsidian无法加载第三方插件（社区插件）的问题 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/430538023)

下载 [juqkai/obsidian-proxy-github (gitee.com)](https://gitee.com/juqkai/obsidian-proxy-github) zip 包并放在仓库. obsidian/plugins 下。改名为 proxyGithub。重启 obsidian 并在第三方插件开启即可。

[解决Obsidian粘贴代码时自动添加空行的问题\_Stay--hungry的博客-CSDN博客](https://blog.csdn.net/Shao_yihao/article/details/128481770)：设置，编辑器，高级，关闭自动转换 HTML。

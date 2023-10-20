## 环境配置
### 安装
linux
```shell
$ sudo apt-get install git
$ git
```
编译安装：
1. 下载源码。2. 解压。3. 配置。4. 编译。5. 安装。

mac
1. 使用 homebrew（需先安装）
2. 安装 Xcode（内部集成了 Git）

windows：
1. 安装 exe 并配置环境变量。

## 配置
```
$ git config --global user.name "Your Name"
$ git config --global user.email "email@example.com"
```

## 创建仓库
```
git init
```

跟踪：
1. 只能跟踪文本文件。使用 utf-8 编码而不是中文的 GBK。
2. word 是二进制的，所以无法跟踪改动。
> 千万不要使用 Windows 自带的记事本编辑任何文本文件。使用了一个非常弱智的行为来保存 UTF-8编码的文件，他们自作聪明地在每个文件开头添加了0xefbbbf（十六进制）的字符，你会遇到很多不可思议的问题，比如，网页第一行可能会显示一个“?”，明明正确的程序一编译就报语法错误，等等，都是由记事本的弱智行为带来的。
## 参考
[创建版本库 - 廖雪峰的官方网站](https://www.liaoxuefeng.com/wiki/896043488029600/896827951938304)

## 版本管理
版本提交
1. git add
2. git commit

当前版本状态
1. git diff 文件名
0. git status（分支、未 commit 以及类别、add）

版本历史
1. git log（id、作者、日期、message）
2. git reflog 查看命令历史

版本回退
1. git reset --hard HEAD~ or commitid
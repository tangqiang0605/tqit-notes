## 概念
四个位置：远程仓库、本地仓库、工作区 working tree、暂存区 index。
Head 指针：指向节点、指向分支
分支名：一般由两部分构成，feature/featurename。

## 初始化
```
安装git
git init
git remote add origin
git config --global user.name ''
git config --global user.email ''
ssh-keygen -t rsa -C 'email'
cd ~/.ssh
复制id_rsa.pub的内容到git库的sshkeys中
windows查看ssh-key /c/Users/frank/.ssh/id_rsa.pub

查看信息，可以使用git remote -v查看origin代表的地址。
git remote -v
命名origin
git remote rename old new

git pull
```
## 命令
重新提交
git commit --amend

```
git help
git help -a

状态
git status
git reflog 所有commit记录包括撤回的
git log
git log --oneline 简洁的commit记录
git log -n2 --oneline 最近的2次简洁的commit记录
git log --all 所有分支的历史版本信息
git log --graph 图形化查看版本演进历史
git log --oneline --all -n4 --graph 组合查看日志
git add
git commit
git checkout --filename 撤销工作区修改
git reset HEAD 撤销暂存区，内容仍在。
清除缓存区中的文件 git reset octofamily/octodog.txt


配置
git config --list
git config --local --list
git config --global --list
git config --system --list
git config --global key value
git config --global user.name 'your name'
git config --global user.email 'your email'

分支
git branch：查看本地分支
git branch -r： 查看远程分支
git branch -a：查看本地和远程分支
git checkout <branch-name> 切换分支
git checkout -b <branch-name> 新建并切换分支
git branch -d <branch-name> 删除分支
git merge <brance-name> 合并分支到当前分支
略 查看哪些分支已合并到当前分支
git branch -v 查看各个分支最后一个提交对象的信息
git push origin -d <branch-name> 删除远程分支
git branch -m oldname newname 修改分支名

远程仓库
git fetch origin remotename:localname
git fetch
git pull <远程主机名> <远程分支名>:<本地分支名>
git pull --rebase <远程主机名> <远程分支名>:<本地分支名>
设置远程仓库地址
git remote set-url origin git@foo.bar.com:baz/helloworld.git
本地创建了新分支，但是orgin没有，push代码前
git push --set-upstream origin preproduction

暂存
git stach
git stach save -a 'message'
git stach list、clear、apply、pop、drop

rebase

```
### rebase 回退
手动解决冲突，然后使用依次 git add  、git rebase --continue  的方式来处理冲突，完成 rebase 的过程，如果不想要某次 rebase 的结果，那么需要使用 git rebase --skip  来跳过这次 rebase 操作。
```
git reset --(soft | mixed | hard )  < HEAD ~(num) > | 

--hard回退全部，包括HEAD，index，working tree

也就是所有状态都回到以前。

--mixed回退部分,包括HEAD，index

？

--soft只回退HEAD。工作区内容不变。缓存区仍在。这使您的所有更改的文件更改为“要提交的更改”。会将该 commit 到最近一次 commit 的所有修改内容全部恢复，而不是只针对该 commit。

只要不变工作区就没什么问题了。
```
rebase 的交互式模式可以把已经发生的多次提交压缩成一次提交，得到了一个干净的提交历史[我在工作中是如何使用 git 的 - 掘金](https://juejin.cn/post/6974184935804534815?utm_source=ug_by_post#heading-13)
```
git rebase -i <base-commit>

```

```
比较工作区与缓存区

git diff


比较缓存区与本地库最近一次commit内容

git diff -- cached


比较工作区与本地最近一次commit内容

git diff HEAD


比较两个commit之间差异

git diff

作者：TianTianUp
链接：https://juejin.cn/post/6869519303864123399
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
```

revert
有一天测试突然跟你说，你开发上线的功能有问题，需要马上撤回，否则会影响到系统使用。这时可能会想到用 reset 回退，可是你看了看分支上最新的提交还有其他同事的代码，用 reset 会把这部分代码也撤回了。

## 短命令
```
vim ~/.gitconfig
[alias] 
        co = checkout
        ps = push
        pl = pull
        mer = merge --no-ff
        cp = cherry-pick

```
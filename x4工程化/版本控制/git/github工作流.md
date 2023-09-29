[十分钟学会正确的github工作流，和开源作者们使用同一套流程_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV19e4y1q7JJ)



1. 创建github仓库
2. git clone https，克隆到本地
3. git checkout -b xxxfeature，新建分支，开始修改代码
4. 修改代码
5. git diff，查看改变（建议）
6. git add .（可以只添加想要上传的文件）
7. git commit -m “add xxxfeatrue”
8. git push origin xxxfeature，上传分支
9. git checkout main
10. 远程main代码没有更新，执行14步。
11. git pull origin master，获取master分支的最新代码。
12. git rebase main，优先使用main分支的代码，可能出现rebase confict。rebase成功后我们的xxxfeature分支变为最新代码基础上的xxxfeature。
13. git push -f origin xxxfeature，push到xxxfeature分支上
14. pull request，接受管理者审查，提交到master分支。
15. sqush and merge，将该提交的所有commit合并为一个，简化主分支上的commit数量。
16. （远端）删除xxxfeature，我觉得可以留着，但是不要动他了。
17. （本地）删除分支，git branch -D xxxfeature。
18. git pull origin master，获取主分支最新代码
19. 继续开发新功能，第3步。

[Git工作流和核心原理 | GitHub基本操作 | VS Code里使用Git和关联GitHub_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1r3411F7kn)

0. 安装git，配置git信息，git config --global user.name ""，git config --global user.email 不带引号的邮箱地址。

1. 创建github仓库
2. cd 到放仓库的文件夹内。
3. git clone https，克隆到本地
4. （新功能）git checkout -b xxxfeature，新建分支，开始修改代码（git branch 新分支名，git branch查看分支，创建新分支后需要checkout切过去）
5. 修改代码
6. git diff，查看改变（建议）
7. git add .（可以只添加想要上传的文件，可以用git status辅助查看）
8. git commit -m “add xxxfeatrue”（7，8可以合并为git commit -a -m ”commit something“或git commit -am ”“）
9. 可以通过git log查看commit记录，以及回溯
10. git push origin xxxfeature，上传分支
11. git checkout main
12. git fetch
13. git diff origin/mian，如果远程main代码没有更新，git checkout xxxfeature，执行17步。
14. git pull origin master，获取master分支的最新代码。
15. git checkout xxxfeature，git rebase main，优先使用main分支的代码，可能出现rebase confict。rebase成功后我们的xxxfeature分支变为最新代码基础上的xxxfeature。
16. git push -f origin xxxfeature，push到xxxfeature分支上
17. pull request，接受管理者审查，提交到master分支。
18. sqush and merge，将该提交的所有commit合并为一个，简化主分支上的commit数量。
19. （远端）删除xxxfeature，我觉得可以留着，但是不要动他了。
20. （本地）删除分支，git branch -D xxxfeature。（建议用d而不是D）
21. git pull origin master，获取主分支最新代码
22. 继续开发新功能，第3步。



创建内容为“版本1”的文件，echo "版本1" > lao.md

git remote -v查看本地与远程联系

git status

.gitignore什么时候创建？由pr决定吧？

把别的地方分支合到当前分支git merge xxxfeature

github上的主分支叫main，本地叫master

push时origin可以代替giturl

push遇到问题，github仓库设置、开发设置、个人tokens、生成tokens，note设置名字时间权限。本地push，输入用户名和tokens。
[掌握npm scripts，轻松打造高效Node.js应用开发流程 - 掘金](https://juejin.cn/post/7222282361266520125?searchId=20230803094642A049CF0106D8AA243C87) 这篇文章可以让你对 npm 脚本的了解更加全面。

使用现有的 npm 模块来消除不必要的工作。
例如，可以使用 rimraf 删除不必要的文件，live-reload 在每次修改后重新加载页面，npm-run-all 并行运行多个 npm scripts 等。

```
# 快速找到并打开 react 的文档
$ npm docs react

# 快速找到并打开 react 的仓库
$ npm repo react
```

有的同学可能会担心 node_modules 下的改动保存不下来。
这个也不是问题，可以执行下 npx patch-package  antd，会生成这样一个 patch 文件:

patch 文件里记录了你对 antd 包的改动，这个可以上传到 git 仓库，其他小伙伴拉下来再执行 npx patch-package 就会自动应用这些改动。

作者：zxg_神说要有光
链接： https://juejin.cn/post/7158430758070140942
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
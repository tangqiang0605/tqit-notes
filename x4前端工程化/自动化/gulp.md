A toolkit to automate & enhance your workflow。

## 安装
安装：
```
查看版本
gulp -v
如果没有，则执行：
npm i -g gulp
然后
npm i gulp -D
```

编写脚本：
```
//新建文件gulpfile.js
var gulp=require('gulp');
gulp.task('default',function(){
	console.log('hello,from gulp');
})
// 测试
node gulpfile.js
```

## API
gulp 只有四个简单的 api：src、task、watch、dest。

gulp 的工作原理是：获取流（src），导流（pipe）到插件进行处理，输出（dest）。

### src
``` JavaScript
gulp.src(globs\[, options\]);
```
获取流。globs 是文件匹配模式。

### dest
gulp.dest (path\[, options\])
输出流。path 是导出的文件夹。生成文件的名字是文件被获取时匹配的包括星号内容的路径名（可以使用 gulp-rename 包改变文件名）。

### task
执行任务。

### watch
文件改变时执行任务。

## 实例
1. 创建案例项目
```
mkdir gulp-demo
cd gulp-demo
gulp -v
npm i gulp -g
pnpm i gulp -D
pnpm i gulp-uglify -D
code .
```

2. 配置文件
```
// gulpfile.js
const gulp = require('gulp');
const uglify = require('gulp-uglify');

gulp.task('default', () => {
  gulp.src('hello.js').pipe(uglify({ mangle: false })).pipe(gulp.dest('dist'));
})
```

3. 生成 dist
执行命令 `gulp default`，default 为任务名。可以查看 gulp-uglify 对文件进行了压缩。

参考：
1. [前端构建工具 GulpJS 快速入门指南 (baidu.com)](https://baijiahao.baidu.com/s?id=1710296849580950050&wfr=spider&for=pc)
2. https://mp.weixin.qq.com/s/96epdiDA9ovUBfz9mFN3zg
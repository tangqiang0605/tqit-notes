选择 terser 的原因有两点：

uglify-es 不再维护，而 uglify-js 不支持 ES 6+，这一点在上一篇教程中我们已经看到了，rollup-plugin-uglify 就是基于 uglify-js，所以它不能够支持 ES6语法；
terser 是 uglify-es 的一个分支，它保持了与 uglify-es 和 uglify-js@3 的 API 及 CLI 的兼容。

作者：Sam
链接： https://www.imooc.com/article/264075
来源：慕课网
本文原创发布于慕课网，转载请注明出处，谢谢合作

## CLI模式
```
npm i -g terser

terser dist/index-cjs.js

terser -c -m -o dist/index-cjs.min.js -- dist/index-cjs.js
```
各参数的含义如下：

-c / --compress：对代码格式进行压缩
-m / --mangle：对变量名称进行压缩
-o / --output：指定输出文件路径

## API 模式
```
npm i -D terser

terser.minify(code,options)
```
作者：Sam
链接： https://www.imooc.com/article/264075
来源：慕课网
本文原创发布于慕课网，转载请注明出处，谢谢合作
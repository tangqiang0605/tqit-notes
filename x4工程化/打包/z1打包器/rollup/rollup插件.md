来自 [《高阶前端指北》之随手写TS插件（3分钟到精通） - 掘金](https://juejin.cn/post/7128010734008533028?searchId=2023080311220012C4A9AB3B64E82E6B1D)
注意去看要下载的包和配置
tslib 是@rollup/plugin-typescript 需要的依赖
```
import ts from 'rollup-plugin-typescript2';
// 将json 文件转换为ES6 模块
import json from '@rollup/plugin-json';
// 在node_模块中查找并绑定第三方依赖项
import resolve from '@rollup/plugin-node-resolve';
// 将CommonJS模块转换为ES6
import commonjs from '@rollup/plugin-commonjs';
// rollup babel插件
import babel from 'rollup-plugin-babel';
// 优化代码压缩
import { terser } from 'rollup-plugin-terser';

可尝试
// 代码检查
import { eslint } from "rollup-plugin-eslint";
import dts from 'rollup-plugin-dts';
// 清除目录工具
import clear from "rollup-plugin-clear";

不需要
// 加载样式文件
import styles from 'rollup-plugin-styles';
// 热更新服务
import livereload from 'rollup-plugin-livereload';
// 开发服务器
import serve from 'rollup-plugin-serve';
```
[Vue 中动态引入图片为什么必须是 require (qq.com)](https://mp.weixin.qq.com/s/d6L9UXpuZn7skiL-ROlBJA) 写的不好。

在 vue 中，属性值通过静态绑定，或者通过动态绑定（v-bind）。

vue-cli（webpack）
动态添加图片指通过 v-bind 绑定引入图片地址，在编译时使用原值，和被编译过后的资源文件地址不一致，从而无法正确引入资源。

而静态绑定编译后会被 webpack 识别转为 base64 或者改用 disk 中正确的地址。在其编译过程中，所有诸如 `<img src="...">`、`background: url(...)` 和 CSS `@import` 的资源 URL **都会被解析为一个模块依赖**。

动态引入一张图片的时候，src 后面的属性值，实际上是一个变量。webpack 会根据 v-bind 指令去解析 src 后面的属性值。并不会通过 reuqire 引入资源路径。这也是为什么需要手动的添加 require。

使用 require，返回的就是资源文件被编译后的文件地址，从而可以正确的引入资源。

### 为什么使用 public 下的资源一定要绝对路径（看不懂）

答：因为虽然public文件不会被编译，但是src下的文件都会被编译。由于引入的是public下的资源，不会走require，会直接返回代码中的定义的文件地址，该地址无法在编译后的文件目录（dist目录）下找到对应的文件，会导致引入资源失败。
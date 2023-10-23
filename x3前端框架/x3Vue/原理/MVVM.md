概念
1. 视图模型双向绑定，是 model-view-viewmodel 的缩写。
2. MVC 的 controller 演变为 ViewModel
3. MVC 是 controller 操作 dom 修改视图（数据生成视图），MVVM 是 model 驱动 view 变化（通过 modelview），即数据驱动视图。

优点
1. 低耦合。和 MVC （jQuery）相比，view 不再由某个 model 去构建出来。view 相对独立。
2. 可重用性。多个 view 复用一个 model。
3. 可测试。
4. 独立开发。
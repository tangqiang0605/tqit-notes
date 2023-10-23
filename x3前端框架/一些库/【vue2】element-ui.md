#  一 安装

npm i element-ui 

mainjs配置

# 二 布局

container整体大布局header

可以用来快速布置一个后台管理系统的布局。el-aside。

layout具体布局/栅格布局

el-row里多个el-col :span="4"

el-row 

gutter间隔

type=flex开启flex布局

justify水平，配合flex如justify=“center”

align垂直

el-col 

偏移n格offset

响应式大小 xs=“8” sm=“6” md=“4” lg=“3”

# 三 图标

色彩/字体/边框/略

i标签 设置类名如class=“el-icon-edit”

``` html
<i class="el-icon-edit"></i>

设置颜色
<i class="el-icon-edit set-color">
</i>

.set-color {
	color:red;
}
```

# 四 功能按键

## 按钮

属性：disalbed/icon/type/loading/size

``` html
<el-button icon="el-icon-search"></el-button>
```

按钮组

用el-button-group套住一组按钮，视觉上更紧凑。按钮间没有边距。

## 链接

el-link

属性icon/underline/type/disabled等

# 五 表单

## 单选框

el-radio

属性：

## 多选

el-checkbox

## 输入框（


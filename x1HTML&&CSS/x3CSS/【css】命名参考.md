# 标签

bar之类的组件用小驼峰，bottomBar，sideBar

其他用连字符。

区块-容器-功能组别-元素

例子

header-navbar-li

footer-left-container-sponsor-list-li

## 使用bem命名法

组件__元素--modifier。只有需要组件才用bem，原子类应该遵从语义化。开发中用bem配合元组

```css
.block{}
.block__element{}常用
.block--modifier{}小组件
.block__element--modifier{}组件有多种样式。缩写就是bem。

.banner__btn--green
.input-form__input
```

## 区块

使用语义化标签，或div+语义化类。HTML5新增语义化标签，本质是换了名字的div。

**header头部信息** 

表示页面中一个内容区块或整个页面的标题（页面头部）

**nav导航栏** 

表示页面中导游链接部分（页面导航栏）

**aside侧边栏** 

在article之外的，与article内容相关的辅助信息（侧边栏）

**main内容区域（ie不兼容）**

**section页面分区**

表示页面中的一个内容区块（页面身体）

**article文章详情** 

表示一块与上下文无关的独立的内容

**footer底部信息** 

表示页面中一个内容区快或整个页面的脚注（页面底部）

**figure元素** 

表示一段独立的流内容，使用figcaption元素为其添加标题（第一个获最后一个子元素的位置）

**补充**

topbar/navbar

banner（swiper、ad）轮播、

service等具体模块

copyright

navigator导航

sidebar侧边栏

## 容器

容器

container、list、box、bar、group

部位

左右left、right居中wrap

功能

logo、header-list、title、video-box、serve、links、关注follw、good、联系contact、信息info

# 选择器

## css变量

命名规则：--属性-值-备注

大小：slight、small、middle、big、large、huge。

宽度：light、normal、heavy

深浅：slight、light、缺省、normal、deep、dark

次序：primary、secondary、tertiary

``` html
  --color-black-1:#343a40;
  --color-black-2:#999;
  --color-black-3:#3a3939;
  --color-black-4:#212529;
  --color-black-5:#615f5f;
  --color-black-6:#353535;
  --color-black-7:#333;
  --color-black-8:#1f1f1f;
  --color-black-9:#777;
  --color-black-10:#000;


  --color-white-1:#fff;
  --color-white-2:#f8f9fa;
  --color-blue-1:#3b5998;
  --color-blue-2:#1da1f2;
  --color-red-1:#f44336;
  --color-red-2:#ff3f34;
  --color-green-1:#05c46b;
  
  --font-size-small-1:1.2rem;
  --font-size-small-2:1.3rem;
  --font-size-small-3:1.4rem;
  --font-size-middle-1:1.5rem;
  --font-size-middle-2:1.6rem;
  --font-size-middle-3:1.7rem;
  --font-size-big-1:2rem;
  --font-size-big-2:2.2rem;
  --font-size-big-3:2.4rem;
  --font-size-large-1:2.8rem;
  --font-size-large-2:3.2rem;
  --font-size-large-3:4rem;
  --font-size-huge-1:6rem;
  
  --border-gray:1px solid #c1c0c0;
```

## 属性顺序

大小位置、height、line-height

width

positon

top

left

margin

padding

内部样式

background-color

color

display:flex;

再细分就用字母序


[Fetching Title#63qd](https://cssgridgarden.com/)
# 子元素
## 选择某列
- grid-column-start: 选择第几列，默认是选择第一轨道 trace 即 span 1。
可填
  - 第几列的线line（正数）
  - 倒数第几列的线line（负数）
  - span n，跨越的个数

- grid-column-end:第几列
- grid-column: grid-column-start / grid-column-end ;

## 选择某行
- grid-row-start、grid-row-end、grid-row；
- **grid-area**：`grid-row-start`, `grid-column-start`, `grid-row-end`,  `grid-column-end`。grid-area是grid-column和grid-row的组合缩写。

# 父元素

- grid-template-columns:
可填
  - 占整个花园的百分比%
  - repeat(n，宽度)，minmax（最小宽度、最大宽度）
  - 带单位的值、xxpx、xxem、xxrem、xxxvh
  - fr。占比。
  - max-content、min-content
  - auto-fill，repeat（auto-fill，100px)根据大小分为n份，比如在1000px下，分为10份，300px时分为3份。auto-fit则会将其中多余的未使用的网格宽度设为0.
- grid-template-rows;
- **grid-template**：grid-template-columns / grid-template-rows;

示例：repeat（auto-fit，minmax（200px，1fr））

其他游戏 https://codepip.com/games/flexbox-froggy/





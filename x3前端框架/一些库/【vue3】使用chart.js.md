# 【vue3】使用chart.js

## 介绍与安装

一个美观的、开源的、基于canvas标签的、响应式的、可定制的图表绘制工具。

- 了解chartjs：[Chart.js | Open source HTML5 Charts for your website](https://www.chartjs.org/)
- 了解canvas标签：[【vue3】使用canvas-CSDN博客](https://blog.csdn.net/weixin_46590928/article/details/127358493)

安装

- npm：`npm i chart.js`

- 其他方式：[Chart.js 安装 | 菜鸟教程 (runoob.com)](https://www.runoob.com/chartjs/chartjs-install.html)



## 在Html文件中使用chartjs

1、导入

```html
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
```

2、使用canvas标签

``` html
<canvas id="myChart"></canvas>
```

3、配置表格（复制粘贴即可，先略过）

``` html
<script>
  const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
  ];

  const data = {
    labels: labels,
    datasets: [{
      label: 'My First dataset',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: [0, 10, 5, 2, 20, 30, 45],
    }]
  };

  const config = {
    type: 'line',
    data: data,
    options: {}
  };
</script>
```

4、使用表格

```html
<script>
  const myChart = new Chart(
    document.getElementById('myChart'),
    config
  );
</script>
```

5、全部代码（在桌面创建后缀为html的文件，右键用记事本打开，将下面内容复制粘贴进去并保存，右键用浏览器打开）

``` html
<canvas id="myChart"></canvas>

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script>
  const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
  ];

  const data = {
    labels: labels,
    datasets: [{
      label: 'My First dataset',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: [0, 10, 5, 2, 20, 30, 45],
    }]
  };

  const config = {
    type: 'line',
    data: data,
    options: {}
  };

  const myChart = new Chart(
    document.getElementById('myChart'),
    config
  );
</script>
```

6、构造函数Chart的参数树

## 在vue3中使用chartjs




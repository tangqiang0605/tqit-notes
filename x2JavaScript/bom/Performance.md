[Performance API: 提升网页性能的利器 | 编程时光](https://www.coding-time.cn/js/perf/%E6%8F%90%E5%8D%87%E7%BD%91%E9%A1%B5%E6%80%A7%E8%83%BD%E7%9A%84%E5%88%A9%E5%99%A8.html#%E5%BC%95%E8%A8%80)

可以帮助我们了解网页加载的时间、资源的使用情况、代码执行的性能等关键指标。

常用的 Performance API 属性：

navigation：提供了与导航相关的性能指标，如页面加载时间、重定向次数、响应时间等。
timing：提供了与页面加载和资源加载相关的性能指标，如 DNS 查询时间、TCP 连接时间、DOM 解析时间等。
memory：提供了与内存使用情况相关的性能指标，如内存限制、已使用内存、垃圾回收次数等。
navigationTiming：提供了更详细的页面加载时间指标，如重定向时间、解析 DOM 树时间、首次渲染时间等。
Performance API 还提供了一些方法，用于测量和记录时间戳、添加标记、计算代码执行时间等。

```
const startTime = performance.now();

// 执行一些耗时的操作

const endTime = performance.now();
const executionTime = endTime - startTime;

console.log(`代码执行时间: ${executionTime} 毫秒`);

performance.mark('start');
// 执行一些操作
performance.mark('end');

performance.measure('操作耗时', 'start', 'end');
const measurements = performance.getEntriesByName('操作耗时');
console.log(`操作耗时: ${measurements[0].duration} 毫秒`);

```
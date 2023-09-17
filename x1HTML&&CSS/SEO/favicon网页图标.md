最简单的方法：
```
<link rel="icon" href="favicon.ico" type="image/x-icon" />
```

自适应图标：
```
<!-- 含有高分辨率 Retina 显示屏的第三代 iPad：-->
<link
  rel="apple-touch-icon-precomposed"
  sizes="144x144"
  href="https://developer.mozilla.org/static/img/favicon144.png" />
<!-- 含有高分辨率 Retina 显示屏的 iPhone：-->
<link
  rel="apple-touch-icon-precomposed"
  sizes="114x114"
  href="https://developer.mozilla.org/static/img/favicon114.png" />
<!-- 第一代和第二代 iPad：-->
<link
  rel="apple-touch-icon-precomposed"
  sizes="72x72"
  href="https://developer.mozilla.org/static/img/favicon72.png" />
<!-- 不含高分辨率 Retina 显示的 iPhone、iPod Touch 和 Android 2.1+ 设备：-->
<link
  rel="apple-touch-icon-precomposed"
  href="https://developer.mozilla.org/static/img/favicon57.png" />
<!-- 基本 favicon -->
<link
  rel="icon"
  href="https://developer.mozilla.org/static/img/favicon32.png" />
```

如果你的网站使用了内容安全策略（Content Security Policy，CSP）来增加安全性，这个策略会应用在 favicon 图标上。如果你遇到了图标没有被加载的问题，你需要确认 [`Content-Security-Policy`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Security-Policy) 响应头的 [`img-src` 指令 (en-US)]( https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/img-src "Currently only available in English (US)") 没有阻止访问图标。

## 参考
[meta：元数据元素 - HTML（超文本标记语言） | MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/meta)
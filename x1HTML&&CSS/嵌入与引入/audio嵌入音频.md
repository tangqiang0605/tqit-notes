## 音频

[`<audio>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/audio) 标签与 [`<video>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/video) 标签的使用方式几乎完全相同，有一些细微的差别。音频播放器所占用的空间比视频播放器要小，由于它没有视觉部件 — 你只需要显示出能控制音频播放的控件。-   [`<audio>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/audio) 标签不支持 `width` / `height` 属性 — 由于其并没有视觉部件，也就没有可以设置 `width` / `height` 的内容。
-   同时也不支持 `poster` 属性 — 同样，没有视觉部件。

除此之外，`<audio>` 标签支持所有 `<video>` 标签拥有的特性

```
<audio controls>
  <source src="viper.mp3" type="audio/mp3">
  <source src="viper.ogg" type="audio/ogg">
  <p>你的浏览器不支持 HTML5 音频，可点击<a href="viper.mp3">此链接</a>收听。</p>
</audio>
```

```
<audio>音频标签
标签写法：< audio  src="音频路径" ></audio>
<audio>标签的作用：网页的音频播放器
常用属性：
① src 表示音频路径
②controls 表示显示播放的控件 (如果有自动播放可以不要插件，表背景音乐)
③ autoplay 表示自动播放（部分浏览器不支持）
④loop 表示循环播放
⑤音频标签目前支持三种格式：mp 3, wav, Ogg, muted 静音
```

## 参考
[视频和音频内容 - 学习 Web 开发 | MDN](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Multimedia_and_embedding/Video_and_audio_content)
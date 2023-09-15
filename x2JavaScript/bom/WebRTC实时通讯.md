## 学习材料
[WebRTC 从实战到未来！迎接风口，前端必学的技术🔥 - 掘金](https://juejin.cn/post/7151932832041058340?utm_source=ug_by_post)

## 概念
WebRTC (Web Real-Time Communications) 是一项实时通讯技术，它允许网络应用或者站点，在不借助中间媒介的情况下，建立浏览器之间点对点（Peer-to-Peer）的连接，实现视频流和（或）音频流或者其他任意数据的传输。

WebRTC 只能在 HTTPS 协议或者 localhost 下使用，如果是 HTTP 协议，会报错。

## 媒体流
媒体流可以是来自本地设备的，也可以是来自远程设备的。媒体流可以是实时的，也可以是非实时的。我们可以通过摄像头，麦克风，屏幕共享等方式获取到媒体流，然后通过 WebRTC 技术将媒体流传输到远端实现实时通讯。

我们主要通过 `navigator.mediaDevices.getUserMedia(constraints)` 这个 api 来获取媒体流，这个方法接收一个配置对象作为参数，配置对象中包含了媒体流的类型，以及媒体流的分辨率等信息。

```
// 获取本地音视频流
async function getLocalStream(constraints: MediaStreamConstraints) {
  // 获取媒体流
  const stream = await navigator.mediaDevices.getUserMedia(constraints)
}

使用媒体流
videoEl.srcObject = stream

从dom获得流
video.captureStream(30)
```

## 案例
[WebRTC 从实战到未来！迎接风口，前端必学的技术🔥 - 掘金](https://juejin.cn/post/7151932832041058340?utm_source=ug_by_post#heading-5)
```
canvas绘制
ctx.drawImage(dom元素,...位置)
ctx.filter=滤镜:string
```
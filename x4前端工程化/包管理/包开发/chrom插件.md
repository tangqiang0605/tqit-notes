[coding-time-chrome: 全网最详细的谷歌插件开发小册 - Gitee.com](https://gitee.com/linwu-hi/coding-time-chrome/tree/main/)
## 参考资料
Chrome 开发者文档 - Chrome 官方提供的开发者文档，包含了全面的插件开发指南和 API 参考。[Gitee.com](https://gitee.com/link?target=https%3A%2F%2Fdeveloper.chrome.com%2Fdocs%2Fextensions%2Fmv3%2F)

Chrome 插件教程 - Chrome 官方提供的插件开发入门教程，逐步介绍如何创建和发布插件。[Gitee.com](https://gitee.com/link?target=https%3A%2F%2Fdeveloper.chrome.com%2Fdocs%2Fextensions%2Fmv3%2Fgetstarted%2F)

Chrome 插件示例 - Chrome 官方提供的插件示例代码，涵盖了各种功能和用例，可以作为参考和学习的资源。[Gitee.com](https://gitee.com/link?target=https%3A%2F%2Fdeveloper.chrome.com%2Fdocs%2Fextensions%2Fsamples%2F)

Chrome 插件开发者社区 - Chrome 插件开发者社区的论坛，可以在这里提问、讨论和交流插件开发的相关话题。[Gitee.com](https://gitee.com/link?target=https%3A%2F%2Fgroups.google.com%2Fa%2Fchromium.org%2Fg%2Fchromium-extensions)

Chrome 插件开发工具 - Chrome 开发者工具的文档，介绍了如何使用开发者工具进行调试和性能分析。[Gitee.com](https://gitee.com/link?target=https%3A%2F%2Fdeveloper.chrome.com%2Fdocs%2Fextensions%2Fmv3%2Fdevtools%2F)
Chrome Web Store 开发者文档 - Chrome Web Store 的开发者文档，提供了发布和管理插件的指南和说明。[Gitee.com](https://gitee.com/link?target=https%3A%2F%2Fdeveloper.chrome.com%2Fdocs%2Fwebstore%2F)

Chrome 插件安全性和隐私保护指南 - Chrome 官方提供的插件安全性和隐私保护的指南，介绍了如何确保插件的安全性和保护用户隐私。[Gitee.com](https://gitee.com/link?target=https%3A%2F%2Fdeveloper.chrome.com%2Fdocs%2Fextensions%2Fmv3%2Fsecurity%2F)

## Manifest. json
Chrome 插件的名称、描述、版本、权限以及其他插件需要的属性，插件的背景脚本、弹出窗口以及权限。
```
{
  "manifest_version": 2,
  "name": "My First Extension",
  "description": "This is a sample Chrome Extension",
  "version": "1.0",
  "icons": {
    "48": "icon.png",
    "128": "icon_large.png"
  },
  "permissions": [
    "activeTab",
    "storage",
    "https://*.mywebsite.com/*"
  ],
  "background": {
    "scripts": ["background.js"],
    "persistent": false
  },
  "content_scripts": [
    {
      "matches": ["https://*.google.com/*"],
      "js": ["content.js"],
      "run_at": "document_end"
    }
  ],
  "browser_action": {
    "default_icon": "icon.png",
    "default_popup": "popup.html",
    "default_title": "Open the popup"
  },
  "options_page": "options.html",
  "web_accessible_resources": [
    "script.js",
    "style.css"
  ]
}
```

## 脚本
background 后台脚本是插件的主要内容。
content_script内容脚本是向网页中插入脚本。
browser_action 弹出页面：点击插件图标时弹出的 html
options_title 选项页面：点击插件设置时弹出的 html

## 生命周期钩子
插件安装或更新
```
chrome.runtime.onInstalled.addListener(function(details) {
  if (details.reason == "install") {
    console.log("This is a first install!");
  } else if (details.reason == "update") {
    console.log("Updated from " + details.previousVersion + " to " + chrome.runtime.getManifest().version + "!");
  }
});
```
打开浏览器时插件启动
```
chrome.runtime.onStartup.addListener(function() {
  console.log("Browser started, initialize plugin data.");
});
```
插件运行
```
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.status == 'complete' && tab.active) {
    console.log("Active tab updated, let's do something!");
  }
});
```
停止（关闭浏览器）
```
chrome.runtime.onSuspend.addListener(function() {
  console.log("Browser is about to close, save plugin data.");
});
```
卸载插件
```
chrome.runtime.setUninstallURL("https://your_website.com/uninstall", function() {
  console.log("Uninstall URL has been set");
});
```

## 事件
浏览器启动
关闭窗口
浏览器关闭（关闭窗口函数内判断是最后一个窗口）
打开新窗口
切换标签页
监听网络请求
监听网络响应
监听连接错误事件
点击插件图标事件
点击插件菜单
使用快捷键（需先在 manifest 中定义）

## 插件权限系统与内容安全策略 CSP
Chrome 插件需要在 manifest 文件中声明其所需的权限，如访问浏览历史，修改网页内容等。此外，为了保护用户，Chrome 还实施了内容安全策略（CSP），限制插件可以从哪些源加载资源。

权限在 permissions 中定义，微信学了这点。更多权限查看官方文档。

内容安全策略（Content Security Policy，简称 CSP）是一种安全标准，用于预防跨站脚本攻击（XSS）和数据注入攻击。默认的 CSP 策略禁止扩展加载远程 JavaScript 或 CSS，只允许从扩展包内部加载。也就是说，你不能直接在你的 HTML 文件中引用一个外部的 JS 或 CSS 文件，所有的 JS 和 CSS 都应该以文件的形式包含在扩展包中。如果你需要修改 CSP 策略，例如你需要从特定的远程服务器加载脚本或样式，你可以在 manifest.json 文件中使用 "content_security_policy" 来声明新的策略。

## 插件api
### 脚本通信
```
// content script
chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
  console.log(response.farewell);
});

// background script
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.greeting == "hello")
      sendResponse({farewell: "goodbye"});
  });
```

### 标签页控制
```
创建新的标签页，关闭标签页，切换标签页，修改标签页的URL等。以下是一个创建新标签页的示例：

chrome.tabs.create({url: "http://www.example.com"});
```

### 书签操作
创建书签，删除书签，搜索书签等
```
chrome.bookmarks.create({
    'parentId': '1',
    'title': 'Extension bookmarks',
    'url': 'http://www.example.com'
});
```

### 桌面通知
```
chrome.notifications.create({
    type: 'basic',
    iconUrl: 'icon.png',
    title: 'Notification title',
    message: 'Notification message'
});
```

### 监控修改网络请求
```
chrome.webRequest.onBeforeRequest.addListener(
    function(details) { console.log(details.url); },
    {urls: ["<all_urls>"]},
    ["blocking"]
);
```


### storage 存储
```

// 保存数据
chrome.storage.sync.set({ key: value }, function() {
    console.log("Data saved.");
});

// 读取数据
chrome.storage.sync.get("key", function(result) {
    console.log("Data retrieved: ", result.key);
});
```

### 定时任务
```

// 创建定时任务
chrome.alarms.create("alarmName", { delayInMinutes: 10 });

// 监听定时任务触发事件
chrome.alarms.onAlarm.addListener(function(alarm) {
    console.log("Alarm triggered: ", alarm);
});
```

### 菜单
```

// 创建上下文菜单
chrome.contextMenus.create({
    id: "menuItemId",
    title: "Menu Item",
    contexts: ["page"]
});

// 监听菜单项点击事件
chrome.contextMenus.onClicked.addListener(function(info, tab) {
    console.log("Menu item clicked: ", info.menuItemId);
});
```

### 更多 API
除了上述提到的 API，Chrome 还提供了许多其他功能强大的 API，可以满足不同插件的需求。
[附加组件 - Mozilla | MDN](https://developer.mozilla.org/zh-CN/docs/Mozilla/Add-ons)
[权限 - permissions - Mozilla | MDN](https://developer.mozilla.org/zh-CN/docs/Mozilla/Add-ons/WebExtensions/manifest.json/permissions)
[chrome 插件开发指南 - 掘金](https://juejin.cn/post/7114959554709815326?from=search-suggest)
[generator-chrome-extension - npm](https://www.npmjs.com/package/generator-chrome-extension#app)

manifest. json
background：生命周期脚本。所在的页面域名为空，这会影响对 document.cookie 的使用。
content：页面注入脚本。受同源策略限制，所以网络请求都在 background 处理。插件

browser action 和 page action：所有页面/特定页面显示插件图标。由 manifest.json 的 page_action 和 browser_action 字段配置。

popup 页面：点击图标后打开的 popup。popup. html、popup. js。
## manifest. json
manifest_version、name 和 version 是必须
### content_scripts
```
{
  "content_scripts": [
    {
      "matches": ["http://*/*", "https://*/*"],
      "run_at": "document_idle",
      "js": ["content.js"]
    }
  ]
}
```
声明式安装前已经打开的页面不会受影响。新打开才会被注入 content_scripts。
```
还可以动态注入
// 监听插件图标点击事件
chrome.browserAction.onClicked.addListener(() => {
  chrome.tabs.executeScript({
    file: 'content.js',
  });
});

// content.js
if (!window.contentLoaded) {
    // do something
    window.contentLoaded = true;
}
console.log(window.contentLoaded);
```
### permissions
字符串数组，用来声明插件需要的权限，这样才能调用某些 chrome API，常见的有：

tabs
activeTab
contextMenus：网页右键菜单，browser_action 右键菜单
cookies：操作 cookie，和用户登录态相关的功能可能会用到该权限
storage：插件存储，不是 localStorage
web_accessible_resources：网页能访问的插件内部资源，比如插件提供 SDK 给页面使用，如 ethereum 的 metamask 钱包插件。或者是修改 DOM 结构用到了插件的样式、图片、字体等资源。

多个 url patterns，表示插件需要访问这些 url，比如和 API 通信。比如 background 需要和 a.com 通信。首先应该把 *://*.a.com/* 加入到 manifest 的 permissions 数组中。
### author
string
### description
string
### icons
```
{
	"48":"icons/microsoft.png",
	"96":"icons/microsoft.png"
}
```
### background
```
  "background": {
    "persistent": true,
    "scripts": [
      "modules/chunk-common.js",
      "modules/chunk-vendors.js",
      "modules/background.js"
    ]
  },
```
可以添加多份后台脚本。而且，就像同一个网页中的多个脚本一样，它们将会运行在同一上下文环境中。

与此同时，你也可以先引入一个后台页面，再在后台页面中引入脚本。这样做能为后台脚本添加 ES 6 模块支持，算是一个优势。
```
"background":{
	"page":"background-page.html"
}

<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8" />
    <script type="module" src="background-script.js"></script>
  </head>
</html>

```
## background
```
// 打开新 tab
async function open(url: string): Promise<number> {
  return new Promise((resolve) => {
    chrome.tabs.create(
      {
        url,
      },
      (tab) => resolve(tab.id!)
    );
  });
}

// 获取活跃的 tab，通常是用户正在浏览的页面
async function getActiveTab(): Promise<chrome.tabs.Tab | null> {
  return new Promise((resolve) => {
    chrome.tabs.query(
      {
        active: true,
        currentWindow: true,
      },
      (tabs) => {
        if (tabs.length > 0) {
          resolve(tabs[0]);
        } else {
          resolve(null);
        }
      }
    );
  });
}

// 将指定的 tab 变成活跃的
async function activate(
  tabId?: number,
  url?: string
): Promise<number | undefined> {
  if (typeof tabId === "undefined") {
    return tabId;
  }

  // firefox 不支持 selected 参数
  // https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/tabs/update#parameters
  const options: chrome.tabs.UpdateProperties = IS_FIREFOX
    ? { active: true }
    : { selected: true };
  if (url) {
    options.url = url;
  }

  return new Promise((resolve) => {
    chrome.tabs.update(tabId, options, () => resolve(tabId));
  });
}

// 打开新窗口，或者是激活窗口
async function openOrActivate(url: string): Promise<number> {
  const pattern = getUrlPattern(url);
  return new Promise<number>((resolve) => {
    chrome.tabs.query(
      {
        url: pattern,
      },
      (tabs) => {
        if (tabs.length > 0 && tabs[0].id) {
          return Tabs.activate(tabs[0].id);
        } else {
          this.open(url).then((id) => resolve(id));
        }
      }
    );
  });
}

```

## popup
页面大小定义在 html 上。
## page visibility api
用户最小化、最大化窗口，切换标签页。

document. visibilityState，
visible、hidden、prerender、unloaded

```
document.addEventListener('visibilitychange',()=>{
	if(document.visibilityState==='visible'){}
})
```



## web share api
navigator. canShare ()判断是否可以分享
navigator. share () 分享并返回promise
```
const shareButton = document.querySelector('#share-button');

const shareQuote = async (shareData) => {
  try {
    await navigator.share(shareData);
  } catch (e) {
    console.log(e);
  }
}

shareButton.addEventListener('click', () => {
  let shareData = {
    title: '分享标题',
    text: "内容",
    url: location.href
    // files:[File]
  };
  shareQuote(shareData);
})
```
只有在上下文安全可用（https、wss 协议），兼容性：基本不支持。

## broadcast channel api



## internationalization api
简称 i18api。使用 locale 标识符来起作用。
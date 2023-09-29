## 异步读取json文件

写在新文件上，归js文件夹

``` js
const fs=require('fs');

const path=require('path');

// 回调地狱:实现按顺序处理异步操作

function getFileContent(filename,callback){
    假设根据文件名读取data文件夹下的文件
    const fullFilename=path.resolve(__dirname,'data',filename);
    fs.readFile(fullFilename,(err,data)=>{
        if(err){
            console.error(err);
            return;
        }
        
        // console.log(data.toString()):
        // 将json文本里的内容转换为js对象
        // console.log(JSON.parse(data.toString()));
        
        callback(JSON.parse(data.toString()));
    })
}

// getFileContent('a.json');


getFileContent('a.json',(aData)=>{
    console.log('aData',aData);
    getFileContent(aData.next,(bData)=>{
        console.log('bData',bData);
        getFileContent(bData.next,(cData)=>{
            console.log('cData',cData);
        })
    })
})

// promise

function getFileContent(filename){
    const promise=new Promise((resolve,reject)=>{
        const fullFilename=path.resolve(__dirname,'data',filename);
    fs.readFile(fullFilename,(err,data)=>{
        if(err){
            reject(err);
            return;
        }
       resolve(JSON.parse(data.toString()));
    })
    });
    return promise;
}

getFileContent('a.json').then((aData)=>{
    console.log('aData',aData);
    return getFileContent(aData.next);
}).then((bData)=>{
    console.log('bData',bData);
    return getFileContent(bData.next);
}).then((cData)=>{
    console.log('cData',cData);
    return getFileContent(cData.next);
})
```

## promise

在promise前实现异步操作通过回调，有回调会带来回调地狱的问题。

链式结构可读性强，解决回调地狱，方便异常处理。

fs以及fsPromise

``` js
const fs=require('fs');

fs.readFile('./resource/content.txt', (err, data) => {
  if (err) throw err;
    console.log(data.toString());
});

let p=new Promise((resolve,reject)=>{
    fs.readFile('./resource/content.txt',(err,data)=>{
        if(err) reject(err);
        resolve(data);
    });
})
p.then(value=>{
    console.log(value.toString())
},reason=>{
    console.log(reason);
})

nodejs内置的util.promisify方法：将一个err开头回调改为promise
const util = require('util');
const fs = require('fs');
// 输入一个参数为err打头的回调函数的函数，返回一个返回promise的函数。
let mineReadFile = util.promisify(fs.readFile);
mineReadFile('./resource/content.txt').then(value => {
  console.log(value.toString());
})
```

Ajax以及AjaxPromise

``` js
const xhr=new XMLHttpRequest();
xhr.open('GET','https://api.apiopen.top/getJok');
xhr.send();
xhr.onreadystatechange=function(){
    if(xhr.readyState===4){
        if(xhr.status>=200&&xhr.status<300){
            console.log(xhr.response);
        }else{
            console.log(xhr.status);
        }
    }
}
```

``` js
const p = new Promise((resolve, reject) => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.apiopen.top/getJok');
  xhr.send();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status >= 200 && xhr.status < 300) {
        // console.log(xhr.response);
        resolve(xhr.response);
      } else {
        // console.log(xhr.status);
        reject(xhr.status)
      }
    }
  }
})
p.then(value => {
  console.log(value);
}, reason => {
  console.warn(reason);
})
```

``` js
function sendAJAX(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.send();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status < 300) {
          // console.log(xhr.response);
          resolve(xhr.response);
        } else {
          // console.log(xhr.status);
          reject(xhr.status)
        }
      }
    }
  })
}
sendAJAX(url).then(value=>{
},reason=>{
})
```

promiseapi



``` js
new Promise(executor)
promise里面必须调用resolve、reject接下来才有效。不然将中断。（这也是中断promise链的唯一方法）
then、async函数里面才有必返回promise的机制。（可以说new Promise、Promise.reject/Promise.resolve是源头）
必返回promise机制：
抛出错误、
非promise值
promise：由promise值决定

Promise.prototype.then
// 处理回调函数，返回promise对象（所以能支持链式调用）
// then返回什么样的状态由then里的回调函数决定
// 抛出错误（失败的promise）、返回非promise（成功并为成功的值）、promise（状态和值的决定）
// 如果没有返回值，then返回一个值为undifined的成功promsie
// 中断then，不管then写什么，都不能中断后面then的执行。除非return new Promise(() => { });中断promise链的唯一方法
Promise.prototype.catch
// 处理失败回调函数，返回promise对象。
// then的语法糖，相当于then(undefined, onRejected);
// 支持异常穿透，可以放在最后面。位置可以任意放。根据需要放。
Promise.resolve
// 传入非promise对象，返回为成功的promise对象。
// 从then的角度看promise，只有成功的promise和失败的promsie。
// 传入promise对象，参数结果决定resolve的结果。promise成功则返回一个成功的promise。（可能成功）
// Promsie.resolve('ok')相当于new Promise((resolve,reject)=>{resolve('ok')}),Promise.reject类似
Promise.reject
// 返回一个失败的promise。（一直失败）
// 不是executor里携带的resolve和reject。这是让我们实现可以返回pending的promise（用new）成功的promise、失败的promise，可以用来演示代码。不过new里的代码会执行。而这两个只能传入参数而不是函数。
Promise.all
// 传入一个promise数组，返回一个promise对象。全部成功则成功。
Promise.race
// 传入一个promise数组，返回一个promise对象，第一个成功则成功。
async函数
// 返回一个promise对象。规则和then一样
// 有return，非promise，返回成功的值为return的promise。promsie对象，则放回值为promise值，状态为promise状态的promise。
// 无return，值为undefinded的成功promise
// 抛出异常，失败的promise
是在定义函数时修饰，在调用函数时不用修饰
await表达式
// 接promise对象，返回的是成功promise的值。
// 也可以接其他的
// 接的失败promise，抛出异常
// 要写在async函数中
// 在async中，抛出异常async回包装为失败promise，成功则返回空的成功promise
// 实践中，await接promise返回值的函数。并被async函数包括。异常处理trycatch包围await。let duanzi=await sendAJAX(url);
```

疑问：我在  resolve({});后的resolve(数据)没有用，在resolve(数据)后面的resolve({})确生效了，因此不能把resolve当成return用。后面的代码还是会执行。但是放在后面覆盖前面的，也不起作用，又有return的特点。好奇怪。

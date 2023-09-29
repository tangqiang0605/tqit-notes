【JavaScript】使用Promise

# 一、promise类方法

## 接口

``` js
interface PromiseConstructor {
  /**
       * Creates a new Promise.
       * @param executor A callback used to initialize the promise. This callback is passed two arguments:
       * a resolve callback used to resolve the promise with a value or the result of another promise,
       * and a reject callback used to reject the promise with a provided reason or error.
       */
  new <T>(executor: (resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void): Promise<T>;

  /**
   * Creates a Promise that is resolved with an array of results when all of the provided Promises
   * resolve, or rejected when any Promise is rejected.
   * @param values An array of Promises.
   * @returns A new Promise.
   */
  all<T extends readonly unknown[] | []>(values: T): Promise<{ -readonly [P in keyof T]: Awaited<T[P]> }>;

  // see: lib.es2015.iterable.d.ts
  // all<T>(values: Iterable<T | PromiseLike<T>>): Promise<T[]>;

  /**
   * Creates a Promise that is resolved or rejected when any of the provided Promises are resolved
   * or rejected.
   * @param values An array of Promises.
   * @returns A new Promise.
   */
  race<T extends readonly unknown[] | []>(values: T): Promise<Awaited<T[number]>>;

  // see: lib.es2015.iterable.d.ts
  // race<T>(values: Iterable<T>): Promise<T extends PromiseLike<infer U> ? U : T>;

  /**
   * Creates a new rejected promise for the provided reason.
   * @param reason The reason the promise was rejected.
   * @returns A new rejected Promise.
   */
  reject<T = never>(reason?: any): Promise<T>;

  /**
   * Creates a new resolved promise.
   * @returns A resolved promise.
   */
  resolve(): Promise<void>;

  /**
   * Creates a new resolved promise for the provided value.
   * @param value A promise.
   * @returns A promise whose internal state matches the provided promise.
   */
  resolve<T>(value: T | PromiseLike<T>): Promise<T>;
}
```



## new Promise

创建promise对象
new Promise()



接收一个函数（称该函数为executor）
new Promise(executor)



executor至少注入resolve函数作为参数，注入可选的reject函数作为第二参数。
new Promise(resolve=>{})
new Promise((resolve,reject)=>{})



executor函数从头到尾执行完毕，根据第一个接触到的resolve/reject决定new Promise()返回的Promise对象的状态
const myPromise = new Promise((resolve, reject) => {
  resolve();
  reject();
  console.log('函数内的所有代码都会运行')
 })
由于第一个执行的是resolve函数，所以myPromise的状态是fulfilled



**promise对象有三种状态**
fulfilled：调用了resolve，象征成功
rejected：调用了reject，象征失败
pending：都没有调用，状态待确认，但最终都会转为fulfilled或rejected。也就是说，fulfilled和rejected是不会再改变的结束状态（就目前的promise对象而言），而pending是过程量，最终会转变为二者之一。



promise的状态有executor函数执行时遇到的第一个resolve或reject决定。
遇到第一个以后promise的状态由pending变为fulfilled或rejected且不再改变。



如果不对状态为rejected的promise进行处理（该promise产生后调用then、catch、finally方法），将会抛出一个ERR_UNHANDLED_REJECTION（reject状态未处理）异常。



promise除了状态、还有对应的值。
resolve和reject函数接收任意类型的数据作为promise的值：
const myPromise = new Promise((resolve, reject) => {
  resolve('hello');
 })
myPromise的状态是fulfilled，值为'hello'。



如果executor函数中没有调用resolve或者reject，executor将作为普通函数执行，promise也失去了它的作用。
这个特性可以用来中断then链。将在then方法中介绍。



## Promise.reject()

const myPromise=Promise.reject('hello')
返回一个状态为rejected、值为'hello'的promise对象。

如果不对该promise（状态为rejected）进行处理（该promise产生后调用then、catch、finally方法），将会抛出一个ERR_UNHANDLED_REJECTION（reject状态未处理）异常。



## Promise.resolve()

const myPromise=Promise.resolve('hello')
返回一个状态为fulfilled、值为'hello'的promise对象。



还可以传入一个Promise对象作为参数，Promise对象的状态和值即为该函数返回的状态和值。
const myPromise=Promise.resolve(Promise.reject('hello'))
返回一个状态为rejected、值为'hello'的promise对象。



## Promise.race()

传入一个元素为promise的数组，只要有一个的状态为成功，则返回成功的promise。值为成功的promise的值。



## Promise.all()

传入一个元素为promise的数组，只要有一个的状态为失败，则返回失败的promise。值为包含所有执行结果的对象。



# 二、promise对象原型方法

## 接口

``` js
interface Promise<T> {
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>
  /**
 * Attaches callbacks for the resolution and/or rejection of the Promise.
 * @param onfulfilled The callback to execute when the Promise is resolved.
 * @param onrejected The callback to execute when the Promise is rejected.
 * @returns A Promise for the completion of which ever callback is executed.
 */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;

  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
}
```



## promise.then()

接受一个回调函数，调用then的promise为成功状态时执行
const myPromise=Promise.resolve('hello')
myPromise.then(()=>{})



then会自动给回调函数注入一个value参数，值为promise的值
const myPromise=Promise.resolve('hello')
myPromise.then((value)=>{console.log(value)})
value为‘hello'



**then方法返回一个promise，值由回调函数的执行情况决定**
let newPromise=myPromise.then(value=>{})
如果回调函数抛出异常，返回失败的promise，值为报错信息。
如果回调函数正常执行：
	没有返回值，promise状态为成功、值为undefined。
	有返回值：
		非promise类型，返回状态为成功、值为返回值的promise
		promise类型，状态和值由promise决定



当调用then的promise为失败状态时，then调用该函数并注入promise的值。
const myPromise=Promise.reject('hello')
const newPromise=myPromise.then((value)=>{console.log(value)}, (reason)=>{console.log('rejected: ', reason)})
newPromise是一个失败状态、值为'hello'。
注意、要对失败状态的promise进行处理，不然将会报错。



then可以一直传导（链式调用）
promise.then()返回一个promise
既然是promise，就可以继续接then：
promise.then().then()
以此类推：
promise.then().then().then().then()。。。



中断promise、then链的唯一方法：
让某一个节点返回一个不调用resolve和reject的promise
前面.then((val)=>{new Promise((resolve)={})}).后面



支持异常穿透：如果then没有第二个参数对失败的promise进行处理，then会将该promise传给下一个调用。



## promise.catch()

promise.then的语法糖，只接受一个参数并注入失败原因。
promise.catch((reason)=>{})等同于promise.then(null,{reason}=>{})



根据回调函数的执行结果返回一个promise。和then对返回的promise的判断方法一样。



利用异常穿透，可以对异常进行集中处理：
Promise.reject('hello').then(value=>{value}).then(value=>{value}).catch((err)=>console.log(err));输出'hello'



## promise.finally()

只要promise有状态，fulfilled或rejected，都会触发finally里的回调函数。
promise.finally(()=>{})



返回一个promise，判断返回promise的状态和值的方法和then、catch一样。



注意，finally如果接的是一个失败的promise，也会返回一个失败的promise，而失败的promise如果不处理会报错，所以记得在finally后面接then或catch，finally并不在链式调用的末尾。



# 三、async和await

## await变量值修饰符

一般方法获得promise的值：
let value;
const myPromise=Promise.resolve('hello');
myPromise.then(v=>value=v);
使用await可以方便地获得promise对象的值：
const myPromise=Promise.resolve('hello');
let value=await myPromise;



await只接成功状态的promise。可以用try-catch处理失败的promise。
try{
​	await Promise.reject('hello');
}catch(error){
​	console.log(error);// 输出'hello'
}



函数内如果含有await，该函数需要用async修饰：
function sayHello(){
​	const word=await Promise.resolve('hello');
​	console.log(word);
}
会报错。使用async修饰：
async function sayHello(){
​	const word=await Promise.resolve('hello');
​	console.log(word);
}



await会阻塞（这里是褒义词）线程，await执行后才会执行await下面的代码
async function sayHello(){
​	const word=await Promise.resolve('hello');
​	console.log(word);
}
先执行const word=await Promise.resolve('hello')，再执行console.log(word);



await的位置：在等号的右边。
await修饰的是变量值（等号右边），而不是变量。
await const word=Promise.resolve('hello');错误
const word=await Promise.resolve('hello');正确



await也可以接非promise值，和没有一样。
const a=await 'hello';
const b='hello';




## async函数修饰符

async函数里可以没有await，但有await一定要async（除非await是在js代码的最外层）。



async在定义函数时修饰，在调用函数时不用修饰。
async function sayHello(){}
const myPromise=sayHello();



async也可以修饰箭头函数：
async()=>{}



被async修饰的函数必返回一个promise，返回规则和then方法一样。
sayHello函数返回一个成功状态、值为undefined的promise对象：
async function sayHello(){}
const myPromise=sayHello();
使用await可以直接获得promise的值：
const promise1=await sayHello();
console.log(promise1);





# 四、使用示例

## Ajax

普通的xhr请求

``` js
获取xhr对象，用于发送网络请求
const xhr=new XMLHttpRequest();

发送GET请求
xhr.open('GET','https://api.apiopen.top/getJok');
xhr.send();

对响应进行处理
xhr.onreadystatechange=function(){
    if(xhr.readyState===4){
        
        if(xhr.status>=200&&xhr.status<300){
            响应成功时执行
            xhr.response是响应的内容
            console.log(xhr.response);
        }else{
            响应失败时执行
            xhr.status是响应的状态码
            console.log(xhr.status);
        }
    }
}
```

promise封装xhr请求

``` js
把上面的函数照搬到promise的executor构造函数中
响应成功：返回成功状态、值为xhr.response的promise
响应失败：返回失败状态、值为xhr.status的promise

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

对响应结果进行处理
p.then(value => {
  console.log(value);
}, reason => {
  console.warn(reason);
})
```

封装为函数，这个函数其实就是AJAX

``` js
function AJAX(url) {
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

AJAX(url).then(value=>{
},reason=>{
})
```



## 读取文件

普通方法：

``` js
const fs=require('fs');

fs.readFile('./resource/content.txt', (err, data) => {
  if (err) throw err;
    console.log(data.toString());
});
```

使用promise封装

``` js
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
```

nodejs内置的util.promisify方法

``` js
const util = require('util');
const fs = require('fs');
// promisify函数输入一个参数为"err打头的回调函数的函数"，返回一个"返回promise的函数"。
let mineReadFile = util.promisify(fs.readFile);

mineReadFile('./resource/content.txt').then(value => {
  console.log(value.toString());
})
```



## 异步读取json文件

直接读取

``` js
const fs=require('fs');
const path=require('path');

// 回调地狱:实现按顺序处理异步操作时，会形成回调里嵌套回调的现象。
// 回调地狱不影响正常运行，但会造成代码可读性降低、代码维护难等问题

function getFileContent(filename,callback){
    假设根据文件名读取data文件夹下的文件
    const fullFilename=path.resolve(__dirname,'data',filename);
    fs.readFile(fullFilename,(err,data)=>{
        if(err){
            console.error(err);
            return;
        }        
        callback(JSON.parse(data.toString()));
    })
}

// 按顺序读取a、b、cjson文件，产生回调地狱问题。
getFileContent('a.json',(aData)=>{
    console.log('aData',aData);
    getFileContent(aData.next,(bData)=>{
        console.log('bData',bData);
        getFileContent(bData.next,(cData)=>{
            console.log('cData',cData);
        })
    })
})
```

使用promise实现异步按顺序读取文件

``` js
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

// 解决回调地狱问题
// 嵌套结构变成链式结构
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


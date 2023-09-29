[前端人 不了解的promise/async await - 掘金](https://juejin.cn/post/7144308012952322084?utm_source=ug_by_post)

## 构造方法
new Promise 接收一个 executor 作为自动执行的微任务。

executor.resolve 接收参数：
1. 普通参数返回 fullfilled 并作为 then 注入值 res。
2. thenable 是一个含 then 方法的对象，被注入 res, rej 方法。类似 resolve 接收 promise。
3. 参数 promise 决定外层 promise 的状态。

new 的结果 promise \[\[prototype\]\]（隐式原型） === Promise. prototype (显示原型)
即 new 返回的对象的隐式原型指向了 Promise 的显示原型

## 实例方法

then, catch 接收函数的返回值：
1. 普通，fulfilled
2. promise，决定状态
3. thenable， 决定状态。

## 类方法/静态方法
resolve、reject、all、

all 方法的参数传入为一个可迭代对象，返回一个 promise，只有三个都为 resolve 状态的时候才会调用.then 方法。成功返回包含三个值的数组，失败返回第一个reject 的值。

上面的 Promise. all 有一个缺陷，就是当遇到一个 rejected 的状态，那么对于后面是 resolve 或者 reject 的结果我们是拿不到的。ES 11 新增语法 Promise. allSettled，无论状态是 fulfilled/rejected 都会把参数返回给我们。

race (竞争竞赛)，优先获取第一个返回的结果，无论结果是 fulfilled 还是 rejectd

与 race 类似，只获取第一个状态为 fulfilled，如果全部为 rejected 则报错


## generator 生成器
gennerator 函数返回一个迭代器对象。
5. 调用 next() 方法时，如果传入了参数，那么这个参数会传给上一条执行的 yield 语句左边的变量。
6. 可用于 for of 自动执行。
实现 async
```
function asyncGenerator(generatorFunc) {
  return function (...args) {
    const generator = generatorFunc(...args);

    function handle(result) {
    1. 如果第一行就报错，done也不会是true，所以只需在else处catch。
    2. else中，用resolve来判断是then还是catch
    3. 迭代器对象还有throw方法可用。

      if (result.done) return Promise.resolve(result.value);
      return Promise.resolve(result.value)
        .then(res => handle(generator.next(res)))
        .catch(err => handle(generator.throw(err)));
    }
    4. handle递归返回最终promise，也就是整个yield的最后执行结果或中途报错
    return handle(generator.next());
  };
}

使用async
const fetchUser = asyncGenerator(function* (userId) {
  const response = yield fetch(`https://api.example.com/users/${userId}`);
  const user = yield response.json();
  return user;
});

fetchUser(1).then(user => console.log(user));

```
写法二
```
function asyncToGenerator(generator) {
    let gen = generator();
    return new Promise((resolve, reject) => {
        function step(key, arg) {
            let result;
            try {
                result = gen[key](arg);
            } catch (error) {
                return reject(error);
            }
            const { value, done } = result;
            if (done) {
                return resolve(value);
            } else {
                return Promise.resolve(value).then(val => {
                    step('next', val);
                }, err => {
                    step('throw', err);
                });
            }
        }
        step('next');
    });
}
```

## 生成器+Promise 解法
### 解法一
```
requestData是一个返回Promise的函数

function* getData(url) {
  const res1 = yield requestData(url)
  const res2 = yield requestData(res1)
  const res3 = yield requestData(res2)

  console.log(res3)
}
```
使用生成器：next 接收的值会用在下一个 yieid 函数的参数上
```
const generator = getData('iceweb.io')

next开始执行yield返回{value:promise,done:false}

generator.next().value.then(res1 => {
  generator.next(`iceweb.org ${res1}`).value.then(res2 => {
    generator.next(`iceweb.com ${res2}`).value.then(res3 => {
      generator.next(res3)
    })
  })
})
```
自动化封装：在生成器定义的过程，该函数自动过一遍生成器函数
```
//自动化执行 async await相当于自动帮我们执行.next
function asyncAutomation(...args) {
  const generator = call(...args)

  const _automation = (result) => {
    let nextData = generator.next(result)
    if(nextData.done) return

    nextData.value.then(res => {
      _automation(res)
    })
  }

  _automation()
}

asyncAutomation(getData,'iceweb.io')
```
### 解法二
用 async getData 替代生成器 getData。
```
async function getData() {
  const res1 = await requestData('iceweb.io')
  const res2 = await requestData(`iceweb.org ${res1}`)
  const res3 = await requestData(`iceweb.com ${res2}`)

  console.log(res3)
}
getData()
```

## async
1. 返回普通值。Promise. resolve (返回值)
2. 返回thenable 决定
3. 返回 promise 决定
异步函数中可以使用 await 关键字，现在在全局也可以进行 await，但是不推荐。会阻塞主进程的代码执行

## await
跟值：
1. Promise
2. 普通值
3. thenable
4. Promise 主动调用 resolve 或者 reject

这个 promise 状态变为 fulfilled 才会执行 await 后续的代码，所以 await 后面的代码，相当于包括在.then 方法的回调中，如果状态变为 rejected，你则需要在函数内部 try catch，或者进行链式调用进行.catch 操作

## 实现 Promise/A+ 规范的 Promise
[实现符合Promise/A+规范的Promise | 编程时光](https://www.coding-time.cn/js/async/%E5%AE%9E%E7%8E%B0Promise.html#%E6%AD%A5%E9%AA%A4-2-%E5%88%9D%E5%A7%8B%E5%8C%96-promise-%E7%8A%B6%E6%80%81%E5%92%8C%E5%9B%9E%E8%B0%83)
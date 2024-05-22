# 什么是符合promiseA+规范的promise?

## [promiseA+规范](https://zhuanlan.zhihu.com/p/514320532)

## 实现
```js
// 先定义三个常量表示状态
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class MyPromise {
  // 记录Promise状态,初始为pending
  promiseStatus = PENDING
  // 成功的值
  value = null
  // 失败的原因
  reason = null
  // 存储成功回调函数
  onFulfilledCallback = [];
  // 存储失败回调函数
  onRejectedCallback = [];

  constructor (executor) {
    // executor是一个方法,初始化promise的时候会传入,接受resolve和reject两个方法作为参数
    try {
      executor(this.resolve, this.reject)
    } catch (error) {
      this.reject(error)
    }
  }

  // 为什么用箭头函数?因为箭头函数在定义的时候就已经决定好了this是当前的promise实例
  // 如果用function的话直接执行就是window或者global了
  resolve = (value) => {
    // 只有状态是等待，才执行状态修改
    if (this.promiseStatus === PENDING) {
      // 记录成功值
      this.value = value
      this.promiseStatus = FULFILLED
      // 判断成功回调是否存在，如果存在就调用
      while (onFulfilledCallback.length) {
        onFulfilledCallback.shift()(value)
      }
    }
  }
  reject = (reason) => {
    // 只有状态是等待，才执行状态修改
    if (this.promiseStatus === PENDING) {
      this.reason = reason
      this.promiseStatus = REJECTED
      // 判断失败回调是否存在，如果存在就调用
      while (onRejectedCallback.length) {
        onRejectedCallback.shift()(reason)
      }
    }
  }

  // then方法接收两个参数,分别是resolve和reject改变状态后的回调
  then (onFulfilled, onRejected) {
    // onFulfilled和onRejected可能为空或者并不是函数,根据A+规范
    // 如果 onFulfilled 不是 function， 并且 promise1 fulfilled 了， 那么 promise2 必须 fuilfilled 并接收该 fuilfilled value；
    // 如果 onRejected 不是 function， 并且 promise1 rejected 了， 那么 promise2 必须 rejected 并接收该 reject reason；
    onFulfilled = typeof onFulfilled !== 'function' ? value => value : onFulfilled
    onRejected = typeof onRejected !== 'function' ? reason => { throw reason } : onRejected

    // 为了实现then的链式调用,then方法需要返回第二个新的promise出去
    const promise2 = new MyPromise((resolve, reject) => {
      if (this.promiseStatus === FULFILLED) {
        // then方法是微队列任务,因此使用queueMicrotask创建一个微队列任务
        queueMicrotask(() => {
          try {
            // 执行时状态已经是完成,获取他的执行结果
            const x = onFulfilled(this.value)
            // 传入 resolvePromise 集中处理
            resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      } else if (this.promiseStatus === REJECTED) {
        queueMicrotask(() => {
          try {
            // 执行时已经是失败,获取他的执行结果
            onRejected(this.reason)
            const x = onRejected(this.reason)
            // 传入 resolvePromise 集中处理
            resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      } else {
        // 此时还在pending中,还没执行resolve或者reject改变promise状态
        // 这时候要先把回调分别放入对应缓存队列
        // 为什么是队列?因为一个promise实例可以多次调用then方法,会产生多个回调
        this.onFulfilledCallback.push(() => {
          queueMicrotask(() => {
            try {
              // 执行时状态已经是完成,获取他的执行结果
              const x = onFulfilled(this.value)
              // 传入 resolvePromise 集中处理
              resolvePromise(promise2, x, resolve, reject)
            } catch (error) {
              reject(error)
            }
          })
        })
        
        this.onRejectedCallback.push(() => {
          queueMicrotask(() => {
            try {
              // 调用失败回调，并且把原因返回
              const x = onRejected(this.reason);
              // 传入 resolvePromise 集中处理
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error)
            } 
          })
        })
      }
    })
    return promise2
  }
}

function resolvePromise (promise2, x, resolve, reject) {
  // 根据promiseA+规范,需要对x这个执行结果进行判断
  if (promise2 === x) {
    // 1. 如果 then 方法返回的是自己的 Promise 对象，则会发生循环调用，这个时候程序会报错
    // const p1 = promise.then(value => {
    //   console.log(value)
    //   return p1
    // })
    return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
  }
  // onFulfilled 或者 onRejected 如果返回 value x, 则会走 Promise 解析程序 [[Resolve]](promise2, x)， 对这个返回的新 promise2 调用 resolve(x)；
  if (x instanceof MyPromise) {
    // 2. 如果这个x是一个promise,需要等待这个promise完成
    // x.then((res) => resolve(res), (reason) => reject(reason))
    x.then(resolve, reject)
  } else if (typeof x === 'function' || (typeof x === 'object' && x !== null)) {
    // 假如x是一个函数或者是一个对象
    // 3.1 let then = x.then;
    let then
    let called
    try {
      then = x.then
    } catch (error) {
      // 3.2 如果读取 x.then 报错，则 reject 该 promise with 这个错误；
      return reject(error)
    }
    if (typeof then === 'function') {
      try {
        // 3.3 如果 then 是一个 function，则将 x 作为this， 调用该 function， 第一个参数是 resolvePromise， 第二个参数是 rejectPromise。
        then.call(x, y => {
        //     3.3.3 resolvePromise， rejectPromise 多次调用只有第一次有效；
          if (called) return
          called = true
          // 3.3.1 如果 resolvePromise 被调用 with value y， 则执行 [[Resolve]](promise, y)；
          resolvePromise(promise2, y, resolve, reject)
        }, r => {
          //     3.3.3 resolvePromise， rejectPromise 多次调用只有第一次有效；
          if (called) return
          called = true
          //     3.3.2 如果 rejectPromise 被调用 with reason r， 则 reject promise with r；
          reject(r)
        })
      } catch (error) {
        //     3.3.4 如果调用 then 报错
        //       3.3.4.1 如果  resolvePromise 或者 rejectPromise 已经被调用，则忽略
        //       3.3.4.2 如果没有， 则 reject promise with reason
        if (called) return
        reject(error)
      }  
    } else {
      // 3.4 如果 then 不是 function， fulfill promise with x;
      resolve(x)
    }
  } else {
    // 4. 如果 x 既不是 object 也不是 function，则 fulfill promise with x；
    resolve(x)
  }
}
```

## resolvePromise中规则3的举例
```js

//规则 3.3
let prom2 = new Promise((resolve, reject) => {
  resolve(1)
}).then((val) => {
  let x = {
    then: function(resolvePromise, rejectPromise) {
      resolvePromise(2); //对应规则 3.3.1，调用resolvePromise，类似于调用prom2 的 resolve(2)
      resolvePromise(3); // 多次调用只取第一次
      resolvePromise(4); 
      rejectPromise(5);
      rejectPromise111(6) // 报错,会被catch捕捉
    }
  };
  return x;
});

prom2.then((val2) => { console.log(`promise2 value=${val2}`); })  //promise2 value=2

//规则 3.4
new Promise((resolve, reject) => {
  resolve(1)
}).then((val) => {
  let x = {
    then: Object.create({key: 1})
  };
  return x;
}).then((val2) => console.log(`promise2 value=${JSON.stringify(val2)}`) );   //promise2 value={"then":{}}
```



## 实现Promise.all
```js
  Promise.all = function (promises) {
    return new MyPromise((resolve, reject) => {
      let count = 0;
      let result = [];
      for (let i = 0; i < promises.length; i++) {
        promises[i].then((res) => {
          count++;
          result[i] = res;
          if (count === promises.length) {
            resolve(result);
          }
        }, (err) => {
          reject(err);  
          }
          })
      }
    })
  }
```



## 实现Promise.race
```js
  Promise.race = function (promises) {
    return new MyPromise((resolve, reject) => {
      for (let i = 0; i < promises.length; i++) {
        promises[i].then((res) => {
          resolve(res);
        })
      }
    })
  }
```

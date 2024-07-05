<script setup>
  import AsyncExample from './AsyncExample.vue'
</script>

## 从一个面试题引出
<AsyncExample />

```js

 async function foo () {
  return Promise.resolve('foo').then(() => {
    console.log('foo');
    return 'foo result'
  })

  // Promise.resolve().then(() => {
  //   return Promise.resolve('foo result').then((data) => {
  //     console.log('foo end', data)
  //   })
  // })
}



 async function start () {
   const data = await foo()
  console.log('foo end', data)
}
start()


new Promise(resolve => {
  console.log('start');

  resolve('start')
}).then(() => {
  console.log(1);
}).then(() => {
  console.log(2);
}).then(() => {
  console.log(3);
}).then(() => {
  console.log(4);
}).then(() => {
  console.log(5);
}).then(() => {
  console.log(6);
})

setTimeout(() => {
  console.log('settimeout');
}, 0);

```

## async

原理那些繁文缛节弃置掉,直接说这次的重点,如何把async转变为promise方便我们分析这种输出题

async函数返回的 Promise 对象，必须等到内部所有await命令后面的 Promise 对象执行完，才会发生状态改变，除非遇到return语句或者抛出错误。也就是说，只有async函数内部的异步操作执行完，才会执行then方法指定的回调函数。

await 下面的行的代码可以视为await 后面的 Promise 对象的 then 方法里面执行。

下面用两个例子来介绍他是怎么转换
```js

async function getAsyncConstant() { 
  return 1
}

function getAsyncConstant () {
  return Promise.resolve().then(() => 1)
}



async function getAsyncPromise() { 
  return Promise.resolve(1)
}

function getAsyncPromise () {
  return Promise.resolve().then(() => {
    return Promise.resolve(1)
  })
}
```
**可以看出async中的return其实是会通过一层Promise.resolve包裹住了**

## 分析重点过程
1. foo执行的时候先执行return后面部分,因此会把.then部分放进微任务队列
2. 然后是下面的new Promise中输出start,把输出1的.then放进微任务队列
3. 把setTimeout放进宏任务队列
4. 此时来清空微任务队列了,于是输出了foo
5. 此时foo的return 变成 return 一个 resolve('foo result')的promise,即Promise.resolve('foo result'),根据上面的转变,变成
```js
  Promise.resolve().then(() => {
      return Promise.resolve('foo result').then((data) => {
        console.log('foo end', data)
      })
    })
```
这时候执行把第一个.then后面的放进了微任务队列

6. 继续执行微任务队列内容,此时执行了输出1的.then,又把输出2的.then放进微任务队列
7. 继续执行微任务队列内容,执行了上面第五点里第一个的.then,然后遇到了
```js
.then((data) => {
        console.log('foo end', data)
      })
```
继续放进微任务队列

8. 继续执行微任务队列内容,执行了输出2的.then,又把输出3的.then放进微任务队列
9. 执行第七点的.then,输出了foo end foo result,此时我们的start函数就执行完毕了,后面就是一长串的.then输出
10. 最后微任务队列完全清空,开始新一轮宏任务于是执行了setTimeout里的内容

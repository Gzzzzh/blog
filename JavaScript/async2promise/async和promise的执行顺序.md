<script setup>
  import AsyncExample1 from './AsyncExample1.vue'
</script>


## async函数返回
1. return后跟非thenable对象和非promise对象(不等待)
2. return后跟thenable对象(等待一个微任务)
3. return后跟promise对象(等待两个微任务)
   
## await
1. await后跟非thenable对象和非promise对象(不等待)
2. await后跟thenable对象(等待一个微任务)
3. await后跟promise对象(不等待)

**TC 39 对await 后面是 promise 的情况如何处理进行了一次修改，移除了额外的两个微任务，在早期版本，依然会等待两个 then 的时间**

<AsyncExample1 />

## 练习
```js
async function foo() {
    return Promise.resolve("foo").then(() => {
      console.log("foo");
      result.push("foo")
      return "foo result";
    });
  }

  async function start() {
    const data = await foo(); // 返回了promise,因此等待两个微任务
    result.push(`foo end ${data}`)
    console.log("foo end", data);
  }
  start();

  new Promise((resolve) => {
    console.log("start");
    result.push('start')
    resolve("start");
  })
    .then(() => { // 这是等待的第一个微任务
      result.push(1)
      console.log(1);
    })
    .then(() => { // 等待的第二个微任务
      result.push(2)
      console.log(2);
    })
    .then(() => {
      result.push(3)
      console.log(3);
    })
    .then(() => {
      result.push(4)
      console.log(4);
    })

  setTimeout(() => {
    result.push("settimeout")
    console.log("settimeout");
  }, 0);

```
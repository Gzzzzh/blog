<script setup>
import { reactive } from "vue";
let result = reactive([])
function handleClick() {
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
}
</script>
<template>
  <button class="btn" @click="handleClick">点我查看结果</button>
  <div>结果: {{ result }}</div>
</template>
<style scoped lang="scss"></style>

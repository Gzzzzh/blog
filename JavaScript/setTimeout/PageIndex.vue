<script setup>
  import { reactive, ref } from 'vue'
  const form = reactive({
    ideal: 0,
    real: 0,
    diff: 0,
  })
  let time = ref(null)

  function timer() { 
    let speed = 50, // 设定间隔 
    counter = 1,  // 计数 
    start = new Date().getTime(); 
      
    function instance() { 
      const ideal = (counter * speed), 
      real = (new Date().getTime() - start); 
      
      counter++; 
      form.ideal = ideal; // 记录理想值 
      form.real = real;   // 记录真实值 
  
      const diff = (real - ideal); 
      form.diff = diff;  // 差值 
  
      time = setTimeout(function() { instance(); }, speed); 
    }; 
    time = setTimeout(function() { instance(); }, speed); 
  }

  function stop() {
    clearTimeout(time)
  }
</script>
<template>
  <div class="container">
    <div>理想时间:{{ form.ideal }}</div>
    <div>实际时间:{{ form.real }}</div>
    <div>差值时间:{{ form.diff }}</div>
  </div>

  <button class="btn" @click="timer">开始</button>
  <button class="btn" @click="stop">停止</button>
</template>
<style scoped lang='scss'>
.container {
  padding: 24px;
}
.btn {
  width: 100px;
  height: 40px;
  border: 1px solid #333;
  text-align: center;
  line-height: 40px;
  margin-right: 30px;
  margin-top: 30px;
}
</style>

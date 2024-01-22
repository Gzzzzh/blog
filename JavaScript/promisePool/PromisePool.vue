<script setup>
  import { getUploadUrl } from './config'
  import { ref } from 'vue' 

  const resList = ref([])
  const current = ref(0)
  const callback = list => {
    current.value = list.filter(Boolean).length
  }

  function PromisePool (urlList, limit, finishCallback) {
    const resultList = []
    const pool = [] // 线程池
    let count = limit // 执行完毕数量,初始化时就先执行 limit 个任务
    const length = urlList.length
    if (length === 0) return
    
    return new Promise((resolve, reject) => {
      try {
        function _run (index) {
          const task = urlList[index]
          task(index).then(res => {
            resultList[index] = { message: `第${index}个任务成功`, value: res }
          }, (err) => {
            resultList[index] = { message: `第${index}个任务失败`, value: err }
          }).finally(() => {
            count++
            console.log("%c Line:23 🍩 count", "color:#ea7e5c", count, pool.length, count - limit, length);
            pool.splice(pool.indexOf(task) , 1)
            finishCallback && finishCallback(resultList)
            if (pool.length === 0 && (count - limit) === length) resolve(resultList)
            else if (pool.length < limit && count <= length) {
              pool.push(urlList[count - 1])
              _run(count - 1)
            }
          })
        }

        for (let index = 0; index < limit; index++) {
          pool.push(urlList[index])
          _run(index)
        } 
      } catch (error) {
        console.log('并发发生错误:' + error);
        reject(error)
      }
    })
  }


  async function start () {
    resList.value = []
    current.value = 0
    const res = await PromisePool(new Array(10).fill(0).map(item => getUploadUrl()), 5, callback)
    console.log("%c Line:54 🍌 res", "color:#ffdd4d", res);
    resList.value = res
  }
</script>
<template>
  <div>
    <button class="btn" @click="start">点我开始</button>
    <div>
      <div>结果列表</div>
      <div>进度 {{ current }} / 10</div>
      <div v-for="(item, index) in resList" :key="index">
        <text>message: {{ item && item.message }}</text>
        <text>value: {{ item && item.value }}</text>
      </div>
    </div>
  </div>
</template>
<style scoped lang='scss'>

</style>

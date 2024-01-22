<script setup>

  class PromisePoolDynamic {
    constructor (maxConcurrency) {
      // 任务队列
      this.queue = []
      // 最大并行限制
      this.limit = maxConcurrency
      // 当前执行任务数量
      this.runningCount = 0
    }

    addTask (task) {
      return new Promise((resolve, reject) => {
        const taskWithCallBack = { task, resolve, reject }
        if (this.runningCount < this.limit) {
          // 直接运行
          this._runTask(taskWithCallBack)
        } else {  
          // 先加入到任务队列等待
          this.queue.push(taskWithCallBack)
        }
      })
    }

    _runTask ({ task, resolve, reject }) {
      this.runningCount++
      task().then(resolve).catch(reject).finally(() => {
        this.runningCount--
        this._checkQueue()
      });
    }

    _checkQueue () {
      if (this.queue.length > 0 && this.runningCount < this.limit) {
        // 队列有等待任务,并且没有超出限制并发数时,取出第一个任务来执行
        const taskWithCallBack = this.queue.shift()
        console.log('并发池出现空位，取出等待队列的任务', taskWithCallBack)
        this._runTask(taskWithCallBack)
      }
    }
  }
  
</script>
<template>
  <div>
    
  </div>
</template>
<style scoped lang='scss'>

</style>

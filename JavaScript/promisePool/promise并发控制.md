<script setup>
  import PromisePool from './PromisePool.vue'
</script>

# Promise的并发控制 - 从普通并发池到动态并发池

## 场景
在前端大文件上传时，我们会采用分片上传模式。假设我们有一个100M的大文件，通过切割分成100个1M的文件，此时相当于我们有100个url要进行上传操作。此时为了性能和体验着想，要求并发请求书不能超过5个。

## 模拟接口
为了能更直观看到各种情况，这里采用promise等待一个setTimeOut定时器，然后随机resolve或者reject来模拟接口成功的失败，定时器的时间也模拟在1-10秒中随机
```js
const __random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

export const uploadUrl = (index) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      __random(1, 10) >= 8 ? resolve(index) : reject(index)
    }, __random(1, 10) * 1000);
  })
}
```

## 普通并发池
普通并发池子直接准备好100个文件分片在一个数组中,通过对这个数组的循环,判断当前队列是否满,满则等待,有空闲则补齐。

采用**递归**方式

<promise-pool />

```js
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
            // 每执行完一个任务,就在线程池删除,同时判断是否结束,没有结束就继续加入下个任务
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

        // 初始化时先直接往线程池塞入到限制数量
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
```

## 动态并发池
主要思路： 队未满则直接运行，队满则加入等待队列。任务完成后，检查等待队列是否有任务。

```js
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
```
# zhiwu-sdk项目

## 介绍
zhiwu-sdk是销冠crmApp中app和webviewH5里集合了互相通信功能的一个sdk

## 基本原理

1. H5端向APP通信: 通过**uni.webView.postMessage**向APP发送消息
2. APP向H5端通信: 通过**evalJs('zhiwuSdk.triggerMessageHandler(data)')**, 使用evalJs注入js的方式让h5端执行一段代码,可以实现把APP的通信信息传到H5端中

## sdk初始化

### 前提
在uniapp中使用webview时,想在webview中使用uni的api,需要引用**uni.webview.js**和在**UniAppJSBridgeReady**事件完成后才能正常使用

### initUniAppJSBridge
调用了initUniAppJSBridge事件来确保**UniAppJSBridgeReady**加载完成
```js
private initUniAppJSBridge () {
    return new Promise((resolve, reject) => {
      if (this.isUniAppJSBridgeReady) return resolve(true)
      try {
        document.addEventListener('UniAppJSBridgeReady', () => {
          this.isUniAppJSBridgeReady = true
          return resolve(true)
        })
      } catch (error) {
        reject(error)
      }
    })
  }
```

### dispatchMessageToNative
sdk使用dispatchMessageToNative方法,在里面使用uni.webView.postMessage跟App进行通信
然后通过registerHandler注册当前事件回调进messageHandlerSet集合里,等待App端响应后,最后通过evalJs方式来执行集合里该事件的回调
```ts
private dispatchMessageToNative<T>(action: string, data?: Record<string, any>): Promise<{ code: number, msg: string, data?: T }> {
 return new Promise(async (resolve) => {
   await this.initUniAppJSBridge()
   // @ts-ignore
   uni.webView.postMessage({
     data: {
       action, 
       data,
     },
   })

   this.registerHandler(action, (responseData: any) => {
     resolve(JSON.parse(responseData))
   })
 })
}

private registerHandler(handlerName: string, handler: (data: any) => void) {
 if (!this.messageHandlerSet[handlerName]) {
   this.messageHandlerSet[handlerName] = new Set()
 }
 this.messageHandlerSet[handlerName].add(handler)
}
```

### APP端接收并返回
APP端通过**APP-nvue**文件中wenview组件中的@onPostMessage事件实时接收消息,然后使用钩子函数**useAppSdk**中的**handlePostMessage**处理

可以看出最终通过注入js的方式,在webview端里面执行了**zhiwuSdk.triggerMessageHandler('${action}', '${JSON.stringify(message)}')**,把当前动作和数据都传输回去
```js
// 接收webview消息
function handlePostMessage (res: any) {
  const { action, data } = res.detail.data[0]
  // 用获取APP用户信息为例,通过evalJs方式在webview中直接使用sdk中的方法
  sendMessageToWebview('getUserInfo', { code: 200, msg: 'getUserInfo ok' }, { userInfo })
}

function sendMessageToWebview (action: string, msg: { code: number, msg: string }, data?: any) {
    const message: { code: number, msg: string, data?: any } = msg
    if (data) message.data = data
    if (!unref(wvRef)) {
      return uni.showToast({ title: '应用初始化失败', icon: 'none' })
    }
    unref(wvRef).evalJS(`zhiwuSdk.triggerMessageHandler('${action}', '${JSON.stringify(message)}')`)
  }
```

### zhiwuSdk.triggerMessageHandler
最后执行sdk中的triggerMessageHandler,把前面注册并放入set集合的回调拿出来执行,回调里面把dispatchMessageToNative这个的promise给resolve掉,最后让await zhiwusdk.xxx()结束调用
```js
/**
   * 触发 registerHandler() 注册的函数回调。
   * 注意：在 App 端是直接 evalJs('zhiwuSdk.triggerMessageHandler()') 调用此函数
   * @param action
   * @param data
   */
  triggerMessageHandler(action: string, data: string) {
    if (!this.messageHandlerSet[action]) {
      console.log('zhiwu-sdk:', '调用错误')
      return
    }
    this.messageHandlerSet[action].forEach(callback => callback(data))
    this.messageHandlerSet[action].clear()
  }
```
export const sidebar = [
  {
    text: 'Hello World',
    link: '/example/index.md'
  },
  {
    text: 'JavaScript',
    collapsed: true,
    items: [
      {
        text: '函数柯里化',
        link: '/JavaScript/curry/函数柯里化'
      },
      {
        text: '实现一个符合a+规范的promise',
        link: '/JavaScript/promise/实现一个符合a+规范的promise'
      },
      {
        text: '如何让setTimeout准时执行',
        link: '/JavaScript/setTimeout/如何让setTimeout准时执行'
      },
      {
        text: 'promise并发控制',
        link: '/JavaScript/promisePool/promise并发控制'
      },
      {
        text: '大文件上传',
        link: '/JavaScript/bigFileUpload/大文件上传'
      },
      {
        text: '无感刷新token',
        link: '/JavaScript/refreshToken/无感刷新token'
      },
      {
        text: 'async和promise的执行顺序',
        link: '/JavaScript/async2promise/async和promise的执行顺序'
      },
    ]
  },
  {
    text: '手写题',
    collapsed: true,
    items: [
      {
        text: '菜单数组转树',
        link: '/practice/menuArrayToTree/菜单数组转树'
      },
      {
        text: '大屏自适应scale方案',
        link: '/practice/dataScreenScale/大屏自适应scale方案'
      },
      {
        text: '实现一个bind',
        link: '/practice/bind/实现一个bind'
      },
      {
        text: '实现一个拖拽的hook',
        link: '/practice/dragHook/实现一个拖拽的hook'
      },
    ]
  }
]
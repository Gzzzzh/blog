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
    ]
  }
]
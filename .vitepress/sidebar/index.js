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
  },
  {
    text: '项目相关',
    collapsed: true,
    items: [
      {
        text: '简单封装一个sdk',
        link: '/project/sleep/简单封装一个sdk'
      },
      {
        text: 'zhiwu-sdk的实现流程',
        link: '/project/zhiwuSdk/zhiwu-sdk的实现流程'
      },
      {
        text: '后台-封装sw-filter和hook钩子',
        link: '/project/adminFilterTableHook/封装sw-filter和hook钩子'
      },
      {
        text: '后台-管理后台打包编译优化',
        link: '/project/adminPackage/管理后台打包编译优化'
      },
      {
        text: '后台-菜单路由角色组织架构权限模块',
        link: '/project/adminAuth/菜单路由角色组织架构权限模块'
      },
      {
        text: '小程序-项目详情优化过程',
        link: '/project/miniDetail/小程序项目详情优化过程'
      },
      {
        text: '小程序-uniApp中微信小程序异步分包插件',
        link: '/project/miniComponentHolderPlugin/uniApp中微信小程序异步分包插件'
      },
      {
        text: '小程序-自动打包上传和选择分包编译脚本',
        link: '/project/miniNodeScript/自动打包上传和选择分包编译脚本'
      },
      {
        text: '组件库中表单校验处理',
        link: '/project/uiForm/uview中表单校验处理'
      },
      {
        text: '客户描摹自定义配置表单',
        link: '/project/formDepict/客户描摹自定义配置表单'
      },
    ]
  }
]
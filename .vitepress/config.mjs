import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Gzzzh blogs",
  description: "Gzzzh的前端学习",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      {
        text: 'more',
        collapsed: true,
        items: [
          {
            text: 'Hello World',
            link: '/example/index.md'
          },
        ]
      }
    ],

    sidebar: [
      {
        text: 'Hello World',
        link: '/example/index.md'
      },
      {
        text: 'JavaScript',
        collapsed: true,
        items: [
          {
            text: '如何让setTimeout准时执行',
            link: '/JavaScript/setTimeout/如何让setTimeout准时执行'
          }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://gitee.com/Gzzzh/blog' }
    ]
  }
})

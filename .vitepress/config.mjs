import { defineConfig } from 'vitepress'
import { sidebar } from './sidebar'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/',
  title: "Gzzzh blogs",
  description: "Gzzzh的前端学习",
  markdown: {
    image: {
      // 默认禁用图片懒加载
      lazyLoading: true
    }
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      {
        text: 'more',
        items: [
          {
            text: 'Hello World',
            link: '/example/index.md',
          },
        ]
      },
      {
        text: 'Dropdown Menu',
        items: [
          {
            // 该部分的标题
            text: 'Section A Title',
            items: [
              { text: 'Section A Item A', link: '...' },
              { text: 'Section B Item B', link: '...' }
            ]
          },
          {
            // 该部分的标题
            text: 'Section B Title',
            items: [
              { text: 'Section A Item A', link: '...' },
              { text: 'Section B Item B', link: '...' }
            ]
          },
        ]
      },
    ],

    sidebar,

    socialLinks: [
      { icon: 'github', link: 'https://gitee.com/Gzzzh/blog' }
    ]
  }
})

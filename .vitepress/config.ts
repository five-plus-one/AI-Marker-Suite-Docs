import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: 'AI-Marker-Suite',
  description: 'AI 批改助手 — 晚上挂机睡觉，早上起来全改完',
  base: '/AI-Marker-Suite-Docs/',

  head: [
    ['link', { rel: 'icon', href: '/AI-Marker-Suite-Docs/favicon.ico' }],
  ],

  themeConfig: {
    logo: '/logo.png',
    siteTitle: 'AI 批改助手',

    nav: [
      { text: '快速上手', link: '/guide/introduction' },
      { text: '配置', link: '/config/api-setup' },
      { text: '平台', link: '/platforms/zhixue' },
      { text: '开发者', link: '/advanced/adapter-dev' },
      { text: '更新日志', link: '/changelog' },
      {
        text: 'v1.11.2',
        items: [
          { text: '一键安装脚本', link: 'https://auto-update.aimarking.five-plus-one.com/ota/ai_marker.user.js' },
          { text: 'GitHub 源码', link: 'https://github.com/five-plus-one/AI-Marker-Suite' },
          { text: '问题反馈', link: 'https://github.com/five-plus-one/AI-Marker-Suite/issues' },
        ],
      },
    ],

    sidebar: {
      '/guide/': [
        {
          text: '入门',
          items: [
            { text: '项目介绍', link: '/guide/introduction' },
            { text: '安装教程', link: '/guide/installation' },
            { text: '快速上手', link: '/guide/quickstart' },
            { text: '常见问题', link: '/guide/faq' },
          ],
        },
      ],
      '/config/': [
        {
          text: '配置',
          items: [
            { text: 'AI 接口配置', link: '/config/api-setup' },
            { text: '评分规则', link: '/config/rubric' },
            { text: '预设方案管理', link: '/config/presets' },
            { text: '分小题配置', link: '/config/sub-questions' },
          ],
        },
      ],
      '/modes/': [
        {
          text: '批改模式',
          items: [
            { text: '普通模式', link: '/modes/normal' },
            { text: '试改模式', link: '/modes/trial' },
            { text: '无人值守模式', link: '/modes/unattended' },
          ],
        },
      ],
      '/platforms/': [
        {
          text: '支持平台',
          items: [
            { text: '智学网', link: '/platforms/zhixue' },
            { text: '七天网络', link: '/platforms/qitian' },
          ],
        },
      ],
      '/advanced/': [
        {
          text: '进阶',
          items: [
            { text: '分数纠错', link: '/advanced/correction' },
            { text: '批改历史', link: '/advanced/history' },
            { text: '开发新适配器', link: '/advanced/adapter-dev' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/five-plus-one/AI-Marker-Suite' },
    ],

    footer: {
      message: '基于 MIT 许可证发布',
      copyright: 'Copyright © 2026 5plus1',
    },

    search: {
      provider: 'local',
    },

    editLink: {
      pattern: 'https://github.com/five-plus-one/AI-Marker-Suite-Docs/edit/main/:path',
      text: '在 GitHub 上编辑此页',
    },

    lastUpdated: {
      text: '最后更新于',
    },

    docFooter: {
      prev: '上一页',
      next: '下一页',
    },

    outline: {
      label: '本页目录',
    },

    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
  },
})

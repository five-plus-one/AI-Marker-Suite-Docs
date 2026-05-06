import { defineConfig } from 'vitepress'

// 环境变量 BASE_URL：本地构建默认 '/'，GitHub Actions 构建传入 '/AI-Marker-Suite-Docs/'
const BASE = process.env.BASE_URL || '/'
const SITE_URL = 'https://aimarking.five-plus-one.com'

export default defineConfig({
  lang: 'zh-CN',
  title: 'AI 批改助手',
  description: 'AI 批改助手 — 基于多模态 AI 的在线阅卷自动批改工具，支持智学网和七天网络。晚上挂机睡觉，早上起来全改完。',
  base: BASE,
  cleanUrls: true,

  // ========== SEO: Sitemap ==========
  sitemap: {
    hostname: SITE_URL,
  },

  // ========== SEO & GEO: Head Meta ==========
  head: [
    // Favicon
    ['link', { rel: 'icon', type: 'image/png', href: `${BASE}img/icon.png` }],

    // SEO: Canonical & Robots
    ['link', { rel: 'canonical', href: SITE_URL }],
    ['meta', { name: 'robots', content: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1' }],

    // SEO: Open Graph
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'AI 批改助手' }],
    ['meta', { property: 'og:title', content: 'AI 批改助手 — 让 AI 替你改卷' }],
    ['meta', { property: 'og:description', content: '基于多模态 AI 的在线阅卷自动批改工具。支持智学网、七天网络，自动识别手写答案并评分，三种批改模式，支持分小题评分和分数纠错。' }],
    ['meta', { property: 'og:url', content: SITE_URL }],
    ['meta', { property: 'og:image', content: `${SITE_URL}/img/1.png` }],
    ['meta', { property: 'og:image:width', content: '1200' }],
    ['meta', { property: 'og:image:height', content: '630' }],
    ['meta', { property: 'og:locale', content: 'zh_CN' }],

    // SEO: Twitter Card
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: 'AI 批改助手 — 让 AI 替你改卷' }],
    ['meta', { name: 'twitter:description', content: '基于多模态 AI 的在线阅卷自动批改工具。支持智学网、七天网络，三种批改模式，支持分小题评分和分数纠错。' }],
    ['meta', { name: 'twitter:image', content: `${SITE_URL}/img/1.png` }],

    // SEO: Additional Keywords
    ['meta', { name: 'keywords', content: 'AI批改,AI阅卷,自动批改,智能阅卷,智学网,七天网络,主观题批改,作文批改,Tampermonkey,油猴脚本,AI评分,在线阅卷助手' }],

    // GEO: AI crawler hints
    ['meta', { name: 'ai-purpose', content: 'AI批改助手是一款Tampermonkey用户脚本，用于在智学网和七天网络阅卷平台上自动批改主观题试卷' }],

    // GEO: Structured Data (JSON-LD) - SoftwareApplication
    ['script', { type: 'application/ld+json' }, JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'AI 批改助手',
      alternateName: 'AI-Marker-Suite',
      description: '基于多模态 AI 的在线阅卷自动批改工具，支持智学网和七天网络。自动识别手写答案并评分，支持三种批改模式、分小题评分和分数纠错。',
      url: SITE_URL,
      applicationCategory: 'EducationalApplication',
      operatingSystem: '浏览器（Tampermonkey）',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'CNY',
        description: '脚本免费开源，AI服务需付费使用',
      },
      author: {
        '@type': 'Organization',
        name: '5plus1',
        url: 'https://five-plus-one.com',
      },
      softwareVersion: '1.11.2',
      screenshot: `${SITE_URL}/img/1.png`,
      featureList: [
        'AI自动评分：多模态视觉识别手写答案',
        '三种批改模式：普通模式、试改模式、无人值守模式',
        '分小题评分：大题拆分为多个小题分别评分',
        '分数纠错：AI自动分析评分差异并优化评分标准',
        '多平台支持：智学网、七天网络',
        '多服务商兼容：5+1 AI、火山引擎、硅基流动等支持图片识别的接口',
        '评阅历史：记录、筛选、导出HTML报告',
        '配置导入导出：JSON备份与恢复',
      ],
    })],

    // GEO: Structured Data - WebSite with SearchAction
    ['script', { type: 'application/ld+json' }, JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'AI 批改助手',
      url: SITE_URL,
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${SITE_URL}/?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    })],

    // GEO: Structured Data - FAQPage (for guide/faq)
    ['script', { type: 'application/ld+json' }, JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'AI批改助手手机能用吗？',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '不能。AI批改助手是浏览器脚本，必须在电脑端的Edge浏览器中运行。手机、平板、微信内置浏览器均不支持。',
          },
        },
        {
          '@type': 'Question',
          name: 'AI批改助手用什么浏览器？',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '推荐Edge浏览器（Windows 10/11自带）。Chrome也可以但扩展商店在国内无法访问。360安全浏览器、搜狗浏览器等不支持。',
          },
        },
        {
          '@type': 'Question',
          name: 'AI批改助手识别不准怎么办？',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '填写「题目内容」「标准答案」「评分标准」三项，准确率会大幅提升。建议先用试改模式批改几份试卷，使用纠错功能优化评分标准。',
          },
        },
        {
          '@type': 'Question',
          name: 'AI批改助手支持哪些平台？',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '目前支持智学网（zhixue.com）和七天网络（7net.cc / qt7.net / yj5.7net.cc），通过适配器模式自动检测当前平台。',
          },
        },
        {
          '@type': 'Question',
          name: 'AI批改助手支持哪些AI服务商？',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '需要支持图片识别的多模态模型。推荐5+1 AI，也支持火山引擎、硅基流动。DeepSeek等纯文本模型不能使用。',
          },
        },
        {
          '@type': 'Question',
          name: 'AI批改助手支持哪些题型？',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '所有有手写答案的主观题都支持：作文、解答题、论述题、简答题、翻译题等。客观题请使用阅卷平台自带功能。',
          },
        },
      ],
    })],

    // GEO: Structured Data - HowTo (Installation)
    ['script', { type: 'application/ld+json' }, JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: '如何安装和使用 AI 批改助手',
      description: '3分钟完成AI批改助手的安装和配置，开始自动批改主观题试卷',
      step: [
        {
          '@type': 'HowToStep',
          name: '安装 Tampermonkey 扩展',
          text: '在浏览器中安装 Tampermonkey（油猴）脚本管理器扩展',
          url: `${SITE_URL}/guide/installation`,
        },
        {
          '@type': 'HowToStep',
          name: '安装 AI 批改助手脚本',
          text: '点击一键安装链接，通过 Tampermonkey 安装 AI 批改助手用户脚本',
          url: `${SITE_URL}/guide/installation`,
        },
        {
          '@type': 'HowToStep',
          name: '配置 API 密钥',
          text: '打开阅卷页面，在设置面板中填入 AI 服务的 API 密钥',
          url: `${SITE_URL}/guide/quickstart`,
        },
        {
          '@type': 'HowToStep',
          name: '开始批改',
          text: '点击右下角 AI 批改按钮，脚本自动下载答题卡、AI评分、填分提交',
          url: `${SITE_URL}/guide/quickstart`,
        },
      ],
    })],

    // GEO: llms.txt - for AI crawlers
    ['link', { rel: 'alternate', type: 'text/plain', title: 'llms.txt', href: '/llms.txt' }],
  ],

  // ========== Theme Config ==========
  themeConfig: {
    logo: '/img/icon.png',
    siteTitle: 'AI 批改助手',

    nav: [
      { text: '快速上手', link: '/guide/introduction' },
      { text: '配置', link: '/config/api-setup' },
      { text: '平台', link: '/platforms/zhixue' },
      { text: '开发者', link: '/advanced/adapter-dev' },
      { text: '更新日志', link: '/changelog' },
      {
        text: '加入社群',
        items: [
          { text: '微信交流群', link: 'https://r-l.ink/s/L9Akf' },
          { text: 'QQ 交流群', link: 'https://r-l.ink/s/WbMrR' },
        ],
      },
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
            { text: '概述', link: '/guide/' },
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
            { text: '概述', link: '/config/' },
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
            { text: '概述', link: '/modes/' },
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
            { text: '概述', link: '/platforms/' },
            { text: '智学网', link: '/platforms/zhixue' },
            { text: '七天网络', link: '/platforms/qitian' },
          ],
        },
      ],
      '/advanced/': [
        {
          text: '进阶',
          items: [
            { text: '概述', link: '/advanced/' },
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
      message: '友情链接：<a href="https://five-plus-one.com/" target="_blank">五加一</a> · <a href="https://api.ai.five-plus-one.com/" target="_blank">5+1 AI</a><br><a href="https://beian.miit.gov.cn/" target="_blank" rel="nofollow">苏ICP备2025155286号-1</a> | <a href="https://beian.mps.gov.cn/" target="_blank" rel="nofollow">苏公网安备32060202002665号</a><br>本站由 <a href="https://r-l.ink/rain" target="_blank">雨云</a> 提供云计算服务，由 <a href="https://r-l.ink/upyun" target="_blank">又拍云</a> 提供文件下载 CDN 加速服务',
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

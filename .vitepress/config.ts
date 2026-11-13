import { defineConfig } from 'vitepress'
import { productDescription, productFeatures, platformNames, stableRelease } from '../site/product.mjs'

// 环境变量 BASE_URL：本地构建默认 '/'，GitHub Actions 构建传入 '/AI-Marker-Suite-Docs/'
const BASE = process.env.BASE_URL || '/'
const SITE_URL = 'https://aimarking.five-plus-one.com'

export default defineConfig({
  lang: 'zh-CN',
  srcExclude: ['**/AGENTS.md'],
  title: 'AI 批改助手',
  titleTemplate: false,
  description: productDescription,
  base: BASE,
  cleanUrls: true,

  markdown: {
    math: true,
    config(md) {
      const tableOpen = md.renderer.rules.table_open || ((tokens, idx, options, env, self) => self.renderToken(tokens, idx, options))
      const tableClose = md.renderer.rules.table_close || ((tokens, idx, options, env, self) => self.renderToken(tokens, idx, options))

      md.renderer.rules.table_open = (tokens, idx, options, env, self) => {
        return `<div class="table-wrapper">${tableOpen(tokens, idx, options, env, self)}`
      }

      md.renderer.rules.table_close = (tokens, idx, options, env, self) => {
        return `${tableClose(tokens, idx, options, env, self)}</div>`
      }
    },
  },

  // ========== SEO: Sitemap ==========
  sitemap: {
    hostname: SITE_URL,
    transformItems: items => items.filter(item => !item.url.includes("feedback/thankyou") && !item.url.includes("404")),
  },

  // ========== SEO & GEO: Head Meta ==========
  head: [
    // Favicon
    ['link', { rel: 'icon', type: 'image/svg+xml', href: `${BASE}img/marker-logo.svg` }],

    // SEO: Canonical & Robots
    ['link', { rel: 'canonical', href: SITE_URL }],
    ['meta', { name: 'robots', content: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1' }],

    // SEO: Open Graph
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'AI 批改助手' }],
    ['meta', { property: 'og:title', content: 'AI 批改助手 — 让 AI 替你改卷' }],
    ['meta', { property: 'og:description', content: productDescription }],
    ['meta', { property: 'og:url', content: SITE_URL }],
    ['meta', { property: 'og:image', content: `${SITE_URL}/img/1.png` }],
    ['meta', { property: 'og:image:width', content: '1200' }],
    ['meta', { property: 'og:image:height', content: '630' }],
    ['meta', { property: 'og:locale', content: 'zh_CN' }],

    // SEO: Twitter Card
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: 'AI 批改助手 — 让 AI 替你改卷' }],
    ['meta', { name: 'twitter:description', content: productDescription }],
    ['meta', { name: 'twitter:image', content: `${SITE_URL}/img/1.png` }],

    // SEO: Additional Keywords
    ['meta', { name: 'keywords', content: ['AI批改助手', 'AI阅卷', '手写识别', '双评仲裁', 'Tampermonkey', ...platformNames].join(',') }],


    // GEO: Structured Data (JSON-LD) - SoftwareApplication
    ['script', { type: 'application/ld+json' }, JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'AI 批改助手',
      alternateName: 'AI-Marker-Suite',
      description: productDescription,
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
      softwareVersion: stableRelease.version,
      screenshot: `${SITE_URL}/img/1.png`,
      featureList: productFeatures,
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
            text: `支持 ${platformNames.length} 个阅卷平台：${platformNames.join('、')}。各平台支持的任务类型与操作要求见平台指南。`,
          },
        },
        {
          '@type': 'Question',
          name: 'AI批改助手支持哪些AI服务商？',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '需要能处理图片输入的服务与模型。推荐使用5+1 AI内置配置；自定义端点时请核实服务的图片处理能力。',
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
    logo: '/img/marker-logo.svg',
    siteTitle: 'AI 批改助手',

    nav: [
      { text: '快速上手', link: '/guide/', activeMatch: '^/guide/' },
      { text: '配置', link: '/config/', activeMatch: '^/config/' },
      { text: '批改模式', link: '/modes/', activeMatch: '^/modes/' },
      { text: '平台', link: '/platforms/', activeMatch: '^/platforms/' },
      { text: '进阶', link: '/advanced/', activeMatch: '^/advanced/' },
      {
        text: '资源',
        items: [
          { text: '工具', link: '/tools' },
          { text: '更新日志', link: '/changelog' },
          { text: '帮助中心', link: '/support' },
          { text: '服务状态', link: 'https://status.five-plus-one.com/status/aimarking', target: '_blank' },
        ],
      },
      {
        text: '下载', // 固定短文案：长版本号会把导航栏撑宽，导致页面横向溢出
        items: [
          { text: '安装稳定版（推荐）', link: 'https://auto-update.aimarking.five-plus-one.com/ota/ai_marker.user.js' },
          { text: '安装预览版（尝鲜）', link: 'https://auto-update.aimarking.five-plus-one.com/ota/preview/ai_marker.user.js' },
          { text: 'GitHub 源码', link: 'https://github.com/five-plus-one/AI-Marker-Suite' },
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
            { text: '油猴脚本安装', link: '/guide/userscript-install' },
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
            { text: '批改工作流', link: '/config/workflow' },
            { text: '评分规则', link: '/config/rubric' },
            { text: '预设方案管理', link: '/config/presets' },
            { text: '分小题配置', link: '/config/sub-questions' },
            { text: '公式语法指南', link: '/config/formula' },
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
            { text: '双评模式', link: '/modes/dual' },
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
            { text: '好分数', link: '/platforms/haofenshu' },
            { text: '五岳阅卷', link: '/platforms/wuyue' },
            { text: '阅小二', link: '/platforms/haoyuejuan' },
            { text: '华翰云', link: '/platforms/hanhan' },
            { text: '光大阅卷', link: '/platforms/guangda' },
            { text: '云阅卷', link: '/platforms/yunyuejuan' },
            { text: '新教育', link: '/platforms/xinjiaoyu' },
            { text: '润建学情', link: '/platforms/runjian' },
            { text: '54学霸', link: '/platforms/xueba54' },
            { text: '九科星', link: '/platforms/jiukexing' },
            { text: '慧阅卷', link: '/platforms/huiyuejuan' },
            { text: '乐华阅卷', link: '/platforms/lehua' },
            { text: '鑫考', link: '/platforms/xinkao' },
            { text: '慧学星', link: '/platforms/huixuexing' },
            { text: '粤教翔云', link: '/platforms/yuejiaoxiangyun' },
            { text: '云阅卷(好分数)', link: '/platforms/haofenshuyize' },
            { text: '科耘阅卷', link: '/platforms/keewing' },
            { text: '懂你系统', link: '/platforms/dongni' },
            { text: '学科网 e卷通', link: '/platforms/xkw' },
            { text: '启光优测', link: '/platforms/qiguang' },
            { text: '诊学网', link: '/platforms/zhenxue' },
            { text: '焦作精准教学', link: '/platforms/jzsmartedu' },
            { text: '光大阅卷V2', link: '/platforms/guangda-2' },
            { text: '威科姆(悦卷通)', link: '/platforms/weicom' },
            { text: 'C30教育云', link: '/platforms/c30' },
            { text: 'AMEQP网上评卷', link: '/platforms/ameqp' },
            { text: '海云智评', link: '/platforms/haiyun' },
            { text: '鑫考(内网)', link: '/platforms/xinkao-2' },
            { text: '九五优评', link: '/platforms/jiuwuyouping' },
            { text: '上进教育服务云', link: '/platforms/sipd' },
            { text: '南昊AI教学提分', link: '/platforms/nhcisc' },
            { text: '鑫考校园', link: '/platforms/xinkao-campus' },
            { text: '酷鱼网', link: '/platforms/kuyuu' },
            { text: 'A佳教育', link: '/platforms/ajia' },
            { text: '云阅卷(开州)', link: '/platforms/kzedu' },
            { text: '正确阅卷', link: '/platforms/yuejuan' },
            { text: '精斗云(大数据精准教学)', link: '/platforms/jingdouyun' },
            { text: '小帆智能阅卷', link: '/platforms/xfkj' },
            { text: '睿芽考试服务云', link: '/platforms/ruiya' },
            { text: '恒佳考试服务云', link: '/platforms/yuejuan51' },
            { text: '小闲 AI 网上阅卷（预览版）', link: '/platforms/xiaoxianai' },
            { text: '园丁邦云阅卷（预览版）', link: '/platforms/yuandingbang' },
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
      options: {
        translations: {
          button: { buttonText: '搜索文档', buttonAriaLabel: '搜索文档' },
          modal: {
            displayDetails: '显示详细结果',
            resetButtonTitle: '清空搜索',
            backButtonTitle: '返回',
            noResultsText: '没有找到相关内容',
            footer: { selectText: '打开', navigateText: '切换结果', closeText: '关闭' },
          },
        },
      },
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

import DefaultTheme from 'vitepress/theme'
import './custom.css'
import { updateNavVersion, initChangelogPage } from './fetchManifest'
import type { Theme } from 'vitepress'
import { h } from 'vue'
import HomeHero from './HomeHero.vue'
import HomeSections from './HomeSections.vue'

const CardGrid = {
  name: 'CardGrid',
  setup(_, { slots }) {
    return () => h('div', { class: 'ams-card-grid' }, slots.default?.())
  },
}

const Card = {
  name: 'Card',
  props: {
    title: String,
    href: String,
    description: String,
  },
  setup(props) {
    return () =>
      h(
        'a',
        {
          class: 'ams-card',
          href: props.href,
        },
        [
          h('span', { class: 'ams-card__title' }, props.title),
          h('span', { class: 'ams-card__description' }, props.description),
        ],
      )
  },
}

export default {
  extends: DefaultTheme,
  enhanceApp({ app, router }) {
    app.component('CardGrid', CardGrid)
    app.component('Card', Card)
    app.component('HomeHero', HomeHero)
    app.component('HomeSections', HomeSections)

    // 仅在客户端执行
    if (typeof window === 'undefined') return

    // 页面加载完成后执行
    const init = () => {
      // 初始执行
      updateNavVersion()
      initChangelogPage()

      // 监听路由变化
      router.onAfterRouteChanged = (to) => {
        setTimeout(() => {
          updateNavVersion()
          initChangelogPage()
        }, 300)
      }
    }

    // 等待 DOM 加载完成
    if (document.readyState === 'complete') {
      setTimeout(init, 100)
    } else {
      window.addEventListener('load', () => setTimeout(init, 100))
    }
  }
} satisfies Theme

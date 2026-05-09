import DefaultTheme from 'vitepress/theme'
import './custom.css'
import { updateNavVersion, initChangelogPage } from './fetchManifest'
import type { Theme } from 'vitepress'

export default {
  extends: DefaultTheme,
  enhanceApp({ app, router }) {
    // 仅在客户端执行
    if (typeof window === 'undefined') return

    console.log('[Theme] enhanceApp 执行')

    // 页面加载完成后执行
    const init = () => {
      console.log('[Theme] 初始化客户端脚本')

      // 初始执行
      updateNavVersion()
      initChangelogPage()

      // 监听路由变化
      router.onAfterRouteChanged = (to) => {
        console.log('[Theme] 路由变化:', to)
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

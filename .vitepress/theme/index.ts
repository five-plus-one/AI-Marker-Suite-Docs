import DefaultTheme from 'vitepress/theme'
import './custom.css'
import { updateNavVersion, initChangelogPage } from './fetchManifest'

export default {
  extends: DefaultTheme,
  setup() {
    // 仅在客户端执行
    if (typeof window !== 'undefined') {
      // 页面加载后执行
      setTimeout(() => {
        updateNavVersion()
        initChangelogPage()
      }, 500)

      // VitePress 路由变化时执行
      if (typeof window !== 'undefined') {
        const observer = new MutationObserver(() => {
          updateNavVersion()
          initChangelogPage()
        })
        observer.observe(document.body, { childList: true, subtree: true })
      }
    }
  }
}

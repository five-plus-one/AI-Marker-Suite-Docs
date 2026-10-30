<script setup>
import DefaultTheme from 'vitepress/theme'
import {useData,useRoute,withBase} from 'vitepress'
import {computed,ref,onMounted,onUnmounted,watch,nextTick} from 'vue'
import {mountSharedSearch,mountReadingActions} from '../../site/reading-islands.jsx'
const {theme,page}=useData(),route=useRoute(),searchHost=ref(),actionsHost=ref()
const section=computed(()=>Object.entries(theme.value.sidebar||{}).find(([prefix])=>route.path.startsWith(withBase(prefix))))
const sectionNames={'/guide/':'开始使用','/config/':'配置指南','/modes/':'批改模式','/platforms/':'阅卷平台','/advanced/':'进阶使用'}
const descriptions={'/guide/':'从安装到第一次批改，按步骤开始。','/config/':'配置接口与评分标准，找到适合你的工作方式。','/modes/':'按批改场景选择确认、自动或双评流程。','/platforms/':'找到你使用的阅卷平台。','/advanced/':'回看批改记录，探索更多用法。'}
const sectionName=computed(()=>sectionNames[section.value?.[0]]||'文档')
const pageName=computed(()=>page.value.title.replace(/\s*[—|]\s*AI 批改助手$/,''))
let searchRoot,actionsRoot
const updateActions=async()=>{await nextTick();actionsRoot?.unmount();actionsRoot=actionsHost.value?mountReadingActions(actionsHost.value):undefined}
onMounted(()=>{searchRoot=mountSharedSearch(searchHost.value);updateActions()})
watch(()=>route.path,updateActions)
onUnmounted(()=>{searchRoot?.unmount();actionsRoot?.unmount()})
</script>

<template>
  <DefaultTheme.Layout>
    <template #nav-bar-content-before><div ref="searchHost" class="fp-docs-search-host" /></template>
    <template #sidebar-nav-before>
      <div v-if="section" class="fp-docs-section-index">
        <small>AI MARKER / DOCS</small><strong>{{sectionName}}</strong>
        <p>{{descriptions[section[0]]}}</p>
      </div>
    </template>
    <template #doc-before>
      <div class="fp-docs-context">
        <nav aria-label="当前位置"><a :href="withBase('/')">文档首页</a><span aria-hidden="true">/</span><a v-if="section" :href="withBase(section[0])">{{sectionName}}</a><span v-else>{{pageName}}</span></nav>
        <div ref="actionsHost" class="fp-docs-context-actions" />
      </div>
    </template>
  </DefaultTheme.Layout>
</template>

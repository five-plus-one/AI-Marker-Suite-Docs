<template>
  <section class="home-hero" aria-labelledby="home-hero-title">
    <div class="home-hero__pattern" aria-hidden="true">
      <div v-for="row in 7" :key="row" class="home-hero__pattern-row">
        <span v-for="item in 8" :key="item">AI MARKER</span>
      </div>
    </div>

    <div class="home-hero__scan" aria-hidden="true"></div>

    <div class="home-hero__content">
      <p class="home-hero__eyebrow">Open source grading assistant</p>
      <h1 id="home-hero-title">AI 批改助手</h1>
      <p class="home-hero__subtitle">让 AI 替你改卷</p>
      <p class="home-hero__description">
        基于多模态 AI 的在线阅卷自动批改工具，支持主流阅卷平台、双评仲裁、
        分小题评分与批改历史，适合日常批改和大批量试卷处理。
      </p>

      <div class="home-hero__actions">
        <a class="home-hero__button home-hero__button--primary" href="/guide/installation">安装教程</a>
        <a class="home-hero__button" href="/guide/quickstart">快速上手</a>
        <a class="home-hero__button" href="https://github.com/five-plus-one/AI-Marker-Suite">GitHub</a>
      </div>
    </div>

    <div class="home-hero__console" aria-label="功能概览">
      <div class="home-hero__console-head">
        <span>WORKFLOW</span>
        <span>READY</span>
      </div>
      <div class="home-hero__console-body">
        <div class="home-hero__metric">
          <span>01</span>
          <strong>识别答题卡</strong>
        </div>
        <div class="home-hero__metric">
          <span>02</span>
          <strong>按规则评分</strong>
        </div>
        <div class="home-hero__metric">
          <span>03</span>
          <strong>填分并提交</strong>
        </div>
      </div>
    </div>

    <div class="home-hero__marquee" aria-hidden="true">
      <div class="home-hero__marquee-track">
        <span>智学网</span>
        <span>七天网络</span>
        <span>好分数</span>
        <span>五岳阅卷</span>
        <span>华翰云</span>
        <span>光大阅卷</span>
        <span>云阅卷</span>
        <span>新教育</span>
        <span>智学网</span>
        <span>七天网络</span>
        <span>好分数</span>
        <span>五岳阅卷</span>
      </div>
    </div>
  </section>

  <section class="home-feature-strip" aria-label="核心能力">
    <a v-for="feature in features" :key="feature.title" :href="feature.href" class="home-feature-strip__item">
      <span>{{ feature.index }}</span>
      <strong>{{ feature.title }}</strong>
      <small>{{ feature.text }}</small>
    </a>
  </section>
</template>

<script setup lang="ts">
const features = [
  {
    index: '01',
    title: '全自动评分',
    text: '识别、评分、评语生成',
    href: '/guide/introduction',
  },
  {
    index: '02',
    title: '无人值守',
    text: '挂机批改与自动重试',
    href: '/modes/unattended',
  },
  {
    index: '03',
    title: '双评仲裁',
    text: '两个模型独立评分',
    href: '/modes/dual',
  },
  {
    index: '04',
    title: '批改历史',
    text: '记录、筛选与导出',
    href: '/advanced/history',
  },
]
</script>

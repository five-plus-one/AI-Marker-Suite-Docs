<script setup>
import { withBase } from 'vitepress'
import releases from '../../site/release-notes.json'
const stableVersion = releases.stable.version
</script>

<template>
  <section class="home-hero" aria-labelledby="home-hero-title">
    <div class="home-hero__pattern" aria-hidden="true">
      <div v-for="row in 4" :key="row" class="home-hero__pattern-row">
        <span v-for="item in 4" :key="item">AI MARKER</span>
      </div>
    </div>

    <div class="home-hero__scan" aria-hidden="true"></div>

    <div class="home-hero__content">
      <p class="home-hero__eyebrow">Open source grading assistant</p>
      <h1 id="home-hero-title">AI 批改助手</h1>
      <p class="home-hero__subtitle">按评分标准批改手写答卷</p>
      <p class="home-hero__description">
        在支持的网页阅卷任务中识别手写作答、建议得分并填写原站分数。支持试改确认、
        分小题评分、双评仲裁和评阅历史导出。
      </p>

      <div class="home-hero__actions">
        <a class="home-hero__button home-hero__button--primary" :href="withBase('/guide/installation')">安装教程</a>
        <a class="home-hero__button" :href="withBase('/platforms/')">查看支持平台</a>
        <a class="home-hero__button" href="https://github.com/five-plus-one/AI-Marker-Suite">GitHub</a>
      </div>
    </div>

    <div class="home-hero__meta" aria-label="核心能力">
      <span>稳定版 {{ stableVersion }}</span>
      <span>双评仲裁</span>
      <span>批改历史</span>
      <span>开源免费</span>
    </div>
  </section>
</template>

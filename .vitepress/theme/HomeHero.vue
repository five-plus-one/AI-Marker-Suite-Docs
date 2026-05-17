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

    <div class="home-hero__meta" aria-label="核心能力">
      <span>多平台</span>
      <span>双评仲裁</span>
      <span>批改历史</span>
      <span>开源免费</span>
    </div>
  </section>
</template>

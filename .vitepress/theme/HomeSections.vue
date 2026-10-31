<template>
  <main class="home-sections">
    <section id="home-features-title" class="home-panel home-panel--showcase" data-fp-reveal="" aria-labelledby="home-product-title">
      <div class="fp-showcase-copy">
        <p class="home-kicker">AI MARKER / WORKFLOW</p>
        <span id="为什么你需要它" class="fp-anchor-alias" aria-hidden="true"></span>
        <h2 id="home-product-title">把重复交给 AI，<br />把判断留给你。</h2>
        <p class="home-lead">
          从识别手写答案到评分、填分，把一份答卷的批改连起来。你来制定标准，把控关键结果。
        </p>
        <ul class="fp-showcase-points">
          <li><strong>按你的标准评分</strong><span>参考答案、评分细则与分小题规则，一起参与判断。</span></li>
          <li><strong>给评分多一重把关</strong><span>双模型独立评分，分差超过阈值时交给第三个模型仲裁。</span></li>
          <li><strong>每一次批改，都能回看</strong><span>查看答题卡、分数和评语，导出报告与改卷材料包。</span></li>
        </ul>
        <div class="fp-showcase-actions">
          <a class="fp-button fp-primary fp-md" :href="withBase('/guide/quickstart')">开始第一次批改 <span aria-hidden="true">→</span></a>
          <a class="fp-button fp-secondary fp-md" :href="withBase('/config/rubric')">设置评分标准</a>
        </div>
      </div>
      <ProductPreview />
    </section>

    <section class="home-panel home-panel--modes" data-fp-reveal="">
      <div class="home-section-head">
        <div>
          <p class="home-kicker">Modes</p>
          <span id="三种模式-按需选择" class="fp-anchor-alias" aria-hidden="true"></span>
          <h2 id="四种模式-按需选择">四种模式，按需选择</h2>
        </div>
        <p>从首次试改到夜间批量挂机，再到高精度双评仲裁，按照风险和效率切换工作方式。</p>
      </div>

      <div class="fp-product-cards" data-columns="2">
        <a v-for="mode in modes" :key="mode.name" :href="withBase(mode.href)" class="fp-card fp-product-card">
          <span class="fp-product-card-label">{{ mode.index }} <span aria-hidden="true">↗</span></span>
          <h3>{{ mode.name }}</h3>
          <p>{{ mode.description }}</p>
          <ul>
            <li v-for="point in mode.points" :key="point">{{ point }}</li>
          </ul>
          <span class="fp-product-card-link">了解{{ mode.name }} <span aria-hidden="true">→</span></span>
        </a>
      </div>
    </section>

    <section class="home-panel home-panel--community" data-fp-reveal="">
      <div>
        <p class="home-kicker">Community</p>
        <h2 id="加入交流群">加入交流群</h2>
        <p class="home-lead">遇到问题、想分享使用经验，欢迎加入社群交流。</p>
      </div>

      <div class="home-link-grid">
        <a href="https://r-l.ink/s/L9Akf">微信交流群</a>
        <a href="https://r-l.ink/s/WbMrR">QQ 交流群</a>
      </div>
    </section>

    <section class="home-panel home-panel--support" data-fp-reveal="">
      <div class="home-support-main">
        <p class="home-kicker">Support</p>
        <h2>支持这个项目继续走下去</h2>
        <p class="home-lead">
          如果 AI 批改助手帮你少熬了一点夜、少做了一点重复劳动，欢迎用赞赏、转发或反馈支持它继续更新。
        </p>

        <div class="home-story">
          <p>
            这两天我才真正意识到：做出一个功能，和把它交到真实用户手里，是完全不同的两件事。
          </p>
          <p>
            一个真正有用的工具，还需要文档、教程、反馈、稳定性和问题排查。很多看起来很小的改动，背后对应的都是老师们真实使用时遇到的问题。
          </p>
          <p>
            AI 像一根杠杆，把一个普通人的行动半径突然放大；表达也是一根杠杆，让工具被真正需要它的人看到。
          </p>
          <p>
            改变世界不一定从很大的事情开始，也可能只是先帮一个老师少盯一会儿屏幕，少做一点重复劳动。它很小，但它是真的。
          </p>
          <p class="home-story__ending">世界不死，理想不灭。我想继续试试看。</p>
        </div>

        <a class="home-story-link" href="https://v8515M.rk.r-l.ink/common/channel/redirect/?cid=569019">
          了解幕后故事
        </a>
      </div>

      <aside class="home-donate-card" aria-label="赞赏信息">
        <h3>赞赏支持</h3>
        <p>你的支持会变成继续适配平台、维护文档和处理反馈的动力。</p>
        <div class="home-donate-grid">
          <figure>
            <img src="https://r-l.ink/paywx1" alt="微信赞赏二维码" loading="lazy" />
            <figcaption>微信赞赏</figcaption>
          </figure>
          <figure>
            <img src="https://r-l.ink/payzfb1" alt="支付宝赞赏二维码" loading="lazy" />
            <figcaption>支付宝赞赏</figcaption>
          </figure>
        </div>
      </aside>
    </section>

    <section class="home-panel home-panel--links" data-fp-reveal="">
      <div>
        <p class="home-kicker">Links</p>
        <h2 id="友情链接">友情链接</h2>
      </div>

      <div class="home-link-grid">
        <a href="https://five-plus-one.com/">五加一的星空</a>
        <a href="https://api.ai.five-plus-one.com/">5+1API</a>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { withBase } from 'vitepress'
import ProductPreview from './ProductPreview.vue'
const modes = [
  {
    index: '01',
    href: '/modes/normal',
    name: '普通模式',
    description: '适合日常少量批改。提交前保留确认机会，方便随时暂停或取消。',
    points: ['5 秒倒计时提交', '弹窗提示错误', '支持分数纠错'],
  },
  {
    index: '02',
    href: '/modes/trial',
    name: '试改模式',
    description: '适合首次使用和调优评分标准。先观察 AI 评分，再确认提交。',
    points: ['等待教师确认', '便于观察评分依据', '支持分数纠错'],
  },
  {
    index: '03',
    href: '/modes/unattended',
    name: '无人值守模式',
    description: '适合大批量试卷和夜间挂机。流程稳定后，用它把重复动作交给脚本。',
    points: ['1 秒自动提交', '瞬态错误自动退避重试', '适合批量处理'],
  },
  {
    index: '04',
    href: '/modes/dual',
    name: '双评模式',
    description: '适合高精度要求的场景。两个模型独立评分，分差超阈值自动触发第三模型仲裁。',
    points: ['双模型独立评分', '超阈值自动仲裁', '结果更可靠'],
  },
]
</script>

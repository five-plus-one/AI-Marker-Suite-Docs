<template>
  <main class="home-sections">
    <section class="home-panel home-panel--split">
      <div>
        <p class="home-kicker">Why it matters</p>
        <h2>为什么你需要它？</h2>
        <p class="home-lead">
          把重复、耗时、容易疲劳的主观题批改流程交给脚本处理，老师只需要把控评分标准与关键结果。
        </p>
      </div>

      <div class="home-pain-grid">
        <div v-for="item in comparisons" :key="item.pain" class="home-pain-card">
          <span>{{ item.pain }}</span>
          <strong>{{ item.answer }}</strong>
        </div>
      </div>
    </section>

    <section class="home-panel">
      <div class="home-section-head">
        <div>
          <p class="home-kicker">Modes</p>
          <h2>三种模式，按需选择</h2>
        </div>
        <p>从首次试改到夜间批量挂机，按照风险和效率切换工作方式。</p>
      </div>

      <div class="home-mode-grid">
        <article v-for="mode in modes" :key="mode.name" class="home-mode-card">
          <span>{{ mode.index }}</span>
          <h3>{{ mode.name }}</h3>
          <p>{{ mode.description }}</p>
          <ul>
            <li v-for="point in mode.points" :key="point">{{ point }}</li>
          </ul>
        </article>
      </div>
    </section>

    <section class="home-panel home-panel--community">
      <div>
        <p class="home-kicker">Community</p>
        <h2>加入交流群</h2>
        <p class="home-lead">遇到问题、想分享使用经验，欢迎加入社群交流。</p>
      </div>

      <div class="home-link-grid">
        <a href="https://r-l.ink/s/L9Akf">微信交流群</a>
        <a href="https://r-l.ink/s/WbMrR">QQ 交流群</a>
      </div>
    </section>

    <section class="home-panel home-panel--support">
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

    <section class="home-panel home-panel--links">
      <div>
        <p class="home-kicker">Links</p>
        <h2>友情链接</h2>
      </div>

      <div class="home-link-grid">
        <a href="https://five-plus-one.com/">五加一的星空</a>
        <a href="https://api.ai.five-plus-one.com/">5+1API</a>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
const comparisons = [
  {
    pain: '一份主观题看 2~3 分钟',
    answer: 'AI 自动评分，生成分数和评语',
  },
  {
    pain: '改到半夜眼睛酸',
    answer: '无人值守模式，挂机自动批改',
  },
  {
    pain: '评分标准难统一',
    answer: '按同一套评分标准稳定执行',
  },
  {
    pain: '每道题都要手动输分',
    answer: '识别、打分、填入、提交自动完成',
  },
  {
    pain: '改完想回看某份试卷',
    answer: '评阅历史可回看并导出报告',
  },
]

const modes = [
  {
    index: '01',
    name: '普通模式',
    description: '适合日常少量批改。提交前保留确认机会，方便随时暂停或取消。',
    points: ['5 秒倒计时提交', '弹窗提示错误', '支持分数纠错'],
  },
  {
    index: '02',
    name: '试改模式',
    description: '适合首次使用和调优评分标准。先观察 AI 评分，再确认提交。',
    points: ['等待教师确认', '便于观察评分依据', '支持分数纠错'],
  },
  {
    index: '03',
    name: '无人值守模式',
    description: '适合大批量试卷和夜间挂机。流程稳定后，用它把重复动作交给脚本。',
    points: ['1 秒自动提交', '最多自动重试 3 次', '适合批量处理'],
  },
]
</script>

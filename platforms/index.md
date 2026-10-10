---
title: 支持平台 - AI 批改助手
description: AI批改助手支持的28个在线阅卷平台，包括智学网、七天网络、好分数、五岳阅卷、阅小二、华翰云、光大阅卷、云阅卷、新教育、润建学情、54学霸、九科星、慧阅卷、乐华阅卷、鑫考、慧学星、粤教翔云、云阅卷(好分数)、科耘阅卷、光大阅卷V2、威科姆(悦卷通)、C30教育云、AMEQP网上评卷、海云智评、鑫考(内网)、九五优评、上进教育服务云、南昊AI教学提分。一个脚本适配所有平台，自动检测当前平台并加载对应适配器。
keywords: AI批改助手,支持平台,智学网,七天网络,好分数,五岳阅卷,阅小二,华翰云,光大阅卷,云阅卷,新教育,润建学情,54学霸,九科星,慧阅卷,乐华阅卷,鑫考,慧学星,粤教翔云,云阅卷好分数,科耘阅卷,光大阅卷V2,威科姆,悦卷通,C30教育云,iclass30,onlyets,AMEQP,AMEQP网上评卷,海云智评,zp.kaow.cn,鑫考内网,鑫考内网版,biluo,九五优评,timesphoenix,上进教育,智慧上进,sipd.cn,南昊,nhcisc,南昊AI教学提分平台,阅卷平台,自动批改,智能阅卷,在线阅卷
---

# 支持平台

AI 批改助手通过适配器模式支持多个在线阅卷平台。一个脚本即可在所有支持的平台上使用。

::: info 移动端用户
如果你在手机上浏览，可以点击页面左上角的 **☰ 菜单按钮** 展开侧边目录，在各章节之间切换。
:::

## 平台对比

| | 智学网 | 七天网络 | 好分数 | 五岳阅卷 | 阅小二 | 华翰云 | 光大阅卷 | 云阅卷 | 新教育 | 润建学情 | 54学霸 | 九科星 | 慧阅卷 | 乐华阅卷 | 鑫考 | 慧学星 | 粤教翔云 | 云阅卷(好分数) | 科耘阅卷 | 光大阅卷V2 | 威科姆(悦卷通) | C30教育云 | AMEQP网上评卷 | 海云智评 | 鑫考(内网) | 九五优评 | 上进教育服务云 | 南昊AI教学提分 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 网址 | zhixue.com | 7net.cc / qt7.net / qt7.cn | haofenshu.com | wylkyj.com | haoyuejuan.com | yunyuejuan.net | pj.yixx.cn | 内网部署 | xinjiaoyu.com | aisusheng.runjian.com | 54xueba.cn | marking.jkxjxw.com | web.17yuejuan.cn | main.lhsvr.cn | 内网部署 | www.hxxai.com | rrtcp.gdedu.gov.cn | haofenshuyize.com | kaoshi.keewing.com | IP:端口 | wyna.onlyets.com | zy.iclass30.com | 内网 IP 部署 | zp.kaow.cn | 内网裸 IP /biluo/display.jsp | timesphoenix.com | www.sipd.cn | nhcisc.com |
| 适配状态 | 完整支持 | 完整支持（含新旧 UI） | 完整支持 | 完整支持 | 完整支持 | 完整支持 | 完整支持 | 完整支持 | 完整支持（考试+作业） | 完整支持 | 完整支持 | 完整支持 | 完整支持 | 完整支持 | 完整支持 | 完整支持 | 完整支持（题组批改） | 完整支持 | 完整支持 | 完整支持 | 完整支持（多小题） | 完整支持 | 完整支持（多评分单元） | 完整支持（多小题） | 完整支持（多小题） | 完整支持（分给分点） | 完整支持 | 完整支持（多小题） |
| 答题卡渲染 | `<img>` 标签 | `<img>` / Canvas | SVG `<image>` | `<img>` 标签 | `<img>` 标签（OSS 裁剪） | `<img>` 标签 | Canvas | `<img>` 标签 | Canvas / API | CSS background-image | Canvas + base64 img | OBS 图片裁剪 | `<img>` 标签 | Canvas | `<img>` 标签 | `<img>` 标签 | `<img>` 标签 | `<img>` 标签 | SVG `<image>` | Canvas | `<img>` 标签（OSS） | Canvas | `<img>` 标签（题块裁剪） | `<img>` 标签（OSS 裁剪） | `<img>` 标签 | `<img>` 标签（多页） | `<img>` 标签（OSS 裁剪） | `<img>` 标签（showimage 裁剪） |
| 分数输入 | 输入框 | 输入框 | 输入框 | 输入框 | 输入框（多小题） | 输入框 | 点击选择 | 输入框 | 输入框 | 点击选择 | 输入框（多小题） | 输入框（多小题） | 点击按钮 | 点击按钮 | 输入框 | 输入框（分步骤） | 输入框 | 输入框 | 输入框 | 点击选择 | 输入框（多小题） | 输入框 + 快捷按钮 | 输入框（多评分单元） | 输入框（多小题） | 输入框（多小题） | 输入框（给分点） | 输入框（多小题） | 输入框（多小题） |
| 批改流程 | 识别 → 打分 → 填入 → 提交 | 识别 → 打分 → 填入 → 提交 | 识别 → 打分 → 填入 → 提交 | 识别 → 打分 → 填入 → 提交 | 识别 → 打分 → 填入 → 提交 | 识别 → 打分 → 填入 → 提交 | 识别 → 打分 → 点击 → 提交 | 识别 → 打分 → 填入 → 提交 | 识别 → 打分 → 填入 → 提交 | 识别 → 打分 → 点击 → 提交 | 识别 → 打分 → 填入 → 提交 | 识别 → 打分 → 填入 → 提交 | 识别 → 打分 → 点击 → 提交 | 识别 → 打分 → 点击 → 提交 | 识别 → 打分 → 填入 → 提交 | 识别 → 打分 → 填入 → 提交 | 识别 → 打分 → 填入 → 提交 | 识别 → 打分 → 填入 → 提交 | 识别 → 打分 → 填入 → 自动提交 | 识别 → 打分 → 点击 → 提交 | 识别 → 打分 → 填入 → 提交 | 识别 → 打分 → 填入 → 自动提交 | 识别 → 打分 → 填入（同步隐藏字段） → 提交 | 识别 → 打分 → 填入 → 确认弹窗提交 | 识别 → 打分 → 填入 → 键盘确认提交 | 识别 → 打分 → 填入 → 确认弹窗提交 | 识别 → 打分 → 填入 → 提交 | 识别 → 打分 → 填入 → 提交 |

## 快速导航

1. **[智学网](/platforms/zhixue)** — 智学网平台的适配说明和操作流程
2. **[七天网络](/platforms/qitian)** — 七天网络平台的适配说明，支持新旧 UI
3. **[好分数](/platforms/haofenshu)** — 好分数平台的适配说明，支持 SVG 答题卡
4. **[五岳阅卷](/platforms/wuyue)** — 五岳阅卷平台的适配说明，支持分小题评分
5. **[阅小二](/platforms/haoyuejuan)** — 阅小二平台的适配说明，与五岳阅卷同构
6. **[华翰云](/platforms/hanhan)** — 华翰云平台的适配说明
7. **[光大阅卷](/platforms/guangda)** — 光大阅卷平台的适配说明，支持 Canvas 渲染和点击式评分
8. **[云阅卷](/platforms/yunyuejuan)** — 云阅卷平台的适配说明，支持内网阅卷系统
9. **[新教育](/platforms/xinjiaoyu)** — 新教育平台的适配说明，支持考试和作业两种批改模式
10. **[润建学情](/platforms/runjian)** — 润建学情平台的适配说明，支持 CSS 背景图和点击式评分
11. **[54学霸](/platforms/xueba54)** — 54学霸平台的适配说明，支持 Canvas/base64 图片和多小题输入框
12. **[九科星](/platforms/jiukexing)** — 九科星平台的适配说明，支持 OBS 图片裁剪和多小题评分
13. **[慧阅卷](/platforms/huiyuejuan)** — 慧阅卷平台的适配说明，支持 frame 架构和点击式评分
14. **[乐华阅卷](/platforms/lehua)** — 乐华阅卷平台的适配说明，支持 Canvas 渲染和点击式评分
15. **[鑫考](/platforms/xinkao)** — 鑫考网上阅卷平台的适配说明，支持动态 IP 部署
16. **[慧学星](/platforms/huixuexing)** — 慧学星平台的适配说明，支持 OSS 图片和分步骤评分
17. **[粤教翔云](/platforms/yuejiaoxiangyun)** — 粤教翔云智慧测评平台的适配说明，支持题组批改模式
18. **[云阅卷(好分数)](/platforms/haofenshuyize)** — 云阅卷(好分数)平台的适配说明，Vue 3 + Element Plus
19. **[科耘阅卷](/platforms/keewing)** — 科耘阅卷平台的适配说明，支持 SVG 图片渲染和延迟填分模式
20. **[光大阅卷V2](/platforms/guangda-2)** — 光大阅卷 V2 平台的适配说明，IP:端口部署版本
21. **[威科姆(悦卷通)](/platforms/weicom)** — 威科姆（悦卷通）平台的适配说明，支持多小题评分和三种打分模式
22. **[C30教育云](/platforms/c30)** — C30教育云平台的适配说明，Canvas 答题卡导出 + 平台自动提交
23. **[AMEQP网上评卷](/platforms/ameqp)** — AMEQP网上评卷平台的适配说明，内网裸 IP 部署 + 题块裁剪图
24. **[海云智评](/platforms/haiyun)** — 海云智评平台的适配说明，OSS 裁剪答题卡 + 多小题满分提取 + 提交二次确认
25. **[鑫考(内网)](/platforms/xinkao-2)** — 鑫考内网版适配说明，fen 属性满分提取 + inputkey 键盘确认提交
26. **[九五优评](/platforms/jiuwuyouping)** — 九五优评平台的适配说明，iframe 阅卷界面取图 + 分给分点评分
27. **[上进教育服务云](/platforms/sipd)** — 上进教育服务云平台的适配说明，OSS 裁剪答题卡 + 0分确认弹窗
28. **[南昊AI教学提分](/platforms/nhcisc)** — 南昊AI教学提分平台的适配说明，showimage 取图 + 满分提取

<CardGrid>
<Card title="智学网" href="/platforms/zhixue" description="智学网平台的适配说明，包括页面识别和操作流程" />
<Card title="七天网络" href="/platforms/qitian" description="七天网络平台的适配说明，支持新旧两种 UI 界面" />
<Card title="好分数" href="/platforms/haofenshu" description="好分数平台的适配说明，支持 SVG 答题卡和分小题评分" />
<Card title="五岳阅卷" href="/platforms/wuyue" description="五岳阅卷平台的适配说明，支持分小题评分" />
<Card title="阅小二" href="/platforms/haoyuejuan" description="阅小二平台的适配说明，与五岳阅卷同构，支持 OSS 裁剪答题卡" />
<Card title="华翰云" href="/platforms/hanhan" description="华翰云平台的适配说明，支持答题卡识别" />
<Card title="光大阅卷" href="/platforms/guangda" description="光大阅卷平台的适配说明，支持 Canvas 渲染和点击式评分" />
<Card title="云阅卷" href="/platforms/yunyuejuan" description="云阅卷平台的适配说明，支持内网阅卷系统" />
<Card title="新教育" href="/platforms/xinjiaoyu" description="新教育平台的适配说明，支持考试和作业两种批改模式" />
<Card title="润建学情" href="/platforms/runjian" description="润建学情平台的适配说明，支持 CSS 背景图和点击式评分" />
<Card title="54学霸" href="/platforms/xueba54" description="54学霸平台的适配说明，支持 Canvas/base64 图片渲染和多小题输入框评分" />
<Card title="九科星" href="/platforms/jiukexing" description="九科星平台的适配说明，支持 OBS 图片裁剪和多小题输入框评分" />
<Card title="慧阅卷" href="/platforms/huiyuejuan" description="慧阅卷平台的适配说明，支持 frame 架构和点击式评分" />
<Card title="乐华阅卷" href="/platforms/lehua" description="乐华阅卷平台的适配说明，支持 Canvas 渲染和点击式评分" />
<Card title="鑫考" href="/platforms/xinkao" description="鑫考网上阅卷平台的适配说明，支持动态 IP 部署" />
<Card title="慧学星" href="/platforms/huixuexing" description="慧学星平台的适配说明，支持 OSS 图片和分步骤评分" />
<Card title="粤教翔云" href="/platforms/yuejiaoxiangyun" description="粤教翔云智慧测评平台的适配说明，支持题组批改模式" />
<Card title="云阅卷(好分数)" href="/platforms/haofenshuyize" description="云阅卷(好分数)平台的适配说明，Vue 3 + Element Plus" />
<Card title="科耘阅卷" href="/platforms/keewing" description="科耘阅卷平台的适配说明，支持 SVG 图片渲染和延迟填分模式" />
<Card title="光大阅卷V2" href="/platforms/guangda-2" description="光大阅卷 V2 平台的适配说明，IP:端口部署版本" />
<Card title="威科姆(悦卷通)" href="/platforms/weicom" description="威科姆（悦卷通）平台的适配说明，支持多小题评分、OSS 图片和三种打分模式" />
<Card title="C30教育云" href="/platforms/c30" description="C30教育云平台的适配说明，Canvas 答题卡导出、快捷分数按钮和自动提交" />
<Card title="AMEQP网上评卷" href="/platforms/ameqp" description="AMEQP网上评卷平台的适配说明，内网裸 IP 部署、题块裁剪图和多评分单元" />
<Card title="海云智评" href="/platforms/haiyun" description="海云智评平台的适配说明，OSS 裁剪答题卡、多小题满分提取和提交二次确认弹窗" />
<Card title="鑫考(内网)" href="/platforms/xinkao-2" description="鑫考内网版适配说明，fen 属性满分提取、inputkey 键盘确认提交和 URL query 任务标识" />
<Card title="九五优评" href="/platforms/jiuwuyouping" description="九五优评平台的适配说明，iframe 阅卷界面取图、分给分点评分和提交限速自适应" />
<Card title="上进教育服务云" href="/platforms/sipd" description="上进教育服务云平台的适配说明，OSS 裁剪答题卡、0分确认弹窗自动处理" />
<Card title="南昊AI教学提分" href="/platforms/nhcisc" description="南昊AI教学提分平台的适配说明，showimage 取图、满分提取和分数归一化" />
</CardGrid>

::: tip 关于适配器
AI 批改助手使用适配器模式，每个平台有独立的适配器代码。如果你需要支持新的阅卷平台，可以参考 [开发新适配器](/advanced/adapter-dev) 文档自行开发。
:::

---

**其他分区**：[入门指南](/guide/) · [配置](/config/) · [批改模式](/modes/) · [进阶功能](/advanced/)

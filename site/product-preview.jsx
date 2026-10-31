import React from 'react';
import {ProductPreviewCard,MarkerLogo} from '@fiveplusone/ui/app-surfaces';
export function ProductPreview({base='/'}){
 const href=route=>base+route.slice(1);
 return <ProductPreviewCard id="marker-product-preview" title="一份答卷，完整批改" brand="AI 批改助手" icon={<MarkerLogo size={24} decorative/>} scenes={[
  {id:'grading',label:'批改',eyebrow:'按你的标准来',title:'从手写答案，到评分依据。',description:'识别答题内容，参照评分标准生成分数与评语，衔接填分与提交。',callout:{title:'识别 → 评分 → 填分',description:'你来制定标准，把控关键结果。'},metrics:[{label:'示例评分',value:'8 / 10',note:'论点清晰，论据还可补充。'},{label:'提交方式',value:'教师确认',note:'试改模式，先看结果再提交。'}],footnote:'示例答卷 · 以实际批改结果为准',link:{label:'开始第一次批改',href:href('/guide/quickstart')}},
  {id:'review',label:'双评',eyebrow:'多一重把关',title:'独立判断，再交叉核对。',description:'两个模型独立评分。分差超过设定阈值时，由第三个模型进行仲裁。',callout:{title:'双模型评分 → 分差校验 → 仲裁',description:'按试改结果设置适合当前题目的分差阈值。'},metrics:[{label:'模型 A · 示例',value:'8 分'},{label:'模型 B · 示例',value:'6 分'},{label:'仲裁 · 示例',value:'7 分'}],footnote:'示例评分 · 阈值由你设置',link:{label:'了解双评模式',href:href('/modes/dual')}},
  {id:'history',label:'历史',eyebrow:'每次批改，都能回看',title:'有评分，也有完整记录。',description:'按时间和方案筛选历史，回看答题卡、评分与评语，整理需要的报告。',callout:{title:'查看 → 复核 → 导出',description:'支持 HTML、CSV、JSON 和改卷材料包 ZIP。'},rows:[{title:'议论文练习',detail:'示例记录 · 评分与评语',value:'8 / 10'},{title:'阅读理解',detail:'示例记录 · 分小题评分',value:'12 / 15'}],footnote:'示例记录 · 历史由你的批改产生',link:{label:'查看历史功能',href:href('/advanced/history')}}
 ]}/>;
}

export function compareVersions(a,b){
 const parts=value=>String(value).split('-')[0].replace(/^v/,'').split('.').map(Number);
 const left=parts(a),right=parts(b);
 for(let index=0;index<Math.max(left.length,right.length);index++){
  const difference=(left[index]||0)-(right[index]||0);if(difference)return difference;
 }
 return 0;
}
const entries=channel=>Object.entries(channel?.changelog||{}).filter(([,items])=>Array.isArray(items)).sort(([a],[b])=>compareVersions(b,a));
const normalized=text=>text.normalize('NFKC').replace(/\s+/g,'');
const releaseId=(channel,version)=>`release-${channel}-${version.replaceAll('.','-')}`;
const categories=new Map([['新平台','新增平台'],['新功能','新增功能'],['优化','体验优化'],['修复','问题修复']]);
function groupItems(records){
 const groups=new Map([...categories.values(), '其他更新'].map(title=>[title,[]]));
 for(const text of records){const match=text.match(/^【([^】]+)】\s*(.*)$/s);groups.get(categories.get(match?.[1])||'其他更新').push({text:match?match[2]:text})}
 return [...groups].filter(([,items])=>items.length).map(([title,items])=>({title,items}));
}
/** The preview is a delta against the complete stable channel, including promoted releases. */
export function createReleaseModels(notes,historicalAnchors=[]){
 const stable=notes.stable,preview=notes.preview;
 const stableEntries=entries(stable).filter(([version])=>compareVersions(version,stable.version)<=0);
 const [current,...past]=stableEntries;
 const stableItems=new Set(stableEntries.flatMap(([,items])=>items).map(normalized));
 const seen=new Set(stableItems),additional=[];
 if(compareVersions(preview.version,stable.version)>=0)for(const [version,items] of entries(preview)){
  if(compareVersions(version,stable.version)<0||compareVersions(version,preview.version)>0)continue;
  for(const item of items){const key=normalized(item);if(!seen.has(key)){seen.add(key);additional.push(item)}}
 }
 const legacyFor=version=>historicalAnchors.filter(id=>id.startsWith('v'+version.replaceAll('.','-')+'-'));
 return {
  stable:{version:stable.version,versionId:'stable-version',date:stable.releaseDate,badge:'推荐使用',description:'当前稳定版的新增功能、体验优化与问题修复。',groups:groupItems(current?.[1]||[]),anchors:current?[releaseId('stable',current[0]),...legacyFor(current[0])]:[],history:past.map(([version,items])=>({version,date:stable.changelogDates?.[version],items,id:releaseId('stable',version),aliases:legacyFor(version)}))},
  preview:{version:preview.version,versionId:'preview-version',date:preview.releaseDate,badge:'提前体验',description:`相对稳定版 v${stable.version} 新增的变化。预览功能仍在持续完善，日常使用建议选择稳定版。`,groups:groupItems(additional),emptyMessage:'当前预览版的更新已包含在稳定版中。',anchors:entries(preview).map(([version])=>releaseId('preview',version))},
 };
}

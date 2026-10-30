import historical from './historical-links.json' with {type:'json'};

export const escapeHtml=value=>String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const oldIds=historical.pages.find(page=>page.route==='/changelog').anchors.filter(id=>id.startsWith('v'));
export function renderReleaseNotes(changelog,dates={},channel='stable'){
 dates=dates||{};
 const versions=Object.keys(changelog||{}).filter(version=>Array.isArray(changelog[version])).sort((a,b)=>b.localeCompare(a,undefined,{numeric:true}));
 return versions.map((version,index)=>{
  const aliases=channel==='stable'?oldIds.filter(id=>id.startsWith('v'+version.replaceAll('.','-')+'-')):[];
  const anchors=aliases.map(id=>`<span id="${escapeHtml(id)}" class="fp-anchor-alias" aria-hidden="true"></span>`).join('');
  return `${anchors}<details class="changelog-version" id="release-${channel}-${escapeHtml(version.replaceAll('.','-'))}"${index===0?' open':''}><summary class="changelog-version-header"><svg class="changelog-toggle" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg><span class="changelog-ver">v${escapeHtml(version)}</span>${dates[version]?`<span class="changelog-date">${escapeHtml(dates[version])}</span>`:''}</summary><ul class="changelog-items">${changelog[version].map(item=>`<li>${escapeHtml(item)}</li>`).join('')}</ul></details>`;
 }).join('');
}

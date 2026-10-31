import fs from 'node:fs/promises';

const file=new URL('./release-notes.json',import.meta.url);
let notes={};
try{notes=JSON.parse(await fs.readFile(file,'utf8'))}catch{}
for(const channel of ['stable','preview']){
 const source='https://auto-update.aimarking.five-plus-one.com/ota/'+(channel==='preview'?'preview/':'')+'manifest.json';
 try{
  const response=await fetch(source,{signal:AbortSignal.timeout(8000)});
  if(!response.ok)throw new Error('HTTP '+response.status);
  const data=await response.json();
  if(typeof data.version!=='string'||!data.changelog||!Object.keys(data.changelog).length)throw new Error('Missing release notes');
  if(!Object.values(data.changelog).every(items=>Array.isArray(items)&&items.every(item=>typeof item==='string')))throw new Error('Invalid release notes');
  notes[channel]={source,version:data.version,releaseDate:data.releaseDate,changelog:data.changelog,changelogDates:data.changelogDates||{}};
 }catch(error){
  if(!notes[channel]?.changelog)throw error;
  console.warn(`Using saved ${channel} release notes: ${error.message}`);
 }
}
const serialized=JSON.stringify(notes,null,2)+'\n';
if(await fs.readFile(file,'utf8').catch(()=>'')!==serialized)await fs.writeFile(file,serialized);
console.log(`Release notes: stable ${notes.stable.version}; preview ${notes.preview.version}`);

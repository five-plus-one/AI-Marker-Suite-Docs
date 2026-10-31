import net from 'node:net';
import {spawn} from 'node:child_process';
import {setTimeout} from 'node:timers/promises';

const probe=net.createServer();await new Promise(resolve=>probe.listen(0,'127.0.0.1',resolve));const port=probe.address().port;await new Promise(resolve=>probe.close(resolve));
const child=spawn(process.execPath,['node_modules/vitepress/bin/vitepress.js','preview','--host','127.0.0.1','--port',String(port)],{stdio:['ignore','pipe','pipe'],windowsHide:true});
let output='';child.stdout.on('data',chunk=>output+=chunk);child.stderr.on('data',chunk=>output+=chunk);
try{
 const base=process.env.BASE_URL||'/',origin=`http://127.0.0.1:${port}${base}`;
 let ready=false;
 for(let attempt=0;attempt<40;attempt++){
  if(child.exitCode!==null)throw new Error(output);
  try{ready=(await fetch(origin+'release.json')).ok}catch{}
  if(ready)break;await setTimeout(250);
 }
 if(!ready)throw new Error('Preview did not start: '+output);
 process.env.DOCS_PREVIEW_URL=origin;
 await import('./verify-http.mjs');
}finally{child.kill()}

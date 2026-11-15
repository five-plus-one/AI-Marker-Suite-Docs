'use strict';
const C=require('./common.cjs');
const {execFileSync}=require('node:child_process');
async function main(){
  const ctx=C.context();
  C.invariant(ctx.name==='AI-Marker-Suite-Docs','Unexpected documentation repository');
  C.invariant(Number(process.versions.node.split('.')[0])>=22,'Node 22 or newer is required');
  const commit=C.sha(ctx.eventName==='pull_request'?ctx.event.pull_request.head.sha:ctx.sha);
  C.invariant(execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim()===commit,'Checkout differs from source revision');
  C.invariant(['/','/AI-Marker-Suite-Docs/'].includes(process.env.BASE_URL),'Unexpected documentation base');
  C.npm(['ci']);
  C.npm(['run','build']);
  C.npm(['run','check']);
  C.npm(['run','check:http']);
  C.packageDelivery('.vitepress/dist',{
    repository:ctx.name,commit,target:'docs',version:C.json('package.json').version,build:String(Date.now())
  },{run:ctx.run,event:ctx.eventName,base:process.env.BASE_URL});
  console.log('Verified documentation for '+process.env.BASE_URL+' at '+commit);
}
if(require.main===module)C.cli(main);

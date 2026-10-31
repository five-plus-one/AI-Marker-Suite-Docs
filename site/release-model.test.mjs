import {test} from 'node:test';
import assert from 'node:assert/strict';
import {compareVersions,createReleaseModels} from './release-model.mjs';
const items=model=>model.groups.flatMap(group=>group.items.map(item=>item.text));
const stable={version:'1.2.0.0',changelog:{'1.2.0':['【新功能】导出记录'],'1.1.0':['【优化】阅读体验']}};
test('preview contains only additional changes at or after the stable baseline',()=>{
 const preview={version:'1.2.0.10-preview.5',changelog:{'1.2.0.2':['【修复】修复保存','【新功能】导出记录'],'1.2.0.10':['【新功能】批量筛选','【修复】修复保存'],'1.2.0':['【新功能】导出记录'],'1.1.0':['【修复】历史记录']}};
 const model=createReleaseModels({stable,preview});
 assert.deepEqual(items(model.stable),['导出记录']);
 assert.deepEqual(items(model.preview),['批量筛选','修复保存']);
 assert.equal(model.stable.history.length,1);
 assert.equal(compareVersions('1.2.0','1.2.0.0'),0);
 assert(compareVersions('1.2.0.10','1.2.0.2')>0);
});
test('promotion into stable removes the corresponding preview changes',()=>{
 const promoted={version:'1.2.0.2',changelog:{'1.2.0.2':['【修复】修复保存'],...stable.changelog}};
 const preview={version:'1.2.0.2-preview.3',changelog:{'1.2.0.2':['【修复】修复保存'],...stable.changelog}};
 assert.deepEqual(items(createReleaseModels({stable:promoted,preview}).preview),[]);
 assert.deepEqual(items(createReleaseModels({stable:promoted,preview:{...preview,version:'1.1.0-preview.2'}}).preview),[]);
});
test('same-base additions remain visible and repeated formatting is normalized',()=>{
 const preview={version:'1.2.0.0-preview.1',changelog:{'1.2.0':['【新功能】导出 记录','【新功能】新的功能']}};
 assert.deepEqual(items(createReleaseModels({stable,preview}).preview),['新的功能']);
});

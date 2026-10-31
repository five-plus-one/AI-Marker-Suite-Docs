import historical from './historical-links.json' with {type:'json'};
import {renderReleaseNotes} from '@fiveplusone/ui/app-surfaces';
import {createReleaseModels} from './release-model.mjs';
export {createReleaseModels} from './release-model.mjs';
export const escapeHtml=value=>String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
export function renderChannelNotes(notes,channel){
 const anchors=historical.pages.find(page=>page.route==='/changelog').anchors;
 return renderReleaseNotes(createReleaseModels(notes,anchors)[channel]);
}

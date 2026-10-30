import {build} from 'esbuild';
import {writeFile} from 'node:fs/promises';
import {createElement} from 'react';
import {renderToString} from 'react-dom/server';
await build({entryPoints:['site/product-preview.jsx'],outfile:'site/.product-preview.mjs',bundle:true,platform:'node',format:'esm',packages:'external',jsx:'automatic'});
const {ProductPreview}=await import('./.product-preview.mjs');
const base=process.env.BASE_URL||'/';
await writeFile('site/.product-preview.json',JSON.stringify({html:renderToString(createElement(ProductPreview,{base}))}));

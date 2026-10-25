// Rebuild standalone SVGs from the same original paths rendered in StorySymbol.
import fs from 'node:fs/promises';
const art=JSON.parse(await fs.readFile('content/history-stories/symbol-art.json','utf8'));
const names={strokeWidth:'stroke-width',strokeLinecap:'stroke-linecap',strokeLinejoin:'stroke-linejoin'};
const escape=s=>String(s).replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
await fs.mkdir('public/history-symbols',{recursive:true});
for(const [kind,symbol] of Object.entries(art)){
 const shapes=symbol.shapes.map(s=>`<${s.tag} ${Object.entries(s.attrs).map(([k,v])=>`${names[k]??k}="${escape(v)}"`).join(' ')}/>`).join('');
 const svg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-labelledby="title"><title id="title">${escape(symbol.label)} — original illustrative symbol</title><g stroke="#19333b" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${shapes}</g></svg>\n`;
 await fs.writeFile(`public/history-symbols/${kind}.svg`,svg);
}
console.log(`Generated ${Object.keys(art).length} original SVG symbols.`);

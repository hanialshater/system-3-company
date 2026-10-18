#!/usr/bin/env node
// Compare the proposed curriculum as well as built artifacts. Signals need a CM disposition.
import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve(import.meta.dirname, '../../../..');
const data = JSON.parse(fs.readFileSync(path.join(root,'company/domains/briefs/algorithms-200.json')));
const stop = new Set('the a an of to and in is it that on for with as by at be or are this from what how why which you your can its than more not one two when does do into each'.split(' '));
const words = r => new Set([r.title,r.objective,r.misconception].join(' ').toLowerCase().replace(/[^a-z0-9 ]/g,' ').split(/\s+/).filter(w => w.length>2&&!stop.has(w)));
const score = (a,b) => {let n=0; for(const w of a)if(b.has(w))n++;return n/(a.size+b.size-n);};
const old=[];
for(const domain of fs.readdirSync(path.join(root,'src/demos')).filter(x=>fs.statSync(path.join(root,'src/demos',x)).isDirectory()))for(const slug of fs.readdirSync(path.join(root,'src/demos',domain))){const p=path.join(root,'src/demos',domain,slug,'meta.json');if(!fs.existsSync(p)||(domain==='cs'&&slug.startsWith('algo-')))continue;const m=JSON.parse(fs.readFileSync(p));if(m.status!=='retired')old.push({...m,slug:domain+'/'+slug,w:words(m)});}
const proposed=data.lessons.map(r=>({...r,w:words(r)}));
const signals=[];
for(let i=0;i<proposed.length;i++){
 const a=proposed[i];for(const b of old){const s=score(a.w,b.w);if(s>=.18)signals.push({a:a.slug,b:b.slug,kind:b.slug.startsWith('cs/')?'existing-cs':'cross-domain',similarity:+s.toFixed(3),objectiveA:a.objective,objectiveB:b.objective});}
 for(let j=i+1;j<proposed.length;j++){const b=proposed[j],s=score(a.w,b.w);if(s>=.18)signals.push({a:a.slug,b:b.slug,kind:'intra-batch',similarity:+s.toFixed(3),objectiveA:a.objective,objectiveB:b.objective});}
}
signals.sort((a,b)=>b.similarity-a.similarity);
console.log(JSON.stringify({date:'2026-10-16',threshold:.18,baselineLessons:old.length,proposed:proposed.length,signals:signals.length,pairs:signals},null,2));

import fs from 'node:fs';
import ts from 'typescript';
import assert from 'node:assert/strict';
// Oracle keeps the RNG's specified integer recurrence but uses a string/run-regexp
// representation, and bettor log-odds instead of the stage's share recurrence.
function rng(seed) { let a=seed>>>0; return ()=>{a=(a+0x6d2b79f5)>>>0;let t=Math.imul(a^(a>>>15),a|1);t^=t+Math.imul(t^(t>>>7),t|61);return ((t^(t>>>14))>>>0)/2**32;}; }
function sequence(k){const r=rng(k);return Array.from({length:20},()=>r()<.5?'H':'T').join('');}
const longest=s=>Math.max(...s.match(/H+|T+/g).map(x=>x.length));
let model=fs.readFileSync('src/demos/probability/twenty-flips-run-of-five/model.ts','utf8').replace('import { mulberry32 } from "@/kit/random";',fs.readFileSync('src/kit/random.ts','utf8'));
const m=await import('data:text/javascript;base64,'+Buffer.from(ts.transpile(model,{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022})).toString('base64'));
const hist=Array(21).fill(0);let t=m.EMPTY;const samples=[];
for(let k=1;k<=3001;k++){hist[longest(sequence(k))]++;if([1000,1001,1002,2000,2001,3001].includes(k)){t=m.runMore(t,k-t.n);for(let j=1;j<=20;j++)assert.equal(m.atMost(t,j),hist.slice(0,j+1).reduce((a,b)=>a+b,0));samples.push({n:k,fivePlus:hist.slice(5).reduce((a,b)=>a+b,0),atMost8:hist.slice(0,9).reduce((a,b)=>a+b,0),bins:t.bins});}}
let first=0;for(let k=1;k<=246629;k++)if(longest(sequence(k))===1){first=k;break;}assert.equal(first,246629);
let enumFive=0;for(let mask=0;mask<2**20;mask++){const s=mask.toString(2).padStart(20,'0').replaceAll('0','T').replaceAll('1','H');if(longest(s)>=5)enumFive++;}
const bets=[];for(let seed=2211;seed<=2215;seed++){const r=rng(seed);let logOdds=0,min=Infinity,at=0;for(let race=1;race<=500;race++){logOdds+=Math.log(r()<.6?1.2:.8);const share=1/(1+Math.exp(-logOdds));if(race>50&&share<min){min=share;at=race;}}bets.push({seed,minAccurateShare:min,race:at,otherSharePct:100*(1-min)});}
const hill=n=>{const saturation=p=>100*p**n/(p**n+26.8**n);return {rest:saturation(40),work:saturation(20),drop:saturation(40)-saturation(20)}};
const counts=[];for(let rows=1;rows<=4;rows++)for(let played=0;played<=9;played++)for(const key of ['cat','dog','eel']){const stream=['cat','dog','cat','eel','cat','dog','cat','dog','cat'].slice(0,played);const hashes=[{cat:2,dog:2,eel:4},{cat:1,dog:3,eel:3},{cat:5,dog:4,eel:5},{cat:3,dog:1,eel:2}].slice(0,rows);const truth=stream.filter(x=>x===key).length;const readings=hashes.map(h=>stream.filter(x=>h[x]===h[key]).length);assert(Math.min(...readings)>=truth);counts.push(1);}
console.log(JSON.stringify({samples,firstAlternating:{seed:first,sequence:sequence(first)},exactFivePlus:{count:enumFive,total:2**20,pct:100*enumFive/2**20},bets,hill:{four:hill(2.7),one:hill(1),ratio:hill(2.7).drop/hill(1).drop},countMinReachableStates:counts.length,asciiRanges:[...'AZaz'].map(x=>[x,x.charCodeAt(0)])},null,2));

'use client';
import {useEffect,useRef,useState} from 'react';
import {Lesson,type StageContext} from '@/kit/Lesson';
import {Control} from '@/kit/controls';
import * as m from './model';
import s from './styles.module.css';
const f=(n:number,d=3)=>{const x=Math.abs(n)<1e-10?0:n;return x.toFixed(d);};
function Picture({mode}:{mode:number}){const r=m.run(mode);return <svg className={s.plot} viewBox="0 0 280 118" role="img" aria-label="Saved keys, remaining work — worked example"><text x="6" y="17">length</text><text x="88" y="17">K/V full</text><text x="182" y="17">cached</text>{r.rows.map((row,i)=><g key={i}><text x="25" y={36+17*i}>{row.length}</text><text x="110" y={36+17*i}>{row.naive}</text><text x="205" y={36+17*i}>{row.cached}</text></g>)}<text x="6" y="109">Σ {r.naive}→{r.cached} · comparisons={r.comparisons}</text></svg>;}
function snapshot(mode:number){const r=m.run(mode);return `n=${r.n}: K/V ${r.naive}→${r.cached}; storage=${r.stored}`;}
function Stage({phase,locked,interact}:StageContext){
 const [mode,setMode]=useState<number|null>(null);
 const [witnesses,setWitnesses]=useState<Record<number,string>>({});
 const earned=useRef(new Set<number>());
 useEffect(()=>{if(phase==='reveal')setMode(0);},[phase]);
 const choose=(i:number)=>{setMode(i);if(i<2&&!earned.current.has(i)){earned.current.add(i);setWitnesses(old=>({...old,[i]:snapshot(i)}));interact();}};
 return <div className={s.root}>
 {locked||mode===null?<div className={s.input}>{"Lengths 1,2,3,4. Count K/V token projections; each new query compares with its prefix."}</div>:<Picture mode={mode}/>}
 {Object.keys(witnesses).length>0?<div className={s.proof} aria-label="Saved results">{[0,1].map(i=>witnesses[i]?<p key={i}>{witnesses[i]}</p>:null)}</div>:null}
 <div className={s.row}>{["Four tokens", "One token"].map((label,i)=><Control key={label} className={s.tap} disabled={locked||mode===i} aria-pressed={!locked&&mode===i} onClick={()=>choose(i)}>{label}</Control>)}<Control className={s.tap} disabled={locked||mode===null} onClick={()=>setMode(null)}>Reset</Control></div>
 </div>;
}
export default function Demo({slug}:{slug:string}){return <Lesson slug={slug} minInteractions={2} predict={{"question": "Your chatbot writes its reply one token at a time and caches past keys and values. Generate lengths 1 through 4. Cached K/V needs how many token projections?", "options": ["8", "20", "0"], "answer": 0}} exploreHint="Compare the two cases and their saved results." reveal={()=><p>Your four-token ledger fell from 20 to 8 K/V token projections with caching, while query comparisons remained 10 and storage reached 8 vectors. At one token both methods needed 2 projections. These counts describe fixed causal decoding without eviction, not measured latency or all FLOPs.</p>}>{ctx=><Stage {...ctx}/>}</Lesson>;}

'use client';
import {useEffect,useRef,useState} from 'react';
import {Lesson,type StageContext} from '@/kit/Lesson';
import {Control} from '@/kit/controls';
import * as m from './model';
import s from './styles.module.css';
const f=(n:number,d=3)=>{const x=Math.abs(n)<1e-10?0:n;return x.toFixed(d);};
function Picture({mode}:{mode:number}){const r=m.run(mode);return <svg className={s.plot} viewBox="0 0 280 112" role="img" aria-label="Two heads, then one projection \u2014 computed finite mechanism"><text x="140" y="16" textAnchor="middle">values [0,10]</text>{r.weights.map((w,i)=><g key={i}><text x="7" y={43+i*28}>{i===0?'A':'B'}</text><text x="34" y={43+i*28}>[{w.join(',')}]</text><path d={`M129 ${38+i*28} H160`} className={s.line}/><text x="174" y={43+i*28}>{r.heads[i]}</text></g>)}<text x="6" y="103">[{r.heads.join(',')}] · [1,−1] = {r.output}</text></svg>;}
function snapshot(mode:number){const r=m.run(mode);return `Heads [${r.heads.join(",")}] → ${r.output}`;}
function Stage({phase,locked,interact}:StageContext){
 const [mode,setMode]=useState<number|null>(null);
 const [witnesses,setWitnesses]=useState<Record<number,string>>({});
 const earned=useRef(new Set<number>());
 useEffect(()=>{if(phase==='reveal')setMode(0);},[phase]);
 const choose=(i:number)=>{setMode(i);if(i<2&&!earned.current.has(i)){earned.current.add(i);setWitnesses(old=>({...old,[i]:snapshot(i)}));interact();}};
 return <div className={s.root}>
 {locked||mode===null?<div className={s.input}>{"Token values [0,10]. Head A weights [.8,.2]; B [.1,.9]. Project concatenation with [1,\u22121]."}</div>:<Picture mode={mode}/>}
 {Object.keys(witnesses).length>0?<div className={s.proof} aria-label="Retained evidence">{[0,1].map(i=>witnesses[i]?<p key={i}>{witnesses[i]}</p>:null)}</div>:null}
 <div className={s.row}>{["Distinct", "Identical"].map((label,i)=><Control key={label} className={s.tap} disabled={locked||mode===i} aria-pressed={!locked&&mode===i} onClick={()=>choose(i)}>{label}</Control>)}<Control className={s.tap} disabled={locked||mode===null} onClick={()=>setMode(null)}>Reset</Control></div>
 </div>;
}
export default function Demo({slug}:{slug:string}){return <Lesson slug={slug} minInteractions={2} predict={{"question": "Head A weights [.8,.2], B [.1,.9], values [0,10]. Project outputs with [1,\u22121]. What results?", "options": ["\u22127", "7", "11"], "answer": 0}} exploreHint="Compare the first two cases; retain their evidence." reveal={()=><p>Your two heads produced 2 and 9; concatenating [2,9] and projecting with [1,−1] gave −7. Identical weights instead produced [5,5] and zero. Heads can coincide, and this stipulated arithmetic does not establish named semantic roles in a trained transformer.</p>}>{ctx=><Stage {...ctx}/>}</Lesson>;}

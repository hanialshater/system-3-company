'use client';
import {useEffect,useRef,useState} from 'react';
import {Lesson,type StageContext} from '@/kit/Lesson';
import {Control} from '@/kit/controls';
import * as m from './model';
import s from './styles.module.css';
const f=(n:number,d=3)=>{const x=Math.abs(n)<1e-10?0:n;return x.toFixed(d);};
function Picture({mode}:{mode:number}){const r=m.run(mode);return <svg className={s.plot} viewBox="0 0 280 112" role="img" aria-label="Predict before the label — worked example"><text x="4" y="15">t</text><text x="34" y="15">prior</text><text x="104" y="15">y</text><text x="147" y="15">new</text><text x="218" y="15">mean</text>{r.rows.map((row,i)=><g key={i}><text x="4" y={33+i*16}>{i+1}</text><text x="35" y={33+i*16}>{row.before}</text><text x="104" y={33+i*16}>{row.y}</text><text x="148" y={33+i*16}>{row.after}</text><text x="220" y={33+i*16}>{f(row.mean,2)}</text></g>)}</svg>;}
function snapshot(mode:number){const r=m.run(mode);return `t=${r.rows.length}: online=${r.last.after} · mean=${f(r.last.mean,2)}`;}
function Stage({phase,locked,interact}:StageContext){
 const [mode,setMode]=useState<number|null>(null);
 const [witnesses,setWitnesses]=useState<Record<number,string>>({});
 const earned=useRef(new Set<number>());
 useEffect(()=>{if(phase==='reveal')setMode(0);},[phase]);
 const choose=(i:number)=>{setMode(i);if(i<2&&!earned.current.has(i)){earned.current.add(i);setWitnesses(old=>({...old,[i]:snapshot(i)}));interact();}};
 return <div className={s.root}>
 {locked||mode===null?<div className={s.input}>{"w\u2080=0; labels [0,0,4,4]. Before each arrival predict w, then update w\u2190w+.5(y\u2212w)."}</div>:<Picture mode={mode}/>}
 {Object.keys(witnesses).length>0?<div className={s.proof} aria-label="Saved results">{[0,1].map(i=>witnesses[i]?<p key={i}>{witnesses[i]}</p>:null)}</div>:null}
 <div className={s.row}>{["Drift", "Return0"].map((label,i)=><Control key={label} className={s.tap} disabled={locked||mode===i} aria-pressed={!locked&&mode===i} onClick={()=>choose(i)}>{label}</Control>)}<Control className={s.tap} disabled={locked||mode===null} onClick={()=>setMode(null)}>Reset</Control></div>
 </div>;
}
export default function Demo({slug}:{slug:string}){return <Lesson slug={slug} minInteractions={2} predict={{"question": "After labels 0,0,4, the online state is 2. What is its state after the next 4?", "options": ["2", "3", "4"], "answer": 1}} exploreHint="Compare the two cases and their saved results." reveal={()=><p>Your online updates reached 3 after [0,0,4,4], while the all-history mean reached 2. A returning zero moved them to 1.5 and 1.6. The prediction precedes each label. Recency weighting adapts differently to a changing stream; these cases do not prove it uniformly outperforms historical averaging.</p>}>{ctx=><Stage {...ctx}/>}</Lesson>;}

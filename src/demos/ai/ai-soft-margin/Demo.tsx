'use client';
import {useEffect,useRef,useState} from 'react';
import {Lesson,type StageContext} from '@/kit/Lesson';
import {Control} from '@/kit/controls';
import * as m from './model';
import s from './styles.module.css';
const f=(n:number,d=3)=>{const x=Math.abs(n)<1e-10?0:n;return x.toFixed(d);};
function Picture({mode}:{mode:number}){const r=m.run(mode);return <svg className={s.plot} viewBox="0 0 280 112" role="img" aria-label="Pay for the violation? — worked example"><text x="6" y="17">C={r.C} · outlier(.2,−1): ywx&lt;0</text><text x="5" y="40">w</text><text x="47" y="40">norm</text><text x="113" y="40">Σhinge</text><text x="211" y="40">J</text>{r.rows.map((row,i)=><g key={i}><text x="5" y={64+i*27}>{row.w}</text><text x="47" y={64+i*27}>{f(row.norm,3)}</text><text x="119" y={64+i*27}>{f(row.sum,1)}</text><text x="203" y={64+i*27}>{f(row.total,3)}</text></g>)}</svg>;}
function snapshot(mode:number){const r=m.run(mode);return `C=${r.C}: J₁=${f(r.rows[0].total,3)} · J½=${f(r.rows[1].total,3)}`;}
function Stage({phase,locked,interact}:StageContext){
 const [mode,setMode]=useState<number|null>(null);
 const [witnesses,setWitnesses]=useState<Record<number,string>>({});
 const earned=useRef(new Set<number>());
 useEffect(()=>{if(phase==='reveal')setMode(0);},[phase]);
 const choose=(i:number)=>{setMode(i);if(i<2&&!earned.current.has(i)){earned.current.add(i);setWitnesses(old=>({...old,[i]:snapshot(i)}));interact();}};
 return <div className={s.root}>
 {locked||mode===null?<div className={s.input}>{"Data (x,y): (\u22121,\u22121),(1,1),(.2,\u22121). Compare w=1,.5; J=.5w\u00b2+C\u03a3max(0,1\u2212ywx)."}</div>:<Picture mode={mode}/>}
 {Object.keys(witnesses).length>0?<div className={s.proof} aria-label="Saved results">{[0,1].map(i=>witnesses[i]?<p key={i}>{witnesses[i]}</p>:null)}</div>:null}
 <div className={s.row}>{["C=.1", "C=1", "C=0"].map((label,i)=><Control key={label} className={s.tap} disabled={locked||mode===i} aria-pressed={!locked&&mode===i} onClick={()=>choose(i)}>{label}</Control>)}<Control className={s.tap} disabled={locked||mode===null} onClick={()=>setMode(null)}>Reset</Control></div>
 </div>;
}
export default function Demo({slug}:{slug:string}){return <Lesson slug={slug} minInteractions={2} predict={{"question": "Norm terms are .5,.125 and hinge sums 1.2,2.1 for w=1,.5. At C=1, which candidate wins?", "options": ["w=1", "w=.5", "Equal"], "answer": 0}} exploreHint="Compare the two cases and their saved results." reveal={()=><p>Your C=0.1 preferred w=0.5 with objective 0.335 versus 0.620. C=1 preferred w=1 with 1.700 versus 2.225. Changing the violation penalty reversed these two candidates’ ranking. Neither is certified as a global optimum; violations can trade against the norm term.</p>}>{ctx=><Stage {...ctx}/>}</Lesson>;}

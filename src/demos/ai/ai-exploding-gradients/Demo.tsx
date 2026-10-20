'use client';
import {useEffect,useRef,useState} from 'react';
import {Lesson,type StageContext} from '@/kit/Lesson';
import {Control} from '@/kit/controls';
import * as m from './model';
import s from './styles.module.css';
const f=(n:number,d=3)=>n.toFixed(d).replace(/^-0\.000$/, '0.000');
function Picture({mode}:{mode:number}){const r=m.run(mode);const show=(n:number,d=3)=>f(n,d);return <svg className={s.plot} viewBox="0 0 290 132" role="img" aria-label="Where does clipping act? \u2014 computed finite mechanism"><text x="145" y="17" textAnchor="middle">{r.depth} factors ×{r.factor} · rate=.1</text>{r.factors.map((v,i)=><g key={i}><rect x={9+i*(272/r.depth)} y="34" width={264/r.depth-2} height="26" rx="3" className={s.box}/><text x={9+i*(272/r.depth)+(264/r.depth-2)/2} y="52" textAnchor="middle">{v}</text></g>)}<text x="7" y="87">Raw: {show(r.raw,4)}</text><path d="M130 82 H177" className={s.line}/><text x="180" y="87">Clip: {show(r.applied,4)}</text><text x="145" y="117" textAnchor="middle">Δraw={show(r.rawUpdate,4)} · Δapplied={show(r.update,4)}</text></svg>;}
function snapshot(mode:number){const r=m.run(mode);return `${r.factor}^${r.depth}: raw=${f(r.raw,4)}, applied=${f(r.applied,4)}`;}
function Stage({phase,locked,interact}:StageContext){
 const [mode,setMode]=useState<number|null>(null);const [witnesses,setWitnesses]=useState<Record<number,string>>({});const earned=useRef(new Set<number>());
 // The reveal quotes the primary diagram; retain both earned cases while restoring it.
 useEffect(()=>{if(phase==='reveal')setMode(0);},[phase]);
 const choose=(i:number)=>{setMode(i);if(i<2&&!earned.current.has(i)){earned.current.add(i);setWitnesses(old=>({...old,[i]:snapshot(i)}));interact();}};
 return <div className={s.root}>
 {locked||mode===null?<div className={s.input}>{"4 factors, each 2; raw derivative=product. Clip magnitude≤5. Rate=.1."}</div>:<Picture mode={mode}/>}
 {Object.keys(witnesses).length>0?<div className={s.proof} aria-label="Retained evidence">{[0,1].map(i=>witnesses[i]?<p key={i}>{witnesses[i]}</p>:null)}</div>:null}
 <div className={s.row}>{["2⁴", "2⁸", "(.5)⁴"].map((label,i)=><Control key={label} className={s.tap} disabled={locked||mode===i} aria-pressed={!locked&&mode===i} onClick={()=>choose(i)}>{label}</Control>)}<Control className={s.tap} disabled={locked||mode===null} onClick={()=>setMode(null)}>Reset</Control></div>
 </div>;
}
export default function Demo({slug}:{slug:string}){return <Lesson slug={slug} minInteractions={2} predict={{"question": "Four scalar chain factors equal 2. Clip the final gradient to magnitude 5. At learning rate .1, what are raw and clipped update magnitudes?", "options": ["1.6 and .5", ".5 and .5", "1.6 and 1.6"], "answer": 0}} exploreHint="Compare the first two cases; retain their evidence." reveal={()=><p>Your four factors of 2 produced raw derivative 16; clipping passed 5 to the optimizer, reducing update magnitude from 1.6000 to .5000. Eight factors produced 256. Clipping changes the applied gradient, not the chain derivative, and does not solve every training instability.</p>}>{ctx=><Stage {...ctx}/>}</Lesson>;}

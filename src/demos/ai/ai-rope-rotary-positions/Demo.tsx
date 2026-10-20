'use client';
import {useEffect,useRef,useState} from 'react';
import {Lesson,type StageContext} from '@/kit/Lesson';
import {Control} from '@/kit/controls';
import * as m from './model';
import s from './styles.module.css';
const f=(n:number,d=3)=>{const x=Math.abs(n)<1e-10?0:n;return x.toFixed(d);};
function Picture({mode}:{mode:number}){const r=m.run(mode);return <svg className={s.plot} viewBox="0 0 280 112" role="img" aria-label="Move both angles together — worked example"><path d="M8 67 H101 M49 107 V10" className={s.axis}/>{[r.a,r.b].map((v,i)=><path key={i} d={`M49 67 L${49+v[0]*32} ${67-v[1]*32}`} className={i===0?s.line:s.other}/>)}<text x="111" y="24">q=[{r.a.map(v=>f(v,2)).join(',')}]</text><text x="111" y="49">k=[{r.b.map(v=>f(v,2)).join(',')}]</text><text x="111" y="74">Δ={f(r.delta/Math.PI,2)}π</text><text x="111" y="99">dot={f(r.dot,2)}</text></svg>;}
function snapshot(mode:number){const r=m.run(mode);return `Case${mode+1}: dot=${f(r.dot,2)} · Δ=${f(r.delta/Math.PI,2)}π`;}
function Stage({phase,locked,interact}:StageContext){
 const [mode,setMode]=useState<number|null>(null);
 const [witnesses,setWitnesses]=useState<Record<number,string>>({});
 const earned=useRef(new Set<number>());
 useEffect(()=>{if(phase==='reveal')setMode(0);},[phase]);
 const choose=(i:number)=>{setMode(i);if(i<3&&!earned.current.has(i)){earned.current.add(i);setWitnesses(old=>({...old,[i]:snapshot(i)}));interact();}};
 return <div className={s.root}>
 {locked||mode===null?<div className={s.input}>{"q=k=[1,0]; i=0,j=\u03c0/2. Shift both \u03c0/4; contrast q=[1,1] at original angles."}</div>:<Picture mode={mode}/>}
 {Object.keys(witnesses).length>0?<div className={s.proof} aria-label="Saved results">{[0,1,2].map(i=>witnesses[i]?<p key={i}>{witnesses[i]}</p>:null)}</div>:null}
 <div className={s.row}>{["Original", "Shift", "Different q"].map((label,i)=><Control key={label} className={s.tap} disabled={locked||mode===i} aria-pressed={!locked&&mode===i} onClick={()=>choose(i)}>{label}</Control>)}<Control className={s.tap} disabled={locked||mode===null} onClick={()=>setMode(null)}>Reset</Control></div>
 </div>;
}
export default function Demo({slug}:{slug:string}){return <Lesson slug={slug} minInteractions={3} predict={{"question": "You encode two token positions by rotating copies of one vector. Rotate [1,0] by 0 and \u03c0/2, then add \u03c0/4 to both angles. What happens to their dot product?", "options": ["Stays 0", "Becomes 1", "Becomes \u22121"], "answer": 0}} exploreHint="Compare all three cases; retain their evidence." reveal={()=><p>Your common angle shift preserved dot product 0 while both vector coordinates changed. Using q=[1,1] with k=[1,0] at the original angles instead gave 1. Relative rotation controls the dot product, but cosine of the angle difference alone assumes input vectors. This is one 2D block.</p>}>{ctx=><Stage {...ctx}/>}</Lesson>;}

'use client';
import {useEffect,useRef,useState} from 'react';
import {Lesson,type StageContext} from '@/kit/Lesson';
import {Control} from '@/kit/controls';
import * as m from './model';
import s from './styles.module.css';
const f=(n:number,d=3)=>{const x=Math.abs(n)<1e-10?0:n;return x.toFixed(d);};
function Picture({mode}:{mode:number}){const r=m.run(mode);return <svg className={s.plot} viewBox="0 0 280 112" role="img" aria-label="Can more samples fix the floor? — worked example"><path d="M28 12 V87 H266" className={s.axis}/><text x="3" y="14">.6</text><text x="9" y="89">0</text>{['train','test'].map((key,j)=><polyline key={key} points={r.rows.map((p,i)=>`${48+i*94},${87-p[key as 'train'|'test']*120}`).join(' ')} className={j===0?s.other:s.line}/>)}{r.rows.map((p,i)=><text key={i} x={48+i*94} y="105" textAnchor="middle">n={p.n}</text>)}<text x="55" y="15">━test ┄train</text></svg>;}
function snapshot(mode:number){const r=m.run(mode);return `Family${r.high?"B":"A"}: gap₂=${f(r.rows[0].test-r.rows[0].train,3)} · gap₈=${f(r.rows[2].test-r.rows[2].train,3)} · floor=${r.floor}`;}
function Stage({phase,locked,interact}:StageContext){
 const [mode,setMode]=useState<number|null>(null);
 const [witnesses,setWitnesses]=useState<Record<number,string>>({});
 const earned=useRef(new Set<number>());
 useEffect(()=>{if(phase==='reveal')setMode(0);},[phase]);
 const choose=(i:number)=>{setMode(i);if(i<2&&!earned.current.has(i)){earned.current.add(i);setWitnesses(old=>({...old,[i]:snapshot(i)}));interact();}};
 return <div className={s.root}>
 {locked||mode===null?<div className={s.input}>{"Synthetic family A: train=.1+.2/n, test=.1+.8/n. Family B: train=.4+.1/n, test=.4+.2/n."}</div>:<Picture mode={mode}/>}
 {Object.keys(witnesses).length>0?<div className={s.proof} aria-label="Saved results">{[0,1].map(i=>witnesses[i]?<p key={i}>{witnesses[i]}</p>:null)}</div>:null}
 <div className={s.row}>{["FamilyA", "FamilyB"].map((label,i)=><Control key={label} className={s.tap} disabled={locked||mode===i} aria-pressed={!locked&&mode===i} onClick={()=>choose(i)}>{label}</Control>)}<Control className={s.tap} disabled={locked||mode===null} onClick={()=>setMode(null)}>Reset</Control></div>
 </div>;
}
export default function Demo({slug}:{slug:string}){return <Lesson slug={slug} minInteractions={2} predict={{"question": "Your budget can buy more and more training data for one of two models. Which stipulated family has the lower limiting test error as sample size grows?", "options": ["A", "B", "Equal"], "answer": 0}} exploreHint="Compare the two cases and their saved results." reveal={()=><p>Your family A narrowed its train/test gap from 0.300 at n=2 to 0.075 at n=8, approaching floor 0.1. Family B instead approached 0.4. More samples reduce these declared estimation terms but cannot remove the stipulated floor. These synthetic curves are not forecasts of trained-model performance.</p>}>{ctx=><Stage {...ctx}/>}</Lesson>;}

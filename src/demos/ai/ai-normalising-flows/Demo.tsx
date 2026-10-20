'use client';
import {useEffect,useRef,useState} from 'react';
import {Lesson,type StageContext} from '@/kit/Lesson';
import {Control} from '@/kit/controls';
import * as m from './model';
import s from './styles.module.css';
const f=(n:number,d=3)=>{const x=Math.abs(n)<1e-10?0:n;return x.toFixed(d);};
function Picture({mode}:{mode:number}){const r=m.run(mode);return <svg className={s.plot} viewBox="0 0 280 112" role="img" aria-label="Where did the density go? — worked example"><text x="6" y="18">X:[0,1] → Y:{r.scale}X+1</text><path d="M20 78 H260 M20 78 V30" className={s.axis}/><rect x="45" y="43" width="190" height="35" className={s.fill}/><text x="140" y="65" textAnchor="middle">density={f(r.density,1)}</text><text x="45" y="98" textAnchor="middle">{r.endpoints[0]}</text><text x="235" y="98" textAnchor="middle">{r.endpoints[1]}</text><text x="140" y="98" textAnchor="middle">area={r.mass}</text></svg>;}
function snapshot(mode:number){const r=m.run(mode);return `Slope=${r.scale}: x=${r.inverse}←y=${r.mid}; density=${f(r.density,1)} · mass=${r.mass}`;}
function Stage({phase,locked,interact}:StageContext){
 const [mode,setMode]=useState<number|null>(null);
 const [witnesses,setWitnesses]=useState<Record<number,string>>({});
 const earned=useRef(new Set<number>());
 useEffect(()=>{if(phase==='reveal')setMode(0);},[phase]);
 const choose=(i:number)=>{setMode(i);if(i<2&&!earned.current.has(i)){earned.current.add(i);setWitnesses(old=>({...old,[i]:snapshot(i)}));interact();}};
 return <div className={s.root}>
 {locked||mode===null?<div className={s.input}>{"X uniform[0,1]. Compare Y=2X+1 with Y=\u22122X+1. At Y midpoint, what density?"}</div>:<Picture mode={mode}/>}
 {Object.keys(witnesses).length>0?<div className={s.proof} aria-label="Saved results">{[0,1].map(i=>witnesses[i]?<p key={i}>{witnesses[i]}</p>:null)}</div>:null}
 <div className={s.row}>{["Stretch", "Reverse"].map((label,i)=><Control key={label} className={s.tap} disabled={locked||mode===i} aria-pressed={!locked&&mode===i} onClick={()=>choose(i)}>{label}</Control>)}<Control className={s.tap} disabled={locked||mode===null} onClick={()=>setMode(null)}>Reset</Control></div>
 </div>;
}
export default function Demo({slug}:{slug:string}){return <Lesson slug={slug} minInteractions={2} predict={{"question": "Your generative model must keep total probability at 1 as it reshapes random noise. Y=2X+1 stretches a uniform interval to length 2. What is its density?", "options": ["0.5", "1", "2"], "answer": 0}} exploreHint="Compare the two cases and their saved results." reveal={()=><p>Your stretched interval doubled its length and halved density to 0.5, preserving area 1. Reversing the slope kept density positive at 0.5. The absolute Jacobian supplies that correction. Zero scale has no inverse; these are declared affine transforms, not trained flows.</p>}>{ctx=><Stage {...ctx}/>}</Lesson>;}

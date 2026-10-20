'use client';
import {useEffect,useRef,useState} from 'react';
import {Lesson,type StageContext} from '@/kit/Lesson';
import {Control} from '@/kit/controls';
import * as m from './model';
import s from './styles.module.css';
const f=(n:number,d=3)=>n.toFixed(d).replace(/^-0\.000$/, '0.000');
function Picture({mode}:{mode:number}){const r=m.run(mode);const show=(n:number,d=3)=>f(n,d);return <svg className={s.plot} viewBox="0 0 290 132" role="img" aria-label="One surprise, two changes \u2014 computed finite mechanism"><text x="145" y="17" textAnchor="middle">r={r.reward} − V={r.oldV} → δ={show(r.delta)}</text><path d="M145 23 L72 43 M145 23 L218 43" className={s.line}/><rect x="3" y="43" width="137" height="78" rx="8" className={s.box}/><rect x="150" y="43" width="137" height="78" rx="8" className={s.box}/><text x="71" y="61" textAnchor="middle">Critic α=.5</text><text x="71" y="83" textAnchor="middle">V: 1 → {show(r.value)}</text><text x="71" y="105" textAnchor="middle">1 + .5δ</text><text x="218" y="61" textAnchor="middle">Actor α=.2</text><text x="218" y="82" textAnchor="middle">θ: 0 → {show(r.theta)}</text><text x="218" y="105" textAnchor="middle">p: .5 → {show(r.p,4)}</text></svg>;}
function snapshot(mode:number){const r=m.run(mode);return `r=${r.reward}: V=${f(r.value)}, p=${f(r.p,4)}`;}
function Stage({phase,locked,interact}:StageContext){
 const [mode,setMode]=useState<number|null>(null);const [witnesses,setWitnesses]=useState<Record<number,string>>({});const earned=useRef(new Set<number>());
 // The reveal quotes the primary diagram; retain both earned cases while restoring it.
 useEffect(()=>{if(phase==='reveal')setMode(0);},[phase]);
 const choose=(i:number)=>{setMode(i);if(i<2&&!earned.current.has(i)){earned.current.add(i);setWitnesses(old=>({...old,[i]:snapshot(i)}));interact();}};
 return <div className={s.root}>
 {locked||mode===null?<div className={s.input}>{"r=2; V=1; θ=0; p(A)=.5; αV=.5; αactor=.2; ∇log(p)=.5; terminal."}</div>:<Picture mode={mode}/>}
 {Object.keys(witnesses).length>0?<div className={s.proof} aria-label="Retained evidence">{[0,1].map(i=>witnesses[i]?<p key={i}>{witnesses[i]}</p>:null)}</div>:null}
 <div className={s.row}>{["Return 2", "Return 0"].map((label,i)=><Control key={label} className={s.tap} disabled={locked||mode===i} aria-pressed={!locked&&mode===i} onClick={()=>choose(i)}>{label}</Control>)}<Control className={s.tap} disabled={locked||mode===null} onClick={()=>setMode(null)}>Reset</Control></div>
 </div>;
}
export default function Demo({slug}:{slug:string}){return <Lesson slug={slug} minInteractions={2} predict={{"question": "Terminal return 2; old value 1; value rate .5. Actor starts θ=0, p(A)=.5; actor rate .2 and log-gradient .5. After this update, p(A) is?", "options": [".4750", ".5000", ".5250"], "answer": 2}} exploreHint="Compare the first two cases; retain their evidence." reveal={()=><p>Your return of 2 produced surprise 1: the critic moved to 1.5 while the separate actor probability rose to .5250. Return 0 reversed both changes. Both updates used the old estimates; one probability change establishes no optimal policy.</p>}>{ctx=><Stage {...ctx}/>}</Lesson>;}

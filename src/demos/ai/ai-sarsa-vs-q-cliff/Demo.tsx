'use client';
import {useEffect,useRef,useState} from 'react';
import {Lesson,type StageContext} from '@/kit/Lesson';
import {Control} from '@/kit/controls';
import * as m from './model';
import s from './styles.module.css';
const f=(n:number,d=3)=>n.toFixed(d).replace(/^-0\.000$/, '0.000');
function Picture({mode}:{mode:number}){const r=m.run(mode);const show=(n:number,d=3)=>f(n,d);return <svg className={s.plot} viewBox="0 0 290 70" role="img" aria-label="Which next action counts? — worked example"><text x="145" y="13" textAnchor="middle">{r.terminal?'Terminal':`Selected ${r.selected===0?'safe':'risky'}`} · Qnext=[1,5]</text>{r.updates.map((u,i)=><g key={i}><text x="7" y={31+i*17}>{i===0?'SARSA':'Q-learning'}</text><text x="108" y={31+i*17}>−1+{r.continuations[i]}</text><path d={`M174 ${26+i*17} h24`} className={s.line}/><text x="208" y={31+i*17}>{show(u)}</text></g>)}<text x="145" y="65" textAnchor="middle">target × .5 → Qnew · Qold=0</text></svg>;}
function snapshot(mode:number){const r=m.run(mode);return `${r.terminal?'Terminal':r.selected===0?'Safe':'Risky'}: SARSA=${f(r.updates[0])}, Q=${f(r.updates[1])}`;}
function Stage({phase,locked,interact}:StageContext){
 const [mode,setMode]=useState<number|null>(null);const [witnesses,setWitnesses]=useState<Record<number,string>>({});const earned=useRef(new Set<number>());
 // The reveal quotes the primary diagram; retain both earned cases while restoring it.
 useEffect(()=>{if(phase==='reveal')setMode(0);},[phase]);
 const choose=(i:number)=>{setMode(i);if(i<2&&!earned.current.has(i)){earned.current.add(i);setWitnesses(old=>({...old,[i]:snapshot(i)}));interact();}};
 return <div className={s.root}>
 {locked||mode===null?<div className={s.input}>{"r=−1; γ=1; Qold=0; α=.5; Qnext(safe)=1; Qnext(risky)=5; selected=safe."}</div>:<Picture mode={mode}/>}
 {Object.keys(witnesses).length>0?<div className={s.proof} aria-label="Saved results">{[0,1].map(i=>witnesses[i]?<p key={i}>{witnesses[i]}</p>:null)}</div>:null}
 <div className={s.row}>{["Safe", "Risky", "Terminal"].map((label,i)=><Control key={label} className={s.tap} disabled={locked||mode===i} aria-pressed={!locked&&mode===i} onClick={()=>choose(i)}>{label}</Control>)}<Control className={s.tap} disabled={locked||mode===null} onClick={()=>setMode(null)}>Reset</Control></div>
 </div>;
}
export default function Demo({slug}:{slug:string}){return <Lesson slug={slug} minInteractions={2} predict={{"question": "r=−1, γ=1, old Q=0, α=.5. Next Q(safe)=1, Q(risky)=5; behaviour selects safe. Which pair of updates results?", "options": ["SARSA 0; Q-learning 2", "SARSA 2; Q-learning 0", "Both 2"], "answer": 0}} exploreHint="Compare the two cases and their saved results." reveal={()=><p>Your safe behaviour action supplied continuation 1 to SARSA, producing update 0. Q-learning used the maximum 5, producing update 2. Selecting risky made both updates 2. Terminal continuations become zero. One transition compares backup rules; it does not establish which learned route wins.</p>}>{ctx=><Stage {...ctx}/>}</Lesson>;}

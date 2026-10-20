'use client';
import {useRef,useState} from 'react';
import {Lesson} from '@/kit/Lesson';
import {Control} from '@/kit/controls';
import {run} from './model';
import s from './styles.module.css';
function Picture({mode}:{mode:number}){const r=run(mode);return (<><svg className={s.plot} viewBox="0 0 300 174" role="group" aria-label="New item gains after nested selections">{r.kind==='coverage'?r.panels.map((p,index)=>{const ox=6+index*98;return <g key={p.label}><text x={ox+40} y="20" textAnchor="middle">{p.label}</text>{r.universe.map((v,j)=><g key={v}><rect x={ox+(j%4)*21} y={32+Math.floor(j/4)*32} width="18" height="25" className={p.covered.includes(v)?s.cell:s.muted}/><text x={ox+(j%4)*21+9} y={49+Math.floor(j/4)*32} textAnchor="middle">{p.added.includes(v)?'+':v}</text></g>)}<text x={ox+40} y="120" textAnchor="middle">{r.candidate} adds {p.gain}</text></g>}):r.panels.map((p,i)=><g key={p.label}><rect x={32+i*140} y={130-p.gain*9} width="70" height={Math.max(1,p.gain*9)} className={s.cell}/><text x={67+i*140} y="151" textAnchor="middle">{p.label} → +{p.gain}</text></g>)}</svg><div className={s.caption}>{r.kind==='coverage'?'Filled: covered · +: new':'Complement toy: Y gain'}</div></>);}
export default function Demo({slug}:{slug:string}){
 const [mode,setMode]=useState<number|null>(null);const [seen,setSeen]=useState(false);const earned=useRef(new Set<number>());const [visited,setVisited]=useState<number[]>([]);const required=[0, 1];const proof=run(0);
 return <Lesson slug={slug} minInteractions={2} predict={{"question": "You pick sets to cover as many numbered items as possible. A covers 1,2,3,4. B covers 3,4,5,6. After choosing A, how many new items does B add?", "options": ["2", "4", "0"], "answer": 0}} exploreHint="Compare the original case, then change its assumptions." reveal={()=><p>The retained B covers four items alone, adds two after A, and adds only one after A plus D. Its marginal gain depends on what is already covered. Coverage has diminishing set gains. The complements countercase instead gains more after another choice, so it is not submodular.</p>}>
 {({locked,interact,phase})=><div className={s.root}>
 {locked||(mode===null&&phase!=='reveal')?<div className={s.input}>A &#123;1,2,3,4&#125;; B &#123;3,4,5,6&#125;; D &#123;1,5,7&#125;.</div>:<div><Picture mode={mode??0}/></div>}
 {!locked&&seen&&<p className={s.proof}>Retained: {proof.panels.map(p=>p.gain).join(' → ')}</p>}
 {!locked&&visited.includes(1)&&<p className={s.proof}>Complements: {run(1).panels.map(p=>p.gain).join(' → ')}</p>}
 <div className={s.row}>{["Compare gains", "Complements", "New sets"].map((label,i)=><Control key={label} className={s.tap} disabled={locked||mode===i||(phase==='reveal'&&mode===null&&i===0)} aria-pressed={!locked&&(mode===i||(phase==='reveal'&&mode===null&&i===0))} onClick={()=>{setMode(i);setVisited(v=>v.includes(i)?v:[...v,i]);if(i===0)setSeen(true);if(required.includes(i)&&!earned.current.has(i)){earned.current.add(i);interact();}}}>{label}</Control>)}<Control className={s.tap} disabled={locked||mode===null} onClick={()=>setMode(null)}>Reset</Control></div>
 </div>}
 </Lesson>;
}

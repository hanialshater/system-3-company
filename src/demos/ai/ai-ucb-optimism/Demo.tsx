'use client';
import {useRef,useState} from 'react';
import {Lesson} from '@/kit/Lesson';
import {Control} from '@/kit/controls';
import * as m from './model';
import s from './styles.module.css';
const f=(x:number)=>x.toFixed(3);
function Picture({mode,paired}:{mode:number;paired?:boolean}){const r=m.run(mode);return <><table className={s.table}><thead><tr><th>Arm</th><th>Mean</th><th>n</th><th>Bonus</th><th>Index</th></tr></thead><tbody>{r.means.map((v,i)=><tr key={i}><th>{i===0?'A':'B'}{r.chosen===i?' ◀':''}</th><td>{v}</td><td>{r.counts[i]}</td><td>{r.indices[i]===null?'—':f(r.indices[i]!-v)}</td><td>{r.indices[i]===null?'Init':f(r.indices[i]!)}</td></tr>)}</tbody></table><svg className={s.plot} viewBox="0 0 300 65" role="img" aria-label="Observed mean outlined and added optimism bonus filled">{r.means.map((v,i)=><g key={i}><rect x="15" y={8+i*27} width={v*90} height="17" fill="none" stroke="currentColor"/>{r.indices[i]!==null&&<rect x={15+v*90} y={8+i*27} width={(r.indices[i]!-v)*90} height="17" className={s.cell}/>}</g>)}</svg></>;}

export default function Demo({slug}:{slug:string}){
 const [mode,setMode]=useState<number|null>(null);const [seen,setSeen]=useState<number[]>([]);const earned=useRef(new Set<number>());
 const choose=(i:number,interact:()=>void)=>{setMode(i);if([0, 1, 2].includes(i)&&!earned.current.has(i)){earned.current.add(i);setSeen([...earned.current]);interact();}};
 return <Lesson slug={slug} minInteractions={3} predict={{"question": "A: mean .6 from10 pulls. B: mean .5 from1 pull. At t=11, select by mean+sqrt(2 ln(t)/count). Which wins?", "options": ["A", "B", "Tie"], "answer": 1}} exploreHint={"Rewards are bounded real numbers in [0,1], not only zero or one. The index is not a probability."} reveal={()=> <p>B’s retained index was 2.690 despite its lower mean .5. Its single pull gave a larger bonus. After the disclosed reward zero, B’s total stayed .5 over two pulls: mean .25 and index 1.826. B remained selected. This index can exceed one because it is a selection score, not a probability. Equal counts remove the bonus difference.</p>}>
 {({locked,interact})=><div className={s.root}>
 {locked||mode===null?<div className={s.input}>A: mean .6,n10 · B: mean .5,n1 · t11 · bonus=√(2 ln(t)/n) · next B reward0</div>:<Picture mode={mode} paired={seen.includes(0)&&seen.includes(1)}/>}
 {!locked&&seen.length===3&&<div className={s.proof}>Witness: B .5/1→.5/2 · Index {f(m.run(0).indices[1]!)}→{f(m.run(1).indices[1]!)} · n5/5→A</div>}
 <div className={s.row}>{["Indices", "Reward0", "Equal counts", "Untried"].map((label,i)=><Control key={label} className={s.tap} disabled={locked||mode===i} aria-pressed={!locked&&mode===i} onClick={()=>choose(i,interact)}>{label}</Control>)}<Control className={s.tap} disabled={locked||mode===null} onClick={()=>setMode(null)}>Reset</Control></div>
 </div>}
 </Lesson>;
}

"use client";
import {useState} from "react";
import {Lesson} from "@/kit/Lesson";
import {Control} from "@/kit/controls";
import {Milestones} from "@/kit/milestones";
import {compute,type Result} from "./model";
import s from "./styles.module.css";
export default function Demo({slug}:{slug:string}) {
 const [mode,setMode]=useState(-1);
 const [d,setData]=useState<Result|null>(null);
 const [saved,setSaved]=useState<(Result|null)[]>([null,null,null]);
 const run=(m:number,reach:(name:string)=>void)=>{const result=compute(m);setMode(m);setData(result);setSaved(old=>old.map((v,i)=>i===m?result:v));reach(String(m));};
 return <Lesson slug={slug} predict={{"question": "Which is the first synchronous round in which D can depend on A?", "options": ["Round 1", "Round 2", "Round 3"], "answer": 2}} minInteractions={3} exploreHint="Try all three cases. Reset clears the view and keeps your saved results." reveal={()=> <p>With synchronous old-state updates, A’s marker reached D only at round 3. Cutting BC left C and D at zero. Starting at C reached B and D in one round. This fixed max circuit illustrates graph dependence, not trained-GNN expressiveness.</p>}>
 {({locked,interact})=><Milestones interact={interact} names={["0","1","2"]}>{reach=><div className={s.wrap}>
 <p className={s.input}>{"A—B—C—D · h₀=1000 · synchronous max"}</p>
 <svg className={s.diagram} viewBox="0 0 280 64" role="img" aria-label="chain · worked example">
 {d ? <g>{d.links.map(([a,b],i)=><line key={i} x1={22+a*76} y1="27.45" x2={22+b*76} y2="27.45"/>)}{d.values.map((v,i)=><g key={i}><circle cx={22+i*76} cy="27.45" r="14" style={{fill:v?'var(--domain)':'var(--bg-2)'}}/><text x={17+i*76} y="30.8">{v}</text><text x={17+i*76} y="50.9">{d.labels[i]}</text></g>)}</g> : <g><rect x="3" y="8.69" width="274" height="43.55" rx="6"/><text x="12" y="34.82">?</text></g>}
 </svg>
 <div className={s.controls}><Control disabled={locked||mode===0} onClick={()=>run(0,reach)}>3 rounds</Control><Control disabled={locked||mode===1} onClick={()=>run(1,reach)}>Cut BC</Control><Control disabled={locked||mode===2} onClick={()=>run(2,reach)}>Seed C</Control><Control disabled={locked||mode===-1} onClick={()=>{setMode(-1);setData(null);}}>Reset</Control></div>
 <div className={s.witness} aria-label="Saved results">{saved.map((v,i)=><div key={i}>{i+1}: {v?.summary??'—'}</div>)}</div>
 </div>}</Milestones>}
 </Lesson>;
}

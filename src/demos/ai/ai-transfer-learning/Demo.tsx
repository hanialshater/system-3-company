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
 return <Lesson slug={slug} predict={{"question": "Can a head recover x₁ perfectly from x₀ on all four input pairs?", "options": ["Yes", "No"], "answer": 1}} minInteractions={3} exploreHint="Compare all three operations; Reset retains the earned evidence." reveal={()=> <p>The x₀ head fit with SSE 0. Changing the target to x₁ gave SSE 4 because identical frozen codes had conflicting labels. Restoring x₁ allowed SSE 0. Transfer depends on retained information and task; these exact fits establish no real data-efficiency claim.</p>}>
 {({locked,interact})=><Milestones interact={interact} names={["0","1","2"]}>{reach=><div className={s.wrap}>
 <p className={s.input}>{"x∈{−1,+1}² · φ=x₀ · y=x₀/x₁ · w=Σφy/Σφ²"}</p>
 <svg className={s.diagram} viewBox="0 0 280 64" role="img" aria-label="encoder · declared finite computation">
 {d ? <g><text x="4" y="15">frozen φ → fitted w → ŷ / target</text><text x="4" y="37">φ(1,−1)={mode===2?'[1,−1]':'1'} → {mode===2?-1:d.detail[0]} / {mode===0?1:-1}</text><text x="4" y="59">φ(1,+1)={mode===2?'[1,1]':'1'} → {mode===2?1:d.detail[0]} / 1</text></g> : <g><rect x="3" y="8.69" width="274" height="43.55" rx="6"/><text x="12" y="34.82">?</text></g>}
 </svg>
 <div className={s.controls}><Control disabled={locked||mode===0} onClick={()=>run(0,reach)}>Fit x₀</Control><Control disabled={locked||mode===1} onClick={()=>run(1,reach)}>Target x₁</Control><Control disabled={locked||mode===2} onClick={()=>run(2,reach)}>Restore x₁</Control><Control disabled={locked||mode===-1} onClick={()=>{setMode(-1);setData(null);}}>Reset</Control></div>
 <div className={s.witness} aria-label="Retained computed evidence">{saved.map((v,i)=><div key={i}>{i+1}: {v?.summary??'—'}</div>)}</div>
 </div>}</Milestones>}
 </Lesson>;
}

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
 return <Lesson slug={slug} predict={{"question": "Your tiny image filter learns its weights from just two labelled examples. If both training labels reverse, does the learned filter stay the same?", "options": ["It stays the same", "It changes sign"], "answer": 1}} minInteractions={3} exploreHint="Try all three cases. Reset clears the view and keeps your saved results." reveal={()=> <p>The first gradient update learned [.5,−.5], loss .25. Reversed labels learned [−.5,.5]. A second original-label update reduced loss to .0625; the shared heldout [1,1] output stayed zero. These tiny squared-loss examples establish label-driven coefficients, not learned image semantics.</p>}>
 {({locked,interact})=><Milestones interact={interact} names={["0","1","2"]}>{reach=><div className={s.wrap}>
 <p className={s.input}>{"x₁=10,y₁=1 · x₂=01,y₂=−1 · η=.5"}</p>
 <svg className={s.diagram} viewBox="0 0 280 64" role="img" aria-label="filter · worked example">
 {d ? <g>{d.values.map((v,i)=><g key={i}><rect x={18+i*130} y="16.73" width="110" height="24.12" rx="4"/><text x={33+i*130} y="32.14">w{i+1}={v}</text></g>)}<text x="66" y="55.59">[1,1] → {d.values[0]+d.values[1]}</text></g> : <g><rect x="3" y="8.69" width="274" height="43.55" rx="6"/><text x="12" y="34.82">?</text></g>}
 </svg>
 <div className={s.controls}><Control disabled={locked||mode===0} onClick={()=>run(0,reach)}>Train once</Control><Control disabled={locked||mode===1} onClick={()=>run(1,reach)}>Reverse labels</Control><Control disabled={locked||mode===2} onClick={()=>run(2,reach)}>Train twice</Control><Control disabled={locked||mode===-1} onClick={()=>{setMode(-1);setData(null);}}>Reset</Control></div>
 <div className={s.witness} aria-label="Saved results">{saved.map((v,i)=><div key={i}>{i+1}: {v?.summary??'—'}</div>)}</div>
 </div>}</Milestones>}
 </Lesson>;
}

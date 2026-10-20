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
 return <Lesson slug={slug} predict={{"question": "Can changing the evaluator alter the update while candidates stay fixed?", "options": ["Yes", "No"], "answer": 0}} minInteractions={3} exploreHint="Try all three cases. Reset clears the view and keeps your saved results." reveal={()=> <p>The length evaluator chose incorrect B, giving P(A)=.378; correctness chose A, giving .622. When both answers were correct, the correctness evaluator abstained: P(A)=.5. Label generation changed the identical update rule’s result. These stipulated raters establish no real evaluator’s impartiality.</p>}>
 {({locked,interact})=><Milestones interact={interact} names={["0","1","2"]}>{reach=><div className={s.wrap}>
 <p className={s.input}>{"A:2,1token · B:4,4tokens · fictional correct value=2"}</p>
 <svg className={s.diagram} viewBox="0 0 280 64" role="img" aria-label="evaluation · worked example">
 {d ? <g>{d.values.map((v,i)=><g key={i}><rect x={10+i*145} y="16.06" width="110" height="22.78"/><text x={18+i*145} y="31.47">{d.labels[i]}:{v}</text></g>)}<path d="M 65 39.51 L 140 53.58 L 210 39.51"/></g> : <g><rect x="3" y="8.69" width="274" height="43.55" rx="6"/><text x="12" y="34.82">?</text></g>}
 </svg>
 <div className={s.controls}><Control disabled={locked||mode===0} onClick={()=>run(0,reach)}>Length rule</Control><Control disabled={locked||mode===1} onClick={()=>run(1,reach)}>Correct rule</Control><Control disabled={locked||mode===2} onClick={()=>run(2,reach)}>Tie</Control><Control disabled={locked||mode===-1} onClick={()=>{setMode(-1);setData(null);}}>Reset</Control></div>
 <div className={s.witness} aria-label="Saved results">{saved.map((v,i)=><div key={i}>{i+1}: {v?.summary??'—'}</div>)}</div>
 </div>}</Milestones>}
 </Lesson>;
}

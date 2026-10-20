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
 return <Lesson slug={slug} predict={{"question": "At equal 75% sparsity, must the two masks have the same squared error?", "options": ["Same error", "Different errors"], "answer": 1}} minInteractions={3} exploreHint="Try all three cases. Reset clears the view and keeps your saved results." reveal={()=> <p>Magnitude pruning had SSE .03; the supplied alternative had 4.02 at equal sparsity. On the shifted test, magnitude pruning erred by 1 while the alternative was exact. Evaluation inputs can reverse mask quality; this says nothing about typical real-network dispensability.</p>}>
 {({locked,interact})=><Milestones interact={interact} names={["0","1","2"]}>{reach=><div className={s.wrap}>
 <p className={s.input}>{"w=[2,.1,.1,.1] · coordinate tests · 75% zeroed"}</p>
 <svg className={s.diagram} viewBox="0 0 280 64" role="img" aria-label="weights · worked example">
 {d ? <g>{d.values.map((v,i)=><g key={i}><line x1={25+i*68} y1="18.74" x2="140" y2="46.21" strokeWidth={v?3:1} strokeDasharray={v?undefined:'3 4'}/><text x={13+i*68} y="14.72">{v}</text></g>)}<text x="116" y="56.93">Σwx</text></g> : <g><rect x="3" y="8.69" width="274" height="43.55" rx="6"/><text x="12" y="34.82">?</text></g>}
 </svg>
 <div className={s.controls}><Control disabled={locked||mode===0} onClick={()=>run(0,reach)}>Magnitude</Control><Control disabled={locked||mode===1} onClick={()=>run(1,reach)}>Other mask</Control><Control disabled={locked||mode===2} onClick={()=>run(2,reach)}>Shift test</Control><Control disabled={locked||mode===-1} onClick={()=>{setMode(-1);setData(null);}}>Reset</Control></div>
 <div className={s.witness} aria-label="Saved results">{saved.map((v,i)=><div key={i}>{i+1}: {v?.summary??'—'}</div>)}</div>
 </div>}</Milestones>}
 </Lesson>;
}

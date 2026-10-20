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
 return <Lesson slug={slug} predict={{"question": "At β=0, does maximizing this proxy retain the reference distribution?", "options": ["Yes", "No"], "answer": 1}} minInteractions={3} exploreHint="Compare all three operations; Reset retains the earned evidence." reveal={()=> <p>β=1 gave B probability .881 and utility .119. Removing the KL cost concentrated on B and utility became 0. Swapping reward rankings improved utility instead. This finite proxy optimization separates reward from stipulated utility; KL proximity is no independent truth or safety guarantee.</p>}>
 {({locked,interact})=><Milestones interact={interact} names={["0","1","2"]}>{reach=><div className={s.wrap}>
 <p className={s.input}>{"q=.5,.5 · r=1,3 · utility=1,0 · natural log"}</p>
 <svg className={s.diagram} viewBox="0 0 280 64" role="img" aria-label="distribution · declared finite computation">
 {d ? <g>{d.values.map((v,i)=><g key={i}><path d={`M ${45+i*145} 45.54 L ${45+i*145} ${4+.67*(62-v*45)}`} strokeWidth="18"/><text x={23+i*145} y="14.72">{d.labels[i]}={v.toFixed(3)}</text></g>)}<text x="94" y="56.26">p∝q·exp(r/β)</text></g> : <g><rect x="3" y="8.69" width="274" height="43.55" rx="6"/><text x="12" y="34.82">?</text></g>}
 </svg>
 <div className={s.controls}><Control disabled={locked||mode===0} onClick={()=>run(0,reach)}>β=1</Control><Control disabled={locked||mode===1} onClick={()=>run(1,reach)}>β=0</Control><Control disabled={locked||mode===2} onClick={()=>run(2,reach)}>Swap reward</Control><Control disabled={locked||mode===-1} onClick={()=>{setMode(-1);setData(null);}}>Reset</Control></div>
 <div className={s.witness} aria-label="Retained computed evidence">{saved.map((v,i)=><div key={i}>{i+1}: {v?.summary??'—'}</div>)}</div>
 </div>}</Milestones>}
 </Lesson>;
}

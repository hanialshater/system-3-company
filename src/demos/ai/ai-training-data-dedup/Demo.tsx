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
 return <Lesson slug={slug} predict={{"question": "Your training set repeats record A, which says east. If A is duplicated again, what happens to raw frequency-fit P(east)?", "options": ["It increases", "It stays fixed", "It decreases"], "answer": 0}} minInteractions={3} exploreHint="Try all three cases. Reset clears the view and keeps your saved results." reveal={()=> <p>Raw AAAB fitted P(east)=.75; exact deduplication gave .5. Adding three B copies changed raw probability to .429 while unique probability stayed .5. This record-count estimator is not a neural memorization law; deduplication neither removes unique content nor proves privacy.</p>}>
 {({locked,interact})=><Milestones interact={interact} names={["0","1","2"]}>{reach=><div className={s.wrap}>
 <p className={s.input}>{"A=port→east · B=port→west · AAAB"}</p>
 <svg className={s.diagram} viewBox="0 0 280 64" role="img" aria-label="records · worked example">
 {d ? <g>{d.values.map((v,i)=><g key={i}><rect x={8+i*37} y="17.4" width="30" height="23.45"/><text x={17+i*37} y="32.81">{v?'A':'B'}</text></g>)}</g> : <g><rect x="3" y="8.69" width="274" height="43.55" rx="6"/><text x="12" y="34.82">?</text></g>}
 </svg>
 <div className={s.controls}><Control disabled={locked||mode===0} onClick={()=>run(0,reach)}>AAAB</Control><Control disabled={locked||mode===1} onClick={()=>run(1,reach)}>Deduplicate</Control><Control disabled={locked||mode===2} onClick={()=>run(2,reach)}>+BBB</Control><Control disabled={locked||mode===-1} onClick={()=>{setMode(-1);setData(null);}}>Reset</Control></div>
 <div className={s.witness} aria-label="Saved results">{saved.map((v,i)=><div key={i}>{i+1}: {v?.summary??'—'}</div>)}</div>
 </div>}</Milestones>}
 </Lesson>;
}

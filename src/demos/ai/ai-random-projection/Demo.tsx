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
 return <Lesson slug={slug} predict={{"question": "Do unit-length projected basis vectors guarantee that every pairwise distance survives?", "options": ["Every pair survives", "Some pairs can collapse"], "answer": 1}} minInteractions={3} exploreHint="Try all three cases. Reset clears the view and keeps your saved results." reveal={()=> <p>Draw 0 collapsed AC from √2 to 0 despite unit column lengths. Draw 1 preserved AC but stretched BC to 2; OA stayed 1. These two explicit sign-matrix draws demonstrate distortion, not a high-probability dimensional guarantee.</p>}>
 {({locked,interact})=><Milestones interact={interact} names={["0","1","2"]}>{reach=><div className={s.wrap}>
 <p className={s.input}>{"O,e₁,e₂,e₃ · R₀√2=[1,1,1;1,−1,1] · R₁√2=[1,1,−1;1,−1,1]"}</p>
 <svg className={s.diagram} viewBox="0 0 280 64" role="img" aria-label="matrix · worked example">
 {d ? <g>{[0,1,2,3].map(i=><g key={i}><circle cx={140+d.values[i*2]*65} cy={4+.67*(38-d.values[i*2+1]*24)} r="5"/><text x={i===3?230:8+i*57} y="52.24">{d.labels[i]}:{d.values[i*2].toFixed(2)}</text></g>)}<text x="4" y="14.72">projected x,y</text></g> : <g><rect x="3" y="8.69" width="274" height="43.55" rx="6"/><text x="12" y="34.82">?</text></g>}
 </svg>
 <div className={s.controls}><Control disabled={locked||mode===0} onClick={()=>run(0,reach)}>Draw 0</Control><Control disabled={locked||mode===1} onClick={()=>run(1,reach)}>Draw 1</Control><Control disabled={locked||mode===2} onClick={()=>run(2,reach)}>Inspect OA</Control><Control disabled={locked||mode===-1} onClick={()=>{setMode(-1);setData(null);}}>Reset</Control></div>
 <div className={s.witness} aria-label="Saved results">{saved.map((v,i)=><div key={i}>{i+1}: {v?.summary??'—'}</div>)}</div>
 </div>}</Milestones>}
 </Lesson>;
}

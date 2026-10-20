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
 return <Lesson slug={slug} predict={{"question": "Your chatbot rates replies A and B as equally likely, then a reviewer says A is better. After one declared pair update preferring A, which way does P(A) move?", "options": ["Above .5", "Below .5"], "answer": 0}} minInteractions={3} exploreHint="Try all three cases. Reset clears the view and keeps your saved results." reveal={()=> <p>The A-preferred pair gave gradient −.5, θ=.5 and P(A)=.622. Swapping labels gave P(A)=.378. With β=0, gradient vanished and loss stayed ln2. This single reference-normalized update fits supplied preferences; it does not recover uniquely correct human values.</p>}>
 {({locked,interact})=><Milestones interact={interact} names={["0","1","2"]}>{reach=><div className={s.wrap}>
 <p className={s.input}>{"chosen A / rejected B · reference odds=1 · θ₀=0"}</p>
 <svg className={s.diagram} viewBox="0 0 280 64" role="img" aria-label="odds · worked example">
 {d ? <g><line x1="25" y1="30.13" x2="255" y2="30.13"/><circle cx={25+d.values[0]*230} cy="30.13" r="8"/><text x="8" y="15.39">qA=.5</text><text x="8" y="54.25">policy A={d.values[0].toFixed(3)}</text></g> : <g><rect x="3" y="8.69" width="274" height="43.55" rx="6"/><text x="12" y="34.82">?</text></g>}
 </svg>
 <div className={s.controls}><Control disabled={locked||mode===0} onClick={()=>run(0,reach)}>Update A</Control><Control disabled={locked||mode===1} onClick={()=>run(1,reach)}>Swap pair</Control><Control disabled={locked||mode===2} onClick={()=>run(2,reach)}>β=0</Control><Control disabled={locked||mode===-1} onClick={()=>{setMode(-1);setData(null);}}>Reset</Control></div>
 <div className={s.witness} aria-label="Saved results">{saved.map((v,i)=><div key={i}>{i+1}: {v?.summary??'—'}</div>)}</div>
 </div>}</Milestones>}
 </Lesson>;
}

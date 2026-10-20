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
 return <Lesson slug={slug} predict={{"question": "With a=[8,1,1], which three-step schedule has smaller final x²/2?", "options": ["Constant .5", "Warmup .1,.5,.5"], "answer": 1}} minInteractions={3} exploreHint="Try all three cases. Reset clears the view and keeps your saved results." reveal={()=> <p>For changing curvature, warmup ended at loss .00125 versus .28125. With stable curvature, constant steps won: .00781 versus .02531. Both used three gradients and the same final evaluation. This prescribed sequence does not establish real-network curvature or universal warmup benefits.</p>}>
 {({locked,interact})=><Milestones interact={interact} names={["0","1","2"]}>{reach=><div className={s.wrap}>
 <p className={s.input}>{"x₀=1 · ∇=aₜx · η=.5 versus .1,.5,.5"}</p>
 <svg className={s.diagram} viewBox="0 0 280 64" role="img" aria-label="trajectories · worked example">
 {d ? <g>{[0,1].map(j=><polyline key={j} className={j?s.reference:''} points={[1,...d.values.slice(j*3,j*3+3)].map((v,i)=>`${12+i*76},${4+.67*(40-v*9)}`).join(' ')}/>)}<text x="6" y="14.72">constant / warmup</text><text x="6" y="54.25">0 → 1 → 2 → 3</text></g> : <g><rect x="3" y="8.69" width="274" height="43.55" rx="6"/><text x="12" y="34.82">?</text></g>}
 </svg>
 <div className={s.controls}><Control disabled={locked||mode===0} onClick={()=>run(0,reach)}>Changing a</Control><Control disabled={locked||mode===1} onClick={()=>run(1,reach)}>Stable a</Control><Control disabled={locked||mode===2} onClick={()=>run(2,reach)}>First step</Control><Control disabled={locked||mode===-1} onClick={()=>{setMode(-1);setData(null);}}>Reset</Control></div>
 <div className={s.witness} aria-label="Saved results">{saved.map((v,i)=><div key={i}>{i+1}: {v?.summary??'—'}</div>)}</div>
 </div>}</Milestones>}
 </Lesson>;
}

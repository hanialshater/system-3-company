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
 return <Lesson slug={slug} predict={{"question": "After Progress is learned, which action wins intrinsic-only expected prediction error?", "options": ["Progress", "TV"], "answer": 1}} minInteractions={3} exploreHint="Try all three cases. Reset clears the view and keeps your saved results." reveal={()=> <p>Progress’s error fell from 1 to 0; random TV retained expected error .25, winning intrinsic-only choice. Adding extrinsic reward preferred Progress, 1 versus .025. Learned deterministic TV had zero residual error. Prediction error need not mean learnable progress; these stipulated scores model no human feeling.</p>}>
 {({locked,interact})=><Milestones interact={interact} names={["0","1","2"]}>{reach=><div className={s.wrap}>
 <p className={s.input}>{"Progress→0, reward1 · TV~Bernoulli(.5), reward0"}</p>
 <svg className={s.diagram} viewBox="0 0 280 64" role="img" aria-label="noise · worked example">
 {d ? <g><text x="5" y="16.06">Progress</text><path d="M 82 13.38 L 115 42.19 L 147 42.19"/><text x="84" y="56.26">1 → 0</text><text x="172" y="16.06">TV expected</text><path d={`M 182 ${4+.67*(57-d.values[2]*70)} L 262 ${4+.67*(57-d.values[2]*70)}`}/><text x="198" y="56.26">{d.values[2]}</text></g> : <g><rect x="3" y="8.69" width="274" height="43.55" rx="6"/><text x="12" y="34.82">?</text></g>}
 </svg>
 <div className={s.controls}><Control disabled={locked||mode===0} onClick={()=>run(0,reach)}>Observe</Control><Control disabled={locked||mode===1} onClick={()=>run(1,reach)}>Add reward</Control><Control disabled={locked||mode===2} onClick={()=>run(2,reach)}>Learn TV</Control><Control disabled={locked||mode===-1} onClick={()=>{setMode(-1);setData(null);}}>Reset</Control></div>
 <div className={s.witness} aria-label="Saved results">{saved.map((v,i)=><div key={i}>{i+1}: {v?.summary??'—'}</div>)}</div>
 </div>}</Milestones>}
 </Lesson>;
}

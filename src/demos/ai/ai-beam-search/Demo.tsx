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
 return <Lesson slug={slug} predict={{"question": "Your text generator keeps only the two best partial sentences at each step. On the original tree, which sequence wins at beam width 2?", "options": ["A-END", "B-END"], "answer": 1}} minInteractions={3} exploreHint="Try all three cases. Reset clears the view and keeps your saved results." reveal={()=> <p>Width 1 kept A and returned .24; width 2 retained B and found .36. In the third-prefix trap, width 2 pruned C before its .20 completion, returning .15. This finite frontier search remains approximate; sequence probability does not establish correctness or text quality.</p>}>
 {({locked,interact})=><Milestones interact={interact} names={["0","1","2"]}>{reach=><div className={s.wrap}>
 <p className={s.input}>{"A:.6→END:.4,a:.3,b:.3 · B:.4→END:.9,c:.1 · continuations END:1"}</p>
 <svg className={s.diagram} viewBox="0 0 280 64" role="img" aria-label="beam · worked example">
 {d ? <g>{d.trace?.map((line,i)=><text key={i} x="4" y={4+.67*(16+i*22)}>{line}</text>)}</g> : <g><rect x="3" y="8.69" width="274" height="43.55" rx="6"/><text x="12" y="34.82">?</text></g>}
 </svg>
 <div className={s.controls}><Control disabled={locked||mode===0} onClick={()=>run(0,reach)}>Width 1</Control><Control disabled={locked||mode===1} onClick={()=>run(1,reach)}>Width 2</Control><Control disabled={locked||mode===2} onClick={()=>run(2,reach)}>Third prefix</Control><Control disabled={locked||mode===-1} onClick={()=>{setMode(-1);setData(null);}}>Reset</Control></div>
 <div className={s.witness} aria-label="Saved results">{saved.map((v,i)=><div key={i}>{i+1}: {v?.summary??'—'}</div>)}</div>
 </div>}</Milestones>}
 </Lesson>;
}

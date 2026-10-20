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
 return <Lesson slug={slug} predict={{"question": "Your detector shares one set of weights across positions but was trained at only one spot. After fitting only position 0, what does the tied predictor give for position-1 e₁?", "options": ["1", "0", "−1"], "answer": 0}} minInteractions={3} exploreHint="Try all three cases. Reset clears the view and keeps your saved results." reveal={()=> <p>On the invariant heldout target, tied weights predicted 1; unseen untied weights predicted 0. Adding the position-dependent label reversed the fit advantage: training SSE became 2 versus 0. Target invariance matters; fewer parameters alone establish no real sample-complexity guarantee.</p>}>
 {({locked,interact})=><Milestones interact={interact} names={["0","1","2"]}>{reach=><div className={s.wrap}>
 <p className={s.input}>{"p₀:e₁→1,e₂→−1 · heldout p₁:e₁→1 · minimum-norm fits"}</p>
 <svg className={s.diagram} viewBox="0 0 280 64" role="img" aria-label="sharing · worked example">
 {d ? <g><text x="4" y="15.39">tied</text><text x="74" y="15.39">[{d.values.slice(0,2).join(',')}]</text><path d="M 136 14.72 L 207 27.45 M 136 14.72 L 207 46.88"/><text x="168" y="29.46">p₀ [{d.values.slice(2,4).join(',')}]</text><text x="168" y="50.9">p₁ [{d.values.slice(4,6).join(',')}]</text></g> : <g><rect x="3" y="8.69" width="274" height="43.55" rx="6"/><text x="12" y="34.82">?</text></g>}
 </svg>
 <div className={s.controls}><Control disabled={locked||mode===0} onClick={()=>run(0,reach)}>Fit both</Control><Control disabled={locked||mode===1} onClick={()=>run(1,reach)}>Break rule</Control><Control disabled={locked||mode===2} onClick={()=>run(2,reach)}>Heldout</Control><Control disabled={locked||mode===-1} onClick={()=>{setMode(-1);setData(null);}}>Reset</Control></div>
 <div className={s.witness} aria-label="Saved results">{saved.map((v,i)=><div key={i}>{i+1}: {v?.summary??'—'}</div>)}</div>
 </div>}</Milestones>}
 </Lesson>;
}

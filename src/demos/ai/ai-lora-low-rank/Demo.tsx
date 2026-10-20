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
 return <Lesson slug={slug} predict={{"question": "You fine-tune with the smallest LoRA update possible, a single rank-one change. Can two rank-1 delta output vectors be linearly independent?", "options": ["Yes", "No"], "answer": 1}} minInteractions={3} exploreHint="Try all three cases. Reset clears the view and keeps your saved results." reveal={()=> <p>Rank-1 updates mapped e₁ to B and e₃ to −B, using 8 factor entries versus 16 full entries. The rank-2 target’s minor was 1, impossible for rank 1. Rank-2 factors here need 16 entries; counts exclude optimizer and metadata storage.</p>}>
 {({locked,interact})=><Milestones interact={interact} names={["0","1","2"]}>{reach=><div className={s.wrap}>
 <p className={s.input}>{"W=I₄ · B=[1,2,0,−1]ᵀ · A=[1,0,−1,2]"}</p>
 <svg className={s.diagram} viewBox="0 0 280 64" role="img" aria-label="outer · worked example">
 {d ? <g>{mode===2?<g><text x="5" y="16.73">[e₁,e₂] × [e₁ᵀ;e₂ᵀ]</text><text x="5" y="35.49">diag(1,1,0,0)</text><text x="5" y="55.59">minor=1 · 4×2+2×4=16</text></g>:<g>{[0,1,2,3].map(i=><g key={i}><text x="6" y={4+.67*(16+i*20)}>{[1,2,0,-1][i]}</text><text x="47" y={4+.67*(16+i*20)}>×</text><text x="76" y={4+.67*(16+i*20)}>[1,0,−1,2]</text><text x="190" y={4+.67*(16+i*20)}>[{d.values.slice(i*4,i*4+4).join(',')}]</text></g>)}</g>}</g> : <g><rect x="3" y="8.69" width="274" height="43.55" rx="6"/><text x="12" y="34.82">?</text></g>}
 </svg>
 <div className={s.controls}><Control disabled={locked||mode===0} onClick={()=>run(0,reach)}>Apply e₁</Control><Control disabled={locked||mode===1} onClick={()=>run(1,reach)}>Apply e₃</Control><Control disabled={locked||mode===2} onClick={()=>run(2,reach)}>Rank-2 target</Control><Control disabled={locked||mode===-1} onClick={()=>{setMode(-1);setData(null);}}>Reset</Control></div>
 <div className={s.witness} aria-label="Saved results">{saved.map((v,i)=><div key={i}>{i+1}: {v?.summary??'—'}</div>)}</div>
 </div>}</Milestones>}
 </Lesson>;
}

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
 const [saved,setSaved]=useState<(Result|null)[]>([null,null,null,null]);
 const run=(m:number,reach:(name:string)=>void)=>{const result=compute(m);setMode(m);setData(result);setSaved(old=>old.map((v,i)=>i===m?result:v));reach(String(m));};
 return <Lesson slug={slug} predict={{"question": "In this factorized toy, can JSON-format training change the frozen fact A=2?", "options": ["Yes", "No"], "answer": 1}} minInteractions={3} exploreHint="Compare all three operations; Reset retains the earned evidence." reveal={()=> <p>JSON training moved θ to 1 and P(JSON) to .731; plain labels moved them to −1 and .269. A stayed 2, even against a supplied update to 4. This deliberately frozen factual channel does not show that real fine-tuning cannot teach facts.</p>}>
 {({locked,interact})=><Milestones interact={interact} names={["0","1","2"]}>{reach=><div className={s.wrap}>
 <p className={s.input}>{"frozen A=2,B=3 · P(JSON)=σ(θ) · θ₀=0,η=2"}</p>
 <svg className={s.diagram} viewBox="0 0 280 64" role="img" aria-label="channels · declared finite computation">
 {d ? <g><rect x="5" y="10.03" width="112" height="36.85"/><text x="13" y="24.77">Frozen</text><text x="44" y="40.85">A=2</text><path d="M 118 27.45 L 149 27.45"/><text x="153" y="18.07">JSON {d.values[0].toFixed(3)}</text><text x="153" y="40.85">plain {d.values[1].toFixed(3)}</text></g> : <g><rect x="3" y="8.69" width="274" height="43.55" rx="6"/><text x="12" y="34.82">?</text></g>}
 </svg>
 <div className={s.controls}><Control disabled={locked||mode===0} onClick={()=>run(0,reach)}>Train</Control><Control disabled={locked||mode===1} onClick={()=>run(1,reach)}>Plain</Control><Control disabled={locked||mode===2} onClick={()=>run(2,reach)}>A→4</Control><Control disabled={locked||mode===3} onClick={()=>run(3,reach)}>2 steps</Control><Control disabled={locked||mode===-1} onClick={()=>{setMode(-1);setData(null);}}>Reset</Control></div>
 <div className={s.witness} aria-label="Retained computed evidence">{saved.map((v,i)=><div key={i}>{i+1}: {v?.summary??'—'}</div>)}</div>
 </div>}</Milestones>}
 </Lesson>;
}

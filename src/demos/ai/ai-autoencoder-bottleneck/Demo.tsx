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
 return <Lesson slug={slug} predict={{"question": "For input (1,−1), can this one-number encoder reconstruct both coordinates?", "options": ["Exactly", "Information is lost"], "answer": 1}} minInteractions={3} exploreHint="Try all three cases. Reset clears the view and keeps your saved results." reveal={()=> <p>Diagonal input reconstructed exactly. Inputs (1,−1) and (−1,1) both became code 0 and decoded (0,0), each with SSE 2. This declared linear bottleneck discards the difference direction; it is not a trained autoencoder or a guarantee about arbitrary compressed data.</p>}>
 {({locked,interact})=><Milestones interact={interact} names={["0","1","2"]}>{reach=><div className={s.wrap}>
 <p className={s.input}>{"z=(x₀+x₁)/2 · decode=(z,z) · (1,1),(1,−1),(−1,1)"}</p>
 <svg className={s.diagram} viewBox="0 0 280 64" role="img" aria-label="bottleneck · worked example">
 {d ? <g><text x="4" y="23.43">[{d.values.slice(0,2).join(',')}]</text><path d="M 68 19.41 L 113 19.41 L 113 40.18 L 180 40.18"/><text x="108" y="16.06">{d.values[2]}</text><text x="181" y="43.53">[{d.values.slice(3).join(',')}]</text><text x="95" y="57.6">one code</text></g> : <g><rect x="3" y="8.69" width="274" height="43.55" rx="6"/><text x="12" y="34.82">?</text></g>}
 </svg>
 <div className={s.controls}><Control disabled={locked||mode===0} onClick={()=>run(0,reach)}>Diagonal</Control><Control disabled={locked||mode===1} onClick={()=>run(1,reach)}>Off diagonal</Control><Control disabled={locked||mode===2} onClick={()=>run(2,reach)}>Opposite</Control><Control disabled={locked||mode===-1} onClick={()=>{setMode(-1);setData(null);}}>Reset</Control></div>
 <div className={s.witness} aria-label="Saved results">{saved.map((v,i)=><div key={i}>{i+1}: {v?.summary??'—'}</div>)}</div>
 </div>}</Milestones>}
 </Lesson>;
}

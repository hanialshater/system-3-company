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
 return <Lesson slug={slug} predict={{"question": "For shape +1 and texture −1, what does classifier T predict?", "options": ["+1", "−1"], "answer": 1}} minInteractions={3} exploreHint="Try all three cases. Reset clears the view and keeps your saved results." reveal={()=> <p>Both cue rules scored 2/2 on aligned inputs. Under conflict, the texture-heavy rule scored 0/2; swapping weights restored 2/2. The target followed shape. These stipulated classifiers demonstrate an evaluation intervention, not trained ImageNet results or a claim about every CNN.</p>}>
 {({locked,interact})=><Milestones interact={interact} names={["0","1","2"]}>{reach=><div className={s.wrap}>
 <p className={s.input}>{"target=s · T=.5s+2t · S=2s+.5t"}</p>
 <svg className={s.diagram} viewBox="0 0 280 64" role="img" aria-label="cues · worked example">
 {d ? <g>{[0,1].map(i=><g key={i}>{d.values[i*2]>0?<rect x={20+i*145} y="7" width="30" height="30"/>:<circle cx={35+i*145} cy="22" r="15"/>}{[0,1,2].map(j=><line key={j} x1={d.values[i*2+1]>0?26+i*145+j*9:24+i*145} y1={d.values[i*2+1]>0?11:13+j*8} x2={d.values[i*2+1]>0?26+i*145+j*9:46+i*145} y2={d.values[i*2+1]>0?33:13+j*8}/>)}<text x={6+i*145} y="60">s:{d.values[i*2]} t:{d.values[i*2+1]} ŷ:{d.detail[3+i]}</text></g>)}</g> : <g><rect x="3" y="8.69" width="274" height="43.55" rx="6"/><text x="12" y="34.82">?</text></g>}
 </svg>
 <div className={s.controls}><Control disabled={locked||mode===0} onClick={()=>run(0,reach)}>Aligned</Control><Control disabled={locked||mode===1} onClick={()=>run(1,reach)}>Conflict</Control><Control disabled={locked||mode===2} onClick={()=>run(2,reach)}>Swap weights</Control><Control disabled={locked||mode===-1} onClick={()=>{setMode(-1);setData(null);}}>Reset</Control></div>
 <div className={s.witness} aria-label="Saved results">{saved.map((v,i)=><div key={i}>{i+1}: {v?.summary??'—'}</div>)}</div>
 </div>}</Milestones>}
 </Lesson>;
}

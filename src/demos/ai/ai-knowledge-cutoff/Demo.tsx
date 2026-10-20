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
 return <Lesson slug={slug} predict={{"question": "Adding February evidence changes which part of this frozen-ledger toy?", "options": ["The frozen January record", "The available evidence"], "answer": 1}} minInteractions={3} exploreHint="Compare all three operations; Reset retains the earned evidence." reveal={()=> <p>The frozen January record stayed 17; retrieved February evidence supplied 19. March’s 21 was ineligible for a February query. Before January, the answer was Unknown. This fictional latest-eligible-source rule is not an LLM simulation or a guarantee that retrieval is reliable.</p>}>
 {({locked,interact})=><Milestones interact={interact} names={["0","1","2"]}>{reach=><div className={s.wrap}>
 <p className={s.input}>{"Fictional Aster · Jan 1:17 · query Feb 15"}</p>
 <svg className={s.diagram} viewBox="0 0 280 64" role="img" aria-label="timeline · declared finite computation">
 {d ? <g><line x1="12" y1="26.78" x2="264" y2="26.78"/>{d.values.map((v,i)=><g key={i}><circle cx={35+i*96} cy="26.78" r="6"/><text x={18+i*96} y="15.39">{d.labels[i]}</text><text x={24+i*96} y="48.22">{v}</text></g>)}</g> : <g><rect x="3" y="8.69" width="274" height="43.55" rx="6"/><text x="12" y="34.82">?</text></g>}
 </svg>
 <div className={s.controls}><Control disabled={locked||mode===0} onClick={()=>run(0,reach)}>Retrieve Feb</Control><Control disabled={locked||mode===1} onClick={()=>run(1,reach)}>Add March</Control><Control disabled={locked||mode===2} onClick={()=>run(2,reach)}>Before Jan</Control><Control disabled={locked||mode===-1} onClick={()=>{setMode(-1);setData(null);}}>Reset</Control></div>
 <div className={s.witness} aria-label="Retained computed evidence">{saved.map((v,i)=><div key={i}>{i+1}: {v?.summary??'—'}</div>)}</div>
 </div>}</Milestones>}
 </Lesson>;
}

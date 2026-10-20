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
 return <Lesson slug={slug} predict={{"question": "Your game agent learns the value of state A but never visits state B. After learning only terminal A→1, does the unseen B estimate change?", "options": ["Yes", "No"], "answer": 0}} minInteractions={3} exploreHint="Try all three cases. Reset clears the view and keeps your saved results." reveal={()=> <p>Updating A set w=.5 and Q(B)=1, Q(C)=−.5. Updating C next set w=−.25 and worsened A’s error from .5 to 1.25. A table changed only A. This shared linear terminal component is not a deep network, full DQN, or convergence guarantee.</p>}>
 {({locked,interact})=><Milestones interact={interact} names={["0","1","2"]}>{reach=><div className={s.wrap}>
 <p className={s.input}>{"Q=wφ · φ(A,B,C)=1,2,−1 · η=.5"}</p>
 <svg className={s.diagram} viewBox="0 0 280 64" role="img" aria-label="sharedq · worked example">
 {d ? <g><text x="5" y="15.39">w={d.detail[0]}</text>{d.values.map((v,i)=><g key={i}><path d={`M 45 17.4 L ${75+i*83} 32.14`}/><text x={55+i*83} y="48.89">{d.labels[i]}:{v}</text></g>)}</g> : <g><rect x="3" y="8.69" width="274" height="43.55" rx="6"/><text x="12" y="34.82">?</text></g>}
 </svg>
 <div className={s.controls}><Control disabled={locked||mode===0} onClick={()=>run(0,reach)}>Update A</Control><Control disabled={locked||mode===1} onClick={()=>run(1,reach)}>Then C</Control><Control disabled={locked||mode===2} onClick={()=>run(2,reach)}>Table A</Control><Control disabled={locked||mode===-1} onClick={()=>{setMode(-1);setData(null);}}>Reset</Control></div>
 <div className={s.witness} aria-label="Saved results">{saved.map((v,i)=><div key={i}>{i+1}: {v?.summary??'—'}</div>)}</div>
 </div>}</Milestones>}
 </Lesson>;
}

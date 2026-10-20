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
 return <Lesson slug={slug} predict={{"question": "Must three votes always improve over one under the declared variants?", "options": ["Always improves", "Depends on errors"], "answer": 1}} minInteractions={3} exploreHint="Try all three cases. Reset clears the view and keeps your saved results." reveal={()=> <p>Independent .7-correct votes gave majority success .784. Perfectly shared errors kept it at .7; independent .4-correct votes fell to .352. These enumerated binary outcomes concern majority selection, not at-least-one success. Independence is stipulated, not established by repeated generation.</p>}>
 {({locked,interact})=><Milestones interact={interact} names={["0","1","2"]}>{reach=><div className={s.wrap}>
 <p className={s.input}>{"3 binary votes · majority≥2 · p=.7"}</p>
 <svg className={s.diagram} viewBox="0 0 280 64" role="img" aria-label="ballots · worked example">
 {d ? <g>{d.values.map((v,i)=><g key={i}><text x={3+(i%4)*70} y={4+.67*(15+Math.floor(i/4)*40)}>{d.labels[i]}</text><text x={3+(i%4)*70} y={4+.67*(33+Math.floor(i/4)*40)}>{v.toFixed(3)}</text></g>)}</g> : <g><rect x="3" y="8.69" width="274" height="43.55" rx="6"/><text x="12" y="34.82">?</text></g>}
 </svg>
 <div className={s.controls}><Control disabled={locked||mode===0} onClick={()=>run(0,reach)}>Independent</Control><Control disabled={locked||mode===1} onClick={()=>run(1,reach)}>Shared error</Control><Control disabled={locked||mode===2} onClick={()=>run(2,reach)}>p=.4</Control><Control disabled={locked||mode===-1} onClick={()=>{setMode(-1);setData(null);}}>Reset</Control></div>
 <div className={s.witness} aria-label="Saved results">{saved.map((v,i)=><div key={i}>{i+1}: {v?.summary??'—'}</div>)}</div>
 </div>}</Milestones>}
 </Lesson>;
}

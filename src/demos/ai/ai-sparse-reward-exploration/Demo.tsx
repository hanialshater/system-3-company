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
 return <Lesson slug={slug} predict={{"question": "Doubling the required all-right path from 4 to 8 changes one-episode success how?", "options": ["1/16→1/256", "1/16→1/32", "Unchanged"], "answer": 0}} minInteractions={3} exploreHint="Compare all three operations; Reset retains the earned evidence." reveal={()=> <p>Length 8 had one successful sequence among 256; guiding half the actions reduced possibilities to 16. Removing the goal made success impossible. The guide adds information. The 20-episode calculation assumes independent episodes; rare success is different from an unavailable transition.</p>}>
 {({locked,interact})=><Milestones interact={interact} names={["0","1","2"]}>{reach=><div className={s.wrap}>
 <p className={s.input}>{"uniform independent L/R · terminal all-R→1 · 20 episodes"}</p>
 <svg className={s.diagram} viewBox="0 0 280 64" role="img" aria-label="path · declared finite computation">
 {d ? <g>{d.values.map((_,i)=><g key={i}><circle cx={13+i*35} cy="25.44" r="7"/>{i<7?<line x1={20+i*35} y1="25.44" x2={41+i*35} y2="25.44"/>:null}</g>)}<text x="4" y="49.56">RRRRRRRR / {d.detail[1]}</text><text x="4" y="60.28">goal {d.detail[0]}</text></g> : <g><rect x="3" y="8.69" width="274" height="43.55" rx="6"/><text x="12" y="34.82">?</text></g>}
 </svg>
 <div className={s.controls}><Control disabled={locked||mode===0} onClick={()=>run(0,reach)}>Length 8</Control><Control disabled={locked||mode===1} onClick={()=>run(1,reach)}>Guide half</Control><Control disabled={locked||mode===2} onClick={()=>run(2,reach)}>Remove goal</Control><Control disabled={locked||mode===-1} onClick={()=>{setMode(-1);setData(null);}}>Reset</Control></div>
 <div className={s.witness} aria-label="Retained computed evidence">{saved.map((v,i)=><div key={i}>{i+1}: {v?.summary??'—'}</div>)}</div>
 </div>}</Milestones>}
 </Lesson>;
}

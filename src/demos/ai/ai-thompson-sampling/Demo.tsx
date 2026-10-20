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
 return <Lesson slug={slug} predict={{"question": "Each round you choose option A or B by sampling from your beliefs and taking the higher draw. What is A’s selection probability under the declared posterior draws?", "options": ["0", ".5", "1"], "answer": 1}} minInteractions={3} exploreHint="Try all three cases. Reset clears the view and keeps your saved results." reveal={()=> <p>A’s mean was .5 versus B’s .55, yet posterior sampling chose A with probability .5. With high-state mass .25, selection became .25 despite mean .3. Certain .55 tied and chose B. These stipulated finite beliefs are not Beta fits or per-run reward guarantees.</p>}>
 {({locked,interact})=><Milestones interact={interact} names={["0","1","2"]}>{reach=><div className={s.wrap}>
 <p className={s.input}>{"A=.2/.8, mass .5/.5 · B=.55 · ties→B"}</p>
 <svg className={s.diagram} viewBox="0 0 280 64" role="img" aria-label="belief · worked example">
 {d ? <g><line x1="12" y1="28.12" x2="265" y2="28.12"/><line x1={12+.55*253} y1="12.04" x2={12+.55*253} y2="46.21"/>{Array.from({length:d.values.length/2},(_,i)=><g key={i}><circle cx={12+d.values[i*2]*253} cy="28.12" r={5+d.values[i*2+1]*8}/><text x={8+i*145} y="57.6">{d.values[i*2]} @ {d.values[i*2+1]}</text></g>)}<text x="134" y="13.38">B=.55</text></g> : <g><rect x="3" y="8.69" width="274" height="43.55" rx="6"/><text x="12" y="34.82">?</text></g>}
 </svg>
 <div className={s.controls}><Control disabled={locked||mode===0} onClick={()=>run(0,reach)}>Enumerate</Control><Control disabled={locked||mode===1} onClick={()=>run(1,reach)}>Change belief</Control><Control disabled={locked||mode===2} onClick={()=>run(2,reach)}>Tie case</Control><Control disabled={locked||mode===-1} onClick={()=>{setMode(-1);setData(null);}}>Reset</Control></div>
 <div className={s.witness} aria-label="Saved results">{saved.map((v,i)=><div key={i}>{i+1}: {v?.summary??'—'}</div>)}</div>
 </div>}</Milestones>}
 </Lesson>;
}

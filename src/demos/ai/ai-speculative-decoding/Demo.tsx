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
 return <Lesson slug={slug} predict={{"question": "A small draft model proposes tokens for a larger target model to check. Does accepting every draft token preserve this target distribution?", "options": ["Yes", "No"], "answer": 1}} minInteractions={3} exploreHint="Try all three cases. Reset clears the view and keeps your saved results." reveal={()=> <p>Accepted mass [.2,.4] plus residual correction [0,.4] restored target [.2,.8]. Resampling rejected mass from p instead gave [.28,.72]. When draft matched target, acceptance was 1. Equal distributions do not imply identical sampled sequences or measured runtime speedups.</p>}>
 {({locked,interact})=><Milestones interact={interact} names={["0","1","2"]}>{reach=><div className={s.wrap}>
 <p className={s.input}>{"p=.2,.8 · q=.6,.4 · accept=min(p,q) · residual=max(p−q,0)"}</p>
 <svg className={s.diagram} viewBox="0 0 280 64" role="img" aria-label="mass · worked example">
 {d ? <g>{[0,1].map(i=><g key={i}><text x="4" y={4+.67*(22+i*34)}>{i?'B':'A'}</text><rect x="25" y={4+.67*(8+i*34)} width={d.values[i]*230} height="14.74" fill="var(--domain)"/><rect x={25+d.values[i]*230} y={4+.67*(8+i*34)} width={d.values[i+2]*230} height="14.74" fill="var(--good)"/><text x="30" y={4+.67*(24+i*34)}>{d.values[i].toFixed(2)}+{d.values[i+2].toFixed(2)}</text></g>)}<text x="5" y="59.61">accepted + correction</text></g> : <g><rect x="3" y="8.69" width="274" height="43.55" rx="6"/><text x="12" y="34.82">?</text></g>}
 </svg>
 <div className={s.controls}><Control disabled={locked||mode===0} onClick={()=>run(0,reach)}>Residual</Control><Control disabled={locked||mode===1} onClick={()=>run(1,reach)}>Wrong fix</Control><Control disabled={locked||mode===2} onClick={()=>run(2,reach)}>Matched q</Control><Control disabled={locked||mode===-1} onClick={()=>{setMode(-1);setData(null);}}>Reset</Control></div>
 <div className={s.witness} aria-label="Saved results">{saved.map((v,i)=><div key={i}>{i+1}: {v?.summary??'—'}</div>)}</div>
 </div>}</Milestones>}
 </Lesson>;
}

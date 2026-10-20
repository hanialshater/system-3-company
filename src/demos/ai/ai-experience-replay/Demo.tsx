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
 return <Lesson slug={slug} predict={{"question": "Your agent stores four experiences and learns from them with a fixed step size. Can reordering four stored samples change the final constant-step estimate?", "options": ["Yes", "No"], "answer": 0}} minInteractions={3} exploreHint="Try all three cases. Reset clears the view and keeps your saved results." reveal={()=> <p>Chronological updates ended at −.5625, evaluation MSE 1.3164. Mixed replay ended at −.3125, MSE 1.0977. Repeating index 0 instead gave MSE 1.8789. Each used four updates. Selected replay orders can help or hurt; they establish no expected improvement or automatic decorrelation.</p>}>
 {({locked,interact})=><Milestones interact={interact} names={["0","1","2"]}>{reach=><div className={s.wrap}>
 <p className={s.input}>{"buffer targets 1,1,−1,−1 · w←w+.5(y−w)"}</p>
 <svg className={s.diagram} viewBox="0 0 280 64" role="img" aria-label="replay · worked example">
 {d ? <g>{d.values.map((v,i)=><g key={i}><circle cx={25+i*75} cy={4+.67*(42-v*25)} r="5"/>{i>0?<line x1={25+(i-1)*75} y1={4+.67*(42-d.values[i-1]*25)} x2={25+i*75} y2={4+.67*(42-v*25)}/>:null}<text x={19+i*75} y="56.93">{d.labels[i]}</text></g>)}<text x="4" y="14.05">buffer indices</text></g> : <g><rect x="3" y="8.69" width="274" height="43.55" rx="6"/><text x="12" y="34.82">?</text></g>}
 </svg>
 <div className={s.controls}><Control disabled={locked||mode===0} onClick={()=>run(0,reach)}>Chronology</Control><Control disabled={locked||mode===1} onClick={()=>run(1,reach)}>Mixed replay</Control><Control disabled={locked||mode===2} onClick={()=>run(2,reach)}>Repeat 0</Control><Control disabled={locked||mode===-1} onClick={()=>{setMode(-1);setData(null);}}>Reset</Control></div>
 <div className={s.witness} aria-label="Saved results">{saved.map((v,i)=><div key={i}>{i+1}: {v?.summary??'—'}</div>)}</div>
 </div>}</Milestones>}
 </Lesson>;
}

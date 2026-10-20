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
 return <Lesson slug={slug} predict={{"question": "For this margin loss, does a negative already beyond distance 1 still get pushed?", "options": ["Yes", "No"], "answer": 1}} minInteractions={3} exploreHint="Try all three cases. Reset clears the view and keeps your saved results." reveal={()=> <p>The positive moved 2→1; the near negative moved .5→.75, reducing loss 2.125→.531. A negative at 2 did not move because its margin penalty was zero. This supplied one-dimensional loss and gradient step are not a trained SimCLR representation or semantic guarantee.</p>}>
 {({locked,interact})=><Milestones interact={interact} names={["0","1","2"]}>{reach=><div className={s.wrap}>
 <p className={s.input}>{"anchor=0,p=2,n=.5 · L=½p²+½max(0,1−|n|)² · η=.5"}</p>
 <svg className={s.diagram} viewBox="0 0 280 64" role="img" aria-label="contrastive · worked example">
 {d ? <g>{[0,1].map(row=><g key={row}><line x1="14" y1={4+.67*(19+row*42)} x2="254" y2={4+.67*(19+row*42)}/>{[0,1,2].map(j=><g key={j}><circle cx={18+d.values[row*3+j]*100} cy={4+.67*(19+row*42)} r="5"/><text x={12+d.values[row*3+j]*100} y={4+.67*(36+row*42)}>{j===0?'a':j===1?(d.values[row*3+1]===d.values[row*3+2]?'p/n':'p'):(d.values[row*3+1]===d.values[row*3+2]?'':'n')}</text></g>)}</g>)}</g> : <g><rect x="3" y="8.69" width="274" height="43.55" rx="6"/><text x="12" y="34.82">?</text></g>}
 </svg>
 <div className={s.controls}><Control disabled={locked||mode===0} onClick={()=>run(0,reach)}>Near negative</Control><Control disabled={locked||mode===1} onClick={()=>run(1,reach)}>Far negative</Control><Control disabled={locked||mode===2} onClick={()=>run(2,reach)}>Closer positive</Control><Control disabled={locked||mode===-1} onClick={()=>{setMode(-1);setData(null);}}>Reset</Control></div>
 <div className={s.witness} aria-label="Saved results">{saved.map((v,i)=><div key={i}>{i+1}: {v?.summary??'—'}</div>)}</div>
 </div>}</Milestones>}
 </Lesson>;
}

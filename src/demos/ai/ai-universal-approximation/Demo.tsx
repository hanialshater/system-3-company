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
 return <Lesson slug={slug} predict={{"question": "You build the curve x² out of straight-line pieces from a small network. For this constructed x² interpolant, what happens when equal pieces increase from 1 to 4?", "options": ["Bounded error falls", "Bounded error rises"], "answer": 0}} minInteractions={3} exploreHint="Try all three cases. Reset clears the view and keeps your saved results." reveal={()=> <p>The constructed midpoint error fell from .25 to .015625 on [0,1]. At x=2, the four-piece function gave 2.75 instead of 4. Supplied weights establish this bounded approximation, not successful training, a universal theorem, or reliable extrapolation.</p>}>
 {({locked,interact})=><Milestones interact={interact} names={["0","1","2"]}>{reach=><div className={s.wrap}>
 <p className={s.input}>{"g=x/n+Σₖ₌₁ⁿ⁻¹(2/n)ReLU(x−k/n) · f=x² · [0,1]"}</p>
 <svg className={s.diagram} viewBox="0 0 280 64" role="img" aria-label="curve · worked example">
 {d ? <g><path d={'M '+d.values.map((v,i)=>`${8+i*15},${4+.67*(66-v*48)}`).join(' L ')}/><path className={s.reference} d={'M '+Array.from({length:17},(_,i)=>`${8+i*15},${4+.67*(66-(i/16)**2*48)}`).join(' L ')}/><text x="8" y="15.39">g / x²</text><text x="208" y="15.39">[0,1]</text></g> : <g><rect x="3" y="8.69" width="274" height="43.55" rx="6"/><text x="12" y="34.82">?</text></g>}
 </svg>
 <div className={s.controls}><Control disabled={locked||mode===0} onClick={()=>run(0,reach)}>1 piece</Control><Control disabled={locked||mode===1} onClick={()=>run(1,reach)}>4 pieces</Control><Control disabled={locked||mode===2} onClick={()=>run(2,reach)}>Outside</Control><Control disabled={locked||mode===-1} onClick={()=>{setMode(-1);setData(null);}}>Reset</Control></div>
 <div className={s.witness} aria-label="Saved results">{saved.map((v,i)=><div key={i}>{i+1}: {v?.summary??'—'}</div>)}</div>
 </div>}</Milestones>}
 </Lesson>;
}

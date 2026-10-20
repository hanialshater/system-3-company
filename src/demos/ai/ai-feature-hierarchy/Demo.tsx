"use client";
import {useState} from "react";
import {Lesson} from "@/kit/Lesson";
import {Control} from "@/kit/controls";
import {Milestones} from "@/kit/milestones";
import {compute,computeInput,type Result} from "./model";
import s from "./styles.module.css";
export default function Demo({slug}:{slug:string}) {
 const [mode,setMode]=useState(-1);
 const [bits,setBits]=useState([1,1,1,1]);
 const [d,setData]=useState<Result|null>(null);
 const [saved,setSaved]=useState<(Result|null)[]>([null,null,null]);
 const flip=(bit:number,reach:(name:string)=>void)=>{const before=computeInput(bits),next=bits.map((v,i)=>i===bit?1-v:v),result=computeInput(next);setBits(next);setMode(bit);setData(result);const copy=[...saved];for(const v of[before,result]){const key=v.values.slice(0,4).join('');const i=key==='1111'?0:key==='1100'?1:key==='0111'?2:-1;if(i>=0){copy[i]=v;reach(String(i));}}setSaved(copy);};
 return <Lesson slug={slug} predict={{"question": "Does input 1100 activate the high conjunction unit?", "options": ["Yes", "No"], "answer": 1}} minInteractions={2} exploreHint="Flip x₃, then x₄. Reset clears the view and keeps the saved results." reveal={()=> <p>Input 1111 activated both local units and the high unit. Input 1100 activated only the left unit and left H at zero. These declared thresholds compute a conjunction; they are supplied weights, not trained semantic feature detectors.</p>}>
 {({locked,interact})=><Milestones interact={interact} names={["0","1"]}>{reach=><div className={s.wrap}>
 <p className={s.input}>{"hᵢ=ReLU(x₂ᵢ+x₂ᵢ₊₁−1) · H=ReLU(h₁+h₂−1)"}</p>
 <svg className={s.diagram} viewBox="0 0 280 64" role="img" aria-label="hierarchy · worked example">
 {d ? <g>{d.links.map(([a,b],i)=><line key={i} x1={a<4?14+a*80:a===4?54:214} y1={4+.67*(a<4?13:42)} x2={b===4?54:b===5?214:134} y2={4+.67*(b===6?69:42)}/>)}{d.values.map((v,i)=><g key={i}><circle cx={i<4?14+i*80:i===4?54:i===5?214:134} cy={4+.67*(i<4?13:i===6?69:42)} r="10"/><text x={i<4?10+i*80:i===4?50:i===5?210:130} y={4+.67*(i<4?18:i===6?74:47)}>{v}</text></g>)}</g> : <g><rect x="3" y="8.69" width="274" height="43.55" rx="6"/><text x="12" y="34.82">?</text></g>}
 </svg>
 <div className={s.controls}>{[2,3,0,1].map(bit=><Control key={bit} disabled={locked} aria-label={'Flip input '+(bit+1)} onClick={()=>flip(bit,reach)}>x{bit+1}</Control>)}<Control disabled={locked||mode===-1} onClick={()=>{setBits([1,1,1,1]);setMode(-1);setData(null);}}>Reset</Control></div>
 <div className={s.witness} aria-label="Saved results">{saved.map((v,i)=><div key={i}>{i+1}: {v?.summary??'—'}</div>)}</div>
 </div>}</Milestones>}
 </Lesson>;
}

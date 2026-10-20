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
 return <Lesson slug={slug} predict={{"question": "To fit your model on a phone, you store each weight with fewer bits. Must halving the nominal weight bits halve output error?", "options": ["Yes", "No"], "answer": 1}} minInteractions={3} exploreHint="Try all three cases. Reset clears the view and keeps your saved results." reveal={()=> <p>Two-bit weights used 6 packed bits and output 2.667; four-bit weights used 12 and output 2.133, against 2. Endpoints produced zero error at either precision. Counts exclude overhead. Input-dependent error implies no proportional quality change or measured hardware speedup.</p>}>
 {({locked,interact})=><Milestones interact={interact} names={["0","1","2"]}>{reach=><div className={s.wrap}>
 <p className={s.input}>{"w=.2,.7,−.4 · x=1,2,−1 · levels=−1+2k/(2ᵇ−1) · ties→lower"}</p>
 <svg className={s.diagram} viewBox="0 0 280 64" role="img" aria-label="quantizer · worked example">
 {d ? <g><line x1="18" y1="30.8" x2="260" y2="30.8"/>{Array.from({length:mode===1?16:4},(_,i)=><line key={i} x1={18+i*242/(mode===1?15:3)} y1="26.78" x2={18+i*242/(mode===1?15:3)} y2="34.82"/>)}{d.values.map((v,i)=><circle key={i} cx={139+v*121} cy={4+.67*(18+i*20)} r="4"/>)}<text x="10" y="56.26">−1</text><text x="249" y="56.26">1</text></g> : <g><rect x="3" y="8.69" width="274" height="43.55" rx="6"/><text x="12" y="34.82">?</text></g>}
 </svg>
 <div className={s.controls}><Control disabled={locked||mode===0} onClick={()=>run(0,reach)}>2 bits</Control><Control disabled={locked||mode===1} onClick={()=>run(1,reach)}>4 bits</Control><Control disabled={locked||mode===2} onClick={()=>run(2,reach)}>Endpoints</Control><Control disabled={locked||mode===-1} onClick={()=>{setMode(-1);setData(null);}}>Reset</Control></div>
 <div className={s.witness} aria-label="Saved results">{saved.map((v,i)=><div key={i}>{i+1}: {v?.summary??'—'}</div>)}</div>
 </div>}</Milestones>}
 </Lesson>;
}

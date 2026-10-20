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
 return <Lesson slug={slug} predict={{"question": "After re-spacing intact pairs, does the longer plotted A–B gap prove the original points moved?", "options": ["Yes, they moved", "No, spacing is ambiguous"], "answer": 1}} minInteractions={3} exploreHint="Compare all three operations; Reset retains the earned evidence." reveal={()=> <p>Re-spacing kept six nearest neighbours while plotted AB changed from 5 to 50; original AB stayed 10. Breaking one pair lost agreement. These prescribed embeddings were not fitted by t-SNE: preserving these neighbours alone cannot identify global distances.</p>}>
 {({locked,interact})=><Milestones interact={interact} names={["0","1","2"]}>{reach=><div className={s.wrap}>
 <p className={s.input}>{"X=(0,0,0),(.1,0,0),(0,10,0),(.1,10,0),(0,0,10),(.1,0,10)"}</p>
 <svg className={s.diagram} viewBox="0 0 280 64" role="img" aria-label="projection · declared finite computation">
 {d ? <g><text x="4" y="14.72">original AB</text><line x1="100" y1="12.04" x2="140" y2="12.04"/><text x="150" y="14.72">10</text><text x="4" y="36.83">projected AB</text><line x1="100" y1="34.15" x2={100+d.detail[1]*3} y2="34.15"/><text x="100" y="49.56">{d.detail[1]} · 1NN {d.detail[2]}/6</text></g> : <g><rect x="3" y="8.69" width="274" height="43.55" rx="6"/><text x="12" y="34.82">?</text></g>}
 </svg>
 <div className={s.controls}><Control disabled={locked||mode===0} onClick={()=>run(0,reach)}>Original</Control><Control disabled={locked||mode===1} onClick={()=>run(1,reach)}>Re-space</Control><Control disabled={locked||mode===2} onClick={()=>run(2,reach)}>Break pair</Control><Control disabled={locked||mode===-1} onClick={()=>{setMode(-1);setData(null);}}>Reset</Control></div>
 <div className={s.witness} aria-label="Retained computed evidence">{saved.map((v,i)=><div key={i}>{i+1}: {v?.summary??'—'}</div>)}</div>
 </div>}</Milestones>}
 </Lesson>;
}

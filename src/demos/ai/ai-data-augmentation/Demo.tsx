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
 const [saved,setSaved]=useState<(Result|null)[]>([null,null,null,null]);
 const run=(m:number,reach:(name:string)=>void)=>{const result=compute(m);setMode(m);setData(result);setSaved(old=>old.map((v,i)=>i===m?result:v));reach(String(m));};
 return <Lesson slug={slug} predict={{"question": "Does a half-turn preserve the copied Up label in this orientation task?", "options": ["Yes", "No"], "answer": 1}} minInteractions={3} exploreHint="Try all three cases. Reset clears the view and keeps your saved results." reveal={()=> <p>Reflection preserved the Up glyph. Rotation produced Down, so copying Up introduced one contradictory label among two records. With the target changed to “three middle-row pixels,” both glyphs were Yes. Valid augmentation depends on the declared task, not the transform alone.</p>}>
 {({locked,interact})=><Milestones interact={interact} names={["0","1","2"]}>{reach=><div className={s.wrap}>
 <p className={s.input}>{"010/111/000 · target=orientation · copied label=Up"}</p>
 <svg className={s.diagram} viewBox="0 0 280 64" role="img" aria-label="glyph · worked example">
 {d ? <g>{d.values.map((v,i)=><rect key={i} x={108+(i%3)*20} y={4+.67*(4+Math.floor(i/3)*23)} width="18" height="13.4" style={{fill:v?'var(--domain)':'var(--bg-2)'}}/>)}<text x="4" y="54.25">pixels ≠ task</text></g> : <g><rect x="3" y="8.69" width="274" height="43.55" rx="6"/><text x="12" y="34.82">?</text></g>}
 </svg>
 <div className={s.controls}><Control disabled={locked||mode===0} onClick={()=>run(0,reach)}>Reflect</Control><Control disabled={locked||mode===1} onClick={()=>run(1,reach)}>Rotate</Control><Control disabled={locked||mode===2} onClick={()=>run(2,reach)}>Change task</Control><Control disabled={locked||mode===3} onClick={()=>run(3,reach)}>Fix label</Control><Control disabled={locked||mode===-1} onClick={()=>{setMode(-1);setData(null);}}>Reset</Control></div>
 <div className={s.witness} aria-label="Saved results">{saved.map((v,i)=><div key={i}>{i+1}: {v?.summary??'—'}</div>)}</div>
 </div>}</Milestones>}
 </Lesson>;
}

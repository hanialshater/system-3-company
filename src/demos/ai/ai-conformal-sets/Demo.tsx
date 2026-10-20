"use client";
import {useEffect,useState} from "react";
import {Lesson,type Phase} from "@/kit/Lesson";
import {Control} from "@/kit/controls";
import {useMilestones} from "@/kit/milestones";
import {compute,f} from "./model";
import s from "./styles.module.css";
const cases=["Certain", "Uncertain", "α=.1"];
const milestones=cases.map((_,i)=>String(i));
type Witness=ReturnType<typeof compute>;
export function Figure({v}:{v:Witness|null}){return <svg className={s.figure} viewBox="0 0 280 110" role="img" aria-label="Calculate the augmented calibration order statistic."><text x="8" y="15">calibration:.1/.2/.3/∞</text><text x="8" y="39">k={v?v.rank:'3'} · q={v?(Number.isFinite(v.threshold)?f(v.threshold):'∞'):'?'}</text>{[0,1,2].map(i=><g key={i}><rect x={8+i*90} y="50" width="82" height="27" className={v?.members[i]?s.mark:undefined}/><text x={16+i*90} y="69">{'ABC'[i]}:{v?f(v.scores[i]):'?'}</text></g>)}<text x="8" y="99">score=1−p · retain≤q</text></svg>}
function Stage({locked,phase,interact}:{locked:boolean;phase:Phase;interact:()=>void}){
 const [mode,setMode]=useState(-1);
 const [value,setValue]=useState<Witness|null>(null);
 const [saved,setSaved]=useState<(string|null)[]>(()=>cases.map(()=>null));
 const {reach}=useMilestones(interact,milestones);
 // Reveal restores the primary witness only after every named case was earned.
 // Reset clears the current computation, while retained witnesses survive.
 useEffect(()=>{if(phase==="reveal"){setMode(0);setValue(compute(0));}},[phase]);
 const run=(next:number)=>{const result=compute(next);setMode(next);setValue(result);setSaved(old=>old.map((x,i)=>i===next?result.snapshot:x));reach(String(next));};
 return <div className={s.wrap}><Figure v={value}/><div className={s.controls}>{cases.map((label,i)=><Control key={label} disabled={locked||mode===i} aria-pressed={mode===i} onClick={()=>run(i)}>{label}</Control>)}<Control disabled={locked||mode===-1} onClick={()=>{setMode(-1);setValue(null);}}>Reset</Control></div><div className={s.evidence} aria-label="Saved results" aria-live="polite">{saved.map((x,i)=>x===null?null:<p key={i}>{x}</p>)}</div></div>;
}
export default function Demo({slug}:{slug:string}){return <Lesson slug={slug} predict={{"question": "Your classifier returns a set of plausible labels for each new input. Calibration scores .1/.2/.3; n=3, α=.25, k=ceil((n+1)(1−α))=3. With class probabilities .4/.35/.25, does score 1−p≤threshold retain any class?", "options": ["No", "Yes"], "answer": 0}} minInteractions={3} exploreHint="Try each case and compare the saved results." reveal={()=><p className={s.explanation}>The third calibration score gave threshold .3. Probabilities [.8,.15,.05] retained A; [.4,.35,.25] retained none. At alpha .1, rank 4 exceeded three scores, so the augmented threshold was infinity and retained all. This finite calculation makes no per-case confidence or coverage promise.</p>}>{({locked,phase,interact})=><Stage locked={locked} phase={phase} interact={interact}/>}</Lesson>}

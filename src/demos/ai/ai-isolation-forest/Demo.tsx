"use client";
import {useEffect,useState} from "react";
import {Lesson,type Phase} from "@/kit/Lesson";
import {Control} from "@/kit/controls";
import {useMilestones} from "@/kit/milestones";
import {compute,f} from "./model";
import s from "./styles.module.css";
const cases=["Point 10", "Point 1", "Point 0"];
const milestones=cases.map((_,i)=>String(i));
type Witness=ReturnType<typeof compute>;
export function Figure({v}:{v:Witness|null}){return <svg className={s.figure} viewBox="0 0 280 110" role="img" aria-label="Average actual paths through two declared isolation trees."><text x="8" y="15">x=0/1/2/10 · score=2^(−h/2)</text>{[0,1].map(i=><g key={i}><text x="8" y={44+i*28}>{'AB'[i]}</text>{(v?(i===0?v.stepsA:v.stepsB):i===0?['6:?','.5:?','1.5:?']:['.5:?','6:?','1.5:?']).map((label,j)=><g key={j}><rect x={33+j*78} y={26+i*28} width="70" height="25"/><text x={37+j*78} y={44+i*28}>{label}</text></g>)}</g>)}<text x="8" y="101">mean/score={v?v.average:'?'}/{v?f(v.score):'?'}</text></svg>}
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
export default function Demo({slug}:{slug:string}){return <Lesson slug={slug} predict={{"question": "You hunt for the odd reading in a sensor log. Points 0/1/2/10. Two fixed trees give point 10 depths 1/2 and point 1 depths 3/3. With score=2^(−mean-depth/2), which scores higher?", "options": ["10", "1"], "answer": 0}} minInteractions={3} exploreHint="Try each case and compare the saved results." reveal={()=><p className={s.explanation}>Point 10 averaged depth 1.5 and scored .595; point 1 averaged 3 and scored .354 with declared normalizer 2. Point 0 had depths 2/1, also averaging 1.5. One short path is not proof of anomaly. These two trees are fixed, not a fitted random forest.</p>}>{({locked,phase,interact})=><Stage locked={locked} phase={phase} interact={interact}/>}</Lesson>}

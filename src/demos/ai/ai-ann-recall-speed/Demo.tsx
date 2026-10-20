"use client";
import {useEffect,useState} from "react";
import {Lesson,type Phase} from "@/kit/Lesson";
import {Control} from "@/kit/controls";
import {useMilestones} from "@/kit/milestones";
import {compute,f} from "./model";
import s from "./styles.module.css";
const cases=["Budget 3", "Budget 4", "Near 0"];
const milestones=cases.map((_,i)=>String(i));
type Witness=ReturnType<typeof compute>;
export function Figure({v}:{v:Witness|null}){return <svg className={s.figure} viewBox="0 0 280 110" role="img" aria-label="Count comparisons and an exact-neighbor miss."><text x="8" y="15">order:0→9→2→3 · q={v?.query??2.6}</text>{[0,9,2,3].map((x,i)=><g key={i}><circle cx={30+i*62} cy="47" r="15" className={v&&i<v.budget?s.mark:undefined}/><text x={25+i*62} y="52">{x}</text></g>)}<text x="8" y="91">best={v?v.best:'?'} d={v?f(v.distance):'?'} recall@1={v?v.recall:'?'}</text></svg>}
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
export default function Demo({slug}:{slug:string}){return <Lesson slug={slug} predict={{"question": "Points 0/2/3/9, query 2.6; inspect in order 0,9,2,3. Does a budget of 3 find the true nearest point?", "options": ["No", "Yes"], "answer": 0}} minInteractions={3} exploreHint="Try each case and compare the saved results." reveal={()=><p className={s.explanation}>At query 2.6, three distance checks returned 2, missing exact nearest 3. Four checks found 3. At query .1, one check already found exact 0. These counts describe a fixed inspection order, not hardware speed or a universal recall curve.</p>}>{({locked,phase,interact})=><Stage locked={locked} phase={phase} interact={interact}/>}</Lesson>}

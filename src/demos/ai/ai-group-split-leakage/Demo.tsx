"use client";
import {useEffect,useState} from "react";
import {Lesson,type Phase} from "@/kit/Lesson";
import {Control} from "@/kit/controls";
import {useMilestones} from "@/kit/milestones";
import {compute,f} from "./model";
import s from "./styles.module.css";
const cases=["Row split", "Entity split", "Signal"];
const milestones=cases.map((_,i)=>String(i));
type Witness=ReturnType<typeof compute>;
export function Figure({v}:{v:Witness|null}){return <svg className={s.figure} viewBox="0 0 280 110" role="img" aria-label="Compare row reuse with a genuinely unseen entity."><text x="8" y="15">A1/A2:y0 · B1/B2:y1 · fallback=0</text><rect x="8" y="29" width="125" height="36"/><rect x="147" y="29" width="125" height="36"/><text x="15" y="51">train:{v?Object.keys(v.train).join('/'):'?'}</text><text x="154" y="51">test:{v?v.test.join('/'):'?'}</text><text x="8" y="92">{v?.signal?'feature':'lookup'}={v?v.predictions.join('/'):'?'} · hits={v?v.hits:'?'}/2</text></svg>}
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
export default function Demo({slug}:{slug:string}){return <Lesson slug={slug} predict={{"question": "A rows have label 0; B rows label 1. An entity-lookup predictor trained only on A defaults unknown IDs to 0. How many of two held-out B rows are correct?", "options": ["0/2", "2/2"], "answer": 0}} minInteractions={3} exploreHint="Try each case and compare the saved results." reveal={()=><p className={s.explanation}>Row splitting exposed both identities, so lookup scored 2/2. Holding B out made its zero fallback score 0/2. A transferable feature instead scored 2/2 on B. Match the split to returning-entity or new-entity deployment; disjointness alone does not ensure success.</p>}>{({locked,phase,interact})=><Stage locked={locked} phase={phase} interact={interact}/>}</Lesson>}

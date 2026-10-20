"use client";
import {useEffect,useState} from "react";
import {Lesson,type Phase} from "@/kit/Lesson";
import {Control} from "@/kit/controls";
import {useMilestones} from "@/kit/milestones";
import {compute,f} from "./model";
import s from "./styles.module.css";
const cases=["Old user", "New user", "Topic"];
const milestones=cases.map((_,i)=>String(i));
type Witness=ReturnType<typeof compute>;
export function Figure({v}:{v:Witness|null}){return <svg className={s.figure} viewBox="0 0 280 110" role="img" aria-label="Expose missing support and a separate fallback."><text x="8" y="15">neighbors:1010/0110 · D=unseen</text><path d="M50 44L143 44L218 72"/><text x="8" y="38">{v?v.user.join(''):'1100'}</text><text x="112" y="38">cosine</text><text x="8" y="92">C={v?(v.c===null?'undefined':f(v.c)):'?'} · D={v?(v.d===null?'undefined':f(v.d)):'?'}</text><text x="175" y="61">{v?.topic!==null&&v?'topic=1':'co-interactions'}</text></svg>}
function Stage({locked,phase,interact}:{locked:boolean;phase:Phase;interact:()=>void}){
 const [mode,setMode]=useState(-1);
 const [value,setValue]=useState<Witness|null>(null);
 const [saved,setSaved]=useState<(string|null)[]>(()=>cases.map(()=>null));
 const {reach}=useMilestones(interact,milestones);
 // Reveal restores the primary witness only after every named case was earned.
 // Reset clears the current computation, while retained witnesses survive.
 useEffect(()=>{if(phase==="reveal"){setMode(0);setValue(compute(0));}},[phase]);
 const run=(next:number)=>{const result=compute(next);setMode(next);setValue(result);setSaved(old=>old.map((x,i)=>i===next?result.snapshot:x));reach(String(next));};
 return <div className={s.wrap}><Figure v={value}/><div className={s.controls}>{cases.map((label,i)=><Control key={label} disabled={locked||mode===i} aria-pressed={mode===i} onClick={()=>run(i)}>{label}</Control>)}<Control disabled={locked||mode===-1} onClick={()=>{setMode(-1);setValue(null);}}>Reset</Control></div><div className={s.evidence} aria-label="Retained computed witnesses" aria-live="polite">{saved.map((x,i)=>x===null?null:<p key={i}>{x}</p>)}</div></div>;
}
export default function Demo({slug}:{slug:string}){return <Lesson slug={slug} predict={{"question": "New user 0000 has zero norm. Can cosine co-interaction scoring support a recommendation?", "options": ["No, similarity is unavailable", "Yes, zero means confident dislike"], "answer": 0}} minInteractions={3} exploreHint="Compute every case; compare the retained witnesses." reveal={()=><p className={s.explanation}>For the established user, item C scored 1 and interaction-free D scored 0. A zero-norm new user had undefined cosine support. The topic fallback assigned D score 1 using a separate declared match. Missing interactions do not establish dislike or calibrated confidence.</p>}>{({locked,phase,interact})=><Stage locked={locked} phase={phase} interact={interact}/>}</Lesson>}

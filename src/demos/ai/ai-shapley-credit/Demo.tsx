"use client";
import {useEffect,useState} from "react";
import {Lesson,type Phase} from "@/kit/Lesson";
import {Control} from "@/kit/controls";
import {useMilestones} from "@/kit/milestones";
import {compute,f} from "./model";
import s from "./styles.module.css";
const cases=["Symmetric", "Asymmetric"];
const milestones=cases.map((_,i)=>String(i));
type Witness=ReturnType<typeof compute>;
export function Figure({v}:{v:Witness|null}){return <svg className={s.figure} viewBox="0 0 280 110" role="img" aria-label="Average marginal contributions over both arrival orders."><text x="8" y="15">v(∅)=0 · v(A/B)={v?`${v.a}/${v.b}`:'1/1'} · v(AB)=4</text><text x="8" y="43">A→B</text><text x="105" y="43">{v?v.orders[0].join('/'):'?'}</text><text x="8" y="69">B→A</text><text x="105" y="69">{v?`${v.orders[1][1]}/${v.orders[1][0]}`:'?'}</text><text x="8" y="96">mean-credit(A/B)={v?v.credits.join('/'):'?'}</text></svg>}
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
export default function Demo({slug}:{slug:string}){return <Lesson slug={slug} predict={{"question": "Two players, A and B, earn a joint payout and you have to split the credit. Game values: empty=0, A=1, B=1, AB=4. Averaging both arrival orders, what credit does A get?", "options": ["2", "1"], "answer": 0}} minInteractions={2} exploreHint="Try each case and compare the saved results." reveal={()=><p className={s.explanation}>In the symmetric game, A’s two marginal contributions were 1 and 3; B’s were 3 and 1. Averaging gave 2 each, totaling 4. Changing standalone values to A=2, B=0 gave credits 3 and 1. These are allocations in a declared game, not physical causality.</p>}>{({locked,phase,interact})=><Stage locked={locked} phase={phase} interact={interact}/>}</Lesson>}

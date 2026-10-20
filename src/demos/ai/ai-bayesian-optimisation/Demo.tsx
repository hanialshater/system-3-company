"use client";
import {useEffect,useState} from "react";
import {Lesson,type Phase} from "@/kit/Lesson";
import {Control} from "@/kit/controls";
import {useMilestones} from "@/kit/milestones";
import {compute,f} from "./model";
import s from "./styles.module.css";
const cases=["β=0", "β=1", "Low-sd"];
const milestones=cases.map((_,i)=>String(i));
type Witness=ReturnType<typeof compute>;
export function Figure({v}:{v:Witness|null}){return <svg className={s.figure} viewBox="0 0 280 110" role="img" aria-label="Choose a trial with a declared acquisition score."><text x="8" y="15">μ+βσ · A(.8,.1) B(.6,{v?v.sd[1]:'.4'})</text>{[0,1].map(i=><g key={i}><rect x="30" y={31+i*29} width={(v?.means[i]??[.8,.6][i])*160} height="16"/><rect className={s.mark} x={30+(v?.means[i]??[.8,.6][i])*160} y={31+i*29} width={v?v.beta*v.sd[i]*160:0} height="16"/><text x="8" y={45+i*29}>{'AB'[i]}</text><text x="224" y={45+i*29}>{v?f(v.scores[i]):'?'}</text></g>)}<text x="8" y="98">mean + uncertainty-bonus</text></svg>}
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
export default function Demo({slug}:{slug:string}){return <Lesson slug={slug} predict={{"question": "A has mean .8, sd .1; B mean .6, sd .4. With UCB=mean+sd, which trial wins?", "options": ["B", "A"], "answer": 0}} minInteractions={3} exploreHint="Compute every case; compare the retained witnesses." reveal={()=><p className={s.explanation}>With beta 0, A won by mean alone. With beta 1, B scored 1 versus A’s .9. Reducing B’s standard deviation to .05 restored A. Acquisition chooses the next trial from stipulated beliefs; it does not guarantee global discovery.</p>}>{({locked,phase,interact})=><Stage locked={locked} phase={phase} interact={interact}/>}</Lesson>}

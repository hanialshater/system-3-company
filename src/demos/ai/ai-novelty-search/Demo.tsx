"use client";
import {useState} from "react";
import {Lesson,type Phase} from "@/kit/Lesson";
import {Control} from "@/kit/controls";
import {useMilestones} from "@/kit/milestones";
import {compute,type Result} from "./model";
import s from "./styles.module.css";
const cases=["Archive run", "Add Z", "Goal greedy"];
const milestones=['0','1','2'];
type Witness=Result;
export function Figure({v}:{v:Witness|null}){ if(v?.graph){const {xy,edges,path}=v.graph;const vals=Object.values(xy),minX=Math.min(...vals.map(p=>p[0])),maxX=Math.max(...vals.map(p=>p[0])),minY=Math.min(...vals.map(p=>p[1])),maxY=Math.max(...vals.map(p=>p[1])),x=(n:string)=>18+(xy[n][0]-minX)*240/(maxX-minX||1),y=(n:string)=>16+(xy[n][1]-minY)*48/(maxY-minY||1);return <svg className={s.figure} viewBox="0 0 280 86" role="img" aria-label="Declared graph; highlighted nodes belong to the computed path.">{edges.map(([a,b])=><line key={a+b} x1={x(a)} y1={y(a)} x2={x(b)} y2={y(b)}/>)}{!edges.some(e=>e.includes('B')&&e.includes('G'))&&<g><path d={`M${(x('B')+x('G'))/2-4} ${y('B')-5}l8 10m-8 0l8 -10`}/><text x={(x('B')+x('G'))/2-9} y={y('B')+29}>wall</text></g>}{Object.keys(xy).map(n=><g key={n}><circle cx={x(n)} cy={y(n)} r={path.includes(n)?5:2}/><text x={x(n)+3} y={y(n)+17}>{n}</text></g>)}</svg>;}
 return null;
}
function Stage({locked,phase,interact}:{locked:boolean;phase:Phase;interact:()=>void}){
 const [mode,setMode]=useState(-1),[value,setValue]=useState<Witness|null>(null);
 const [saved,setSaved]=useState<(Witness|null)[]>([null,null,null]);
 const {reach}=useMilestones(interact,milestones);
 const run=(next:number)=>{const result=compute(next);setMode(next);setValue(result);setSaved(old=>old.map((x,i)=>i===next?result:x));reach(String(next));};
 const shown=phase==='reveal'&&mode===-1?saved[0]:value;
 return <div className={s.wrap}><Figure v={shown}/><div className={s.readout} aria-live="polite">{shown?shown.lines.map((line,i)=><p key={i}>{line}</p>):<p className={s.blank}>Choose a case to see its result.</p>}</div><div className={s.controls}>{cases.map((label,i)=><Control key={label} disabled={locked||mode===i} aria-pressed={mode===i} onClick={()=>run(i)}>{label}</Control>)}<Control disabled={locked||mode===-1} onClick={()=>{setMode(-1);setValue(null);}}>Reset</Control></div><div className={s.saved} aria-label="Saved results">{saved.map((v,i)=>v?<p key={i}>{v.snapshot}</p>:null)}</div></div>;
}
export default function Demo({slug}:{slug:string}){return <Lesson slug={slug} predict={{"question": "Your search agent scores each move only by how new it looks. Same missing-BG graph. Initial archive S(0,0),A(1,0),B(2,0). Novelty=min Euclidean distance to archive; choose positive maximum neighbour. From S, choose A or D(0,1)?", "options": ["D", "A"], "answer": 0}} minInteractions={3} exploreHint="Try each case and compare the saved results." reveal={()=><p className={s.explanation}>Archive distance selected D and followed the detour to G; the goal-greedy trace still stalled at B. Adding Z made the novelty rule choose an irrelevant dead end. Novelty distance and goal progress are different objectives; this endpoint illustration is not the original evolutionary algorithm.</p>}>{({locked,phase,interact})=><Stage locked={locked} phase={phase} interact={interact}/>}</Lesson>}

"use client";
import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const lesson = {
  "question": "In a simplified octopus sucker model, which condition helps the sucker attach to a smooth surface?",
  "options": [
    "A seal at the contact rim",
    "A root growing into the surface",
    "A permanent shell welded on"
  ],
  "answer": 0,
  "explanation": "The first panel shows a sucker away from a surface. In the second the rim contacts it, forming a seal. An octopus can use muscular suckers to grip; this sketch omits the detailed pressure changes and does not measure grip strength.",
  "labels": [
    "Away",
    "In contact"
  ],
  "label": "Cross sections are symbolic; internal musculature, pressure and fluid effects are omitted.",
  "shownLabel": "Cross sections are symbolic; internal musculature, pressure and fluid effects are omitted. The first panel shows a sucker away from a surface. In the second the rim contacts it, forming a seal. An octopus can use muscular suckers to grip; this sketch omits the detailed pressure changes and does not measure grip strength."
};
export default function Demo({slug}:{slug:string}) {
 const [seen,setSeen]=useState([false,false]);
 const recorded=useRef([false,false]);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.options,answer:lesson.answer}} exploreHint="Open both states and compare what each shows." minInteractions={2} reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 340 170" className="stage-svg" role="img" aria-label={seen.every(Boolean)?lesson.shownLabel:seen.some(Boolean)?lesson.label + " Visible state: " + lesson.labels[seen[0] ? 0 : 1] + "." : "Both diagram states are hidden until you explore."}>
 <rect x="4" y="5" width="158" height="154" rx="12" fill="var(--bg-2)" stroke="var(--line)"/><rect x="178" y="5" width="158" height="154" rx="12" fill="var(--bg-2)" stroke="var(--line)"/>
 {seen[0] && <g transform="translate(12 9)"><path d="M28 45 Q70 5 112 45 L102 66 Q70 51 38 66 Z" fill="#d5a891" stroke="var(--fg)" strokeWidth="3"/><path d="M10 101 H130" stroke="var(--fg)" strokeWidth="5"/></g>}{seen[1] && <g transform="translate(186 9)"><path d="M28 45 Q70 5 112 45 L103 98 Q70 83 37 98 Z" fill="#d5a891" stroke="var(--fg)" strokeWidth="3"/><path d="M10 101 H130" stroke="var(--fg)" strokeWidth="5"/><circle cx="37" cy="98" r="4" fill="#e4b75c"/><circle cx="103" cy="98" r="4" fill="#e4b75c"/></g>}
 {seen[0] && <text x="82" y="150" textAnchor="middle" fill="var(--fg)" fontSize="13">{lesson.labels[0]}</text>}{seen[1] && <text x="256" y="150" textAnchor="middle" fill="var(--fg)" fontSize="13">{lesson.labels[1]}</text>}
 </svg><Row><Control style={{minWidth:44,minHeight:44}} disabled={locked || seen[0]} onClick={()=>{if(recorded.current[0]) return; recorded.current[0]=true; setSeen(v=>[true,v[1]]);interact();}}>Open first</Control><Control style={{minWidth:44,minHeight:44}} disabled={locked || seen[1]} onClick={()=>{if(recorded.current[1]) return; recorded.current[1]=true; setSeen(v=>[v[0],true]);interact();}}>Open second</Control></Row></div>}
 </Lesson>;
}

"use client";
import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const lesson = {
  "question": "A filter-feeding bivalve draws in water containing suspended particles. What can it retain from that water as food?",
  "options": [
    "Some suspended particles",
    "Only the water itself",
    "A second empty shell"
  ],
  "answer": 0,
  "explanation": "In the first panel particles enter with water; in the second some particles are shown caught at a simplified internal filter. Bivalve feeding and particle selection vary, so the drawing does not imply that every particle is eaten.",
  "labels": [
    "Water enters",
    "Some retained"
  ],
  "label": "This is a conceptual filter cross-section, not a complete bivalve anatomy diagram.",
  "shownLabel": "This is a conceptual filter cross-section, not a complete bivalve anatomy diagram. In the first panel particles enter with water; in the second some particles are shown caught at a simplified internal filter. Bivalve feeding and particle selection vary, so the drawing does not imply that every particle is eaten."
};
export default function Demo({slug}:{slug:string}) {
 const [seen,setSeen]=useState([false,false]);
 const recorded=useRef([false,false]);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.options,answer:lesson.answer}} exploreHint="Open both states and compare what each shows." minInteractions={2} reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 340 170" className="stage-svg" role="img" aria-label={seen.every(Boolean)?lesson.shownLabel:seen.some(Boolean)?lesson.label + " Visible state: " + lesson.labels[seen[0] ? 0 : 1] + "." : "Both diagram states are hidden until you explore."}>
 <rect x="4" y="5" width="158" height="154" rx="12" fill="var(--bg-2)" stroke="var(--line)"/><rect x="178" y="5" width="158" height="154" rx="12" fill="var(--bg-2)" stroke="var(--line)"/>
 {seen[0] && <g transform="translate(12 9)"><path d="M31 88 Q67 7 112 88 Z" fill="#c1b2a1" stroke="var(--fg)" strokeWidth="3"/><path d="M8 47 H38 M29 40 L38 47 L29 54" fill="none" stroke="var(--fg)" strokeWidth="3"/><circle cx="14" cy="64" r="4" fill="#80a77e"/><circle cx="24" cy="78" r="4" fill="#80a77e"/></g>}{seen[1] && <g transform="translate(186 9)"><path d="M31 88 Q67 7 112 88 Z" fill="#c1b2a1" stroke="var(--fg)" strokeWidth="3"/><path d="M62 31 Q47 56 62 83 M77 31 Q62 56 77 83" fill="none" stroke="#719da3" strokeWidth="4"/><circle cx="57" cy="54" r="4" fill="#80a77e"/><circle cx="70" cy="70" r="4" fill="#80a77e"/><path d="M108 42 H134 M125 35 L134 42 L125 49" fill="none" stroke="var(--fg)" strokeWidth="3"/></g>}
 {seen[0] && <text x="82" y="150" textAnchor="middle" fill="var(--fg)" fontSize="13">{lesson.labels[0]}</text>}{seen[1] && <text x="256" y="150" textAnchor="middle" fill="var(--fg)" fontSize="13">{lesson.labels[1]}</text>}
 </svg><Row><Control style={{minWidth:44,minHeight:44}} disabled={locked || seen[0]} onClick={()=>{if(recorded.current[0]) return; recorded.current[0]=true; setSeen(v=>[true,v[1]]);interact();}}>Open first</Control><Control style={{minWidth:44,minHeight:44}} disabled={locked || seen[1]} onClick={()=>{if(recorded.current[1]) return; recorded.current[1]=true; setSeen(v=>[v[0],true]);interact();}}>Open second</Control></Row></div>}
 </Lesson>;
}

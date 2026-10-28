"use client";
import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const lesson = {
  "question": "A mussel attaches to a rock by a bundle of fibers it produces. What are these attachment fibers called?",
  "options": [
    "Byssal threads",
    "Gills of the rock",
    "Plant roots"
  ],
  "answer": 0,
  "explanation": "The revealed fibers link the mussel to the rock. Many mussels attach by byssal threads; the diagram simplifies their number and composition and does not demonstrate how much force they withstand.",
  "labels": [
    "Mussel",
    "Attachment"
  ],
  "label": "The fibers and shell are drawn schematically; actual anchorage can depend on conditions and species.",
  "shownLabel": "The fibers and shell are drawn schematically; actual anchorage can depend on conditions and species. The revealed fibers link the mussel to the rock. Many mussels attach by byssal threads; the diagram simplifies their number and composition and does not demonstrate how much force they withstand."
};
export default function Demo({slug}:{slug:string}) {
 const [seen,setSeen]=useState([false,false]);
 const recorded=useRef([false,false]);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.options,answer:lesson.answer}} exploreHint="Open both states and compare what each shows." minInteractions={2} reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 340 170" className="stage-svg" role="img" aria-label={seen.every(Boolean)?lesson.shownLabel:seen.some(Boolean)?lesson.label + " Visible state: " + lesson.labels[seen[0] ? 0 : 1] + "." : "Both diagram states are hidden until you explore."}>
 <rect x="4" y="5" width="158" height="154" rx="12" fill="var(--bg-2)" stroke="var(--line)"/><rect x="178" y="5" width="158" height="154" rx="12" fill="var(--bg-2)" stroke="var(--line)"/>
 {seen[0] && <g transform="translate(12 9)"><path d="M25 91 Q37 14 111 25 Q115 71 68 102 Z" fill="#9eafbd" stroke="var(--fg)" strokeWidth="3"/><path d="M6 109 H137" stroke="#8d8376" strokeWidth="8"/></g>}{seen[1] && <g transform="translate(186 9)"><path d="M25 91 Q37 14 111 25 Q115 71 68 102 Z" fill="#9eafbd" stroke="var(--fg)" strokeWidth="3"/><path d="M6 109 H137" stroke="#8d8376" strokeWidth="8"/><path d="M60 91 L39 105 M65 93 L58 105 M70 94 L76 105 M76 92 L96 105" stroke="#c5a576" strokeWidth="3"/></g>}
 {seen[0] && <text x="82" y="150" textAnchor="middle" fill="var(--fg)" fontSize="13">{lesson.labels[0]}</text>}{seen[1] && <text x="256" y="150" textAnchor="middle" fill="var(--fg)" fontSize="13">{lesson.labels[1]}</text>}
 </svg><Row><Control style={{minWidth:44,minHeight:44}} disabled={locked || seen[0]} onClick={()=>{if(recorded.current[0]) return; recorded.current[0]=true; setSeen(v=>[true,v[1]]);interact();}}>Open first</Control><Control style={{minWidth:44,minHeight:44}} disabled={locked || seen[1]} onClick={()=>{if(recorded.current[1]) return; recorded.current[1]=true; setSeen(v=>[v[0],true]);interact();}}>Open second</Control></Row></div>}
 </Lesson>;
}

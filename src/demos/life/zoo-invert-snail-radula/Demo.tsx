"use client";
import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const lesson = {
  "question": "Many snails scrape food using a radula. Which structure does the radula resemble in this simplified diagram?",
  "options": [
    "A ribbon bearing tiny teeth",
    "A pair of bird wings",
    "A rigid outer shell"
  ],
  "answer": 0,
  "explanation": "The second panel magnifies a toothed ribbon at a food surface. Many snails use a radula to scrape or process food; radula form and diet vary, and the diagram does not show all species or a real motion sequence.",
  "labels": [
    "Snail",
    "Mouth detail"
  ],
  "label": "The radula detail is exaggerated and schematic; snail species and feeding structures vary.",
  "shownLabel": "The radula detail is exaggerated and schematic; snail species and feeding structures vary. The second panel magnifies a toothed ribbon at a food surface. Many snails use a radula to scrape or process food; radula form and diet vary, and the diagram does not show all species or a real motion sequence."
};
export default function Demo({slug}:{slug:string}) {
 const [seen,setSeen]=useState([false,false]);
 const recorded=useRef([false,false]);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.options,answer:lesson.answer}} exploreHint="Open both states and compare what each shows." minInteractions={2} reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 340 170" className="stage-svg" role="img" aria-label={seen.every(Boolean)?lesson.shownLabel:seen.some(Boolean)?lesson.label + " Visible state: " + lesson.labels[seen[0] ? 0 : 1] + "." : "Both diagram states are hidden until you explore."}>
 <rect x="4" y="5" width="158" height="154" rx="12" fill="var(--bg-2)" stroke="var(--line)"/><rect x="178" y="5" width="158" height="154" rx="12" fill="var(--bg-2)" stroke="var(--line)"/>
 {seen[0] && <g transform="translate(12 9)"><circle cx="74" cy="47" r="30" fill="#d6be92" stroke="var(--fg)" strokeWidth="3"/><path d="M18 87 Q50 65 96 81 Q115 87 126 101 H16 Z M19 87 L16 65 M33 84 L36 63" fill="#9fb78f" stroke="var(--fg)" strokeWidth="3"/></g>}{seen[1] && <g transform="translate(186 9)"><path d="M13 100 H132" stroke="#91a77c" strokeWidth="7"/><path d="M20 54 H125 V69 H20 Z" fill="#c9a48b" stroke="var(--fg)" strokeWidth="2"/><path d="M29 69 L34 83 L39 69 M51 69 L56 83 L61 69 M73 69 L78 83 L83 69 M95 69 L100 83 L105 69" stroke="var(--fg)" strokeWidth="2" fill="none"/></g>}
 {seen[0] && <text x="82" y="150" textAnchor="middle" fill="var(--fg)" fontSize="13">{lesson.labels[0]}</text>}{seen[1] && <text x="256" y="150" textAnchor="middle" fill="var(--fg)" fontSize="13">{lesson.labels[1]}</text>}
 </svg><Row><Control style={{minWidth:44,minHeight:44}} disabled={locked || seen[0]} onClick={()=>{if(recorded.current[0]) return; recorded.current[0]=true; setSeen(v=>[true,v[1]]);interact();}}>Open first</Control><Control style={{minWidth:44,minHeight:44}} disabled={locked || seen[1]} onClick={()=>{if(recorded.current[1]) return; recorded.current[1]=true; setSeen(v=>[v[0],true]);interact();}}>Open second</Control></Row></div>}
 </Lesson>;
}

"use client";
import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const lesson = {
  "question": "A filter-feeding sponge draws water through small openings. Where does water leave in this simplified model?",
  "options": [
    "Through a larger upper opening",
    "Through a mammal’s mouth",
    "Through tree roots"
  ],
  "answer": 0,
  "explanation": "Arrows show water entering through small side openings and leaving through a larger upper opening. Sponges can filter particles from water; the depiction simplifies their body structure and does not show flow rates or all sponge forms.",
  "labels": [
    "Body",
    "Water route"
  ],
  "label": "Water route and body are highly simplified; shapes and opening configurations vary among sponges.",
  "shownLabel": "Water route and body are highly simplified; shapes and opening configurations vary among sponges. Arrows show water entering through small side openings and leaving through a larger upper opening. Sponges can filter particles from water; the depiction simplifies their body structure and does not show flow rates or all sponge forms."
};
export default function Demo({slug}:{slug:string}) {
 const [seen,setSeen]=useState([false,false]);
 const recorded=useRef([false,false]);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.options,answer:lesson.answer}} exploreHint="Open both states and compare what each shows." minInteractions={2} reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 340 170" className="stage-svg" role="img" aria-label={seen.every(Boolean)?lesson.shownLabel:seen.some(Boolean)?lesson.label + " Visible state: " + lesson.labels[seen[0] ? 0 : 1] + "." : "Both diagram states are hidden until you explore."}>
 <rect x="4" y="5" width="158" height="154" rx="12" fill="var(--bg-2)" stroke="var(--line)"/><rect x="178" y="5" width="158" height="154" rx="12" fill="var(--bg-2)" stroke="var(--line)"/>
 {seen[0] && <g transform="translate(12 9)"><path d="M32 106 Q27 44 46 30 H98 Q116 45 111 106 Z" fill="#cfbf95" stroke="var(--fg)" strokeWidth="3"/><ellipse cx="72" cy="29" rx="24" ry="8" fill="#9c9279"/><circle cx="46" cy="65" r="4" fill="#8e8a77"/><circle cx="98" cy="75" r="4" fill="#8e8a77"/></g>}{seen[1] && <g transform="translate(186 9)"><path d="M32 106 Q27 44 46 30 H98 Q116 45 111 106 Z" fill="#cfbf95" stroke="var(--fg)" strokeWidth="3"/><ellipse cx="72" cy="29" rx="24" ry="8" fill="#9c9279"/><path d="M5 68 H35 M26 60 L35 68 L26 76 M139 75 H110 M119 67 L110 75 L119 83 M72 31 V7 M64 15 L72 7 L80 15" fill="none" stroke="var(--fg)" strokeWidth="3"/></g>}
 {seen[0] && <text x="82" y="150" textAnchor="middle" fill="var(--fg)" fontSize="13">{lesson.labels[0]}</text>}{seen[1] && <text x="256" y="150" textAnchor="middle" fill="var(--fg)" fontSize="13">{lesson.labels[1]}</text>}
 </svg><Row><Control style={{minWidth:44,minHeight:44}} disabled={locked || seen[0]} onClick={()=>{if(recorded.current[0]) return; recorded.current[0]=true; setSeen(v=>[true,v[1]]);interact();}}>Open first</Control><Control style={{minWidth:44,minHeight:44}} disabled={locked || seen[1]} onClick={()=>{if(recorded.current[1]) return; recorded.current[1]=true; setSeen(v=>[v[0],true]);interact();}}>Open second</Control></Row></div>}
 </Lesson>;
}

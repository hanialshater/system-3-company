"use client";
import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const lesson = {
  "question": "In the life cycle of some jellyfish, which form lives attached to a surface?",
  "options": [
    "A polyp",
    "A medusa",
    "Every adult fish"
  ],
  "answer": 0,
  "explanation": "One panel shows an attached polyp and the other a free-swimming medusa. Some jellyfish life cycles include both, with intermediate stages omitted here; the diagram does not describe every jellyfish species.",
  "labels": [
    "One form",
    "Another form"
  ],
  "label": "Intermediate life-cycle stages, reproduction and species-specific variation are omitted.",
  "shownLabel": "Intermediate life-cycle stages, reproduction and species-specific variation are omitted. One panel shows an attached polyp and the other a free-swimming medusa. Some jellyfish life cycles include both, with intermediate stages omitted here; the diagram does not describe every jellyfish species."
};
export default function Demo({slug}:{slug:string}) {
 const [seen,setSeen]=useState([false,false]);
 const recorded=useRef([false,false]);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.options,answer:lesson.answer}} exploreHint="Open both states and compare what each shows." minInteractions={2} reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 340 170" className="stage-svg" role="img" aria-label={seen.every(Boolean)?lesson.shownLabel:seen.some(Boolean)?lesson.label + " Visible state: " + lesson.labels[seen[0] ? 0 : 1] + "." : "Both diagram states are hidden until you explore."}>
 <rect x="4" y="5" width="158" height="154" rx="12" fill="var(--bg-2)" stroke="var(--line)"/><rect x="178" y="5" width="158" height="154" rx="12" fill="var(--bg-2)" stroke="var(--line)"/>
 {seen[0] && <g transform="translate(12 9)"><path d="M12 108 H130" stroke="#8d8376" strokeWidth="6"/><path d="M59 106 V65 Q72 55 85 65 V106" fill="#d0a886" stroke="var(--fg)" strokeWidth="2"/><path d="M60 66 Q48 42 36 51 M67 62 L60 35 M77 62 L84 35 M84 66 Q96 42 108 51" stroke="var(--fg)" strokeWidth="3" fill="none"/><text x="72" y="26" fill="var(--fg)" textAnchor="middle" fontSize="13">Polyp</text></g>}{seen[1] && <g transform="translate(186 9)"><path d="M12 71 Q72 -4 132 71 Z" fill="#a7c5d5" stroke="var(--fg)" strokeWidth="2"/><path d="M39 70 L30 107 M72 70 V108 M104 70 L114 107" stroke="var(--fg)" strokeWidth="3"/><text x="72" y="28" fill="var(--fg)" textAnchor="middle" fontSize="13">Medusa</text></g>}
 {seen[0] && <text x="82" y="150" textAnchor="middle" fill="var(--fg)" fontSize="13">{lesson.labels[0]}</text>}{seen[1] && <text x="256" y="150" textAnchor="middle" fill="var(--fg)" fontSize="13">{lesson.labels[1]}</text>}
 </svg><Row><Control style={{minWidth:44,minHeight:44}} disabled={locked || seen[0]} onClick={()=>{if(recorded.current[0]) return; recorded.current[0]=true; setSeen(v=>[true,v[1]]);interact();}}>Open first</Control><Control style={{minWidth:44,minHeight:44}} disabled={locked || seen[1]} onClick={()=>{if(recorded.current[1]) return; recorded.current[1]=true; setSeen(v=>[v[0],true]);interact();}}>Open second</Control></Row></div>}
 </Lesson>;
}

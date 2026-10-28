"use client";
import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const lesson = {
  "question": "A sea star’s underside bears many small tube feet. What can these help the animal do?",
  "options": [
    "Move and grip a surface",
    "Form the feathers of a wing",
    "Turn its skeleton into a shell"
  ],
  "answer": 0,
  "explanation": "The second panel magnifies small tube feet extending from the underside of a sea star arm toward a surface. They can help with movement and attachment; the diagram does not model their coordination or speed.",
  "labels": [
    "Sea star",
    "Underside detail"
  ],
  "label": "The tube feet are enlarged, few in number and not a scale anatomical depiction.",
  "shownLabel": "The tube feet are enlarged, few in number and not a scale anatomical depiction. The second panel magnifies small tube feet extending from the underside of a sea star arm toward a surface. They can help with movement and attachment; the diagram does not model their coordination or speed."
};
export default function Demo({slug}:{slug:string}) {
 const [seen,setSeen]=useState([false,false]);
 const recorded=useRef([false,false]);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.options,answer:lesson.answer}} exploreHint="Open both states and compare what each shows." minInteractions={2} reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 340 170" className="stage-svg" role="img" aria-label={seen.every(Boolean)?lesson.shownLabel:seen.some(Boolean)?lesson.label + " Visible state: " + lesson.labels[seen[0] ? 0 : 1] + "." : "Both diagram states are hidden until you explore."}>
 <rect x="4" y="5" width="158" height="154" rx="12" fill="var(--bg-2)" stroke="var(--line)"/><rect x="178" y="5" width="158" height="154" rx="12" fill="var(--bg-2)" stroke="var(--line)"/>
 {seen[0] && <g transform="translate(12 9)"><path d="M72 8 L85 48 L128 48 L94 72 L107 111 L72 87 L37 111 L50 72 L16 48 L59 48 Z" fill="#d49a7e" stroke="var(--fg)" strokeWidth="3"/></g>}{seen[1] && <g transform="translate(186 9)"><path d="M18 38 Q70 18 124 38 L115 70 Q70 52 27 70 Z" fill="#d49a7e" stroke="var(--fg)" strokeWidth="3"/><path d="M34 67 L34 100 M51 63 L51 97 M68 61 L68 100 M85 63 L85 97 M102 67 L102 100" stroke="#c68f7a" strokeWidth="6"/><path d="M12 106 H130" stroke="var(--fg)" strokeWidth="3"/></g>}
 {seen[0] && <text x="82" y="150" textAnchor="middle" fill="var(--fg)" fontSize="13">{lesson.labels[0]}</text>}{seen[1] && <text x="256" y="150" textAnchor="middle" fill="var(--fg)" fontSize="13">{lesson.labels[1]}</text>}
 </svg><Row><Control style={{minWidth:44,minHeight:44}} disabled={locked || seen[0]} onClick={()=>{if(recorded.current[0]) return; recorded.current[0]=true; setSeen(v=>[true,v[1]]);interact();}}>Open first</Control><Control style={{minWidth:44,minHeight:44}} disabled={locked || seen[1]} onClick={()=>{if(recorded.current[1]) return; recorded.current[1]=true; setSeen(v=>[v[0],true]);interact();}}>Open second</Control></Row></div>}
 </Lesson>;
}

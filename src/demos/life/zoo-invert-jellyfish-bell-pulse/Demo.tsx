"use client";
import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const lesson = {
  "question": "In a simplified jellyfish swimming pulse, what does contraction of the bell push away?",
  "options": [
    "Water",
    "A rocky skeleton",
    "A set of leaves"
  ],
  "answer": 0,
  "explanation": "The broad bell and then the contracted bell illustrate part of a swimming pulse; the arrows indicate water pushed away. Jellyfish locomotion differs among species, and this is a schematic rather than a simulation of fluid flow.",
  "labels": [
    "Bell expanded",
    "Bell contracted"
  ],
  "label": "Bell geometry and water arrows are schematic; no flow speed or propulsion force is computed.",
  "shownLabel": "Bell geometry and water arrows are schematic; no flow speed or propulsion force is computed. The broad bell and then the contracted bell illustrate part of a swimming pulse; the arrows indicate water pushed away. Jellyfish locomotion differs among species, and this is a schematic rather than a simulation of fluid flow."
};
export default function Demo({slug}:{slug:string}) {
 const [seen,setSeen]=useState([false,false]);
 const recorded=useRef([false,false]);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.options,answer:lesson.answer}} exploreHint="Open both states and compare what each shows." minInteractions={2} reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 340 170" className="stage-svg" role="img" aria-label={seen.every(Boolean)?lesson.shownLabel:seen.some(Boolean)?lesson.label + " Visible state: " + lesson.labels[seen[0] ? 0 : 1] + "." : "Both diagram states are hidden until you explore."}>
 <rect x="4" y="5" width="158" height="154" rx="12" fill="var(--bg-2)" stroke="var(--line)"/><rect x="178" y="5" width="158" height="154" rx="12" fill="var(--bg-2)" stroke="var(--line)"/>
 {seen[0] && <g transform="translate(12 9)"><path d="M11 70 Q72 -10 133 70 Z" fill="#abc3d6" fillOpacity="0.7" stroke="var(--fg)" strokeWidth="3"/><path d="M37 69 Q20 92 34 108 M72 70 V110 M107 69 Q125 91 110 108" fill="none" stroke="#8ba8c7" strokeWidth="4"/></g>}{seen[1] && <g transform="translate(186 9)"><path d="M32 72 Q72 2 112 72 Z" fill="#abc3d6" fillOpacity="0.7" stroke="var(--fg)" strokeWidth="3"/><path d="M52 72 Q42 89 49 107 M72 72 V111 M92 72 Q103 90 95 108" fill="none" stroke="#8ba8c7" strokeWidth="4"/><path d="M21 79 V108 M14 100 L21 108 L28 100 M124 79 V108 M117 100 L124 108 L131 100" fill="none" stroke="var(--fg)" strokeWidth="3"/></g>}
 {seen[0] && <text x="82" y="150" textAnchor="middle" fill="var(--fg)" fontSize="13">{lesson.labels[0]}</text>}{seen[1] && <text x="256" y="150" textAnchor="middle" fill="var(--fg)" fontSize="13">{lesson.labels[1]}</text>}
 </svg><Row><Control style={{minWidth:44,minHeight:44}} disabled={locked || seen[0]} onClick={()=>{if(recorded.current[0]) return; recorded.current[0]=true; setSeen(v=>[true,v[1]]);interact();}}>Open first</Control><Control style={{minWidth:44,minHeight:44}} disabled={locked || seen[1]} onClick={()=>{if(recorded.current[1]) return; recorded.current[1]=true; setSeen(v=>[v[0],true]);interact();}}>Open second</Control></Row></div>}
 </Lesson>;
}

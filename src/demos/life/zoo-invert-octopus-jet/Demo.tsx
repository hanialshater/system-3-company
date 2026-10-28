"use client";
import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const lesson = {
  "question": "An octopus draws water into its mantle and then pushes water out through a siphon. What helps propel it in the opposite direction?",
  "options": [
    "Water expelled through the siphon",
    "A fixed anchor on the seabed",
    "A second shell opening"
  ],
  "answer": 0,
  "explanation": "The two panels show water entering the mantle and then leaving through the siphon. Expelling water contributes to jet propulsion; an octopus can also move in other ways. The arrows indicate a simplified direction, not a measurement.",
  "labels": [
    "Water in",
    "Water out"
  ],
  "label": "A schematic sequence: arrows are illustrative and no speed, force, or complete anatomy is measured.",
  "shownLabel": "A schematic sequence: arrows are illustrative and no speed, force, or complete anatomy is measured. The two panels show water entering the mantle and then leaving through the siphon. Expelling water contributes to jet propulsion; an octopus can also move in other ways. The arrows indicate a simplified direction, not a measurement."
};
export default function Demo({slug}:{slug:string}) {
 const [seen,setSeen]=useState([false,false]);
 const recorded=useRef([false,false]);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.options,answer:lesson.answer}} exploreHint="Open both states and compare what each shows." minInteractions={2} reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 340 170" className="stage-svg" role="img" aria-label={seen.every(Boolean)?lesson.shownLabel:seen.some(Boolean)?lesson.label + " Visible state: " + lesson.labels[seen[0] ? 0 : 1] + "." : "Both diagram states are hidden until you explore."}>
 <rect x="4" y="5" width="158" height="154" rx="12" fill="var(--bg-2)" stroke="var(--line)"/><rect x="178" y="5" width="158" height="154" rx="12" fill="var(--bg-2)" stroke="var(--line)"/>
 {seen[0] && <g transform="translate(12 9)"><ellipse cx="71" cy="52" rx="39" ry="29" fill="#d2a58f" stroke="var(--fg)" strokeWidth="2"/><circle cx="56" cy="58" r="3" fill="var(--fg)"/><circle cx="84" cy="58" r="3" fill="var(--fg)"/><path d="M43 74 Q21 83 16 74 M47 78 Q29 104 20 95 M56 79 Q43 108 35 99 M65 80 Q57 111 50 102 M76 80 Q76 111 70 102 M86 79 Q94 109 87 100 M94 77 Q110 101 103 93 M101 73 Q122 87 126 78" fill="none" stroke="#bc8977" strokeWidth="4"/><path d="M9 50 H28 M20 42 L28 50 L20 58" stroke="var(--fg)" strokeWidth="3" fill="none"/></g>}{seen[1] && <g transform="translate(186 9)"><ellipse cx="71" cy="52" rx="33" ry="25" fill="#d2a58f" stroke="var(--fg)" strokeWidth="2"/><circle cx="58" cy="56" r="3" fill="var(--fg)"/><circle cx="82" cy="56" r="3" fill="var(--fg)"/><path d="M44 72 Q25 82 18 74 M48 75 Q31 101 22 93 M56 77 Q44 107 36 98 M65 78 Q58 109 51 101 M75 78 Q76 109 70 101 M84 77 Q94 106 87 98 M92 75 Q106 100 102 92 M98 72 Q119 83 124 75" fill="none" stroke="#bc8977" strokeWidth="4"/><path d="M88 68 L112 74 L110 82 L87 78 Z" fill="#b97868" stroke="var(--fg)" strokeWidth="2"/><path d="M112 78 H138 M130 71 L138 78 L130 85 M43 25 H10 M18 18 L10 25 L18 32" stroke="var(--fg)" strokeWidth="3" fill="none"/><text x="21" y="14" fill="var(--fg)" fontSize="12">Animal</text><text x="106" y="106" fill="var(--fg)" fontSize="12">Water</text></g>}
 {seen[0] && <text x="82" y="150" textAnchor="middle" fill="var(--fg)" fontSize="13">{lesson.labels[0]}</text>}{seen[1] && <text x="256" y="150" textAnchor="middle" fill="var(--fg)" fontSize="13">{lesson.labels[1]}</text>}
 </svg><Row><Control style={{minWidth:44,minHeight:44}} disabled={locked || seen[0]} onClick={()=>{if(recorded.current[0]) return; recorded.current[0]=true; setSeen(v=>[true,v[1]]);interact();}}>Open first</Control><Control style={{minWidth:44,minHeight:44}} disabled={locked || seen[1]} onClick={()=>{if(recorded.current[1]) return; recorded.current[1]=true; setSeen(v=>[v[0],true]);interact();}}>Open second</Control></Row></div>}
 </Lesson>;
}

"use client";
import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const lesson = {
  "question": "A nautilus adjusts fluid in its shell chambers. In this simplified comparison, which state contains less chamber liquid?",
  "options": [
    "The state with more gas",
    "The state with more liquid",
    "Both contain the same liquid"
  ],
  "answer": 0,
  "explanation": "The panels stipulate two chamber states: blue indicates liquid and pale indicates gas. Replacing some liquid with gas changes overall buoyancy. The figure is schematic, omits the siphuncle and does not calculate depth or density.",
  "labels": [
    "More liquid",
    "More gas"
  ],
  "label": "Colored chamber states are invented qualitative illustrations, not observed chamber geometry or buoyancy measurements.",
  "shownLabel": "Colored chamber states are invented qualitative illustrations, not observed chamber geometry or buoyancy measurements. The panels stipulate two chamber states: blue indicates liquid and pale indicates gas. Replacing some liquid with gas changes overall buoyancy. The figure is schematic, omits the siphuncle and does not calculate depth or density."
};
export default function Demo({slug}:{slug:string}) {
 const [seen,setSeen]=useState([false,false]);
 const recorded=useRef([false,false]);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.options,answer:lesson.answer}} exploreHint="Open both states and compare what each shows." minInteractions={2} reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 340 170" className="stage-svg" role="img" aria-label={seen.every(Boolean)?lesson.shownLabel:seen.some(Boolean)?lesson.label + " Visible state: " + lesson.labels[seen[0] ? 0 : 1] + "." : "Both diagram states are hidden until you explore."}>
 <rect x="4" y="5" width="158" height="154" rx="12" fill="var(--bg-2)" stroke="var(--line)"/><rect x="178" y="5" width="158" height="154" rx="12" fill="var(--bg-2)" stroke="var(--line)"/>
 {seen[0] && <g transform="translate(12 9)"><circle cx="72" cy="65" r="50" fill="#8dbac8" stroke="var(--fg)" strokeWidth="3"/><path d="M72 16 V114 M22 65 H122 M37 30 L107 100 M37 100 L107 30" stroke="var(--fg)" strokeWidth="2"/></g>}{seen[1] && <g transform="translate(186 9)"><circle cx="72" cy="65" r="50" fill="#ebe3c6" stroke="var(--fg)" strokeWidth="3"/><path d="M72 16 V114 M22 65 H122 M37 30 L107 100 M37 100 L107 30" stroke="var(--fg)" strokeWidth="2"/><path d="M22 65 Q72 93 122 65 Q121 114 72 115 Q24 113 22 65" fill="#8dbac8" stroke="var(--fg)" strokeWidth="2"/></g>}
 {seen[0] && <text x="82" y="150" textAnchor="middle" fill="var(--fg)" fontSize="13">{lesson.labels[0]}</text>}{seen[1] && <text x="256" y="150" textAnchor="middle" fill="var(--fg)" fontSize="13">{lesson.labels[1]}</text>}
 </svg><Row><Control style={{minWidth:44,minHeight:44}} disabled={locked || seen[0]} onClick={()=>{if(recorded.current[0]) return; recorded.current[0]=true; setSeen(v=>[true,v[1]]);interact();}}>Open first</Control><Control style={{minWidth:44,minHeight:44}} disabled={locked || seen[1]} onClick={()=>{if(recorded.current[1]) return; recorded.current[1]=true; setSeen(v=>[v[0],true]);interact();}}>Open second</Control></Row></div>}
 </Lesson>;
}

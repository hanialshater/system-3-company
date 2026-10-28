"use client";
import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const lesson = {
  "question": "In the illustrated life cycle of a sea squirt, which stage has a tail used during a free-swimming phase?",
  "options": [
    "The larva",
    "The attached adult",
    "Both are plants"
  ],
  "answer": 0,
  "explanation": "The two panels show a free-swimming, tailed larva and an attached adult. Sea squirt larvae and adults differ in form; the diagram omits metamorphosis and does not imply all individuals are found in these states at once.",
  "labels": [
    "Larva",
    "Adult"
  ],
  "label": "A highly simplified comparison; intermediate stages, internal chordate structures and species differences are omitted.",
  "shownLabel": "A highly simplified comparison; intermediate stages, internal chordate structures and species differences are omitted. The two panels show a free-swimming, tailed larva and an attached adult. Sea squirt larvae and adults differ in form; the diagram omits metamorphosis and does not imply all individuals are found in these states at once."
};
export default function Demo({slug}:{slug:string}) {
 const [seen,setSeen]=useState([false,false]);
 const recorded=useRef([false,false]);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.options,answer:lesson.answer}} exploreHint="Open both states and compare what each shows." minInteractions={2} reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 340 170" className="stage-svg" role="img" aria-label={seen.every(Boolean)?lesson.shownLabel:seen.some(Boolean)?lesson.label + " Visible state: " + lesson.labels[seen[0] ? 0 : 1] + "." : "Both diagram states are hidden until you explore."}>
 <rect x="4" y="5" width="158" height="154" rx="12" fill="var(--bg-2)" stroke="var(--line)"/><rect x="178" y="5" width="158" height="154" rx="12" fill="var(--bg-2)" stroke="var(--line)"/>
 {seen[0] && <g transform="translate(12 9)"><ellipse cx="44" cy="65" rx="25" ry="16" fill="#b9a9c9" stroke="var(--fg)" strokeWidth="2"/><path d="M69 65 Q95 41 128 70 Q100 62 71 79" fill="#b9a9c9" stroke="var(--fg)" strokeWidth="2"/></g>}{seen[1] && <g transform="translate(186 9)"><path d="M15 109 H130" stroke="#8d8376" strokeWidth="6"/><path d="M43 107 Q26 57 47 35 Q60 24 72 35 Q85 24 97 35 Q118 58 101 107 Z" fill="#c2a9bf" stroke="var(--fg)" strokeWidth="2"/><path d="M52 30 V16 M89 30 V16" stroke="var(--fg)" strokeWidth="3"/></g>}
 {seen[0] && <text x="82" y="150" textAnchor="middle" fill="var(--fg)" fontSize="13">{lesson.labels[0]}</text>}{seen[1] && <text x="256" y="150" textAnchor="middle" fill="var(--fg)" fontSize="13">{lesson.labels[1]}</text>}
 </svg><Row><Control style={{minWidth:44,minHeight:44}} disabled={locked || seen[0]} onClick={()=>{if(recorded.current[0]) return; recorded.current[0]=true; setSeen(v=>[true,v[1]]);interact();}}>Open first</Control><Control style={{minWidth:44,minHeight:44}} disabled={locked || seen[1]} onClick={()=>{if(recorded.current[1]) return; recorded.current[1]=true; setSeen(v=>[v[0],true]);interact();}}>Open second</Control></Row></div>}
 </Lesson>;
}

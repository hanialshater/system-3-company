"use client";
import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const lesson = {
  "question": "A planarian has two simple eyespots. What can those structures help it detect?",
  "options": [
    "Light",
    "A complete written sentence",
    "Sounds from a speaker"
  ],
  "answer": 0,
  "explanation": "The highlighted spots represent simple light-detecting structures at the front of a planarian. The diagram does not show an image of the animal’s surroundings or claim the spots form vision like human eyes.",
  "labels": [
    "Body",
    "Eyespots"
  ],
  "label": "Eyepoints and light arrows are symbolic; species-specific responses and neural processing are not modeled.",
  "shownLabel": "Eyepoints and light arrows are symbolic; species-specific responses and neural processing are not modeled. The highlighted spots represent simple light-detecting structures at the front of a planarian. The diagram does not show an image of the animal’s surroundings or claim the spots form vision like human eyes."
};
export default function Demo({slug}:{slug:string}) {
 const [seen,setSeen]=useState([false,false]);
 const recorded=useRef([false,false]);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.options,answer:lesson.answer}} exploreHint="Open both states and compare what each shows." minInteractions={2} reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 340 170" className="stage-svg" role="img" aria-label={seen.every(Boolean)?lesson.shownLabel:seen.some(Boolean)?lesson.label + " Visible state: " + lesson.labels[seen[0] ? 0 : 1] + "." : "Both diagram states are hidden until you explore."}>
 <rect x="4" y="5" width="158" height="154" rx="12" fill="var(--bg-2)" stroke="var(--line)"/><rect x="178" y="5" width="158" height="154" rx="12" fill="var(--bg-2)" stroke="var(--line)"/>
 {seen[0] && <g transform="translate(12 9)"><path d="M19 103 Q18 38 72 19 Q126 38 125 103 Q72 117 19 103 Z" fill="#bdad9a" stroke="var(--fg)" strokeWidth="3"/></g>}{seen[1] && <g transform="translate(186 9)"><path d="M19 103 Q18 38 72 19 Q126 38 125 103 Q72 117 19 103 Z" fill="#bdad9a" stroke="var(--fg)" strokeWidth="3"/><circle cx="55" cy="46" r="5" fill="var(--fg)"/><circle cx="89" cy="46" r="5" fill="var(--fg)"/><path d="M11 12 L46 34 M37 23 L46 34 L32 34 M133 12 L98 34 M107 23 L98 34 L112 34" stroke="var(--fg)" strokeWidth="3" fill="none"/></g>}
 {seen[0] && <text x="82" y="150" textAnchor="middle" fill="var(--fg)" fontSize="13">{lesson.labels[0]}</text>}{seen[1] && <text x="256" y="150" textAnchor="middle" fill="var(--fg)" fontSize="13">{lesson.labels[1]}</text>}
 </svg><Row><Control style={{minWidth:44,minHeight:44}} disabled={locked || seen[0]} onClick={()=>{if(recorded.current[0]) return; recorded.current[0]=true; setSeen(v=>[true,v[1]]);interact();}}>Open first</Control><Control style={{minWidth:44,minHeight:44}} disabled={locked || seen[1]} onClick={()=>{if(recorded.current[1]) return; recorded.current[1]=true; setSeen(v=>[v[0],true]);interact();}}>Open second</Control></Row></div>}
 </Lesson>;
}

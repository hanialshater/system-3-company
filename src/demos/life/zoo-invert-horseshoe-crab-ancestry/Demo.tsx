"use client";
import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const lesson = {
  "question": "On a simplified arthropod tree, which pair belongs together among the chelicerates?",
  "options": [
    "Horseshoe crabs and spiders",
    "Horseshoe crabs and true crabs",
    "Spiders and true crabs"
  ],
  "answer": 0,
  "explanation": "The simplified branch joins horseshoe crabs with spiders, while true crabs lie on a separate branch in this comparison. Shared ancestry is not a claim that one living animal is the ancestor of another, and the tree omits many groups.",
  "labels": [
    "Groups",
    "Branching"
  ],
  "label": "Simplified phylogeny; many arthropod groups and divergence dates are omitted.",
  "shownLabel": "Simplified phylogeny; many arthropod groups and divergence dates are omitted. The simplified branch joins horseshoe crabs with spiders, while true crabs lie on a separate branch in this comparison. Shared ancestry is not a claim that one living animal is the ancestor of another, and the tree omits many groups."
};
export default function Demo({slug}:{slug:string}) {
 const [seen,setSeen]=useState([false,false]);
 const recorded=useRef([false,false]);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.options,answer:lesson.answer}} exploreHint="Open both states and compare what each shows." minInteractions={2} reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 340 170" className="stage-svg" role="img" aria-label={seen.every(Boolean)?lesson.shownLabel:seen.some(Boolean)?lesson.label + " Visible state: " + lesson.labels[seen[0] ? 0 : 1] + "." : "Both diagram states are hidden until you explore."}>
 <rect x="4" y="5" width="158" height="154" rx="12" fill="var(--bg-2)" stroke="var(--line)"/><rect x="178" y="5" width="158" height="154" rx="12" fill="var(--bg-2)" stroke="var(--line)"/>
 {seen[0] && <g transform="translate(12 9)"><text x="10" y="30" fill="var(--fg)" fontSize="12">True crab</text><text x="10" y="70" fill="var(--fg)" fontSize="12">Spider</text><text x="10" y="110" fill="var(--fg)" fontSize="12">Horseshoe crab</text></g>}{seen[1] && <g transform="translate(186 9)"><path d="M8 65 H30 M30 22 V102 M30 22 H65 M30 102 H48 M48 62 V102 M48 62 H65 M48 102 H65" fill="none" stroke="var(--fg)" strokeWidth="3"/><text x="69" y="26" fill="var(--fg)" fontSize="12">Crab</text><text x="69" y="66" fill="var(--fg)" fontSize="12">Spider</text><text x="69" y="106" fill="var(--fg)" fontSize="12">Horseshoe</text></g>}
 {seen[0] && <text x="82" y="150" textAnchor="middle" fill="var(--fg)" fontSize="13">{lesson.labels[0]}</text>}{seen[1] && <text x="256" y="150" textAnchor="middle" fill="var(--fg)" fontSize="13">{lesson.labels[1]}</text>}
 </svg><Row><Control style={{minWidth:44,minHeight:44}} disabled={locked || seen[0]} onClick={()=>{if(recorded.current[0]) return; recorded.current[0]=true; setSeen(v=>[true,v[1]]);interact();}}>Open first</Control><Control style={{minWidth:44,minHeight:44}} disabled={locked || seen[1]} onClick={()=>{if(recorded.current[1]) return; recorded.current[1]=true; setSeen(v=>[v[0],true]);interact();}}>Open second</Control></Row></div>}
 </Lesson>;
}

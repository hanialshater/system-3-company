"use client";
import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const model = {
  "question": "In this simplified wear comparison, which tooth has more crown material above the root to wear down?",
  "options": [
    "Both have equal crowns",
    "The taller-crowned tooth",
    "The shorter-crowned tooth"
  ],
  "answer": 1,
  "explanation": "The taller crown extends farther above the marked root boundary in this toy comparison. High-crowned teeth can provide more material to wear down in some grazing mammals; actual wear and tooth growth differ among species.",
  "labels": [
    "Short crown",
    "Tall crown"
  ],
  "base": "",
  "one": "<path d=\"M41 88 Q40 54 59 54 Q78 54 77 88 L70 116 L60 99 L50 116 Z\" fill=\"#eee2c3\" stroke=\"#8d795b\" stroke-width=\"3\"/><path d=\"M35 88 H84\" stroke=\"#cb7c58\" stroke-width=\"3\"/>",
  "two": "<path d=\"M41 88 L41 34 Q41 23 59 23 Q77 23 77 34 L77 88 L70 116 L60 99 L50 116 Z\" fill=\"#eee2c3\" stroke=\"#8d795b\" stroke-width=\"3\"/><path d=\"M35 88 H84\" stroke=\"#cb7c58\" stroke-width=\"3\"/>"
};
export default function Demo({slug}:{slug:string}) {
 const [seen,setSeen]=useState([false,false]); const seenRef=useRef([false,false]);
 const open=(n:number,interact:()=>void)=>{if(seenRef.current[n])return;seenRef.current[n]=true;setSeen([...seenRef.current]);interact();};
 return <Lesson slug={slug} predict={{question:model.question,options:model.options,answer:model.answer}} exploreHint="Open both evidence views; compare what each drawing shows." minInteractions={2} reveal={()=><p>{model.explanation}</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 340 175" className="stage-svg" role="img" aria-label={seen[0] && seen[1] ? model.explanation : `${seen[0] ? model.labels[0] : "First view hidden"}. ${seen[1] ? model.labels[1] : "Second view hidden"}.`}>
  <rect x="5" y="8" width="155" height="150" rx="12" fill="var(--bg-2)" stroke="var(--line)"/><rect x="180" y="8" width="155" height="150" rx="12" fill="var(--bg-2)" stroke="var(--line)"/>
  {seen[0] && <g transform="translate(5 10)"><g dangerouslySetInnerHTML={{__html:model.base}}/><g dangerouslySetInnerHTML={{__html:model.one}}/><text x="78" y="142" textAnchor="middle" fill="var(--fg)" fontSize="12">{model.labels[0]}</text></g>}
  {seen[1] && <g transform="translate(180 10)"><g dangerouslySetInnerHTML={{__html:model.base}}/><g dangerouslySetInnerHTML={{__html:model.two}}/><text x="78" y="142" textAnchor="middle" fill="var(--fg)" fontSize="12">{model.labels[1]}</text></g>}
  {!seen[0] && <text x="82" y="89" textAnchor="middle" fill="var(--muted)" fontSize="24">?</text>}{!seen[1] && <text x="257" y="89" textAnchor="middle" fill="var(--muted)" fontSize="24">?</text>}
 </svg><Row><Control style={{minWidth:44,minHeight:44}} disabled={locked || seen[0]} onClick={()=>open(0,interact)}>Open first view</Control><Control style={{minWidth:44,minHeight:44}} disabled={locked || seen[1]} onClick={()=>open(1,interact)}>Open second view</Control></Row><p style={{fontSize:"0.8rem",color:"var(--muted)",textAlign:"center",margin:"4px 0"}}>Conceptual drawing · not to scale</p></div>}
 </Lesson>;
}

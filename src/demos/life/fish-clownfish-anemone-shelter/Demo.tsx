"use client";
import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const model = {
  "question": "In this illustrated association, where does the clownfish find shelter?",
  "options": [
    "Among an anemone’s tentacles",
    "Inside a borrowed snail shell",
    "In a seabird nest"
  ],
  "answer": 0,
  "explanation": "The second view places a stylized clownfish among an anemone’s tentacles. Clownfishes can shelter in association with sea anemones; the details and benefits of an association vary, and this drawing does not explain the full physiology of contact.",
  "labels": [
    "Anemone tentacles",
    "Fish among them"
  ],
  "base": "<path d=\"M28 123 Q30 111 38 99 Q39 78 25 60 M48 123 Q49 100 43 71 Q41 56 50 42 M68 123 Q68 99 61 72 Q58 56 64 39 M88 123 Q88 100 95 75 Q103 58 95 42 M108 123 Q107 103 118 84 Q130 68 119 56 M128 123 Q131 105 142 91\" fill=\"none\" stroke=\"#9e78a6\" stroke-width=\"7\" stroke-linecap=\"round\"/><path d=\"M22 123 H138\" stroke=\"#8b7386\" stroke-width=\"6\"/>",
  "one": "<circle cx=\"25\" cy=\"60\" r=\"4\" fill=\"#ceb5cf\"/><circle cx=\"64\" cy=\"39\" r=\"4\" fill=\"#ceb5cf\"/><circle cx=\"95\" cy=\"42\" r=\"4\" fill=\"#ceb5cf\"/>",
  "two": "<path d=\"M57 91 Q70 73 91 78 Q101 80 106 89 Q99 99 88 101 Q68 104 57 91 Z M59 91 L48 83 L49 99 Z\" fill=\"#df965e\" stroke=\"#916644\" stroke-width=\"2\"/><path d=\"M72 80 L74 100 M88 79 L90 99\" stroke=\"#f7efdb\" stroke-width=\"5\"/><circle cx=\"98\" cy=\"87\" r=\"2\" fill=\"#333\"/>"
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

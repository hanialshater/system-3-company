"use client";
import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const model = {
  "question": "Which pictured motion best represents a shearing pair of carnassial teeth?",
  "options": [
    "Two edges pass alongside",
    "Two flat faces press together",
    "Two points stay apart"
  ],
  "answer": 0,
  "explanation": "The two pointed edges pass beside one another in the simplified drawing, like shears. Carnassial teeth in many carnivorans have edges suited to cutting; the schematic does not show all tooth positions or a measured bite.",
  "labels": [
    "Edges approach",
    "Edges pass"
  ],
  "base": "<path d=\"M26 33 H125 M26 119 H125\" stroke=\"#968a76\" stroke-width=\"4\"/>",
  "one": "<path d=\"M37 39 L81 39 L66 77 L44 65 Z M107 111 L63 111 L78 78 L99 89 Z\" fill=\"#eadfc5\" stroke=\"#8b765b\" stroke-width=\"3\"/>",
  "two": "<path d=\"M37 39 L81 39 L72 91 L49 79 Z M107 111 L63 111 L72 59 L95 71 Z\" fill=\"#eadfc5\" stroke=\"#8b765b\" stroke-width=\"3\"/><path d=\"M36 92 L48 80 M107 58 L95 70\" stroke=\"#ce7858\" stroke-width=\"3\"/>"
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

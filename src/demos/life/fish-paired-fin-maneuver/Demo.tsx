"use client";
import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const model = {
  "question": "The pictured fish adjusts a fin just behind its head. Which fins can help many fish maneuver?",
  "options": [
    "A single tail fin",
    "A single dorsal fin",
    "Paired pectoral fins"
  ],
  "answer": 2,
  "explanation": "The colored fin behind the head changes orientation in this schematic. Paired pectoral fins can help many fishes maneuver and stabilize; fin use depends on the species and movement. The curved arrow illustrates a possible turn, not a measured path.",
  "labels": [
    "Fins at side",
    "Fins adjusted"
  ],
  "base": "<path d=\"M21 76 Q48 39 109 52 Q135 58 143 75 Q130 92 109 98 Q48 112 21 76 Z M23 76 L5 61 L8 93 Z\" fill=\"#83b5c7\" stroke=\"#526f7b\" stroke-width=\"3\"/><circle cx=\"125\" cy=\"67\" r=\"3\" fill=\"#263c43\"/><circle cx=\"125\" cy=\"84\" r=\"3\" fill=\"#263c43\"/>",
  "one": "<path d=\"M112 70 Q93 65 86 49 Q99 57 112 64 Z M112 81 Q93 86 86 103 Q99 95 112 87 Z\" fill=\"#d5ab70\" stroke=\"#86694b\" stroke-width=\"3\"/>",
  "two": "<path d=\"M112 70 Q93 65 86 49 Q99 57 112 64 Z M112 81 Q90 91 88 112 Q100 98 113 87 Z\" fill=\"#d5ab70\" stroke=\"#86694b\" stroke-width=\"3\"/><path d=\"M54 115 Q39 106 36 95 M42 99 L36 94 L34 102\" fill=\"none\" stroke=\"#dd9670\" stroke-width=\"3\"/>"
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

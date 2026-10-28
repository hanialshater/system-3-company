"use client";
import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const model = {
  "question": "How can an archerfish dislodge an insect on vegetation above the surface?",
  "options": [
    "By directing a water jet",
    "By throwing a pebble with its tail",
    "By breathing fire"
  ],
  "answer": 0,
  "explanation": "The schematic jet runs from the fish toward the insect above the water. Archerfishes can shoot water at prey on vegetation; this drawing exaggerates the path and does not predict accuracy, distance or a particular outcome.",
  "labels": [
    "Insect above water",
    "Water jet"
  ],
  "base": "<path d=\"M8 82 H147\" stroke=\"#81bed0\" stroke-width=\"4\"/><path d=\"M33 109 Q54 91 83 97 Q103 100 112 111 Q92 119 67 120 Q45 121 33 109 Z\" fill=\"#aabfc1\" stroke=\"#667d7e\" stroke-width=\"3\"/><path d=\"M34 109 L19 99 L20 119 Z\" fill=\"#aabfc1\" stroke=\"#667d7e\" stroke-width=\"3\"/><path d=\"M120 82 V15\" stroke=\"#82a970\" stroke-width=\"5\"/><path d=\"M118 30 Q99 22 95 34\" stroke=\"#82a970\" stroke-width=\"3\" fill=\"none\"/>",
  "one": "<circle cx=\"105\" cy=\"33\" r=\"5\" fill=\"#8a694a\"/><path d=\"M100 27 L96 22 M110 27 L114 22\" stroke=\"#8a694a\" stroke-width=\"2\"/>",
  "two": "<circle cx=\"105\" cy=\"33\" r=\"5\" fill=\"#8a694a\"/><path d=\"M109 103 Q110 69 105 39\" stroke=\"#5aaccb\" stroke-width=\"4\" fill=\"none\"/><path d=\"M100 47 L105 37 L110 48\" stroke=\"#5aaccb\" stroke-width=\"3\" fill=\"none\"/>"
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

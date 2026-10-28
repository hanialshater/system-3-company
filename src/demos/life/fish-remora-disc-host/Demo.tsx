"use client";
import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const model = {
  "question": "Which structure is used by a remora to attach to a host in this schematic?",
  "options": [
    "A suction disc on its head",
    "A clasp at the end of its tail",
    "A beak on its belly"
  ],
  "answer": 0,
  "explanation": "The small remora approaches and its head disc is shown contacting the larger animal. Remoras use a modified disc on top of the head to attach to hosts; the picture is a simplified arrangement and does not measure attachment force.",
  "labels": [
    "Remora approaches",
    "Disc contacts host"
  ],
  "base": "<path d=\"M8 35 Q43 10 102 18 Q134 23 146 48 Q115 70 60 72 Q29 69 8 54 Z\" fill=\"#9dbbc0\" stroke=\"#607e84\" stroke-width=\"3\"/><path d=\"M10 44 L1 32 V60 Z\" fill=\"#9dbbc0\" stroke=\"#607e84\" stroke-width=\"3\"/>",
  "one": "<path d=\"M45 101 Q60 92 83 98 Q92 101 96 106 Q80 112 61 110 L45 101 Z M46 101 L36 95 L37 107 Z\" fill=\"#b18f78\" stroke=\"#6d594c\" stroke-width=\"2\"/><circle cx=\"87\" cy=\"104\" r=\"2\" fill=\"#263c43\"/><path d=\"M72 93 H89\" stroke=\"#e3c77e\" stroke-width=\"5\" stroke-linecap=\"round\"/>",
  "two": "<path d=\"M45 82 Q60 73 83 79 Q92 82 96 87 Q80 93 61 91 L45 82 Z M46 82 L36 76 L37 88 Z\" fill=\"#b18f78\" stroke=\"#6d594c\" stroke-width=\"2\"/><circle cx=\"87\" cy=\"85\" r=\"2\" fill=\"#263c43\"/><path d=\"M73 73 H89\" stroke=\"#e3c77e\" stroke-width=\"5\" stroke-linecap=\"round\"/><path d=\"M80 72 V68\" stroke=\"#e3c77e\" stroke-width=\"2\"/>"
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

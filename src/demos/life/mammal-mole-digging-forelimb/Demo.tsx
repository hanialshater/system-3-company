"use client";
import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const model = {
  "question": "Which forelimb feature is useful in this mole-digging sketch?",
  "options": [
    "A thin wing membrane",
    "A hoof with no digits shown",
    "A broad outward-facing hand with claws"
  ],
  "answer": 2,
  "explanation": "The broad forelimb and claws meet the soil in the schematic. Many moles have powerful forelimbs adapted for digging, though limb proportions differ across species. This picture does not measure digging force.",
  "labels": [
    "Forelimb outline",
    "Claw and soil"
  ],
  "base": "<ellipse cx=\"72\" cy=\"71\" rx=\"46\" ry=\"27\" fill=\"#a8988e\" stroke=\"#675b58\" stroke-width=\"3\"/><path d=\"M109 65 Q134 66 142 78 L112 85 Z\" fill=\"#a8988e\" stroke=\"#675b58\" stroke-width=\"3\"/><circle cx=\"114\" cy=\"71\" r=\"2\" fill=\"#222\"/><path d=\"M50 81 Q29 76 19 89 Q25 103 47 103 L62 90 Z\" fill=\"#cab5a2\" stroke=\"#675b58\" stroke-width=\"3\"/>",
  "one": "<path d=\"M50 81 Q29 76 19 89 Q25 103 47 103 L62 90 Z\" fill=\"#cab5a2\" stroke=\"#675b58\" stroke-width=\"3\"/>",
  "two": "<path d=\"M22 90 L10 85 M24 95 L9 95 M26 100 L14 106\" stroke=\"#eadbbd\" stroke-width=\"4\" stroke-linecap=\"round\"/><path d=\"M4 112 H145\" stroke=\"#9d795b\" stroke-width=\"5\"/>"
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

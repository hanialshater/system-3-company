"use client";
import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const model = {
  "question": "What can change an elephant trunk’s shape without a trunk bone?",
  "options": [
    "A hard hinged shell",
    "Coordinated muscles",
    "A row of finger bones"
  ],
  "answer": 1,
  "explanation": "The highlighted muscle directions and curved path represent a flexible muscular trunk. Coordinated muscles can change its shape without bones inside the trunk. The diagram is schematic and does not map all the muscle groups.",
  "labels": [
    "Muscle directions",
    "A bend"
  ],
  "base": "<ellipse cx=\"64\" cy=\"53\" rx=\"31\" ry=\"31\" fill=\"#9caaa5\" stroke=\"#64716d\" stroke-width=\"2\"/><ellipse cx=\"49\" cy=\"53\" rx=\"19\" ry=\"27\" fill=\"#839793\" stroke=\"#64716d\" stroke-width=\"2\"/><path d=\"M83 40 Q105 29 117 51 L121 70\" fill=\"none\" stroke=\"#9caaa5\" stroke-width=\"23\" stroke-linecap=\"round\"/><path d=\"M99 70 Q105 86 115 84\" fill=\"none\" stroke=\"#efe6d4\" stroke-width=\"5\"/><circle cx=\"96\" cy=\"52\" r=\"3\" fill=\"#27302f\"/>",
  "one": "<path d=\"M121 68 Q120 96 117 122\" fill=\"none\" stroke=\"#9caaa5\" stroke-width=\"21\" stroke-linecap=\"round\"/><path d=\"M115 73 Q114 96 111 113 M124 75 Q123 99 120 116\" fill=\"none\" stroke=\"#d37c6c\" stroke-width=\"3\"/>",
  "two": "<path d=\"M121 68 Q96 85 98 105 Q99 117 113 122\" fill=\"none\" stroke=\"#9caaa5\" stroke-width=\"21\" stroke-linecap=\"round\"/><path d=\"M126 102 Q128 114 120 119 M122 111 L119 120 L128 119\" fill=\"none\" stroke=\"#c37a36\" stroke-width=\"4\"/>"
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

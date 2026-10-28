"use client";
import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const model = {
  "question": "In this illustrated encounter, what can a striped skunk show before spraying?",
  "options": [
    "A contrasting coat",
    "The cloud from that spray",
    "A hinged shell"
  ],
  "answer": 0,
  "explanation": "The first view shows the contrasting pattern; the second adds a possible spray. A striped skunk can display warning cues before using chemical defense, but not every encounter follows one fixed sequence. This is a schematic illustration.",
  "labels": [
    "Visible pattern",
    "Possible spray"
  ],
  "base": "<path d=\"M25 90 Q35 60 74 67 Q103 65 118 81 Q125 93 114 101 L39 101 Z\" fill=\"#343941\" stroke=\"#aeb8be\" stroke-width=\"3\"/><path d=\"M34 72 Q11 51 28 22 Q39 14 43 23 Q28 42 49 66\" fill=\"#343941\" stroke=\"#aeb8be\" stroke-width=\"3\"/><path d=\"M43 72 Q65 68 100 76 M31 28 Q24 44 39 60\" fill=\"none\" stroke=\"#eee\" stroke-width=\"5\"/>",
  "one": "<path d=\"M43 72 Q65 68 100 76 M31 28 Q24 44 39 60\" fill=\"none\" stroke=\"#eee\" stroke-width=\"5\"/>",
  "two": "<path d=\"M119 77 Q131 67 145 73 M119 88 Q134 85 149 91 M120 98 Q134 104 146 111\" stroke=\"#d7b76f\" stroke-width=\"3\" fill=\"none\"/>"
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

"use client";
import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const model = {
  "question": "In some anglerfishes, what structure is used to attract prey toward the fish?",
  "options": [
    "A plant root attached to the gills",
    "A lure extending from the head",
    "A second tail at the mouth"
  ],
  "answer": 1,
  "explanation": "The line and circle highlight a lure extending from the fish’s head region. Some anglerfishes use a modified dorsal-fin structure as a lure; species vary, and the drawing does not show a verified encounter or how the lure produces light.",
  "labels": [
    "Fish outline",
    "Lure extends"
  ],
  "base": "<path d=\"M16 85 Q30 51 82 57 Q122 61 140 89 L123 99 Q83 116 34 105 Z\" fill=\"#927c85\" stroke=\"#695964\" stroke-width=\"3\"/><path d=\"M128 78 L104 81 L128 92\" fill=\"#1d2830\" stroke=\"#695964\" stroke-width=\"2\"/><circle cx=\"105\" cy=\"72\" r=\"3\" fill=\"#f5ead1\"/>",
  "one": "<path d=\"M46 58 Q71 46 89 57\" fill=\"none\" stroke=\"#695964\" stroke-width=\"3\"/>",
  "two": "<path d=\"M81 59 Q94 17 119 25 Q135 31 133 45\" fill=\"none\" stroke=\"#d1ae7a\" stroke-width=\"4\"/><circle cx=\"133\" cy=\"46\" r=\"7\" fill=\"#f0d993\" stroke=\"#b69663\" stroke-width=\"2\"/>"
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

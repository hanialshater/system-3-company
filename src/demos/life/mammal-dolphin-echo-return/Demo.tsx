"use client";
import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const model = {
  "question": "In this underwater model, what reaches the dolphin after its sound encounters an object?",
  "options": [
    "A second solid object",
    "A returning echo",
    "A beam of visible light emitted by the dolphin"
  ],
  "answer": 1,
  "explanation": "One arrow traces an outgoing sound and the other its return after encountering the object. Dolphins use echoes to locate objects underwater. This diagram omits the sound-production anatomy and does not model travel time.",
  "labels": [
    "Sound outward",
    "Echo returns"
  ],
  "base": "<path d=\"M20 76 Q47 48 82 62 Q100 68 107 78 Q93 75 84 82 Q51 93 20 76 Z\" fill=\"#8bb7ca\" stroke=\"#425c69\" stroke-width=\"3\"/><path d=\"M23 76 L10 73 L10 79 Z\" fill=\"#8bb7ca\" stroke=\"#425c69\" stroke-width=\"3\"/><circle cx=\"128\" cy=\"75\" r=\"13\" fill=\"#bca789\" stroke=\"#796d59\" stroke-width=\"3\"/>",
  "one": "<path d=\"M91 55 Q110 41 127 52 M117 49 L128 52 L122 61\" stroke=\"#d7a356\" stroke-width=\"3\" fill=\"none\"/>",
  "two": "<path d=\"M127 97 Q108 111 91 98 M101 101 L90 98 L97 89\" stroke=\"#72bca8\" stroke-width=\"3\" fill=\"none\"/>"
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

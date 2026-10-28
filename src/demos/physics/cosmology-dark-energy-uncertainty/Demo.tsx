"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { CosmologyScene, type CosmosCase } from "@/components/cosmology/CosmologyLesson";
const lesson: CosmosCase = {
  "slug": "cosmology-dark-energy-uncertainty",
  "title": "Can the cause change?",
  "group": "energy",
  "question": "Do observations already prove exactly what dark energy is?",
  "choices": [
    "Yes: it is known to be ordinary dust",
    "Yes: its cause was photographed directly",
    "No: its physical nature remains uncertain"
  ],
  "correct": 2,
  "explanation": "Several observations support accelerated expansion, but its underlying physical explanation remains uncertain. Models include a cosmological constant and alternatives that scientists test.",
  "before": "Explore this cosmic model",
  "after": "Acceleration, cause unknown",
  "focus": 4
};
export default function Demo({slug}:{slug:string}) {
 const [shown,setShown]=useState(false);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.choices,answer:lesson.correct}} exploreHint="Move from the first view to the next and inspect what changes." reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><CosmologyScene lesson={lesson} shown={shown}/><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>Explore the model</Control></Row><p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>{lesson.group==='cmb'?'Color contrast exaggerated':lesson.group==='structure'?'3D projection · schematic':'Illustration · not to scale'}</p></div>}
 </Lesson>;
}

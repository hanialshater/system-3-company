"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { CosmologyScene, type CosmosCase } from "@/components/cosmology/CosmologyLesson";
const lesson: CosmosCase = {
  "slug": "cosmology-cmb-snapshot-time",
  "title": "A snapshot of an epoch",
  "group": "cmb",
  "question": "What does a map of the cosmic microwave background primarily show?",
  "choices": [
    "Conditions when early radiation began traveling freely",
    "A live map of present-day galaxies",
    "The surface of the Sun today"
  ],
  "correct": 0,
  "explanation": "The CMB carries information from the era when light decoupled from matter in the early universe. It is a snapshot of that distant past, not a live map of today's sky objects.",
  "before": "Explore this cosmic model",
  "after": "A view of the early cosmos",
  "focus": 6
};
export default function Demo({slug}:{slug:string}) {
 const [shown,setShown]=useState(false);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.choices,answer:lesson.correct}} exploreHint="Move from the first view to the next and inspect what changes." reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><CosmologyScene lesson={lesson} shown={shown}/><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>Explore the model</Control></Row><p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>{lesson.group==='cmb'?'Color contrast exaggerated':lesson.group==='structure'?'3D projection · schematic':'Illustration · not to scale'}</p></div>}
 </Lesson>;
}

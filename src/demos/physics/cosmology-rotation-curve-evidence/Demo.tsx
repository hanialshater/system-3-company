"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { CosmologyScene, type CosmosCase } from "@/components/cosmology/CosmologyLesson";
const lesson: CosmosCase = {
  "slug": "cosmology-rotation-curve-evidence",
  "title": "A galaxy's outer stars",
  "group": "dark",
  "question": "Why did galaxy rotation measurements become evidence for unseen mass?",
  "choices": [
    "Outer stars have no gravity",
    "Galaxies have no stars outside their centers",
    "Outer stars move faster than expected from visible matter alone"
  ],
  "correct": 2,
  "explanation": "Observed rotation patterns in galaxies indicate more gravitational mass than the visible matter alone accounts for in standard models. Dark matter is a leading explanation.",
  "before": "Explore this cosmic model",
  "after": "Outer rotation needs mass",
  "focus": 1
};
export default function Demo({slug}:{slug:string}) {
 const [shown,setShown]=useState(false);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.choices,answer:lesson.correct}} exploreHint="Move from the first view to the next and inspect what changes." reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><CosmologyScene lesson={lesson} shown={shown}/><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>Explore the model</Control></Row><p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>{lesson.group==='cmb'?'Color contrast exaggerated':lesson.group==='structure'?'3D projection · schematic':'Illustration · not to scale'}</p></div>}
 </Lesson>;
}

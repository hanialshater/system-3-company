"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { CosmologyScene, type CosmosCase } from "@/components/cosmology/CosmologyLesson";
const lesson: CosmosCase = {
  "slug": "cosmology-expansion-versus-speed",
  "title": "Growth is not acceleration",
  "group": "expansion",
  "question": "What is the difference between cosmic expansion and accelerated expansion?",
  "choices": [
    "Acceleration means all galaxies are slowing locally",
    "Acceleration means the expansion rate of a given separation increases over time",
    "They mean exactly the same thing"
  ],
  "correct": 1,
  "explanation": "Expansion means cosmic scale grows. Accelerated expansion adds a further claim: the scale factor's rate of increase grows over time, as inferred from observations.",
  "before": "Explore this cosmic model",
  "after": "Expansion can accelerate",
  "focus": 8
};
export default function Demo({slug}:{slug:string}) {
 const [shown,setShown]=useState(false);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.choices,answer:lesson.correct}} exploreHint="Move from the first view to the next and inspect what changes." reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><CosmologyScene lesson={lesson} shown={shown}/><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>Explore the model</Control></Row><p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>{lesson.group==='cmb'?'Color contrast exaggerated':lesson.group==='structure'?'3D projection · schematic':'Illustration · not to scale'}</p></div>}
 </Lesson>;
}

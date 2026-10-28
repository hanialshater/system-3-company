"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { CosmologyScene, type CosmosCase } from "@/components/cosmology/CosmologyLesson";
const lesson: CosmosCase = {
  "slug": "cosmology-uniform-expansion-ratio",
  "title": "Two gaps on a grid",
  "group": "expansion",
  "question": "In a uniform-expansion model, both gaps grow by the same factor. Which gap gains more absolute distance?",
  "choices": [
    "The initially smaller gap",
    "Both gain the same absolute distance",
    "The initially larger gap"
  ],
  "correct": 2,
  "explanation": "When every separation is multiplied by the same scale factor, a larger initial separation has a larger absolute increase. The proportional change is the same for both gaps.",
  "before": "Explore this cosmic model",
  "after": "Same factor, larger gain",
  "focus": 4
};
export default function Demo({slug}:{slug:string}) {
 const [shown,setShown]=useState(false);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.choices,answer:lesson.correct}} exploreHint="Move from the first view to the next and inspect what changes." reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><CosmologyScene lesson={lesson} shown={shown}/><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>Explore the model</Control></Row><p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>{lesson.group==='cmb'?'Color contrast exaggerated':lesson.group==='structure'?'3D projection · schematic':'Illustration · not to scale'}</p></div>}
 </Lesson>;
}

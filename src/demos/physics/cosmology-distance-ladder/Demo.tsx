"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { CosmologyScene, type CosmosCase } from "@/components/cosmology/CosmologyLesson";
const lesson: CosmosCase = {
  "slug": "cosmology-distance-ladder",
  "title": "A chain of distances",
  "group": "methods",
  "question": "Why do astronomers speak of a cosmic distance ladder?",
  "choices": [
    "Every distance is measured by the same method with no uncertainty",
    "Different methods calibrate one another across distance ranges",
    "A single ruler can be physically placed across the universe"
  ],
  "correct": 1,
  "explanation": "Different distance techniques work over different ranges. Nearby measurements can calibrate methods that extend farther, forming a chain of related measurements.",
  "before": "Explore this cosmic model",
  "after": "Near methods calibrate far",
  "focus": 2
};
export default function Demo({slug}:{slug:string}) {
 const [shown,setShown]=useState(false);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.choices,answer:lesson.correct}} exploreHint="Move from the first view to the next and inspect what changes." reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><CosmologyScene lesson={lesson} shown={shown}/><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>Explore the model</Control></Row><p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>{lesson.group==='cmb'?'Color contrast exaggerated':lesson.group==='structure'?'3D projection · schematic':'Illustration · not to scale'}</p></div>}
 </Lesson>;
}

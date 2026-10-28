"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { CosmologyScene, type CosmosCase } from "@/components/cosmology/CosmologyLesson";
const lesson: CosmosCase = {
  "slug": "cosmology-supernova-distance",
  "title": "A dimmer explosion",
  "group": "energy",
  "question": "How did distant Type Ia supernova observations contribute to the discovery of accelerated expansion?",
  "choices": [
    "They proved every supernova has the same brightness without correction",
    "They showed that redshift never occurs",
    "They helped measure distances that were greater than expected in a nonaccelerating model"
  ],
  "correct": 2,
  "explanation": "Standardized Type Ia supernova brightness provides distance estimates. Their distances and redshifts were evidence that cosmic expansion has accelerated in the recent universe.",
  "before": "Explore this cosmic model",
  "after": "Distance + redshift evidence",
  "focus": 1
};
export default function Demo({slug}:{slug:string}) {
 const [shown,setShown]=useState(false);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.choices,answer:lesson.correct}} exploreHint="Move from the first view to the next and inspect what changes." reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><CosmologyScene lesson={lesson} shown={shown}/><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>Explore the model</Control></Row><p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>{lesson.group==='cmb'?'Color contrast exaggerated':lesson.group==='structure'?'3D projection · schematic':'Illustration · not to scale'}</p></div>}
 </Lesson>;
}

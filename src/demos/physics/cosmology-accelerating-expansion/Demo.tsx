"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { CosmologyScene, type CosmosCase } from "@/components/cosmology/CosmologyLesson";
const lesson: CosmosCase = {
  "slug": "cosmology-accelerating-expansion",
  "title": "A changing expansion",
  "group": "energy",
  "question": "What does accelerated cosmic expansion mean?",
  "choices": [
    "The universe's scale factor grows at an increasing rate",
    "The universe has stopped expanding",
    "Every galaxy is accelerating through its local space in the same way"
  ],
  "correct": 0,
  "explanation": "Accelerated expansion means the cosmic scale factor's rate of increase is growing over time. It is a statement about large-scale expansion, not every object's local motion.",
  "before": "Explore this cosmic model",
  "after": "Scale growth speeds up",
  "focus": 0
};
export default function Demo({slug}:{slug:string}) {
 const [shown,setShown]=useState(false);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.choices,answer:lesson.correct}} exploreHint="Move from the first view to the next and inspect what changes." reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><CosmologyScene lesson={lesson} shown={shown}/><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>Explore the model</Control></Row><p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>{lesson.group==='cmb'?'Color contrast exaggerated':lesson.group==='structure'?'3D projection · schematic':'Illustration · not to scale'}</p></div>}
 </Lesson>;
}

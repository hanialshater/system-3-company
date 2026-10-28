"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { CosmologyScene, type CosmosCase } from "@/components/cosmology/CosmologyLesson";
const lesson: CosmosCase = {
  "slug": "cosmology-cmb-nearly-uniform",
  "title": "A map of the microwave sky",
  "group": "cmb",
  "question": "How uniform is the cosmic microwave background temperature across the sky?",
  "choices": [
    "Perfectly identical in every measured direction",
    "Randomly different by thousands of degrees",
    "Nearly uniform, with tiny variations"
  ],
  "correct": 2,
  "explanation": "The microwave background has nearly the same temperature in all directions, with very small variations. Those variations contain information about the early universe.",
  "before": "Explore this cosmic model",
  "after": "Almost smooth, tiny patterns",
  "focus": 1
};
export default function Demo({slug}:{slug:string}) {
 const [shown,setShown]=useState(false);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.choices,answer:lesson.correct}} exploreHint="Move from the first view to the next and inspect what changes." reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><CosmologyScene lesson={lesson} shown={shown}/><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>Explore the model</Control></Row><p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>{lesson.group==='cmb'?'Color contrast exaggerated':lesson.group==='structure'?'3D projection · schematic':'Illustration · not to scale'}</p></div>}
 </Lesson>;
}

"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { CosmologyScene, type CosmosCase } from "@/components/cosmology/CosmologyLesson";
const lesson: CosmosCase = {
  "slug": "cosmology-no-special-center",
  "title": "A question of viewpoint",
  "group": "expansion",
  "question": "In a homogeneous expanding-space model, which galaxy is the unique center of the expansion?",
  "choices": [
    "The Milky Way",
    "The brightest galaxy",
    "There is no special central galaxy"
  ],
  "correct": 2,
  "explanation": "In the ideal homogeneous model, each observer sees distant galaxies recede on large scales. The model does not assign a unique central galaxy within space.",
  "before": "Explore this cosmic model",
  "after": "No special center shown",
  "focus": 1
};
export default function Demo({slug}:{slug:string}) {
 const [shown,setShown]=useState(false);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.choices,answer:lesson.correct}} exploreHint="Move from the first view to the next and inspect what changes." reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><CosmologyScene lesson={lesson} shown={shown}/><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>Explore the model</Control></Row><p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>{lesson.group==='cmb'?'Color contrast exaggerated':lesson.group==='structure'?'3D projection · schematic':'Illustration · not to scale'}</p></div>}
 </Lesson>;
}

"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { CosmologyScene, type CosmosCase } from "@/components/cosmology/CosmologyLesson";
const lesson: CosmosCase = {
  "slug": "cosmology-expansion-not-into-space",
  "title": "The balloon analogy",
  "group": "expansion",
  "question": "What important limitation should you remember when using a balloon surface to picture cosmic expansion?",
  "choices": [
    "Galaxies must be rubber dots",
    "The surface represents space; the surrounding room is not required by the model",
    "The universe must have a balloon center inside ordinary space"
  ],
  "correct": 1,
  "explanation": "A balloon's surface can illustrate distances growing without a special center on that surface. The surrounding room is a feature of the analogy, not an established external space required by cosmology.",
  "before": "Explore this cosmic model",
  "after": "Surface: analogy has limits",
  "focus": 5
};
export default function Demo({slug}:{slug:string}) {
 const [shown,setShown]=useState(false);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.choices,answer:lesson.correct}} exploreHint="Move from the first view to the next and inspect what changes." reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><CosmologyScene lesson={lesson} shown={shown}/><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>Explore the model</Control></Row><p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>{lesson.group==='cmb'?'Color contrast exaggerated':lesson.group==='structure'?'3D projection · schematic':'Illustration · not to scale'}</p></div>}
 </Lesson>;
}

"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { CosmologyScene, type CosmosCase } from "@/components/cosmology/CosmologyLesson";
const lesson: CosmosCase = {
  "slug": "cosmology-galaxy-cluster",
  "title": "A larger assembly",
  "group": "structure",
  "question": "What distinguishes a galaxy cluster from a single galaxy?",
  "choices": [
    "A cluster has no gravitational mass",
    "A cluster contains many galaxies together with gas and dark matter",
    "A cluster is one star with many planets"
  ],
  "correct": 1,
  "explanation": "Galaxy clusters contain many galaxies, hot gas and substantial dark matter. They are large gravitational structures rather than individual galaxies.",
  "before": "Explore this cosmic model",
  "after": "Galaxies + gas + mass",
  "focus": 5
};
export default function Demo({slug}:{slug:string}) {
 const [shown,setShown]=useState(false);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.choices,answer:lesson.correct}} exploreHint="Move from the first view to the next and inspect what changes." reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><CosmologyScene lesson={lesson} shown={shown}/><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>Explore the model</Control></Row><p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>{lesson.group==='cmb'?'Color contrast exaggerated':lesson.group==='structure'?'3D projection · schematic':'Illustration · not to scale'}</p></div>}
 </Lesson>;
}

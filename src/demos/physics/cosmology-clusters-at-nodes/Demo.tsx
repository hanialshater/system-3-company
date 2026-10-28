"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { CosmologyScene, type CosmosCase } from "@/components/cosmology/CosmologyLesson";
const lesson: CosmosCase = {
  "slug": "cosmology-clusters-at-nodes",
  "title": "Galaxies and filaments",
  "group": "structure",
  "question": "In the cosmic web, where are massive galaxy clusters commonly found?",
  "choices": [
    "Only at the center of every void",
    "Only inside the Solar System",
    "At dense intersections of filaments"
  ],
  "correct": 2,
  "explanation": "Matter tends to gather where filaments intersect. Those dense nodes can host galaxy groups and clusters, while less dense regions form voids.",
  "before": "Explore this cosmic model",
  "after": "Dense nodes host clusters",
  "focus": 1
};
export default function Demo({slug}:{slug:string}) {
 const [shown,setShown]=useState(false);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.choices,answer:lesson.correct}} exploreHint="Move from the first view to the next and inspect what changes." reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><CosmologyScene lesson={lesson} shown={shown}/><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>Explore the model</Control></Row><p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>{lesson.group==='cmb'?'Color contrast exaggerated':lesson.group==='structure'?'3D projection · schematic':'Illustration · not to scale'}</p></div>}
 </Lesson>;
}

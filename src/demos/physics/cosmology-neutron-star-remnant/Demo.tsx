"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { CosmologyScene, type CosmosCase } from "@/components/cosmology/CosmologyLesson";
const lesson: CosmosCase = {
  "slug": "cosmology-neutron-star-remnant",
  "title": "A dense remnant",
  "group": "stars",
  "question": "What can remain after some massive stars explode?",
  "choices": [
    "A new Solar System immediately",
    "Only an empty space with no matter",
    "A neutron star"
  ],
  "correct": 2,
  "explanation": "Some core-collapse supernovae leave neutron stars, extremely dense compact remnants. Other outcomes, including black holes, depend on the mass and physics of the collapse.",
  "before": "Explore this cosmic model",
  "after": "A compact neutron remnant",
  "focus": 7
};
export default function Demo({slug}:{slug:string}) {
 const [shown,setShown]=useState(false);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.choices,answer:lesson.correct}} exploreHint="Move from the first view to the next and inspect what changes." reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><CosmologyScene lesson={lesson} shown={shown}/><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>Explore the model</Control></Row><p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>{lesson.group==='cmb'?'Color contrast exaggerated':lesson.group==='structure'?'3D projection · schematic':'Illustration · not to scale'}</p></div>}
 </Lesson>;
}

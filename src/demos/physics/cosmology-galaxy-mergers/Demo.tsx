"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { CosmologyScene, type CosmosCase } from "@/components/cosmology/CosmologyLesson";
const lesson: CosmosCase = {
  "slug": "cosmology-galaxy-mergers",
  "title": "Two galaxies nearby",
  "group": "structure",
  "question": "Can galaxies merge over cosmic time?",
  "choices": [
    "No: galaxies can never interact",
    "Yes, but only if their individual stars all collide",
    "Yes: gravity can bring galaxies together and reshape them"
  ],
  "correct": 2,
  "explanation": "Galaxies can interact and merge under gravity, changing their shapes and redistributing gas and stars. Individual stellar collisions are comparatively unlikely.",
  "before": "Explore this cosmic model",
  "after": "Gravity can merge galaxies",
  "focus": 7
};
export default function Demo({slug}:{slug:string}) {
 const [shown,setShown]=useState(false);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.choices,answer:lesson.correct}} exploreHint="Move from the first view to the next and inspect what changes." reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><CosmologyScene lesson={lesson} shown={shown}/><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>Explore the model</Control></Row><p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>{lesson.group==='cmb'?'Color contrast exaggerated':lesson.group==='structure'?'3D projection · schematic':'Illustration · not to scale'}</p></div>}
 </Lesson>;
}

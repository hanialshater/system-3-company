"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { CosmologyScene, type CosmosCase } from "@/components/cosmology/CosmologyLesson";
const lesson: CosmosCase = {
  "slug": "cosmology-bound-systems",
  "title": "The Solar System and space",
  "group": "expansion",
  "question": "Does cosmic expansion force the Solar System to expand along with distant intergalactic space?",
  "choices": [
    "Only during the daytime",
    "No: local binding dominates at this scale",
    "Yes: every orbit expands at the cosmic rate"
  ],
  "correct": 1,
  "explanation": "The Solar System is gravitationally bound. Local forces dominate there, so the expansion seen between widely separated galaxies does not simply stretch planetary orbits.",
  "before": "Explore this cosmic model",
  "after": "Bound systems stay bound",
  "focus": 2
};
export default function Demo({slug}:{slug:string}) {
 const [shown,setShown]=useState(false);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.choices,answer:lesson.correct}} exploreHint="Move from the first view to the next and inspect what changes." reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><CosmologyScene lesson={lesson} shown={shown}/><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>Explore the model</Control></Row><p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>{lesson.group==='cmb'?'Color contrast exaggerated':lesson.group==='structure'?'3D projection · schematic':'Illustration · not to scale'}</p></div>}
 </Lesson>;
}

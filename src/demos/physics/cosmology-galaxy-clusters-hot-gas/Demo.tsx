"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { CosmologyScene, type CosmosCase } from "@/components/cosmology/CosmologyLesson";
const lesson: CosmosCase = {
  "slug": "cosmology-galaxy-clusters-hot-gas",
  "title": "A cluster beyond visible light",
  "group": "structure",
  "question": "Why are X-ray observations useful for studying galaxy clusters?",
  "choices": [
    "They make gravitational lensing disappear",
    "They reveal very hot gas between galaxies",
    "They show only Earth's atmosphere"
  ],
  "correct": 1,
  "explanation": "Galaxy clusters contain large amounts of hot intracluster gas that emits X-rays. X-ray observations reveal material that ordinary visible-light images do not show as clearly.",
  "before": "Explore this cosmic model",
  "after": "Hot gas emits X-rays",
  "focus": 8
};
export default function Demo({slug}:{slug:string}) {
 const [shown,setShown]=useState(false);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.choices,answer:lesson.correct}} exploreHint="Move from the first view to the next and inspect what changes." reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><CosmologyScene lesson={lesson} shown={shown}/><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>Explore the model</Control></Row><p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>{lesson.group==='cmb'?'Color contrast exaggerated':lesson.group==='structure'?'3D projection · schematic':'Illustration · not to scale'}</p></div>}
 </Lesson>;
}

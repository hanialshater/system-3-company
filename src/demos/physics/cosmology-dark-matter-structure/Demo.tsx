"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { CosmologyScene, type CosmosCase } from "@/components/cosmology/CosmologyLesson";
const lesson: CosmosCase = {
  "slug": "cosmology-dark-matter-structure",
  "title": "Building the cosmic web",
  "group": "dark",
  "question": "What role does dark matter play in standard models of structure formation?",
  "choices": [
    "It replaces the need for gravity",
    "Its gravity helps structure grow",
    "It prevents all galaxies from forming"
  ],
  "correct": 1,
  "explanation": "In standard cosmological models, dark matter contributes gravity that helps matter collect into the large-scale structures in which galaxies form. Observations test these models.",
  "before": "Explore this cosmic model",
  "after": "Gravity helps structure grow",
  "focus": 8
};
export default function Demo({slug}:{slug:string}) {
 const [shown,setShown]=useState(false);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.choices,answer:lesson.correct}} exploreHint="Move from the first view to the next and inspect what changes." reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><CosmologyScene lesson={lesson} shown={shown}/><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>Explore the model</Control></Row><p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>{lesson.group==='cmb'?'Color contrast exaggerated':lesson.group==='structure'?'3D projection · schematic':'Illustration · not to scale'}</p></div>}
 </Lesson>;
}

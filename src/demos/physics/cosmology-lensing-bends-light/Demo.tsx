"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { CosmologyScene, type CosmosCase } from "@/components/cosmology/CosmologyLesson";
const lesson: CosmosCase = {
  "slug": "cosmology-lensing-bends-light",
  "title": "A distant source and mass",
  "group": "dark",
  "question": "What is gravitational lensing?",
  "choices": [
    "A galaxy switching off its light",
    "The deflection of light by mass along its path",
    "A telescope lens manufactured in space"
  ],
  "correct": 1,
  "explanation": "Mass curves spacetime and can deflect light from a more distant source. The resulting distortions help astronomers infer the mass distribution of a foreground lens.",
  "before": "Explore this cosmic model",
  "after": "Mass bends light paths",
  "focus": 2
};
export default function Demo({slug}:{slug:string}) {
 const [shown,setShown]=useState(false);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.choices,answer:lesson.correct}} exploreHint="Move from the first view to the next and inspect what changes." reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><CosmologyScene lesson={lesson} shown={shown}/><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>Explore the model</Control></Row><p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>{lesson.group==='cmb'?'Color contrast exaggerated':lesson.group==='structure'?'3D projection · schematic':'Illustration · not to scale'}</p></div>}
 </Lesson>;
}

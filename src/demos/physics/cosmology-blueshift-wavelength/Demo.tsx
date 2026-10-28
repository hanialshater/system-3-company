"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { CosmologyScene, type CosmosCase } from "@/components/cosmology/CosmologyLesson";
const lesson: CosmosCase = {
  "slug": "cosmology-blueshift-wavelength",
  "title": "A compressed wave",
  "group": "light",
  "question": "A spectral line is observed at a shorter wavelength than it was emitted. What is this change called?",
  "choices": [
    "Blueshift",
    "Redshift",
    "Absorption"
  ],
  "correct": 0,
  "explanation": "Blueshift means a shift toward shorter wavelengths. It can arise when a source and observer approach each other; not every galaxy is receding locally.",
  "before": "Explore this cosmic model",
  "after": "Shorter wavelength: blue",
  "focus": 3
};
export default function Demo({slug}:{slug:string}) {
 const [shown,setShown]=useState(false);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.choices,answer:lesson.correct}} exploreHint="Move from the first view to the next and inspect what changes." reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><CosmologyScene lesson={lesson} shown={shown}/><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>Explore the model</Control></Row><p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>{lesson.group==='cmb'?'Color contrast exaggerated':lesson.group==='structure'?'3D projection · schematic':'Illustration · not to scale'}</p></div>}
 </Lesson>;
}

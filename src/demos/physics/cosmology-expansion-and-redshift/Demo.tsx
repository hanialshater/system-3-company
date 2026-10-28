"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { CosmologyScene, type CosmosCase } from "@/components/cosmology/CosmologyLesson";
const lesson: CosmosCase = {
  "slug": "cosmology-expansion-and-redshift",
  "title": "Why lines move redward",
  "group": "expansion",
  "question": "A distant galaxy's familiar spectral lines arrive shifted toward longer wavelengths. What can the shift help astronomers study?",
  "choices": [
    "Cosmic expansion since the light was emitted",
    "Only the galaxy's chemical color",
    "The number of planets in the Milky Way"
  ],
  "correct": 0,
  "explanation": "Astronomers compare observed spectral lines with laboratory wavelengths. Cosmological redshift gives information about how much the universe expanded while the light traveled.",
  "before": "Explore this cosmic model",
  "after": "Compare emitted and observed",
  "focus": 6
};
export default function Demo({slug}:{slug:string}) {
 const [shown,setShown]=useState(false);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.choices,answer:lesson.correct}} exploreHint="Move from the first view to the next and inspect what changes." reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><CosmologyScene lesson={lesson} shown={shown}/><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>Explore the model</Control></Row><p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>{lesson.group==='cmb'?'Color contrast exaggerated':lesson.group==='structure'?'3D projection · schematic':'Illustration · not to scale'}</p></div>}
 </Lesson>;
}

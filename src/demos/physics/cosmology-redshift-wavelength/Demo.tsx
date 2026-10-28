"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { CosmologyScene, type CosmosCase } from "@/components/cosmology/CosmologyLesson";
const lesson: CosmosCase = {
  "slug": "cosmology-redshift-wavelength",
  "title": "A stretched wave",
  "group": "light",
  "question": "A spectral line is observed at a longer wavelength than it was emitted. What is this change called?",
  "choices": [
    "Polarization",
    "Redshift",
    "Blueshift"
  ],
  "correct": 1,
  "explanation": "Redshift means light is observed at longer wavelengths than its emitted wavelength. Cosmological expansion is one way to produce such a shift in distant galaxies.",
  "before": "Explore this cosmic model",
  "after": "Longer wavelength: redshift",
  "focus": 2
};
export default function Demo({slug}:{slug:string}) {
 const [shown,setShown]=useState(false);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.choices,answer:lesson.correct}} exploreHint="Move from the first view to the next and inspect what changes." reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><CosmologyScene lesson={lesson} shown={shown}/><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>Explore the model</Control></Row><p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>{lesson.group==='cmb'?'Color contrast exaggerated':lesson.group==='structure'?'3D projection · schematic':'Illustration · not to scale'}</p></div>}
 </Lesson>;
}

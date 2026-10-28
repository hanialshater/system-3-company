"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { CosmologyScene, type CosmosCase } from "@/components/cosmology/CosmologyLesson";
const lesson: CosmosCase = {
  "slug": "cosmology-multiwavelength-universe",
  "title": "One sky, many views",
  "group": "light",
  "question": "Why do astronomers observe the same object at several wavelengths?",
  "choices": [
    "Different wavelengths can reveal different physical features",
    "Every wavelength always shows identical details",
    "A single wavelength measures every property"
  ],
  "correct": 0,
  "explanation": "Objects emit, absorb and scatter different wavelengths in different ways. Comparing observations across the spectrum can reveal structures and processes a single band misses.",
  "before": "Explore this cosmic model",
  "after": "One object, many wavelengths",
  "focus": 9
};
export default function Demo({slug}:{slug:string}) {
 const [shown,setShown]=useState(false);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.choices,answer:lesson.correct}} exploreHint="Move from the first view to the next and inspect what changes." reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><CosmologyScene lesson={lesson} shown={shown}/><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>Explore the model</Control></Row><p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>{lesson.group==='cmb'?'Color contrast exaggerated':lesson.group==='structure'?'3D projection · schematic':'Illustration · not to scale'}</p></div>}
 </Lesson>;
}

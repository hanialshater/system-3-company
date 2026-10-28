"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { CosmologyScene, type CosmosCase } from "@/components/cosmology/CosmologyLesson";
const lesson: CosmosCase = {
  "slug": "cosmology-wavelength-frequency",
  "title": "Waves and frequency",
  "group": "light",
  "question": "For electromagnetic waves in a vacuum, what happens to frequency when wavelength becomes longer?",
  "choices": [
    "Frequency increases",
    "Frequency stays fixed",
    "Frequency decreases"
  ],
  "correct": 2,
  "explanation": "In a vacuum, wavelength multiplied by frequency equals the speed of light. If wavelength increases, frequency decreases so that their product remains constant.",
  "before": "Explore this cosmic model",
  "after": "Longer wave, lower frequency",
  "focus": 7
};
export default function Demo({slug}:{slug:string}) {
 const [shown,setShown]=useState(false);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.choices,answer:lesson.correct}} exploreHint="Move from the first view to the next and inspect what changes." reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><CosmologyScene lesson={lesson} shown={shown}/><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>Explore the model</Control></Row><p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>{lesson.group==='cmb'?'Color contrast exaggerated':lesson.group==='structure'?'3D projection · schematic':'Illustration · not to scale'}</p></div>}
 </Lesson>;
}

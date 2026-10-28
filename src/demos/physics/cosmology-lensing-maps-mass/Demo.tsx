"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { CosmologyScene, type CosmosCase } from "@/components/cosmology/CosmologyLesson";
const lesson: CosmosCase = {
  "slug": "cosmology-lensing-maps-mass",
  "title": "An invisible mass map",
  "group": "dark",
  "question": "How can gravitational lensing help map dark matter?",
  "choices": [
    "The distortion of background light reveals intervening mass",
    "It directly photographs dark matter particles",
    "It measures only the brightness of nearby stars"
  ],
  "correct": 0,
  "explanation": "Lensing reveals mass through its effect on background light, including mass that emits little or no light. It does not by itself identify the particle nature of dark matter.",
  "before": "Explore this cosmic model",
  "after": "Distortion traces mass",
  "focus": 3
};
export default function Demo({slug}:{slug:string}) {
 const [shown,setShown]=useState(false);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.choices,answer:lesson.correct}} exploreHint="Move from the first view to the next and inspect what changes." reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><CosmologyScene lesson={lesson} shown={shown}/><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>Explore the model</Control></Row><p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>{lesson.group==='cmb'?'Color contrast exaggerated':lesson.group==='structure'?'3D projection · schematic':'Illustration · not to scale'}</p></div>}
 </Lesson>;
}

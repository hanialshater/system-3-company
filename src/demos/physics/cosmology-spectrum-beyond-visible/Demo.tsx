"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { CosmologyScene, type CosmosCase } from "@/components/cosmology/CosmologyLesson";
const lesson: CosmosCase = {
  "slug": "cosmology-spectrum-beyond-visible",
  "title": "Beyond the rainbow",
  "group": "light",
  "question": "Which radiation can a telescope detect even though it is outside ordinary human vision?",
  "choices": [
    "Infrared light",
    "Only visible green light",
    "No electromagnetic radiation"
  ],
  "correct": 0,
  "explanation": "Visible light is only one part of the electromagnetic spectrum. Telescopes can be designed to detect infrared, radio, X-ray and other wavelengths that our eyes cannot see.",
  "before": "Explore this cosmic model",
  "after": "Visible is one small band",
  "focus": 0
};
export default function Demo({slug}:{slug:string}) {
 const [shown,setShown]=useState(false);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.choices,answer:lesson.correct}} exploreHint="Move from the first view to the next and inspect what changes." reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><CosmologyScene lesson={lesson} shown={shown}/><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>Explore the model</Control></Row><p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>{lesson.group==='cmb'?'Color contrast exaggerated':lesson.group==='structure'?'3D projection · schematic':'Illustration · not to scale'}</p></div>}
 </Lesson>;
}

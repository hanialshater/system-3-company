"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { CosmologyScene, type CosmosCase } from "@/components/cosmology/CosmologyLesson";
const lesson: CosmosCase = {
  "slug": "cosmology-infrared-through-dust",
  "title": "A cloud becomes clearer",
  "group": "light",
  "question": "Why can infrared observations reveal some objects hidden by cosmic dust in visible-light images?",
  "choices": [
    "Infrared destroys all cosmic dust",
    "Infrared makes all stars disappear",
    "Some infrared wavelengths pass through dust more effectively"
  ],
  "correct": 2,
  "explanation": "Dust blocks and scatters visible light strongly in many regions. Some infrared wavelengths pass through those clouds more effectively, revealing features otherwise obscured.",
  "before": "Explore this cosmic model",
  "after": "Dust: visible vs infrared",
  "focus": 1
};
export default function Demo({slug}:{slug:string}) {
 const [shown,setShown]=useState(false);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.choices,answer:lesson.correct}} exploreHint="Move from the first view to the next and inspect what changes." reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><CosmologyScene lesson={lesson} shown={shown}/><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>Explore the model</Control></Row><p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>{lesson.group==='cmb'?'Color contrast exaggerated':lesson.group==='structure'?'3D projection · schematic':'Illustration · not to scale'}</p></div>}
 </Lesson>;
}

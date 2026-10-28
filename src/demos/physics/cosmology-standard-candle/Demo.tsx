"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { CosmologyScene, type CosmosCase } from "@/components/cosmology/CosmologyLesson";
const lesson: CosmosCase = {
  "slug": "cosmology-standard-candle",
  "title": "A calibrated light",
  "group": "methods",
  "question": "How can a standard candle help estimate an astronomical distance?",
  "choices": [
    "Compare its calibrated intrinsic brightness with its observed brightness",
    "Assume all objects have identical brightness",
    "Measure only its color without any calibration"
  ],
  "correct": 0,
  "explanation": "If a source's intrinsic luminosity can be calibrated, comparing it with its observed brightness helps estimate distance. Dust and measurement uncertainties must be considered.",
  "before": "Explore this cosmic model",
  "after": "Calibrated light → distance",
  "focus": 0
};
export default function Demo({slug}:{slug:string}) {
 const [shown,setShown]=useState(false);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.choices,answer:lesson.correct}} exploreHint="Move from the first view to the next and inspect what changes." reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><CosmologyScene lesson={lesson} shown={shown}/><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>Explore the model</Control></Row><p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>{lesson.group==='cmb'?'Color contrast exaggerated':lesson.group==='structure'?'3D projection · schematic':'Illustration · not to scale'}</p></div>}
 </Lesson>;
}

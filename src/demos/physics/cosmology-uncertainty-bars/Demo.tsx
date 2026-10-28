"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { CosmologyScene, type CosmosCase } from "@/components/cosmology/CosmologyLesson";
const lesson: CosmosCase = {
  "slug": "cosmology-uncertainty-bars",
  "title": "A measurement and its bars",
  "group": "methods",
  "question": "What do uncertainty bars around a measurement communicate?",
  "choices": [
    "Proof that a measurement is worthless",
    "A range expressing measurement uncertainty",
    "The exact physical size of the telescope"
  ],
  "correct": 1,
  "explanation": "Uncertainty describes how precisely a quantity is known under stated assumptions. Comparing results requires considering uncertainty, potential biases and how estimates were obtained.",
  "before": "Explore this cosmic model",
  "after": "Measurements have ranges",
  "focus": 5
};
export default function Demo({slug}:{slug:string}) {
 const [shown,setShown]=useState(false);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.choices,answer:lesson.correct}} exploreHint="Move from the first view to the next and inspect what changes." reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><CosmologyScene lesson={lesson} shown={shown}/><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>Explore the model</Control></Row><p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>{lesson.group==='cmb'?'Color contrast exaggerated':lesson.group==='structure'?'3D projection · schematic':'Illustration · not to scale'}</p></div>}
 </Lesson>;
}

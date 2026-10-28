"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { CosmologyScene, type CosmosCase } from "@/components/cosmology/CosmologyLesson";
const lesson: CosmosCase = {
  "slug": "cosmology-model-versus-observation",
  "title": "A model meets data",
  "group": "methods",
  "question": "How can observations improve a cosmological model?",
  "choices": [
    "Compare the model's predictions with independent measurements",
    "Treat the model as true regardless of evidence",
    "Discard every measurement that disagrees"
  ],
  "correct": 0,
  "explanation": "A scientific model makes predictions that can be compared with observations. Agreement, disagreement and uncertainty all guide revisions and further tests.",
  "before": "Explore this cosmic model",
  "after": "Predictions meet evidence",
  "focus": 6
};
export default function Demo({slug}:{slug:string}) {
 const [shown,setShown]=useState(false);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.choices,answer:lesson.correct}} exploreHint="Move from the first view to the next and inspect what changes." reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><CosmologyScene lesson={lesson} shown={shown}/><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>Explore the model</Control></Row><p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>{lesson.group==='cmb'?'Color contrast exaggerated':lesson.group==='structure'?'3D projection · schematic':'Illustration · not to scale'}</p></div>}
 </Lesson>;
}

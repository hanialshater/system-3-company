"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { CosmologyScene, type CosmosCase } from "@/components/cosmology/CosmologyLesson";
const lesson: CosmosCase = {
  "slug": "cosmology-redshift-distance-pair",
  "title": "Two measurements together",
  "group": "methods",
  "question": "Why compare a galaxy's distance estimate with its redshift?",
  "choices": [
    "Together they help measure the expansion history",
    "Redshift alone is the same thing as a direct distance measurement in every model",
    "Distance measurements make spectra unnecessary"
  ],
  "correct": 0,
  "explanation": "Distance estimates and redshifts provide different information. Comparing them across many objects helps constrain cosmic expansion, with uncertainties and model assumptions.",
  "before": "Explore this cosmic model",
  "after": "Distance and redshift",
  "focus": 3
};
export default function Demo({slug}:{slug:string}) {
 const [shown,setShown]=useState(false);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.choices,answer:lesson.correct}} exploreHint="Move from the first view to the next and inspect what changes." reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><CosmologyScene lesson={lesson} shown={shown}/><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>Explore the model</Control></Row><p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>{lesson.group==='cmb'?'Color contrast exaggerated':lesson.group==='structure'?'3D projection · schematic':'Illustration · not to scale'}</p></div>}
 </Lesson>;
}

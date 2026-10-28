"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { CosmologyScene, type CosmosCase } from "@/components/cosmology/CosmologyLesson";
const lesson: CosmosCase = {
  "slug": "cosmology-survey-selection",
  "title": "The galaxies we miss",
  "group": "methods",
  "question": "Why must a galaxy survey account for selection effects?",
  "choices": [
    "Every galaxy is equally easy to detect",
    "Selection effects change the speed of light",
    "A telescope may detect some kinds of galaxies more easily than others"
  ],
  "correct": 2,
  "explanation": "A survey's detection limits influence which objects appear in its sample. Understanding those limits is necessary when inferring properties of the wider population.",
  "before": "Explore this cosmic model",
  "after": "Detection shapes the sample",
  "focus": 7
};
export default function Demo({slug}:{slug:string}) {
 const [shown,setShown]=useState(false);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.choices,answer:lesson.correct}} exploreHint="Move from the first view to the next and inspect what changes." reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><CosmologyScene lesson={lesson} shown={shown}/><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>Explore the model</Control></Row><p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>{lesson.group==='cmb'?'Color contrast exaggerated':lesson.group==='structure'?'3D projection · schematic':'Illustration · not to scale'}</p></div>}
 </Lesson>;
}

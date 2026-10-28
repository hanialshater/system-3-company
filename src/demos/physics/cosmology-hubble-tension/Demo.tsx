"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { CosmologyScene, type CosmosCase } from "@/components/cosmology/CosmologyLesson";
const lesson: CosmosCase = {
  "slug": "cosmology-hubble-tension",
  "title": "Two routes disagree",
  "group": "methods",
  "question": "What is the Hubble tension?",
  "choices": [
    "Proof that galaxies do not exist",
    "A measurement of the tension in a telescope cable",
    "A persistent discrepancy between some early- and late-universe estimates of the expansion rate"
  ],
  "correct": 2,
  "explanation": "Some methods that infer the current expansion rate from early-universe data and others that measure the late universe give differing results. Researchers are testing possible explanations.",
  "before": "Explore this cosmic model",
  "after": "Different estimates disagree",
  "focus": 4
};
export default function Demo({slug}:{slug:string}) {
 const [shown,setShown]=useState(false);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.choices,answer:lesson.correct}} exploreHint="Move from the first view to the next and inspect what changes." reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><CosmologyScene lesson={lesson} shown={shown}/><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>Explore the model</Control></Row><p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>{lesson.group==='cmb'?'Color contrast exaggerated':lesson.group==='structure'?'3D projection · schematic':'Illustration · not to scale'}</p></div>}
 </Lesson>;
}

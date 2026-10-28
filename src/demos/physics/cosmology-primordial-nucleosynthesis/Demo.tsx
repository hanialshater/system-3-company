"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { CosmologyScene, type CosmosCase } from "@/components/cosmology/CosmologyLesson";
const lesson: CosmosCase = {
  "slug": "cosmology-primordial-nucleosynthesis",
  "title": "The earliest nuclei",
  "group": "early",
  "question": "Which nuclei formed in significant amounts during primordial nucleosynthesis?",
  "choices": [
    "Complete atoms of every element",
    "Mostly hydrogen and helium nuclei",
    "Iron and uranium nuclei as the main products"
  ],
  "correct": 1,
  "explanation": "During the first few minutes, nuclear reactions produced mostly hydrogen and helium nuclei, with small amounts of other light nuclei. Heavy elements formed largely through later stellar processes.",
  "before": "Explore this cosmic model",
  "after": "Light nuclei form first",
  "focus": 2
};
export default function Demo({slug}:{slug:string}) {
 const [shown,setShown]=useState(false);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.choices,answer:lesson.correct}} exploreHint="Move from the first view to the next and inspect what changes." reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><CosmologyScene lesson={lesson} shown={shown}/><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>Explore the model</Control></Row><p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>{lesson.group==='cmb'?'Color contrast exaggerated':lesson.group==='structure'?'3D projection · schematic':'Illustration · not to scale'}</p></div>}
 </Lesson>;
}

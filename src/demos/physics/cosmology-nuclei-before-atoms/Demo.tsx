"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { CosmologyScene, type CosmosCase } from "@/components/cosmology/CosmologyLesson";
const lesson: CosmosCase = {
  "slug": "cosmology-nuclei-before-atoms",
  "title": "Nuclei without atoms",
  "group": "early",
  "question": "Why did stable neutral atoms form later than the first light nuclei?",
  "choices": [
    "The universe had to cool enough for electrons to remain bound",
    "Electrons did not exist until galaxies formed",
    "Nuclei and neutral atoms always formed simultaneously"
  ],
  "correct": 0,
  "explanation": "Light nuclei formed while the universe was still extremely hot. Later cooling made it possible for electrons to remain bound to nuclei as neutral atoms.",
  "before": "Explore this cosmic model",
  "after": "Cooling allows neutral atoms",
  "focus": 3
};
export default function Demo({slug}:{slug:string}) {
 const [shown,setShown]=useState(false);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.choices,answer:lesson.correct}} exploreHint="Move from the first view to the next and inspect what changes." reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><CosmologyScene lesson={lesson} shown={shown}/><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>Explore the model</Control></Row><p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>{lesson.group==='cmb'?'Color contrast exaggerated':lesson.group==='structure'?'3D projection · schematic':'Illustration · not to scale'}</p></div>}
 </Lesson>;
}

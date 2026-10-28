"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { CosmologyScene, type CosmosCase } from "@/components/cosmology/CosmologyLesson";
const lesson: CosmosCase = {
  "slug": "cosmology-recombination-transparency",
  "title": "When light traveled freely",
  "group": "early",
  "question": "Why did the early universe become much more transparent after neutral atoms formed?",
  "choices": [
    "All photons were destroyed",
    "Space stopped expanding",
    "Photons scattered less often from free electrons"
  ],
  "correct": 2,
  "explanation": "Before neutral atoms formed, free electrons frequently scattered photons. Once many electrons combined with nuclei, photons traveled much more freely through the universe.",
  "before": "Explore this cosmic model",
  "after": "Fewer free electrons",
  "focus": 4
};
export default function Demo({slug}:{slug:string}) {
 const [shown,setShown]=useState(false);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.choices,answer:lesson.correct}} exploreHint="Move from the first view to the next and inspect what changes." reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><CosmologyScene lesson={lesson} shown={shown}/><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>Explore the model</Control></Row><p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>{lesson.group==='cmb'?'Color contrast exaggerated':lesson.group==='structure'?'3D projection · schematic':'Illustration · not to scale'}</p></div>}
 </Lesson>;
}

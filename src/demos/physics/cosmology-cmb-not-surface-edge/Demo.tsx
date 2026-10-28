"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { CosmologyScene, type CosmosCase } from "@/components/cosmology/CosmologyLesson";
const lesson: CosmosCase = {
  "slug": "cosmology-cmb-not-surface-edge",
  "title": "A shell in the sky",
  "group": "cmb",
  "question": "Is the cosmic microwave background an image of a physical wall at the edge of space?",
  "choices": [
    "No: it is light from an early epoch reaching us from many directions",
    "Yes: it is a wall surrounding the universe",
    "No: it is light emitted by the Moon"
  ],
  "correct": 0,
  "explanation": "The CMB is radiation released when the early universe became transparent. Its apparent sky pattern comes from the early universe along our past light paths, not a physical wall.",
  "before": "Explore this cosmic model",
  "after": "An epoch, not a wall",
  "focus": 3
};
export default function Demo({slug}:{slug:string}) {
 const [shown,setShown]=useState(false);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.choices,answer:lesson.correct}} exploreHint="Move from the first view to the next and inspect what changes." reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><CosmologyScene lesson={lesson} shown={shown}/><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>Explore the model</Control></Row><p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>{lesson.group==='cmb'?'Color contrast exaggerated':lesson.group==='structure'?'3D projection · schematic':'Illustration · not to scale'}</p></div>}
 </Lesson>;
}

"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { CosmologyScene, type CosmosCase } from "@/components/cosmology/CosmologyLesson";
const lesson: CosmosCase = {
  "slug": "cosmology-sun-red-giant",
  "title": "Our Sun's later chapter",
  "group": "stars",
  "question": "What is the Sun expected to become after its main-sequence phase?",
  "choices": [
    "A supernova immediately",
    "A new galaxy",
    "A red giant"
  ],
  "correct": 2,
  "explanation": "After exhausting hydrogen in its core, the Sun is expected to expand into a red giant. Later, its outer layers will be shed and its core will remain as a white dwarf.",
  "before": "Explore this cosmic model",
  "after": "The Sun expands later",
  "focus": 4
};
export default function Demo({slug}:{slug:string}) {
 const [shown,setShown]=useState(false);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.choices,answer:lesson.correct}} exploreHint="Move from the first view to the next and inspect what changes." reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><CosmologyScene lesson={lesson} shown={shown}/><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>Explore the model</Control></Row><p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>{lesson.group==='cmb'?'Color contrast exaggerated':lesson.group==='structure'?'3D projection · schematic':'Illustration · not to scale'}</p></div>}
 </Lesson>;
}

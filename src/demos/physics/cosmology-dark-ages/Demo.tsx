"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { CosmologyScene, type CosmosCase } from "@/components/cosmology/CosmologyLesson";
const lesson: CosmosCase = {
  "slug": "cosmology-dark-ages",
  "title": "A chapter before dawn",
  "group": "early",
  "question": "What does the phrase cosmic dark ages refer to?",
  "choices": [
    "A time when all radiation disappeared",
    "A present-day region inside Earth's shadow",
    "A period before the first stars illuminated the universe"
  ],
  "correct": 2,
  "explanation": "After the microwave background was released and before the first stars formed, there were no stars to illuminate the universe. Radiation still existed, including the background light.",
  "before": "Explore this cosmic model",
  "after": "Before the first stars",
  "focus": 5
};
export default function Demo({slug}:{slug:string}) {
 const [shown,setShown]=useState(false);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.choices,answer:lesson.correct}} exploreHint="Move from the first view to the next and inspect what changes." reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><CosmologyScene lesson={lesson} shown={shown}/><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>Explore the model</Control></Row><p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>{lesson.group==='cmb'?'Color contrast exaggerated':lesson.group==='structure'?'3D projection · schematic':'Illustration · not to scale'}</p></div>}
 </Lesson>;
}

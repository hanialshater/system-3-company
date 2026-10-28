"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { CosmologyScene, type CosmosCase } from "@/components/cosmology/CosmologyLesson";
const lesson: CosmosCase = {
  "slug": "cosmology-absorption-lines",
  "title": "A spectrum through gas",
  "group": "light",
  "question": "What can produce dark absorption lines in an otherwise continuous spectrum?",
  "choices": [
    "Cooler gas absorbing specific wavelengths",
    "A telescope removing every wavelength equally",
    "The absence of atoms anywhere along the light path"
  ],
  "correct": 0,
  "explanation": "When light passes through suitable cooler gas, atoms can absorb particular wavelengths. Those wavelengths appear as dark lines in a continuous spectrum.",
  "before": "Explore this cosmic model",
  "after": "Gas removes specific light",
  "focus": 6
};
export default function Demo({slug}:{slug:string}) {
 const [shown,setShown]=useState(false);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.choices,answer:lesson.correct}} exploreHint="Move from the first view to the next and inspect what changes." reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><CosmologyScene lesson={lesson} shown={shown}/><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>Explore the model</Control></Row><p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>{lesson.group==='cmb'?'Color contrast exaggerated':lesson.group==='structure'?'3D projection · schematic':'Illustration · not to scale'}</p></div>}
 </Lesson>;
}

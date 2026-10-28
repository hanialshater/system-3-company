"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { CosmologyScene, type CosmosCase } from "@/components/cosmology/CosmologyLesson";
const lesson: CosmosCase = {
  "slug": "cosmology-light-stretches",
  "title": "A wave crosses expanding space",
  "group": "expansion",
  "question": "What can happen to a photon's wavelength while it travels through expanding space?",
  "choices": [
    "Its wavelength is stretched",
    "It must always become shorter",
    "It becomes a sound wave"
  ],
  "correct": 0,
  "explanation": "As space expands during a photon's journey, the observed wavelength can be stretched. This cosmological redshift is a key clue to the expansion history.",
  "before": "Explore this cosmic model",
  "after": "Expansion stretches light",
  "focus": 3
};
export default function Demo({slug}:{slug:string}) {
 const [shown,setShown]=useState(false);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.choices,answer:lesson.correct}} exploreHint="Move from the first view to the next and inspect what changes." reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><CosmologyScene lesson={lesson} shown={shown}/><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>Explore the model</Control></Row><p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>{lesson.group==='cmb'?'Color contrast exaggerated':lesson.group==='structure'?'3D projection · schematic':'Illustration · not to scale'}</p></div>}
 </Lesson>;
}

"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { CosmologyScene, type CosmosCase } from "@/components/cosmology/CosmologyLesson";
const lesson: CosmosCase = {
  "slug": "cosmology-cmb-originally-hot",
  "title": "A cooled glow",
  "group": "cmb",
  "question": "Why is the cosmic microwave background observed today at microwave wavelengths?",
  "choices": [
    "The radiation was created by microwave ovens",
    "The light has never changed wavelength",
    "Expansion stretched the original radiation's wavelengths"
  ],
  "correct": 2,
  "explanation": "As the universe expanded, the wavelength of the early radiation stretched. The once much hotter radiation is now observed as a cool microwave background.",
  "before": "Explore this cosmic model",
  "after": "Expansion stretches the glow",
  "focus": 4
};
export default function Demo({slug}:{slug:string}) {
 const [shown,setShown]=useState(false);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.choices,answer:lesson.correct}} exploreHint="Move from the first view to the next and inspect what changes." reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><CosmologyScene lesson={lesson} shown={shown}/><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>Explore the model</Control></Row><p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>{lesson.group==='cmb'?'Color contrast exaggerated':lesson.group==='structure'?'3D projection · schematic':'Illustration · not to scale'}</p></div>}
 </Lesson>;
}

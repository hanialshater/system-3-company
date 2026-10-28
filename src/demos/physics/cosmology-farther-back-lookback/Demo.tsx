"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { CosmologyScene, type CosmosCase } from "@/components/cosmology/CosmologyLesson";
const lesson: CosmosCase = {
  "slug": "cosmology-farther-back-lookback",
  "title": "A deep field of galaxies",
  "group": "scales",
  "question": "For distant galaxies, why does looking farther away usually mean looking further back in cosmic history?",
  "choices": [
    "Distant galaxies are always intrinsically younger today",
    "Telescopes can reverse time",
    "Their light generally spent longer traveling to us"
  ],
  "correct": 2,
  "explanation": "Light from more distant galaxies generally takes longer to reach us. We see those galaxies at earlier stages, rather than seeing their present appearance directly.",
  "before": "Explore this cosmic model",
  "after": "Farther light, older view",
  "focus": 7
};
export default function Demo({slug}:{slug:string}) {
 const [shown,setShown]=useState(false);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.choices,answer:lesson.correct}} exploreHint="Move from the first view to the next and inspect what changes." reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><CosmologyScene lesson={lesson} shown={shown}/><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>Explore the model</Control></Row><p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>{lesson.group==='cmb'?'Color contrast exaggerated':lesson.group==='structure'?'3D projection · schematic':'Illustration · not to scale'}</p></div>}
 </Lesson>;
}

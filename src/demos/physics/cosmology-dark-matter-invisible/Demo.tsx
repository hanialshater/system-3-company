"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { CosmologyScene, type CosmosCase } from "@/components/cosmology/CosmologyLesson";
const lesson: CosmosCase = {
  "slug": "cosmology-dark-matter-invisible",
  "title": "A missing light source?",
  "group": "dark",
  "question": "Why is dark matter called dark?",
  "choices": [
    "It does not emit or absorb light in the ordinary way we detect",
    "It is ordinary dust painted black",
    "It is simply a region with no gravity"
  ],
  "correct": 0,
  "explanation": "Dark matter is inferred mainly through gravitational effects rather than ordinary emitted or absorbed light. Its underlying particle or physical nature remains unknown.",
  "before": "Explore this cosmic model",
  "after": "Gravity without visible light",
  "focus": 0
};
export default function Demo({slug}:{slug:string}) {
 const [shown,setShown]=useState(false);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.choices,answer:lesson.correct}} exploreHint="Move from the first view to the next and inspect what changes." reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><CosmologyScene lesson={lesson} shown={shown}/><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>Explore the model</Control></Row><p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>{lesson.group==='cmb'?'Color contrast exaggerated':lesson.group==='structure'?'3D projection · schematic':'Illustration · not to scale'}</p></div>}
 </Lesson>;
}

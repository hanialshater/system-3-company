"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { CosmologyScene, type CosmosCase } from "@/components/cosmology/CosmologyLesson";
const lesson: CosmosCase = {
  "slug": "cosmology-ordinary-versus-dark",
  "title": "Two kinds of matter",
  "group": "dark",
  "question": "How does dark matter differ from ordinary luminous matter in astronomical observations?",
  "choices": [
    "It has no gravitational effect",
    "It is primarily inferred through gravitational effects",
    "It is made entirely of visible stars"
  ],
  "correct": 1,
  "explanation": "Ordinary matter can emit, absorb or scatter light. Dark matter is detected mainly through gravity, while its exact composition remains an open question.",
  "before": "Explore this cosmic model",
  "after": "Light traces only some mass",
  "focus": 5
};
export default function Demo({slug}:{slug:string}) {
 const [shown,setShown]=useState(false);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.choices,answer:lesson.correct}} exploreHint="Move from the first view to the next and inspect what changes." reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><CosmologyScene lesson={lesson} shown={shown}/><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>Explore the model</Control></Row><p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>{lesson.group==='cmb'?'Color contrast exaggerated':lesson.group==='structure'?'3D projection · schematic':'Illustration · not to scale'}</p></div>}
 </Lesson>;
}

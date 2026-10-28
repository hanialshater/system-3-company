"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { CosmologyScene, type CosmosCase } from "@/components/cosmology/CosmologyLesson";
const lesson: CosmosCase = {
  "slug": "cosmology-massive-star-supernova",
  "title": "A dramatic ending",
  "group": "stars",
  "question": "What can happen near the end of a massive star's life?",
  "choices": [
    "Its core can collapse and trigger a supernova",
    "It always becomes a planet without changing",
    "It stops obeying gravity"
  ],
  "correct": 0,
  "explanation": "A sufficiently massive star can undergo core collapse, producing a supernova. The outcome depends on the star's properties and can leave a compact remnant.",
  "before": "Explore this cosmic model",
  "after": "Core collapse can explode",
  "focus": 6
};
export default function Demo({slug}:{slug:string}) {
 const [shown,setShown]=useState(false);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.choices,answer:lesson.correct}} exploreHint="Move from the first view to the next and inspect what changes." reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><CosmologyScene lesson={lesson} shown={shown}/><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>Explore the model</Control></Row><p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>{lesson.group==='cmb'?'Color contrast exaggerated':lesson.group==='structure'?'3D projection · schematic':'Illustration · not to scale'}</p></div>}
 </Lesson>;
}

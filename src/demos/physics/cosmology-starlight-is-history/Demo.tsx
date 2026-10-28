"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { CosmologyScene, type CosmosCase } from "@/components/cosmology/CosmologyLesson";
const lesson: CosmosCase = {
  "slug": "cosmology-starlight-is-history",
  "title": "A star in the telescope",
  "group": "scales",
  "question": "Light from a star takes 100 years to reach Earth. When you observe that light, what are you seeing?",
  "choices": [
    "The star exactly as it is now",
    "The star as it will be in 100 years",
    "The star as it was about 100 years ago"
  ],
  "correct": 2,
  "explanation": "Light has a finite travel time. The light arriving now left the star roughly a century ago, so the image carries information about that earlier time.",
  "before": "Explore this cosmic model",
  "after": "Light brings an older view",
  "focus": 1
};
export default function Demo({slug}:{slug:string}) {
 const [shown,setShown]=useState(false);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.choices,answer:lesson.correct}} exploreHint="Move from the first view to the next and inspect what changes." reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><CosmologyScene lesson={lesson} shown={shown}/><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>Explore the model</Control></Row><p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>{lesson.group==='cmb'?'Color contrast exaggerated':lesson.group==='structure'?'3D projection · schematic':'Illustration · not to scale'}</p></div>}
 </Lesson>;
}

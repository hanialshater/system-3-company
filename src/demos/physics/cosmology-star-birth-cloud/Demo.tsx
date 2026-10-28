"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { CosmologyScene, type CosmosCase } from "@/components/cosmology/CosmologyLesson";
const lesson: CosmosCase = {
  "slug": "cosmology-star-birth-cloud",
  "title": "A star begins",
  "group": "stars",
  "question": "Where do stars form?",
  "choices": [
    "In dense regions of gas and dust clouds",
    "In completely empty space without matter",
    "Only inside existing planets"
  ],
  "correct": 0,
  "explanation": "Stars form when dense regions in molecular clouds collapse under gravity. The collapsing material heats up and can develop into a protostar before sustained core fusion begins.",
  "before": "Explore this cosmic model",
  "after": "A cloud forms a protostar",
  "focus": 0
};
export default function Demo({slug}:{slug:string}) {
 const [shown,setShown]=useState(false);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.choices,answer:lesson.correct}} exploreHint="Move from the first view to the next and inspect what changes." reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><CosmologyScene lesson={lesson} shown={shown}/><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>Explore the model</Control></Row><p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>{lesson.group==='cmb'?'Color contrast exaggerated':lesson.group==='structure'?'3D projection · schematic':'Illustration · not to scale'}</p></div>}
 </Lesson>;
}

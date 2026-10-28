"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { ReactionStage } from "@/lib/organic-chemistry/ReactionLesson";
import model from "./model.json";
export default function Demo({slug}:{slug:string}) {
 const [applied,setApplied]=useState(false);
 return <Lesson slug={slug} predict={{question:model.question,options:model.options,answer:model.answer}} exploreHint="Apply the conditions and compare the structures." reveal={()=><p>{model.explanation}</p>}>
 {({locked,interact})=><div><ReactionStage model={model} applied={applied}/><Row><Control disabled={locked||applied} onClick={()=>{setApplied(true);interact();}}>Apply conditions</Control></Row></div>}
 </Lesson>;
}

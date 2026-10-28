"use client";
import { Lesson } from "@/kit/Lesson";
import { Control } from "@/kit/controls";
import { useMiniLab, MiniLabStage, MiniLabReveal } from "@/components/mini-lab/TraceLesson";
import { spec } from "./spec";
export default function Demo({slug}:{slug:string}) {
 const lab=useMiniLab(spec);
 return <Lesson slug={slug} predict={lab.spec.predict} minInteractions={2} exploreHint={lab.spec.hint} reveal={()=><MiniLabReveal lab={lab}/>}>
 {({locked,interact})=><MiniLabStage lab={lab} locked={locked}>
  <Control disabled={locked||!lab.enabled.run} onClick={()=>lab.apply("run",interact)}>Run case</Control>
  <Control disabled={locked||!lab.enabled.compare} onClick={()=>lab.apply("compare",interact)}>Compare</Control>
  <Control disabled={locked||!lab.enabled.step} onClick={()=>lab.apply("step",interact)}>Step</Control>
  <Control disabled={locked||!lab.enabled.reset} onClick={()=>lab.apply("reset",interact)}>Reset</Control>
 </MiniLabStage>}
 </Lesson>;
}

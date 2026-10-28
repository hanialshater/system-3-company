"use client";
import {useState} from 'react';
import {Lesson} from '@/kit/Lesson';
import {Control,Row} from '@/kit/controls';
import {IsomerStage} from '@/lib/organic-chemistry/IsomerStage';
import model from './model.json';
export default function Demo({slug}:{slug:string}) {
 const [counted,setCounted]=useState(false);
 return <Lesson slug={slug} predict={{question:model.question,options:model.options,answer:model.answer}} exploreHint="Count the atoms, then trace the connections." reveal={()=><p>{model.explanation}</p>}>
 {({locked,interact})=><div><IsomerStage model={model} counted={counted}/><Row><Control disabled={locked||counted} onClick={()=>{setCounted(true);interact();}}>Count atoms</Control></Row></div>}
 </Lesson>;
}

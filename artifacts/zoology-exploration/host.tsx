import React from 'react';
import Bird from '../../src/demos/life/birds-among-dinosaurs/Demo';
import Fossil from '../../src/demos/life/fossil-tracks-and-bones/Demo';
export function DemoHost({slug}:{slug:string}) { const C=slug==='birds-among-dinosaurs'?Bird:Fossil; return <C slug={slug}/>; }

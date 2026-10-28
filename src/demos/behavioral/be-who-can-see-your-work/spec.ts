import type { MiniLabFrame, MiniLabSpec, MiniLabVisual } from "@/lib/mini-lab/types";
import { compute } from "./model";
const inputLabels = ["Peer sees you", "You see peer", "Distance m"];
const outputLabels = ["Visible to peer", "Peer visible", "Distance"];
const fmt = (n:number) => Number(n.toFixed(3)).toLocaleString("en-US",{maximumFractionDigits:3});
const inputs: number[][] = [[1, 0, 5], [0, 1, 5]];
export const results = inputs.map(compute);
function scenario(input:number[],index:number) {
 const values=results[index];
 const visual:MiniLabVisual = {
  kind:"graph",
  nodes:[{id:"me",label:"Me",x:70,y:85},{id:"peer",label:"Peer",x:250,y:85}],
  edges:[{from:input[0]>0?"peer":"me",to:input[0]>0?"me":"peer",label:"sees"}]
 };
 const summary=`${index===0?"A":"B"}: Visible to peer ${fmt(values[0])}`;
 const frames:MiniLabFrame[]=[
  {caption:"Toy inputs",visual:input.length>5?{kind:"grid",cells:input.map((value,i)=>({label:inputLabels[i],value}))}:{kind:"table",columns:["Input","Value"],rows:input.map((value,i)=>[inputLabels[i],value])}},
  {caption:"Toy sightline: viewer → seen",visual,metrics:[{label:outputLabels[0],value:fmt(values[0])},{label:"Distance m",value:fmt(values[2])}]}];
 return {id:index===0?"question":"contrast",label:index===0?"Question case":"Changed case",frames,summary};
}
const scenarios=inputs.map(scenario);
export const spec:MiniLabSpec={
 id:"be-who-can-see-your-work",family:"graph",setup:"Toy model: two controlled cases",hint:"Run the question case, then compare the changed case.",
 predict:{question:"In toy case A, the productive peer can see you but you cannot see the peer. Which visibility indicator is one?",options:["Peer sees you", "You see peer", "Neither direction"],answer:0},
 scenarios,
 reveal:[`You saw ${scenarios[0].summary}; ${scenarios[1].summary}.`,"Being close to a productive peer and being visible to that peer are different features. The two toy arrangements keep distance fixed and reverse visibility. That exposes the design distinction rather than assigning a productivity effect."]
};

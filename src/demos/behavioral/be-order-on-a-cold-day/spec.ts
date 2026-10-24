import type { MiniLabFrame, MiniLabSpec, MiniLabVisual } from "@/lib/mini-lab/types";
import { compute } from "./model";
const inputLabels = ["Order °C", "Use °C"];
const outputLabels = ["Change °C", "Mismatch °C", "Use °C"];
const fmt = (n:number) => Number(n.toFixed(3)).toLocaleString("en-US",{maximumFractionDigits:3});
const inputs: number[][] = [[-2, 10], [10, 10]];
export const results = inputs.map(compute);
function scenario(input:number[],index:number) {
 const values=results[index];
 const visual:MiniLabVisual = {kind:"timeline",events:[{label:"Order °C",value:input[0]},{label:"Use °C",value:input[1]}]};
 const summary=`${index===0?"A":"B"}: Mismatch °C ${fmt(values[1])}`;
 const frames:MiniLabFrame[]=[
  {caption:"Toy inputs",visual:input.length>5?{kind:"grid",cells:input.map((value,i)=>({label:inputLabels[i],value}))}:{kind:"table",columns:["Input","Value"],rows:input.map((value,i)=>[inputLabels[i],value])}},
  {caption:"Computed result",visual,metrics:[{label:outputLabels[1],value:fmt(values[1])}]}];
 return {id:index===0?"question":"contrast",label:index===0?"Question case":"Changed case",frames,summary};
}
const scenarios=inputs.map(scenario);
export const spec:MiniLabSpec={
 id:"be-order-on-a-cold-day",family:"timeline",setup:"Toy model: two controlled cases",hint:"Run the question case, then compare the changed case.",
 predict:{question:"You choose a coat on a −2°C day but use it at 10°C. What is the temperature mismatch in this toy comparison?",options:["8°C", "10°C", "12°C"],answer:2},
 scenarios,
 reveal:[`You saw ${scenarios[0].summary}; ${scenarios[1].summary}.`,"The purchase-day state and the consumption-day state are separate inputs. Their difference measures the toy mismatch; it does not prove that a buyer projected today’s preferences or explain a real return by itself."]
};

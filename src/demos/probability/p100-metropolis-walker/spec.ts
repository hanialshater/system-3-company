import type { MiniLabSpec } from "@/lib/mini-lab/types";
import { compute } from "./model";
const result=compute();
export const spec:MiniLabSpec={
 id:"p100-metropolis-walker",family:"metropolis",
 predict:{question:"A symmetric proposal moves from a state of target weight 3 to weight 1. Under the Metropolis rule, what is acceptance probability?",options:["1/3", "1/2", "1"],answer:0},
 setup:"Toy model: compare two controlled cases.",hint:"Run the question case, compare the changed case, and inspect both retained results.",
 scenarios:result.scenarios,reveal:result.reveal
};

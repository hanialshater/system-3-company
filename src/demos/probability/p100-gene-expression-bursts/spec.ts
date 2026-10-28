import type { MiniLabSpec } from "@/lib/mini-lab/types";
import { compute } from "./model";
const result=compute();
export const spec:MiniLabSpec={
 id:"p100-gene-expression-bursts",family:"gillespie",
 predict:{question:"A toy molecule count has birth rate 2 and death rate 0.5X. At X=6, what is the probability the next reaction is a birth?",options:["0.2", "0.4", "0.667"],answer:1},
 setup:"Toy model: compare two controlled cases.",hint:"Run the question case, compare the changed case, and inspect both retained results.",
 scenarios:result.scenarios,reveal:result.reveal
};

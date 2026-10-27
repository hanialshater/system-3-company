import type { MiniLabSpec } from "@/lib/mini-lab/types";
import { compute } from "./model";
const result=compute();
export const spec:MiniLabSpec={
 id:"p100-raindrops-on-a-sidewalk",family:"poisson",
 predict:{question:"A toy tile count is Poisson with mean one drop. What is its probability of zero drops?",options:["13.5%", "36.8%", "50%"],answer:1},
 setup:"Toy model: compare two controlled cases.",hint:"Run the question case, compare the changed case, and inspect both retained results.",
 scenarios:result.scenarios,reveal:result.reveal
};

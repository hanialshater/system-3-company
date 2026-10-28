import type { MiniLabSpec } from "@/lib/mini-lab/types";
import { compute } from "./model";
const result=compute();
export const spec:MiniLabSpec={
 id:"p100-long-run-heat-map",family:"markov",
 predict:{question:"A chain switches A\u2192B with probability 0.1 and B\u2192A with 0.2. What is its stationary share in A?",options:["1/3", "1/2", "2/3"],answer:2},
 setup:"Toy model: compare two controlled cases.",hint:"Run the question case, compare the changed case, and inspect both retained results.",
 scenarios:result.scenarios,reveal:result.reveal
};

import type { MiniLabSpec } from "@/lib/mini-lab/types";
import { compute } from "./model";
const result=compute();
export const spec:MiniLabSpec={
 id:"p100-random-surfer",family:"pagerank",
 predict:{question:"Two pages: A links only to B; B links equally to A and B. Teleport is uniform with probability 0.2. What is B\u2019s stationary share?",options:["35.7%", "50%", "64.3%"],answer:2},
 setup:"Toy model: compare two controlled cases.",hint:"Run the question case, compare the changed case, and inspect both retained results.",
 scenarios:result.scenarios,reveal:result.reveal
};

import type { MiniLabSpec } from "@/lib/mini-lab/types";
import { compute } from "./model";
const result=compute();
export const spec:MiniLabSpec={
 id:"p100-early-fizzle",family:"branching",
 predict:{question:"Each individual independently has either 0 offspring with probability 0.4 or 2 with 0.6. Starting from one, what is eventual extinction probability?",options:["0", "1/3", "2/3"],answer:2},
 setup:"Toy model: compare two controlled cases.",hint:"Run the question case, compare the changed case, and inspect both retained results.",
 scenarios:result.scenarios,reveal:result.reveal
};

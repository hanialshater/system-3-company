import type { MiniLabSpec } from "@/lib/mini-lab/types";
import { compute } from "./model";
const result=compute();
export const spec:MiniLabSpec={
 id:"p100-one-value-dominates",family:"heavy-tail",
 predict:{question:"Nine values are 1 and one is 100. What share of their sum belongs to the largest?",options:["10%", "50%", "91.7%"],answer:2},
 setup:"Toy model: compare two controlled cases.",hint:"Run the question case, compare the changed case, and inspect both retained results.",
 scenarios:result.scenarios,reveal:result.reveal
};

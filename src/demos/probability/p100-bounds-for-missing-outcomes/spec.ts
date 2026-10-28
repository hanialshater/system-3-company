import type { MiniLabSpec } from "@/lib/mini-lab/types";
import { compute } from "./model";
const result=compute();
export const spec:MiniLabSpec={
 id:"p100-bounds-for-missing-outcomes",family:"bounds",
 predict:{question:"Ten binary outcomes include three known ones, three known zeros and four missing. Without assumptions about missing values, what range can the full mean take?",options:["0.3\u20130.7", "0.5\u20130.5", "0.6\u20131.0"],answer:0},
 setup:"Toy model: compare two controlled cases.",hint:"Run the question case, compare the changed case, and inspect both retained results.",
 scenarios:result.scenarios,reveal:result.reveal
};

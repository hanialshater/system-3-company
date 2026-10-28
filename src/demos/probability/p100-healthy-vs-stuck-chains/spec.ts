import type { MiniLabSpec } from "@/lib/mini-lab/types";
import { compute } from "./model";
const result=compute();
export const spec:MiniLabSpec={
 id:"p100-healthy-vs-stuck-chains",family:"mixing",
 predict:{question:"Two fixed traces are 00001111 and 01010101. Both have mean 0.5. Which has more equal adjacent pairs?",options:["First trace", "Second trace", "Same count"],answer:0},
 setup:"Toy model: compare two controlled cases.",hint:"Run the question case, compare the changed case, and inspect both retained results.",
 scenarios:result.scenarios,reveal:result.reveal
};

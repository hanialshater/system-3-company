import type { MiniLabSpec } from "@/lib/mini-lab/types";
import { compute } from "./model";
const result=compute();
export const spec:MiniLabSpec={
 id:"p100-shortest-job-first",family:"scheduling",
 predict:{question:"Three jobs arrive together, lasting 8, 2 and 1 minutes. With no preemption or overhead, what is mean waiting time if shortest goes first?",options:["1.33 minutes", "3.67 minutes", "6 minutes"],answer:0},
 setup:"Toy model: compare two controlled cases.",hint:"Run the question case, compare the changed case, and inspect both retained results.",
 scenarios:result.scenarios,reveal:result.reveal
};

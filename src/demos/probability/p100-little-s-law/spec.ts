import type { MiniLabSpec } from "@/lib/mini-lab/types";
import { compute } from "./model";
const result=compute();
export const spec:MiniLabSpec={
 id:"p100-little-s-law",family:"little-law",
 predict:{question:"A stable toy service has 12 people present on average and 3 arrivals/minute. What is the mean time in the system?",options:["2 minutes", "4 minutes", "12 minutes"],answer:1},
 setup:"Toy model: compare two controlled cases.",hint:"Run the question case, compare the changed case, and inspect both retained results.",
 scenarios:result.scenarios,reveal:result.reveal
};

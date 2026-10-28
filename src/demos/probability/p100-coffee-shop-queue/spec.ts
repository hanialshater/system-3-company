import type { MiniLabSpec } from "@/lib/mini-lab/types";
import { compute } from "./model";
const result=compute();
export const spec:MiniLabSpec={
 id:"p100-coffee-shop-queue",family:"queue",
 predict:{question:"A toy M/M/1 queue serves 10 people/hour. Arrivals increase from 5 to 8/hour. What is the long-run mean number in the system at 8/hour?",options:["2", "4", "8"],answer:1},
 setup:"Toy model: compare two controlled cases.",hint:"Run the question case, compare the changed case, and inspect both retained results.",
 scenarios:result.scenarios,reveal:result.reveal
};

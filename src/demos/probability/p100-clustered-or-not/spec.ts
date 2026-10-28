import type { MiniLabSpec } from "@/lib/mini-lab/types";
import { compute } from "./model";
const result=compute();
export const spec:MiniLabSpec={
 id:"p100-clustered-or-not",family:"ripley",
 predict:{question:"Points lie at 0,1,9,10 on a line. Count other points within distance 1.1 of each point. What is the average neighbor count?",options:["0", "1", "2"],answer:1},
 setup:"Toy model: compare two controlled cases.",hint:"Run the question case, compare the changed case, and inspect both retained results.",
 scenarios:result.scenarios,reveal:result.reveal
};

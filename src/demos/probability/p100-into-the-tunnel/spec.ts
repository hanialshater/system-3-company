import type { MiniLabSpec } from "@/lib/mini-lab/types";
import { compute } from "./model";
const result=compute();
export const spec:MiniLabSpec={
 id:"p100-into-the-tunnel",family:"state-uncertainty",
 predict:{question:"Initial position variance is 1. Each prediction-only step adds process variance 2. After three steps without measurements, what is the variance?",options:["3", "6", "7"],answer:2},
 setup:"Toy model: compare two controlled cases.",hint:"Run the question case, compare the changed case, and inspect both retained results.",
 scenarios:result.scenarios,reveal:result.reveal
};

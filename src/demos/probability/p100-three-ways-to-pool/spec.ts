import type { MiniLabSpec } from "@/lib/mini-lab/types";
import { compute } from "./model";
const result=compute();
export const spec:MiniLabSpec={
 id:"p100-three-ways-to-pool",family:"pooling",
 predict:{question:"Groups have means 2 and 10, with counts 2 and 20. A prior mean 6 has strength 4. What is the small group\u2019s partially pooled mean?",options:["2", "4.667", "9.273"],answer:1},
 setup:"Toy model: compare two controlled cases.",hint:"Run the question case, compare the changed case, and inspect both retained results.",
 scenarios:result.scenarios,reveal:result.reveal
};

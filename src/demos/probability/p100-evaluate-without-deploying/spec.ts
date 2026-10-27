import type { MiniLabSpec } from "@/lib/mini-lab/types";
import { compute } from "./model";
const result=compute();
export const spec:MiniLabSpec={
 id:"p100-evaluate-without-deploying",family:"ips",
 predict:{question:"Ten logged actions contain eight A rewards of 1 and two B rewards of 3. Logging probabilities are 0.8,0.2; target probabilities are 0.2,0.8. What is the IPS value?",options:["1.4", "2", "2.6"],answer:2},
 setup:"Toy model: compare two controlled cases.",hint:"Run the question case, compare the changed case, and inspect both retained results.",
 scenarios:result.scenarios,reveal:result.reveal
};

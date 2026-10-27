import type { MiniLabSpec } from "@/lib/mini-lab/types";
import { compute } from "./model";
const result=compute();
export const spec:MiniLabSpec={
 id:"p100-which-kl",family:"kl",
 predict:{question:"Compare p=(0.499995,0.00001,0.499995) with qA=(0.9998,0.0001,0.0001) and uniform qB. Which candidate has smaller KL(q||p)?",options:["qA", "qB", "They tie"],answer:0},
 setup:"Toy model: compare two controlled cases.",hint:"Run the question case, compare the changed case, and inspect both retained results.",
 scenarios:result.scenarios,reveal:result.reveal
};

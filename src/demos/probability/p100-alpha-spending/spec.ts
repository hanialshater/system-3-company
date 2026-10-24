import type { MiniLabSpec } from "@/lib/mini-lab/types";
import { compute } from "./model";
const result=compute();
export const spec:MiniLabSpec={
 id:"p100-alpha-spending",family:"alpha-spending",
 predict:{question:"Four valid tests have per-look false-positive bounds 0.005,0.01,0.015,0.02. Without assuming independence, what union-bound limit applies to any false positive?",options:["0.02", "0.05", "0.20"],answer:1},
 setup:"Toy model: compare two controlled cases.",hint:"Run the question case, compare the changed case, and inspect both retained results.",
 scenarios:result.scenarios,reveal:result.reveal
};

import type { MiniLabSpec } from "@/lib/mini-lab/types";
import { compute } from "./model";
const result=compute();
export const spec:MiniLabSpec={
 id:"p100-insurer-ruin",family:"compound-risk",
 predict:{question:"A toy insurer starts with reserve 3, adds premium 3 each step, then pays claims 0,0,15,0,0,6. What is the reserve immediately after the third claim?",options:["\u22123", "0", "6"],answer:0},
 setup:"Toy model: compare two controlled cases.",hint:"Run the question case, compare the changed case, and inspect both retained results.",
 scenarios:result.scenarios,reveal:result.reveal
};

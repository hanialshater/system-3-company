import type { MiniLabSpec } from "@/lib/mini-lab/types";
import { compute } from "./model";
const result=compute();
export const spec:MiniLabSpec={
 id:"p100-ranking-slots-are-zero-sum",family:"ranking-interference",
 predict:{question:"Two slots have exposures 100 and 40. Boosting B swaps it with A. What is the change in total exposure?",options:["\u221260", "0", "+60"],answer:1},
 setup:"Toy model: compare two controlled cases.",hint:"Run the question case, compare the changed case, and inspect both retained results.",
 scenarios:result.scenarios,reveal:result.reveal
};

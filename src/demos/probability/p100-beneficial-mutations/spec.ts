import type { MiniLabSpec } from "@/lib/mini-lab/types";
import { compute } from "./model";
const result=compute();
export const spec:MiniLabSpec={
 id:"p100-beneficial-mutations",family:"fixation",
 predict:{question:"In a Moran toy population of 10, one mutant has relative fitness 1.5. Fixation probability is (1\u22121/r)/(1\u22121/r^N). Approximately what is it?",options:["10%", "34%", "100%"],answer:1},
 setup:"Toy model: compare two controlled cases.",hint:"Run the question case, compare the changed case, and inspect both retained results.",
 scenarios:result.scenarios,reveal:result.reveal
};

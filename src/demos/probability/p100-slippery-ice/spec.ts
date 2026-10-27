import type { MiniLabSpec } from "@/lib/mini-lab/types";
import { compute } from "./model";
const result=compute();
export const spec:MiniLabSpec={
 id:"p100-slippery-ice",family:"stochastic-mdp",
 predict:{question:"A shortcut pays 12 only if all three independent steps avoid a slip; otherwise it pays 0. Slip chance is 0.1 each step. What is expected shortcut reward?",options:["4.116", "8.748", "10.8"],answer:1},
 setup:"Toy model: compare two controlled cases.",hint:"Run the question case, compare the changed case, and inspect both retained results.",
 scenarios:result.scenarios,reveal:result.reveal
};

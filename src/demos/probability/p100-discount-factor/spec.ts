import type { MiniLabSpec } from "@/lib/mini-lab/types";
import { compute } from "./model";
const result=compute();
export const spec:MiniLabSpec={
 id:"p100-discount-factor",family:"discount-mdp",
 predict:{question:"Choose reward 4 now or reward 10 after three steps. With discounted value \u03b3^t r and \u03b3=0.8, what is the delayed reward\u2019s present value?",options:["1.25", "5.12", "10"],answer:1},
 setup:"Toy model: compare two controlled cases.",hint:"Run the question case, compare the changed case, and inspect both retained results.",
 scenarios:result.scenarios,reveal:result.reveal
};

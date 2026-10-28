import type { MiniLabSpec } from "@/lib/mini-lab/types";
import { compute } from "./model";
const result=compute();
export const spec:MiniLabSpec={
 id:"p100-back-to-the-mean",family:"gp-extrapolation",
 predict:{question:"A zero-mean, unit-variance noiseless GP has one observation y=4 at x=0 and RBF length scale 1. What is its posterior mean at x=3?",options:["0.044", "2.426", "4"],answer:0},
 setup:"Toy model: compare two controlled cases.",hint:"Run the question case, compare the changed case, and inspect both retained results.",
 scenarios:result.scenarios,reveal:result.reveal
};

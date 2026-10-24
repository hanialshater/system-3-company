import type { MiniLabSpec } from "@/lib/mini-lab/types";
import { compute } from "./model";
const result=compute();
export const spec:MiniLabSpec={
 id:"p100-kalman-gain",family:"kalman",
 predict:{question:"Prior position is 10 with variance 4; sensor reads 14 with variance 1. The scalar Kalman update gives what position?",options:["10.8", "12", "13.2"],answer:2},
 setup:"Toy model: compare two controlled cases.",hint:"Run the question case, compare the changed case, and inspect both retained results.",
 scenarios:result.scenarios,reveal:result.reveal
};

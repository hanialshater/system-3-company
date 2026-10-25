import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0567", "title": "Forward and reverse stationary flow", "op": "balanceflow", "labels": ["A", "B"], "outputs": ["Forward", "Reverse"], "a": [0.2, 0.4], "b": [0.3, 0.4], "question": "A toy two-state chain has transition chances A 0.2 and B 0.4. At stationarity, what probability flow goes 0→1 per step?", "questionTemplate": "A toy two-state chain has transition chances A {A} and B {B}. At stationarity, what probability flow goes 0→1 per step?", "explain": "The forward and reverse stationary flows agree here. Detailed balance is stronger than merely having an invariant distribution in a general chain.", "lens": "detailed balance in a specified two-state chain", "kind": "grid", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

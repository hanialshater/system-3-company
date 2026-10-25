import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0013", "title": "A race between overlapping patterns", "op": "patternrace", "labels": ["A", "B"], "outputs": ["BFirst"], "a": [0.0, 4.0], "b": [1.0, 5.0], "question": "Race two 3-flip patterns on a fair coin. A is code 0, B code 4, in binary with H=0,T=1. What probability does B finish first, iterated through 300 steps?", "questionTemplate": "Race two 3-flip patterns on a fair coin. A is code {A}, B code {B}, in binary with H=0,T=1. What probability does B finish first, iterated through 300 steps?", "explain": "Pattern overlaps determine first-arrival probabilities. The finite-state computation retains only suffixes that can begin either target.", "lens": "the suffix state in first-pattern arrival", "kind": "grid", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

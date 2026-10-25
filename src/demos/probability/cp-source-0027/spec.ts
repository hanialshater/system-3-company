import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0027", "title": "Why seven has more pairs", "op": "dice", "labels": ["Sides", "Sum"], "outputs": ["Probability"], "a": [6.0, 7.0], "b": [6.0, 2.0], "question": "Roll two independent uniform 6-sided dice numbered from 1. What is the probability their sum is 7?", "questionTemplate": "Roll two independent uniform {Sides}-sided dice numbered from 1. What is the probability their sum is {Sum}?", "explain": "Count ordered pairs, not just possible sums. Middle sums can be formed by more pairs.", "lens": "ordered pairs behind a sum", "kind": "grid", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

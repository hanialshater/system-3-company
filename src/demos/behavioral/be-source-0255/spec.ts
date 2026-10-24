import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0255", "title": "A name and an early return", "op": "growth", "labels": ["Baseline", "Percent"], "outputs": ["Final"], "a": [100.0, 8.0], "b": [100.0, 0.0], "question": "A toy baseline is 100; it changes by 8 percent. What is the final level?", "questionTemplate": "A toy baseline is {Baseline}; it changes by {Percent} percent. What is the final level?", "explain": "A relative percentage uses the baseline as denominator. It is different from the same number of percentage points.", "lens": "a descriptive return contrast without a causal conclusion", "kind": "bars", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

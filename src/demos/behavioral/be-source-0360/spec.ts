import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0360", "title": "A healthy share grows nine percent", "op": "growth", "labels": ["Baseline", "Percent"], "outputs": ["Final"], "a": [0.4, 9.0], "b": [0.6, 9.0], "question": "A toy baseline is 0.4; it changes by 9 percent. What is the final level?", "questionTemplate": "A toy baseline is {Baseline}; it changes by {Percent} percent. What is the final level?", "explain": "A relative percentage uses the baseline as denominator. It is different from the same number of percentage points.", "lens": "relative share change versus percentage points", "kind": "bars", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

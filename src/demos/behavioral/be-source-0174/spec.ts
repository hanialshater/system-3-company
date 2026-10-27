import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0174", "title": "The price after the storm", "op": "growth", "labels": ["Baseline", "Percent"], "outputs": ["Final"], "a": [20.0, 25.0], "b": [20.0, 0.0], "question": "A toy baseline is 20; it changes by 25 percent. What is the final level?", "explain": "A relative percentage uses the baseline as denominator. It is different from the same number of percentage points.", "lens": "the cash change before a fairness judgment", "kind": "bars", "answerPosition": 0, "questionTemplate": "A toy baseline is {Baseline}; it changes by {Percent} percent. What is the final level?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

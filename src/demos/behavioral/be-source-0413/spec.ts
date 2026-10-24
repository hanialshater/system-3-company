import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0413", "title": "A half-point daily market move", "op": "growth", "labels": ["Baseline", "Percent"], "outputs": ["Final"], "a": [100.0, -0.5], "b": [200.0, -0.5], "question": "A toy baseline is 100; it changes by -0.5 percent. What is the final level?", "questionTemplate": "A toy baseline is {Baseline}; it changes by {Percent} percent. What is the final level?", "explain": "A relative percentage uses the baseline as denominator. It is different from the same number of percentage points.", "lens": "the price baseline behind a percentage return", "kind": "bars", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

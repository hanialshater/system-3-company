import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0212", "title": "Fewer prescriptions from what base?", "op": "growth", "labels": ["Baseline", "Percent"], "outputs": ["Final"], "a": [1000.0, -3.3], "b": [200.0, -3.3], "question": "A toy baseline is 1000; it changes by -3.3 percent. What is the final level?", "explain": "A relative percentage uses the baseline as denominator. It is different from the same number of percentage points.", "lens": "the baseline used by a relative reduction", "kind": "bars", "answerPosition": 2, "questionTemplate": "A toy baseline is {Baseline}; it changes by {Percent} percent. What is the final level?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

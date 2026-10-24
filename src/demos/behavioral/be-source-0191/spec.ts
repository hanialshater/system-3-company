import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0191", "title": "A gift in the mailing", "op": "growth", "labels": ["Baseline", "Percent"], "outputs": ["Final"], "a": [10.0, 17.0], "b": [10.0, 75.0], "question": "A toy baseline is 10; it changes by 17 percent. What is the final level?", "explain": "A relative percentage uses the baseline as denominator. It is different from the same number of percentage points.", "lens": "the baseline in a relative response comparison", "kind": "bars", "answerPosition": 2, "questionTemplate": "A toy baseline is {Baseline}; it changes by {Percent} percent. What is the final level?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

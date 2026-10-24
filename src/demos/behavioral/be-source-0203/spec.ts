import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0203", "title": "Two percent of a household bill", "op": "growth", "labels": ["Baseline", "Percent"], "outputs": ["Final"], "a": [1000.0, -2.0], "b": [2000.0, -2.0], "question": "A toy baseline is 1000; it changes by -2 percent. What is the final level?", "explain": "A relative percentage uses the baseline as denominator. It is different from the same number of percentage points.", "lens": "the baseline behind a relative energy change", "kind": "bars", "answerPosition": 2, "questionTemplate": "A toy baseline is {Baseline}; it changes by {Percent} percent. What is the final level?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

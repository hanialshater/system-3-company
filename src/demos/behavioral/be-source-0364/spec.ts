import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0364", "title": "Neighbor comparisons and water", "op": "growth", "labels": ["Baseline", "Percent"], "outputs": ["Final"], "a": [100.0, -4.8], "b": [300.0, -4.8], "question": "A toy baseline is 100; it changes by -4.8 percent. What is the final level?", "questionTemplate": "A toy baseline is {Baseline}; it changes by {Percent} percent. What is the final level?", "explain": "A relative percentage uses the baseline as denominator. It is different from the same number of percentage points.", "lens": "the water-use baseline behind a relative reduction", "kind": "bars", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

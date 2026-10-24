import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0379", "title": "An office closes, applications fall", "op": "growth", "labels": ["Baseline", "Percent"], "outputs": ["Final"], "a": [1000.0, -16.0], "b": [500.0, -16.0], "question": "A toy baseline is 1000; it changes by -16 percent. What is the final level?", "questionTemplate": "A toy baseline is {Baseline}; it changes by {Percent} percent. What is the final level?", "explain": "A relative percentage uses the baseline as denominator. It is different from the same number of percentage points.", "lens": "the baseline behind a relative application change", "kind": "bars", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

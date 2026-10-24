import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0348", "title": "Volume after a tax", "op": "growth", "labels": ["Baseline", "Percent"], "outputs": ["Final"], "a": [1000.0, -38.0], "b": [2000.0, -38.0], "question": "A toy baseline is 1000; it changes by -38 percent. What is the final level?", "questionTemplate": "A toy baseline is {Baseline}; it changes by {Percent} percent. What is the final level?", "explain": "A relative percentage uses the baseline as denominator. It is different from the same number of percentage points.", "lens": "the baseline and units behind a volume change", "kind": "bars", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

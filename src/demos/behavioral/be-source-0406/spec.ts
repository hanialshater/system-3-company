import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0406", "title": "An old story gets new attention", "op": "growth", "labels": ["Baseline", "Percent"], "outputs": ["Final"], "a": [10.0, 300.0], "b": [10.0, 0.0], "question": "A toy baseline is 10; it changes by 300 percent. What is the final level?", "questionTemplate": "A toy baseline is {Baseline}; it changes by {Percent} percent. What is the final level?", "explain": "A relative percentage uses the baseline as denominator. It is different from the same number of percentage points.", "lens": "the baseline behind a large price jump", "kind": "bars", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

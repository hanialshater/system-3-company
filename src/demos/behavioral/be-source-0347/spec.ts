import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0347", "title": "Calories per transaction", "op": "growth", "labels": ["Baseline", "Percent"], "outputs": ["Final"], "a": [300.0, -6.0], "b": [500.0, -6.0], "question": "A toy baseline is 300; it changes by -6 percent. What is the final level?", "questionTemplate": "A toy baseline is {Baseline}; it changes by {Percent} percent. What is the final level?", "explain": "A relative percentage uses the baseline as denominator. It is different from the same number of percentage points.", "lens": "the starting calories behind a relative change", "kind": "bars", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

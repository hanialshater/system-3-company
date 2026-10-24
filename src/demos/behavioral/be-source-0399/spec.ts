import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0399", "title": "Output after rank feedback", "op": "growth", "labels": ["Baseline", "Percent"], "outputs": ["Final"], "a": [100.0, 7.0], "b": [300.0, 7.0], "question": "A toy baseline is 100; it changes by 7 percent. What is the final level?", "questionTemplate": "A toy baseline is {Baseline}; it changes by {Percent} percent. What is the final level?", "explain": "A relative percentage uses the baseline as denominator. It is different from the same number of percentage points.", "lens": "the base behind a relative productivity increment", "kind": "bars", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

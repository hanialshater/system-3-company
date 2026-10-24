import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0189", "title": "A wage and an effort schedule", "op": "growth", "labels": ["Baseline", "Percent"], "outputs": ["Final"], "a": [10.0, 20.0], "b": [10.0, 0.0], "question": "A toy baseline is 10; it changes by 20 percent. What is the final level?", "explain": "A relative percentage uses the baseline as denominator. It is different from the same number of percentage points.", "lens": "the output scale in a supplied effort rule", "kind": "bars", "answerPosition": 0, "questionTemplate": "A toy baseline is {Baseline}; it changes by {Percent} percent. What is the final level?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0313", "title": "Attendance after the reward", "op": "growth", "labels": ["Baseline", "Percent"], "outputs": ["Final"], "a": [2.0, 100.0], "b": [4.0, 100.0], "question": "A toy baseline is 2; it changes by 100 percent. What is the final level?", "questionTemplate": "A toy baseline is {Baseline}; it changes by {Percent} percent. What is the final level?", "explain": "A relative percentage uses the baseline as denominator. It is different from the same number of percentage points.", "lens": "the starting attendance behind doubling", "kind": "bars", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

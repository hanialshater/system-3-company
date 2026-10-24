import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0402", "title": "A past loser and a future return", "op": "growth", "labels": ["Baseline", "Percent"], "outputs": ["Final"], "a": [80.0, 20.0], "b": [120.0, -10.0], "question": "A toy baseline is 80; it changes by 20 percent. What is the final level?", "questionTemplate": "A toy baseline is {Baseline}; it changes by {Percent} percent. What is the final level?", "explain": "A relative percentage uses the baseline as denominator. It is different from the same number of percentage points.", "lens": "the separate periods in a return-reversal example", "kind": "bars", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

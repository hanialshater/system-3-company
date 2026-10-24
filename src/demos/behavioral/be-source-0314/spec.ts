import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0314", "title": "Initial loss and later regain", "op": "growth", "labels": ["Baseline", "Percent"], "outputs": ["Final"], "a": [14.0, -50.0], "b": [4.0, 0.0], "question": "A toy baseline is 14; it changes by -50 percent. What is the final level?", "questionTemplate": "A toy baseline is {Baseline}; it changes by {Percent} percent. What is the final level?", "explain": "A relative percentage uses the baseline as denominator. It is different from the same number of percentage points.", "lens": "the retained amount after a specified reversal", "kind": "bars", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

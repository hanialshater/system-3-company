import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0400", "title": "Time and money are different outcomes", "op": "growth", "labels": ["Baseline", "Percent"], "outputs": ["Final"], "a": [100.0, 142.0], "b": [100.0, 171.0], "question": "A toy baseline is 100; it changes by 142 percent. What is the final level?", "questionTemplate": "A toy baseline is {Baseline}; it changes by {Percent} percent. What is the final level?", "explain": "A relative percentage uses the baseline as denominator. It is different from the same number of percentage points.", "lens": "two specified growth rates on a common toy baseline", "kind": "bars", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

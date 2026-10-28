import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0068", "title": "A tenfold change from what?", "op": "growth", "labels": ["Baseline", "Percent"], "outputs": ["Final"], "a": [2.0, 900.0], "b": [20.0, 900.0], "question": "A toy baseline is 2; it changes by 900 percent. What is the final level?", "explain": "A relative percentage uses the baseline as denominator. It is different from the same number of percentage points.", "lens": "the base behind a large relative increase", "kind": "bars", "answerPosition": 2, "questionTemplate": "A toy baseline is {Baseline}; it changes by {Percent} percent. What is the final level?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

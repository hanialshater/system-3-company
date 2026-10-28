import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0218", "title": "Another caller's donation", "op": "growth", "labels": ["Baseline", "Percent"], "outputs": ["Final"], "a": [100.0, 12.0], "b": [200.0, 12.0], "question": "A toy baseline is 100; it changes by 12 percent. What is the final level?", "explain": "A relative percentage uses the baseline as denominator. It is different from the same number of percentage points.", "lens": "the baseline in a relative donation increase", "kind": "bars", "answerPosition": 2, "questionTemplate": "A toy baseline is {Baseline}; it changes by {Percent} percent. What is the final level?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

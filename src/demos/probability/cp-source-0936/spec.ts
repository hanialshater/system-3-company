import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0936", "title": "Turn growth into a doubling time", "op": "doublingtime", "labels": ["Rate"], "outputs": ["Time"], "a": [0.07], "b": [0.14], "question": "A toy count grows by fraction Rate 0.07 each period. What doubling time follows from discrete compounding?", "questionTemplate": "A toy count grows by fraction Rate {Rate} each period. What doubling time follows from discrete compounding?", "explain": "Doubling time translates a constant proportional growth assumption into time units. Changing rates break that extrapolation.", "lens": "the discrete daily growth assumption", "kind": "bars", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

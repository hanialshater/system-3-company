import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0135", "title": "Up fifty, down fifty", "op": "tworeturns", "labels": ["Up", "Down"], "outputs": ["Factor"], "a": [0.5, -0.5], "b": [0.1, -0.1], "question": "A toy investment returns 0.5 in one period and -0.5 in the next. What final-to-initial wealth factor results?", "questionTemplate": "A toy investment returns {Up} in one period and {Down} in the next. What final-to-initial wealth factor results?", "explain": "Returns multiply through the changing balance. Their arithmetic average need not describe realized compound growth.", "lens": "multiplicative return arithmetic", "kind": "grid", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

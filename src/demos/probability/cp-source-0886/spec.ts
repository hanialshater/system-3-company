import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0886", "title": "A noisy pretrend may look insignificant", "op": "zstat", "labels": ["Estimate", "Null", "SE"], "outputs": ["Z"], "a": [0.2, 0.0, 0.5], "b": [0.2, 0.0, 0.05], "question": "A toy Estimate 0.2 has standard error SE 0.5; the null value is 0. What standardized contrast results?", "questionTemplate": "A toy Estimate {Estimate} has standard error SE {SE}; the null value is {Null}. What standardized contrast results?", "explain": "The same estimated contrast looks less precise with greater standard error. A test additionally needs a justified sampling distribution.", "lens": "the standard error behind a pretrend diagnostic", "kind": "bars", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

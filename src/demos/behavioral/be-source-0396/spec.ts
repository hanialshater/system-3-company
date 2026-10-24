import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0396", "title": "Which worker attribute gets weight?", "op": "anchor", "labels": ["Anchor", "Evidence", "Weight"], "outputs": ["Estimate"], "a": [90.0, 40.0, 0.8], "b": [90.0, 40.0, 0.2], "question": "A toy estimate gives anchor 90 weight 0.8 and evidence 40 the remaining weight. What estimate results?", "questionTemplate": "A toy estimate gives anchor {Anchor} weight {Weight} and evidence {Evidence} the remaining weight. What estimate results?", "explain": "An estimate can move because the arbitrary starting point moves. The contrast holds the evidence fixed to expose that channel.", "lens": "the weighting rule for two applicant attributes", "kind": "bars", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

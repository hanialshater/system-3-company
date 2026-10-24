import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0039", "title": "A fresh data release", "op": "anchor", "labels": ["Anchor", "Evidence", "Weight"], "outputs": ["Estimate"], "a": [2.0, 4.0, 0.8], "b": [6.0, 4.0, 0.8], "question": "A toy estimate gives anchor 2 weight 0.8 and evidence 4 the remaining weight. What estimate results?", "explain": "An estimate can move because the arbitrary starting point moves. The contrast holds the evidence fixed to expose that channel.", "lens": "the weight placed on recent information", "kind": "bars", "answerPosition": 0, "questionTemplate": "A toy estimate gives anchor {Anchor} weight {Weight} and evidence {Evidence} the remaining weight. What estimate results?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0027", "title": "Recall changes the mixture", "op": "anchor", "labels": ["Anchor", "Evidence", "Weight"], "outputs": ["Estimate"], "a": [20.0, 60.0, 0.2], "b": [20.0, 60.0, 0.8], "question": "A toy estimate gives anchor 20 weight 0.2 and evidence 60 the remaining weight. What estimate results?", "explain": "An estimate can move because the arbitrary starting point moves. The contrast holds the evidence fixed to expose that channel.", "lens": "which information receives weight", "kind": "bars", "answerPosition": 0, "questionTemplate": "A toy estimate gives anchor {Anchor} weight {Weight} and evidence {Evidence} the remaining weight. What estimate results?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

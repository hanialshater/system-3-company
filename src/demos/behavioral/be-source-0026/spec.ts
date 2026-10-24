import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0026", "title": "An implausible age cue", "op": "anchor", "labels": ["Anchor", "Evidence", "Weight"], "outputs": ["Estimate"], "a": [9.0, 78.0, 0.25], "b": [140.0, 78.0, 0.25], "question": "A toy estimate gives anchor 9 weight 0.25 and evidence 78 the remaining weight. What estimate results?", "explain": "An estimate can move because the arbitrary starting point moves. The contrast holds the evidence fixed to expose that channel.", "lens": "the weight allowed to an implausible cue", "kind": "bars", "answerPosition": 2, "questionTemplate": "A toy estimate gives anchor {Anchor} weight {Weight} and evidence {Evidence} the remaining weight. What estimate results?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

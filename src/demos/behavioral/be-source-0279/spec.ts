import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0279", "title": "Fear and the starting estimate", "op": "anchor", "labels": ["Anchor", "Evidence", "Weight"], "outputs": ["Estimate"], "a": [80.0, 30.0, 0.6], "b": [10.0, 30.0, 0.6], "question": "A toy estimate gives anchor 80 weight 0.6 and evidence 30 the remaining weight. What estimate results?", "questionTemplate": "A toy estimate gives anchor {Anchor} weight {Weight} and evidence {Evidence} the remaining weight. What estimate results?", "explain": "An estimate can move because the arbitrary starting point moves. The contrast holds the evidence fixed to expose that channel.", "lens": "the cue entering a risk-judgment rule", "kind": "bars", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

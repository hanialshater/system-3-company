import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0254", "title": "Benefit colors the risk estimate", "op": "anchor", "labels": ["Anchor", "Evidence", "Weight"], "outputs": ["Estimate"], "a": [20.0, 60.0, 0.7], "b": [20.0, 60.0, 0.1], "question": "A toy estimate gives anchor 20 weight 0.7 and evidence 60 the remaining weight. What estimate results?", "questionTemplate": "A toy estimate gives anchor {Anchor} weight {Weight} and evidence {Evidence} the remaining weight. What estimate results?", "explain": "An estimate can move because the arbitrary starting point moves. The contrast holds the evidence fixed to expose that channel.", "lens": "the weight given to a favorable cue", "kind": "bars", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

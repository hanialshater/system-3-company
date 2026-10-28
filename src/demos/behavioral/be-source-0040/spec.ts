import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0040", "title": "An unrelated number", "op": "anchor", "labels": ["Anchor", "Evidence", "Weight"], "outputs": ["Estimate"], "a": [10.0, 50.0, 0.2], "b": [90.0, 50.0, 0.2], "question": "A toy estimate gives anchor 10 weight 0.2 and evidence 50 the remaining weight. What estimate results?", "explain": "An estimate can move because the arbitrary starting point moves. The contrast holds the evidence fixed to expose that channel.", "lens": "an irrelevant cue in an explicit model", "kind": "bars", "answerPosition": 1, "questionTemplate": "A toy estimate gives anchor {Anchor} weight {Weight} and evidence {Evidence} the remaining weight. What estimate results?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

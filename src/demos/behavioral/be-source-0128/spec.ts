import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0128", "title": "Owning an object longer", "op": "anchor", "labels": ["Anchor", "Evidence", "Weight"], "outputs": ["Estimate"], "a": [100.0, 80.0, 0.8], "b": [100.0, 80.0, 0.2], "question": "A toy estimate gives anchor 100 weight 0.8 and evidence 80 the remaining weight. What estimate results?", "explain": "An estimate can move because the arbitrary starting point moves. The contrast holds the evidence fixed to expose that channel.", "lens": "a chosen ownership-related weight in a toy valuation", "kind": "bars", "answerPosition": 2, "questionTemplate": "A toy estimate gives anchor {Anchor} weight {Weight} and evidence {Evidence} the remaining weight. What estimate results?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

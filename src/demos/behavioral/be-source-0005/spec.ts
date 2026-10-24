import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0005", "title": "Combine the loss estimates", "op": "shrink", "labels": ["Estimate", "Weight", "Other"], "outputs": ["Mean"], "a": [2.25, 4.0, 1.0], "b": [2.25, 1.0, 1.0], "question": "A toy pooled estimate gives 2.25 weight 4 and another estimate 1 weight 1. What is the weighted mean?", "explain": "A pooled result depends on both estimates and their weights. A larger headline alone is not stronger evidence.", "lens": "the weights behind a pooled estimate", "kind": "grid", "answerPosition": 2, "questionTemplate": "A toy pooled estimate gives {Estimate} weight {Weight} and another estimate {Other} weight 1. What is the weighted mean?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

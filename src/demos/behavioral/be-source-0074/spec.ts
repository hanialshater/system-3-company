import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0074", "title": "What if missing studies differ?", "op": "shrink", "labels": ["Estimate", "Weight", "Other"], "outputs": ["Mean"], "a": [0.43, 5.0, 0.0], "b": [0.43, 1.0, 0.0], "question": "A toy pooled estimate gives 0.43 weight 5 and another estimate 0 weight 1. What is the weighted mean?", "explain": "A pooled result depends on both estimates and their weights. A larger headline alone is not stronger evidence.", "lens": "the contribution of less favorable evidence", "kind": "grid", "answerPosition": 2, "questionTemplate": "A toy pooled estimate gives {Estimate} weight {Weight} and another estimate {Other} weight 1. What is the weighted mean?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

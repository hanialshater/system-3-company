import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0142", "title": "An average near zero", "op": "shrink", "labels": ["Estimate", "Weight", "Other"], "outputs": ["Mean"], "a": [0.5, 1.0, -0.5], "b": [0.5, 3.0, -0.5], "question": "A toy pooled estimate gives 0.5 weight 1 and another estimate -0.5 weight 1. What is the weighted mean?", "explain": "A pooled result depends on both estimates and their weights. A larger headline alone is not stronger evidence.", "lens": "heterogeneity behind a pooled overload estimate", "kind": "grid", "answerPosition": 1, "questionTemplate": "A toy pooled estimate gives {Estimate} weight {Weight} and another estimate {Other} weight 1. What is the weighted mean?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

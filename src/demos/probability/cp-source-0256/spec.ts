import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0256", "title": "Pull early averages toward the group", "op": "shrink", "labels": ["Estimate", "Weight", "Other"], "outputs": ["Mean"], "a": [0.4, 2.0, 0.25], "b": [0.4, 20.0, 0.25], "question": "A toy pooled estimate gives 0.4 weight 2 and another estimate 0.25 weight 1. What is the weighted mean?", "questionTemplate": "A toy pooled estimate gives {Estimate} weight {Weight} and another estimate {Other} weight 1. What is the weighted mean?", "explain": "A pooled result depends on both estimates and their weights. A larger headline alone is not stronger evidence.", "lens": "the evidence weight in a toy shrinkage estimator", "kind": "grid", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

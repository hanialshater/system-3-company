import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0023", "title": "A smaller later estimate", "op": "shrink", "labels": ["Estimate", "Weight", "Other"], "outputs": ["Mean"], "a": [0.8, 1.0, 0.1], "b": [0.8, 10.0, 0.1], "question": "A toy pooled estimate gives 0.8 weight 1 and another estimate 0.1 weight 1. What is the weighted mean?", "explain": "A pooled result depends on both estimates and their weights. A larger headline alone is not stronger evidence.", "lens": "how evidence weights affect an apparent replication gap", "kind": "grid", "answerPosition": 2, "questionTemplate": "A toy pooled estimate gives {Estimate} weight {Weight} and another estimate {Other} weight 1. What is the weighted mean?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

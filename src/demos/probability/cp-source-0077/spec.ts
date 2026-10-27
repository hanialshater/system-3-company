import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0077", "title": "A Cauchy average keeps its scale", "op": "cauchyscale", "labels": ["Scale", "N"], "outputs": ["MeanScale"], "a": [1.0, 1.0], "b": [1.0, 100.0], "question": "Average 1 independent centered Cauchy draws, each with scale 1. What is the scale of the average’s Cauchy distribution?", "questionTemplate": "Average {N} independent centered Cauchy draws, each with scale {Scale}. What is the scale of the average’s Cauchy distribution?", "explain": "Cauchy stability preserves this scale rather than shrinking it with sample size. The usual finite-variance averaging argument does not apply.", "lens": "the failure of finite-variance averaging assumptions", "kind": "grid", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

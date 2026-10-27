import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0979", "title": "A random-matrix limit has a shape", "op": "semicircle", "labels": ["X", "Sigma"], "outputs": ["Density"], "a": [0.0, 1.0], "b": [1.5, 1.0], "question": "A stipulated semicircle law has scale Sigma 1. What limiting density occurs at X 0?", "questionTemplate": "A stipulated semicircle law has scale Sigma {Sigma}. What limiting density occurs at X {X}?", "explain": "The density describes a large-matrix limit under suitable normalization and assumptions. It is not an exact finite-matrix eigenvalue histogram.", "lens": "the limiting semicircle density at two coordinates", "kind": "curve", "answerPosition": 1, "plot": [0, -3, 3]};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

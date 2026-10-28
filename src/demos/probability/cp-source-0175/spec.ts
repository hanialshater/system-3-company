import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0175", "title": "Distance scale in a larger cube", "op": "distance", "labels": ["Dimension"], "outputs": ["RMS"], "a": [2.0], "b": [100.0], "question": "Two independent toy points are uniform on a unit cube with Dimension 2. What is their root-mean-square Euclidean distance?", "questionTemplate": "Two independent toy points are uniform on a unit cube with Dimension {Dimension}. What is their root-mean-square Euclidean distance?", "explain": "Squared coordinate differences add in expectation. Root-mean-square distance is not identical to mean distance or a proof of concentration by itself.", "lens": "the root-mean-square distance between uniform points", "kind": "grid", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0978", "title": "Independent steps set a walk scale", "op": "rmswalk", "labels": ["Steps", "Size"], "outputs": ["RMS"], "a": [100.0, 1.0], "b": [400.0, 1.0], "question": "A symmetric independent toy walk takes 100 steps of magnitude 1. What is its root-mean-square displacement?", "questionTemplate": "A symmetric independent toy walk takes {Steps} steps of magnitude {Size}. What is its root-mean-square displacement?", "explain": "Independent zero-mean increments add variances. Root-mean-square displacement differs from total distance traveled and mean absolute displacement.", "lens": "the unrestricted-walk benchmark before self-avoidance", "kind": "grid", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

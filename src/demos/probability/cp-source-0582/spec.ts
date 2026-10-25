import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0582", "title": "A large proposal can be rejected", "op": "normalmh", "labels": ["Current", "Proposed"], "outputs": ["Acceptance"], "a": [0.0, 0.1], "b": [0.0, 3.0], "question": "A symmetric toy Metropolis proposal moves from 0 to 0.1 under a standard-normal target. What is acceptance probability?", "questionTemplate": "A symmetric toy Metropolis proposal moves from {Current} to {Proposed} under a standard-normal target. What is acceptance probability?", "explain": "Acceptance compares target densities because proposal terms cancel here. High acceptance alone does not establish rapid exploration.", "lens": "the acceptance ratio under a symmetric standard-normal proposal", "kind": "grid", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

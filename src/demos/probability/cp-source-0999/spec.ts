import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0999", "title": "A proposed fold has an energy ratio", "op": "normalmh", "labels": ["Current", "Proposed"], "outputs": ["Acceptance"], "a": [2.0, 1.0], "b": [1.0, 2.0], "question": "A symmetric toy Metropolis proposal moves from 2 to 1 under a standard-normal target. What is acceptance probability?", "questionTemplate": "A symmetric toy Metropolis proposal moves from {Current} to {Proposed} under a standard-normal target. What is acceptance probability?", "explain": "Acceptance compares target densities because proposal terms cancel here. High acceptance alone does not establish rapid exploration.", "lens": "the Metropolis acceptance ingredient for a quadratic toy energy", "kind": "grid", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

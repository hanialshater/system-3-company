import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0021", "title": "How many runs should a coin make?", "op": "runs", "labels": ["N", "P"], "outputs": ["ExpectedRuns"], "a": [100.0, 0.5], "b": [100.0, 0.8], "question": "A sequence has 100 independent flips with heads probability 0.5. A run is a maximal block of identical results. What is the expected number of runs?", "questionTemplate": "A sequence has {N} independent flips with heads probability {P}. A run is a maximal block of identical results. What is the expected number of runs?", "explain": "Count the first block plus each transition. A run summary can challenge a proposed random generator without proving how a person generated a particular sequence.", "lens": "transitions in an independent sequence", "kind": "grid", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0809", "title": "Coverage can fail after a shift", "op": "coverage", "labels": ["Nominal", "Hits", "Trials"], "outputs": ["Misses"], "a": [0.9, 90.0, 100.0], "b": [0.9, 60.0, 100.0], "question": "A toy interval procedure claims coverage 0.9; it covers 90 of 100 targets. How many targets were missed?", "questionTemplate": "A toy interval procedure claims coverage {Nominal}; it covers {Hits} of {Trials} targets. How many targets were missed?", "explain": "Count realized coverage before trusting the stated confidence. A narrow interval can be precise in appearance and poorly calibrated.", "lens": "the realized coverage count in two stipulated populations", "kind": "grid", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

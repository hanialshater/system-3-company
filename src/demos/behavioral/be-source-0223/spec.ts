import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0223", "title": "A narrow interval misses", "op": "coverage", "labels": ["Nominal", "Hits", "Trials"], "outputs": ["Misses"], "a": [0.98, 60.0, 100.0], "b": [0.98, 98.0, 100.0], "question": "A toy interval procedure claims coverage 0.98; it covers 60 of 100 targets. How many targets were missed?", "explain": "Count realized coverage before trusting the stated confidence. A narrow interval can be precise in appearance and poorly calibrated.", "lens": "the realized miss count behind a confidence claim", "kind": "grid", "answerPosition": 1, "questionTemplate": "A toy interval procedure claims coverage {Nominal}; it covers {Hits} of {Trials} targets. How many targets were missed?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

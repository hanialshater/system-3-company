import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0812", "title": "Count intervals that miss their target", "op": "coverage", "labels": ["Nominal", "Hits", "Trials"], "outputs": ["Misses"], "a": [0.95, 95.0, 100.0], "b": [0.95, 80.0, 100.0], "question": "A toy interval procedure claims coverage 0.95; it covers 95 of 100 targets. How many targets were missed?", "questionTemplate": "A toy interval procedure claims coverage {Nominal}; it covers {Hits} of {Trials} targets. How many targets were missed?", "explain": "Count realized coverage before trusting the stated confidence. A narrow interval can be precise in appearance and poorly calibrated.", "lens": "realized misses before interpreting nominal coverage", "kind": "grid", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

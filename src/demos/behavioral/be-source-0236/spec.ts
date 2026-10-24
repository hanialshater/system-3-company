import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0236", "title": "Precision on paper", "op": "coverage", "labels": ["Nominal", "Hits", "Trials"], "outputs": ["Misses"], "a": [0.9, 5.0, 10.0], "b": [0.9, 9.0, 10.0], "question": "A toy interval procedure claims coverage 0.9; it covers 5 of 10 targets. How many targets were missed?", "explain": "Count realized coverage before trusting the stated confidence. A narrow interval can be precise in appearance and poorly calibrated.", "lens": "the realized coverage of a stated interval procedure", "kind": "grid", "answerPosition": 2, "questionTemplate": "A toy interval procedure claims coverage {Nominal}; it covers {Hits} of {Trials} targets. How many targets were missed?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

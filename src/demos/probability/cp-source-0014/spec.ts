import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0014", "title": "HH and HT take different times", "op": "runwait", "labels": ["P", "Pattern"], "outputs": ["Expected"], "a": [0.5, 0.0], "b": [0.5, 1.0], "question": "Independent flips have heads probability 0.5. Pattern 0 means HH if 0, HT if 1. What is the expected waiting time from no prefix?", "questionTemplate": "Independent flips have heads probability {P}. Pattern {Pattern} means HH if 0, HT if 1. What is the expected waiting time from no prefix?", "explain": "Overlapping prefixes alter the waiting time. Both patterns have the same one-window probability for a fair coin but different restart behavior.", "lens": "prefix overlap in waiting times", "kind": "grid", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

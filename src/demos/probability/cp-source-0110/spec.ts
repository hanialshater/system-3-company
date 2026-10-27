import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0110", "title": "B versus a uniform uncertain A", "op": "betabeatsuniform", "labels": ["Alpha", "Beta"], "outputs": ["WinProbability"], "a": [8.0, 3.0], "b": [3.0, 8.0], "question": "Independent A is uniform on [0,1]; B is Beta(8,3). What is the probability that B exceeds A?", "questionTemplate": "Independent A is uniform on [0,1]; B is Beta({Alpha},{Beta}). What is the probability that B exceeds A?", "explain": "Conditioning on B makes the probability equal to B, so averaging gives its mean. This simplification relies on the specifically uniform comparator.", "lens": "the special case of a uniform comparator posterior", "kind": "grid", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

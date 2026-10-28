import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0208", "title": "A short code for the common symbol", "op": "codeaverage", "labels": ["P1", "P2", "L1", "L2", "L3"], "outputs": ["MeanLength"], "a": [0.6, 0.2, 1.0, 2.0, 2.0], "b": [0.2, 0.2, 1.0, 2.0, 2.0], "question": "Three toy symbols have probabilities 0.6,0.2,and the remainder; code lengths 1,2,2. What is the mean code length?", "questionTemplate": "Three toy symbols have probabilities {P1},{P2},and the remainder; code lengths {L1},{L2},{L3}. What is the mean code length?", "explain": "Frequent symbols have greater influence on average length. Code validity and the chosen symbol probabilities must be checked separately.", "lens": "the probability weight of a short code", "kind": "grid", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

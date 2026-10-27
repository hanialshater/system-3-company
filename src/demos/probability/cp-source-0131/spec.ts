import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0131", "title": "The bankroll needed after losses", "op": "doubling", "labels": ["Stake", "Losses"], "outputs": ["Required", "Next"], "a": [1.0, 10.0], "b": [1.0, 20.0], "question": "A toy doubling strategy begins at stake 1. After 10 consecutive losses, how much total has been lost?", "questionTemplate": "A toy doubling strategy begins at stake {Stake}. After {Losses} consecutive losses, how much total has been lost?", "explain": "Losses accumulate geometrically. A finite bankroll or table limit prevents indefinite doubling.", "lens": "the geometric cost of a doubling strategy", "kind": "grid", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

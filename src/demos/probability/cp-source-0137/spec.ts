import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0137", "title": "Reciprocal odds exceed one", "op": "overround", "labels": ["OddsA", "OddsB"], "outputs": ["Excess"], "a": [1.9, 1.9], "b": [2.0, 2.0], "question": "Two exhaustive outcomes have toy decimal odds 1.9 and 1.9. What is the sum of implied probabilities minus one?", "questionTemplate": "Two exhaustive outcomes have toy decimal odds {OddsA} and {OddsB}. What is the sum of implied probabilities minus one?", "explain": "The reciprocal-odds total describes the quoted margin. It is not automatically the realized house profit on every set of stakes.", "lens": "the overround in an exhaustive two-outcome book", "kind": "grid", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

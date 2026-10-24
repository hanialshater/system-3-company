import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0380", "title": "Impact per program dollar", "op": "unitprice", "labels": ["Price", "Quantity", "Units"], "outputs": ["UnitCost"], "a": [100.0, 500.0, 1.0], "b": [100.0, 50.0, 1.0], "question": "A toy pack costs 100 for 500 units. What is its price per 1 units?", "questionTemplate": "A toy pack costs {Price} for {Quantity} units. What is its price per {Units} units?", "explain": "A common unit denominator makes unequal packages comparable. Package appearance does not change their stated contents.", "lens": "the cost per specified incremental action", "kind": "grid", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

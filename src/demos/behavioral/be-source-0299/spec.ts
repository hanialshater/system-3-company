import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0299", "title": "Cup size and actual ice cream", "op": "unitprice", "labels": ["Price", "Quantity", "Units"], "outputs": ["UnitCost"], "a": [2.26, 7.0, 1.0], "b": [1.66, 8.0, 1.0], "question": "A toy pack costs 2.26 for 7 units. What is its price per 1 units?", "questionTemplate": "A toy pack costs {Price} for {Quantity} units. What is its price per {Units} units?", "explain": "A common unit denominator makes unequal packages comparable. Package appearance does not change their stated contents.", "lens": "the price per stated ounce", "kind": "grid", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

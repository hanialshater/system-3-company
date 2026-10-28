import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0292", "title": "A scarce-looking cookie jar", "op": "unitprice", "labels": ["Price", "Quantity", "Units"], "outputs": ["UnitCost"], "a": [4.0, 2.0, 1.0], "b": [4.0, 8.0, 1.0], "question": "A toy pack costs 4 for 2 units. What is its price per 1 units?", "questionTemplate": "A toy pack costs {Price} for {Quantity} units. What is its price per {Units} units?", "explain": "A common unit denominator makes unequal packages comparable. Package appearance does not change their stated contents.", "lens": "unit quantity separate from a scarcity cue", "kind": "grid", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

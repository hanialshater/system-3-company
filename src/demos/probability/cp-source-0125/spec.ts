import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0125", "title": "Share the rollover prize", "op": "unitprice", "labels": ["Price", "Quantity", "Units"], "outputs": ["UnitCost"], "a": [10000000.0, 1.0, 1.0], "b": [10000000.0, 10.0, 1.0], "question": "A toy pack costs 1e+07 for 1 units. What is its price per 1 units?", "questionTemplate": "A toy pack costs {Price} for {Quantity} units. What is its price per {Units} units?", "explain": "A common unit denominator makes unequal packages comparable. Package appearance does not change their stated contents.", "lens": "the split jackpot conditional on a shared win", "kind": "grid", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

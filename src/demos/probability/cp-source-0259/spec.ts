import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0259", "title": "Histogram counts need their widths", "op": "unitprice", "labels": ["Price", "Quantity", "Units"], "outputs": ["UnitCost"], "a": [20.0, 1.0, 1.0], "b": [20.0, 5.0, 1.0], "question": "A toy pack costs 20 for 1 units. What is its price per 1 units?", "questionTemplate": "A toy pack costs {Price} for {Quantity} units. What is its price per {Units} units?", "explain": "A common unit denominator makes unequal packages comparable. Package appearance does not change their stated contents.", "lens": "the count per unit bin width in a density display", "kind": "grid", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

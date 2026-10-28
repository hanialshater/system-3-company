import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0308", "title": "A bigger performance bonus", "op": "profit", "labels": ["Quantity", "Price", "Cost", "Charity"], "outputs": ["Profit"], "a": [100.0, 5.0, 1.0, 0.0], "b": [80.0, 10.0, 1.0, 0.0], "question": "A toy sale has 100 units at price 5, unit cost 1 and fraction 0 of revenue donated. What profit remains?", "questionTemplate": "A toy sale has {Quantity} units at price {Price}, unit cost {Cost} and fraction {Charity} of revenue donated. What profit remains?", "explain": "Quantity, price, costs and transfers all enter profit. Sales alone cannot establish the profitability of a pricing policy.", "lens": "output versus payment in a toy incentive budget", "kind": "bars", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

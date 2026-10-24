import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0283", "title": "Price ending and revenue", "op": "profit", "labels": ["Quantity", "Price", "Cost", "Charity"], "outputs": ["Profit"], "a": [100.0, 39.0, 20.0, 0.0], "b": [110.0, 34.0, 20.0, 0.0], "question": "A toy sale has 100 units at price 39, unit cost 20 and fraction 0 of revenue donated. What profit remains?", "questionTemplate": "A toy sale has {Quantity} units at price {Price}, unit cost {Cost} and fraction {Charity} of revenue donated. What profit remains?", "explain": "Quantity, price, costs and transfers all enter profit. Sales alone cannot establish the profitability of a pricing policy.", "lens": "quantity and margin in a price comparison", "kind": "bars", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

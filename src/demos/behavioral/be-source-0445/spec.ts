import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0445", "title": "An honor-system newspaper", "op": "profit", "labels": ["Quantity", "Price", "Cost", "Charity"], "outputs": ["Profit"], "a": [100.0, 1.0, 0.4, 0.0], "b": [150.0, 1.0, 0.4, 0.0], "question": "A toy sale has 100 units at price 1, unit cost 0.4 and fraction 0 of revenue donated. What profit remains?", "questionTemplate": "A toy sale has {Quantity} units at price {Price}, unit cost {Cost} and fraction {Charity} of revenue donated. What profit remains?", "explain": "Quantity, price, costs and transfers all enter profit. Sales alone cannot establish the profitability of a pricing policy.", "lens": "quantity and payment receipts in a toy revenue example", "kind": "bars", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

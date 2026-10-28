import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0334", "title": "The employer in the fund menu", "op": "diversify", "labels": ["Stocks", "Bonds", "Budget"], "outputs": ["StockMoney"], "a": [3.0, 1.0, 100.0], "b": [1.0, 3.0, 100.0], "question": "A toy investor splits 100 equally across 3 stock funds and 1 bond funds. How much goes to stocks?", "questionTemplate": "A toy investor splits {Budget} equally across {Stocks} stock funds and {Bonds} bond funds. How much goes to stocks?", "explain": "Equal allocation over menu items is not equal allocation over asset classes. The menu changes the resulting exposure.", "lens": "the exposure induced by an allocation menu", "kind": "grid", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

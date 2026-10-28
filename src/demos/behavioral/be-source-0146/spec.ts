import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0146", "title": "A basket chosen all at once", "op": "diversify", "labels": ["Stocks", "Bonds", "Budget"], "outputs": ["StockMoney"], "a": [3.0, 2.0, 10.0], "b": [1.0, 4.0, 10.0], "question": "A toy investor splits 10 equally across 3 stock funds and 2 bond funds. How much goes to stocks?", "explain": "Equal allocation over menu items is not equal allocation over asset classes. The menu changes the resulting exposure.", "lens": "the menu composition of a planned basket", "kind": "grid", "answerPosition": 2, "questionTemplate": "A toy investor splits {Budget} equally across {Stocks} stock funds and {Bonds} bond funds. How much goes to stocks?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

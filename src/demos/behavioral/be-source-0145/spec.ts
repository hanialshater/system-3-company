import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0145", "title": "More stock funds on the menu", "op": "diversify", "labels": ["Stocks", "Bonds", "Budget"], "outputs": ["StockMoney"], "a": [3.0, 1.0, 100.0], "b": [1.0, 3.0, 100.0], "question": "A toy investor splits 100 equally across 3 stock funds and 1 bond funds. How much goes to stocks?", "explain": "Equal allocation over menu items is not equal allocation over asset classes. The menu changes the resulting exposure.", "lens": "the exposure created by equal allocation over menu items", "kind": "grid", "answerPosition": 1, "questionTemplate": "A toy investor splits {Budget} equally across {Stocks} stock funds and {Bonds} bond funds. How much goes to stocks?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

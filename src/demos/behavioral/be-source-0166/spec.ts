import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0166", "title": "One allocator, two recipients", "op": "dictator", "labels": ["Pie", "Gift", "ExitCost"], "outputs": ["Kept"], "a": [10.0, 2.0, 0.0], "b": [10.0, 5.0, 0.0], "question": "A toy allocator starts with 10, gives 2, and pays fee 0. What remains?", "explain": "An allocation rule determines the available payoff. Preferences, observability and social pressure require evidence beyond the accounting.", "lens": "the cash allocation under a chosen gift", "kind": "bars", "answerPosition": 1, "questionTemplate": "A toy allocator starts with {Pie}, gives {Gift}, and pays fee {ExitCost}. What remains?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

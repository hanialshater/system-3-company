import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0168", "title": "Who can observe the allocation?", "op": "dictator", "labels": ["Pie", "Gift", "ExitCost"], "outputs": ["Kept"], "a": [10.0, 3.0, 0.0], "b": [10.0, 1.0, 0.0], "question": "A toy allocator starts with 10, gives 3, and pays fee 0. What remains?", "explain": "An allocation rule determines the available payoff. Preferences, observability and social pressure require evidence beyond the accounting.", "lens": "the supplied allocation rather than an inferred motive", "kind": "bars", "answerPosition": 0, "questionTemplate": "A toy allocator starts with {Pie}, gives {Gift}, and pays fee {ExitCost}. What remains?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

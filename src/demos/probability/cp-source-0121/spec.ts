import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0121", "title": "Cap the doubling-payoff game", "op": "petersburg", "labels": ["Rounds"], "outputs": ["Expected"], "a": [20.0], "b": [40.0], "question": "A toy fair-coin game pays 2^k when the first head occurs on round k, but zero if no head in 20 rounds. What is expected payout?", "questionTemplate": "A toy fair-coin game pays 2^k when the first head occurs on round k, but zero if no head in {Rounds} rounds. What is expected payout?", "explain": "Every allowed first-head round contributes one unit to expectation. Extending the cap increases expectation without making a typical payoff grow the same way.", "lens": "the distinction between capped expectation and typical payout", "kind": "grid", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

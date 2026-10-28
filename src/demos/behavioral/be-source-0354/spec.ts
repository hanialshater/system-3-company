import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0354", "title": "An incentive paid upfront", "op": "net", "labels": ["Endowment", "Bonus", "Penalty"], "outputs": ["Net"], "a": [100.0, 20.0, 20.0], "b": [100.0, 0.0, 0.0], "question": "A toy account starts at 100, receives 20, and pays back 20. What final balance remains?", "questionTemplate": "A toy account starts at {Endowment}, receives {Bonus}, and pays back {Penalty}. What final balance remains?", "explain": "Track the final balance as well as the wording. Equivalent cash paths can carry different descriptions without changing the arithmetic.", "lens": "the cash path versus the final cash balance", "kind": "timeline", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

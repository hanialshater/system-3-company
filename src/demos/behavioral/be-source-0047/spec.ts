import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0047", "title": "A bill or a ticket", "op": "net", "labels": ["Endowment", "Bonus", "Penalty"], "outputs": ["Net"], "a": [100.0, 0.0, 10.0], "b": [100.0, 0.0, 20.0], "question": "A toy account starts at 100, receives 0, and pays back 10. What final balance remains?", "explain": "Track the final balance as well as the wording. Equivalent cash paths can carry different descriptions without changing the arithmetic.", "lens": "the budget remaining after a second purchase", "kind": "timeline", "answerPosition": 2, "questionTemplate": "A toy account starts at {Endowment}, receives {Bonus}, and pays back {Penalty}. What final balance remains?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

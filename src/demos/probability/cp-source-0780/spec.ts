import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0780", "title": "Condition a tiny probabilistic model", "op": "betamom", "labels": ["Alpha", "Beta", "Wins", "Losses"], "outputs": ["Mean", "Variance"], "a": [1.0, 1.0, 2.0, 1.0], "b": [1.0, 1.0, 20.0, 10.0], "question": "A toy Beta(1,1) prior sees 2 wins and 1 losses. What posterior mean results?", "questionTemplate": "A toy Beta({Alpha},{Beta}) prior sees {Wins} wins and {Losses} losses. What posterior mean results?", "explain": "Posterior parameters add successes and failures separately. Sampling from this posterior is an additional Thompson-sampling step.", "lens": "the data update in a finite conjugate model", "kind": "bars", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

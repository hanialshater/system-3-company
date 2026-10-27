import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0827", "title": "Condition on the observed outcomes", "op": "betamom", "labels": ["Alpha", "Beta", "Wins", "Losses"], "outputs": ["Mean", "Variance"], "a": [1.0, 1.0, 8.0, 2.0], "b": [1.0, 1.0, 80.0, 20.0], "question": "A toy Beta(1,1) prior sees 8 wins and 2 losses. What posterior mean results?", "questionTemplate": "A toy Beta({Alpha},{Beta}) prior sees {Wins} wins and {Losses} losses. What posterior mean results?", "explain": "Posterior parameters add successes and failures separately. Sampling from this posterior is an additional Thompson-sampling step.", "lens": "the posterior from a proper prior under an ignorable stopping rule", "kind": "bars", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

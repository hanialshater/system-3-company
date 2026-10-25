import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0752", "title": "Past safety updates a chosen model", "op": "betamom", "labels": ["Alpha", "Beta", "Wins", "Losses"], "outputs": ["Mean", "Variance"], "a": [1.0, 1.0, 100.0, 0.0], "b": [1.0, 1.0, 1000.0, 0.0], "question": "A toy Beta(1,1) prior sees 100 wins and 0 losses. What posterior mean results?", "questionTemplate": "A toy Beta({Alpha},{Beta}) prior sees {Wins} wins and {Losses} losses. What posterior mean results?", "explain": "Posterior parameters add successes and failures separately. Sampling from this posterior is an additional Thompson-sampling step.", "lens": "posterior confidence conditional on a stationary Bernoulli model", "kind": "bars", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

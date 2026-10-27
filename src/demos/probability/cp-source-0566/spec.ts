import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0566", "title": "The goal competes with a trap", "op": "hitright", "labels": ["Left", "Right"], "outputs": ["Probability", "Steps"], "a": [3.0, 5.0], "b": [6.0, 5.0], "question": "A fair toy unit-step walk starts at 0 and stops at -3 or +5. What is the probability of hitting the right boundary first?", "questionTemplate": "A fair toy unit-step walk starts at 0 and stops at -{Left} or +{Right}. What is the probability of hitting the right boundary first?", "explain": "Both target and trap locations affect the hitting probability. This finite-interval walk is distinct from an unbounded Brownian first-passage problem.", "lens": "the fair-walk hitting probability between two boundaries", "kind": "grid", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

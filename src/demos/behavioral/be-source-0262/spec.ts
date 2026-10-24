import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0262", "title": "Known odds, unknown odds", "op": "ambigbounds", "labels": ["Prize", "Low", "High"], "outputs": ["Lower", "Upper"], "a": [100.0, 0.5, 0.5], "b": [100.0, 0.2, 0.8], "question": "A toy prize is 100; its unknown win probability lies between 0.5 and 0.5. What is the lower bound on expected winnings?", "questionTemplate": "A toy prize is {Prize}; its unknown win probability lies between {Low} and {High}. What is the lower bound on expected winnings?", "explain": "An interval of plausible probabilities yields bounds, rather than a uniquely identified expectation. It does not specify anyone’s attitude toward ambiguity.", "lens": "the expectation bounds left by ambiguous odds", "kind": "grid", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

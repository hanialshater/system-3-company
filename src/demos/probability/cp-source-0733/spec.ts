import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0733", "title": "A nonfailing fraction leaves a plateau", "op": "cure", "labels": ["Fraction", "Rate", "Time"], "outputs": ["Survival"], "a": [0.0, 0.3, 10.0], "b": [0.4, 0.3, 10.0], "question": "Toy cure Fraction 0 never fails; others have exponential Rate 0.3. What survival remains at Time 10?", "questionTemplate": "Toy cure Fraction {Fraction} never fails; others have exponential Rate {Rate}. What survival remains at Time {Time}?", "explain": "A mixture with a nonfailing component has a positive survival plateau. A finite observation window cannot by itself prove a cure fraction.", "lens": "the stipulated cure component of a survival mixture", "kind": "curve", "answerPosition": 1, "plot": [2, 0, 12]};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

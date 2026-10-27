import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0851", "title": "Compressed stars carry a smaller gap", "op": "line", "labels": ["Intercept", "Slope", "X"], "outputs": ["Prediction"], "a": [4.5, 0.1, 1.0], "b": [4.5, 0.01, 1.0], "question": "A toy fitted line has Intercept 4.5, Slope 0.1; what does it predict at X 1?", "questionTemplate": "A toy fitted line has Intercept {Intercept}, Slope {Slope}; what does it predict at X {X}?", "explain": "A line mechanically extrapolates beyond observed inputs. Whether its slope persists is an additional empirical assumption.", "lens": "the response scale of an illustrative ratings display", "kind": "grid", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

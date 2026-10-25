import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0411", "title": "A regression beyond the matched region", "op": "line", "labels": ["Intercept", "Slope", "X"], "outputs": ["Prediction"], "a": [0.0, 2.0, 5.0], "b": [0.0, 2.0, 20.0], "question": "A toy fitted line has Intercept 0, Slope 2; what does it predict at X 5?", "questionTemplate": "A toy fitted line has Intercept {Intercept}, Slope {Slope}; what does it predict at X {X}?", "explain": "A line mechanically extrapolates beyond observed inputs. Whether its slope persists is an additional empirical assumption.", "lens": "the prediction outside an observed comparison region", "kind": "grid", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

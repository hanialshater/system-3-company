import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0787", "title": "A straight interpolation has velocity", "op": "line", "labels": ["Intercept", "Slope", "X"], "outputs": ["Prediction"], "a": [0.0, 2.0, 0.25], "b": [0.0, 2.0, 0.75], "question": "A toy fitted line has Intercept 0, Slope 2; what does it predict at X 0.25?", "questionTemplate": "A toy fitted line has Intercept {Intercept}, Slope {Slope}; what does it predict at X {X}?", "explain": "A line mechanically extrapolates beyond observed inputs. Whether its slope persists is an additional empirical assumption.", "lens": "the time coordinate on a stipulated linear transport path", "kind": "grid", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

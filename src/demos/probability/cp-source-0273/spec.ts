import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0273", "title": "Two trends can co-move without cause", "op": "line", "labels": ["Intercept", "Slope", "X"], "outputs": ["Prediction"], "a": [10.0, -0.1, 10.0], "b": [10.0, -0.1, 20.0], "question": "A toy fitted line has Intercept 10, Slope -0.1; what does it predict at X 10?", "questionTemplate": "A toy fitted line has Intercept {Intercept}, Slope {Slope}; what does it predict at X {X}?", "explain": "A line mechanically extrapolates beyond observed inputs. Whether its slope persists is an additional empirical assumption.", "lens": "a stipulated time trend rather than a causal link", "kind": "grid", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

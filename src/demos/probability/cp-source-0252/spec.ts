import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0252", "title": "A straight trend beyond the data", "op": "line", "labels": ["Intercept", "Slope", "X"], "outputs": ["Prediction"], "a": [12.0, -0.01, 100.0], "b": [12.0, -0.01, 300.0], "question": "A toy fitted line has Intercept 12, Slope -0.01; what does it predict at X 100?", "questionTemplate": "A toy fitted line has Intercept {Intercept}, Slope {Slope}; what does it predict at X {X}?", "explain": "A line mechanically extrapolates beyond observed inputs. Whether its slope persists is an additional empirical assumption.", "lens": "the unsupported persistence of an extrapolated slope", "kind": "grid", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

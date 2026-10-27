import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0372", "title": "A decision score crosses a threshold", "op": "line", "labels": ["Intercept", "Slope", "X"], "outputs": ["Prediction"], "a": [-5.0, 1.0, 4.0], "b": [-5.0, 1.0, 6.0], "question": "A toy fitted line has Intercept -5, Slope 1; what does it predict at X 4?", "questionTemplate": "A toy fitted line has Intercept {Intercept}, Slope {Slope}; what does it predict at X {X}?", "explain": "A line mechanically extrapolates beyond observed inputs. Whether its slope persists is an additional empirical assumption.", "lens": "the stipulated score rule rather than a causal fairness guarantee", "kind": "grid", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

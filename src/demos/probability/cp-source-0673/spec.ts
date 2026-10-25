import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0673", "title": "A changing price slope", "op": "line", "labels": ["Intercept", "Slope", "X"], "outputs": ["Prediction"], "a": [10.0, -1.0, 3.0], "b": [10.0, -2.0, 3.0], "question": "A toy fitted line has Intercept 10, Slope -1; what does it predict at X 3?", "questionTemplate": "A toy fitted line has Intercept {Intercept}, Slope {Slope}; what does it predict at X {X}?", "explain": "A line mechanically extrapolates beyond observed inputs. Whether its slope persists is an additional empirical assumption.", "lens": "the supplied price coefficient at two times", "kind": "grid", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

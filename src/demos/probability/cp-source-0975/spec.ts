import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0975", "title": "A tree has one fewer edge than nodes", "op": "line", "labels": ["Intercept", "Slope", "X"], "outputs": ["Prediction"], "a": [-1.0, 1.0, 10.0], "b": [-1.0, 1.0, 100.0], "question": "A toy fitted line has Intercept -1, Slope 1; what does it predict at X 10?", "questionTemplate": "A toy fitted line has Intercept {Intercept}, Slope {Slope}; what does it predict at X {X}?", "explain": "A line mechanically extrapolates beyond observed inputs. Whether its slope persists is an additional empirical assumption.", "lens": "the connected-tree edge count before generating a random maze", "kind": "grid", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

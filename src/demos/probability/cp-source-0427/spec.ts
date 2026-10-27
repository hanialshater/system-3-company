import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0427", "title": "A toy effect changes linearly with age", "op": "line", "labels": ["Intercept", "Slope", "X"], "outputs": ["Prediction"], "a": [-1.0, 0.05, 20.0], "b": [-1.0, 0.05, 50.0], "question": "A toy fitted line has Intercept -1, Slope 0.05; what does it predict at X 20?", "questionTemplate": "A toy fitted line has Intercept {Intercept}, Slope {Slope}; what does it predict at X {X}?", "explain": "A line mechanically extrapolates beyond observed inputs. Whether its slope persists is an additional empirical assumption.", "lens": "the slope assumption in an age-effect curve", "kind": "grid", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0746", "title": "A visible tail needs a model", "op": "paretosurvival", "labels": ["Minimum", "Shape", "Threshold"], "outputs": ["Tail"], "a": [1.0, 2.0, 5.0], "b": [1.0, 3.0, 5.0], "question": "A toy Pareto distribution has Minimum 1, Shape 2. What probability exceeds Threshold 5?", "questionTemplate": "A toy Pareto distribution has Minimum {Minimum}, Shape {Shape}. What probability exceeds Threshold {Threshold}?", "explain": "A tail exponent controls how rapidly large-event probability falls. The stipulated distribution is not evidence that a real dataset is Pareto.", "lens": "two stipulated tail slopes rather than distribution identification", "kind": "curve", "answerPosition": 2, "plot": [2, 1, 20]};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

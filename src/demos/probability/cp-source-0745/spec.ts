import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0745", "title": "Tail shape changes exceedance odds", "op": "paretosurvival", "labels": ["Minimum", "Shape", "Threshold"], "outputs": ["Tail"], "a": [1.0, 2.0, 10.0], "b": [1.0, 1.0, 10.0], "question": "A toy Pareto distribution has Minimum 1, Shape 2. What probability exceeds Threshold 10?", "questionTemplate": "A toy Pareto distribution has Minimum {Minimum}, Shape {Shape}. What probability exceeds Threshold {Threshold}?", "explain": "A tail exponent controls how rapidly large-event probability falls. The stipulated distribution is not evidence that a real dataset is Pareto.", "lens": "the assumed Pareto exponent before fitting a Hill estimator", "kind": "curve", "answerPosition": 1, "plot": [2, 1, 20]};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

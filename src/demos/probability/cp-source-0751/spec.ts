import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0751", "title": "A heavy tail assigns rare-event mass", "op": "paretosurvival", "labels": ["Minimum", "Shape", "Threshold"], "outputs": ["Tail"], "a": [1.0, 1.5, 20.0], "b": [1.0, 3.0, 20.0], "question": "A toy Pareto distribution has Minimum 1, Shape 1.5. What probability exceeds Threshold 20?", "questionTemplate": "A toy Pareto distribution has Minimum {Minimum}, Shape {Shape}. What probability exceeds Threshold {Threshold}?", "explain": "A tail exponent controls how rapidly large-event probability falls. The stipulated distribution is not evidence that a real dataset is Pareto.", "lens": "tail probability under two explicitly assumed models", "kind": "curve", "answerPosition": 1, "plot": [2, 1, 20]};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0967", "title": "A connected component emerges", "op": "giant", "labels": ["MeanDegree"], "outputs": ["Fraction"], "a": [0.8], "b": [1.5], "question": "For a toy asymptotic Poisson random graph of MeanDegree 0.8, solve q=exp(-c(1-q)) from q=0 for 1,000 iterations. What giant-component fraction 1-q results?", "questionTemplate": "For a toy asymptotic Poisson random graph of MeanDegree {MeanDegree}, solve q=exp(-c(1-q)) from q=0 for 1,000 iterations. What giant-component fraction 1-q results?", "explain": "This is the asymptotic Poisson fixed-point model. Finite graphs fluctuate, and other network models can have different thresholds.", "lens": "the random-graph connectivity ingredient rather than a lattice simulation", "kind": "grid", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

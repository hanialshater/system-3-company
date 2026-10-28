import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0927", "title": "Connectivity can support broad reach", "op": "giant", "labels": ["MeanDegree"], "outputs": ["Fraction"], "a": [0.8], "b": [2.0], "question": "For a toy asymptotic Poisson random graph of MeanDegree 0.8, solve q=exp(-c(1-q)) from q=0 for 1,000 iterations. What giant-component fraction 1-q results?", "questionTemplate": "For a toy asymptotic Poisson random graph of MeanDegree {MeanDegree}, solve q=exp(-c(1-q)) from q=0 for 1,000 iterations. What giant-component fraction 1-q results?", "explain": "This is the asymptotic Poisson fixed-point model. Finite graphs fluctuate, and other network models can have different thresholds.", "lens": "the mean-degree threshold in a random-graph reachability model", "kind": "grid", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

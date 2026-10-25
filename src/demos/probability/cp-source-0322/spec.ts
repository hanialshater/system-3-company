import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0322", "title": "Random groups can differ by chance", "op": "twosamplesd", "labels": ["P", "PerArm"], "outputs": ["SE"], "a": [0.4, 500.0], "b": [0.4, 5000.0], "question": "Two independent toy groups each contain 500 observations with common binary-trait probability 0.4. What is the SD of the difference in trait proportions?", "questionTemplate": "Two independent toy groups each contain {PerArm} observations with common binary-trait probability {P}. What is the SD of the difference in trait proportions?", "explain": "Randomization balances traits in expectation, not exactly in every realized sample. Chance imbalance shrinks with sample size.", "lens": "expected balance rather than exact realized balance", "kind": "grid", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

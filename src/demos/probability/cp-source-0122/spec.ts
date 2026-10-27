import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0122", "title": "Bet sizing under known odds", "op": "kelly", "labels": ["P", "Odds"], "outputs": ["Fraction"], "a": [0.6, 1.0], "b": [0.6, 2.0], "question": "A toy repeatable bet wins with probability 0.6, paying net Odds 1 per unit staked. What unconstrained Kelly fraction maximizes expected log growth?", "questionTemplate": "A toy repeatable bet wins with probability {P}, paying net Odds {Odds} per unit staked. What unconstrained Kelly fraction maximizes expected log growth?", "explain": "The optimum depends on a known probability and payoff model. Estimation error, constraints and risk preferences can justify a different stake.", "lens": "the log-growth optimum under specified odds", "kind": "grid", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

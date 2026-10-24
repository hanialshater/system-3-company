import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0330", "title": "Debt beside low-yield cash", "op": "carry", "labels": ["Debt", "Interest", "Cash", "Yield"], "outputs": ["Drag"], "a": [1000.0, 0.2, 1000.0, 0.02], "b": [1000.0, 0.2, 1000.0, 0.1], "question": "Toy debt 1000 costs interest 0.2; cash 1000 earns yield 0.02 over the same period. What is interest cost minus cash income?", "questionTemplate": "Toy debt {Debt} costs interest {Interest}; cash {Cash} earns yield {Yield} over the same period. What is interest cost minus cash income?", "explain": "Use the same horizon for both sides of the balance sheet. The arithmetic excludes liquidity needs and transaction costs.", "lens": "the interest-rate spread on both balance-sheet sides", "kind": "bars", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

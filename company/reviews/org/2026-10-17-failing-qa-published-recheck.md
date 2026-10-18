# Re-check: six published lessons whose newest QA record said fail

date: 2026-10-17 · run by: chief-of-staff (integration check, **not** a qa-tester attestation) · build: local `next build` of the merged tree on ccr-bf4ba2e6-qi1p4x after c6c088681

AMD-013's measurement (company/constitution/amendments/AMD-013-one-readiness/measure.mjs) found six published lessons whose newest linked QA record is a 2026-10-14 fail (e.g. two-said-blue: tap targets under 24px). The old launch gate only checks that a QA file exists.

`QA_ONLY=<the six> npx playwright test tests/qa/contract.spec.ts`: **12 passed** (phone + desktop) for below-critical-mass, bid-what-its-worth, mild-preferences-sharp-divides, prices-sort-the-buyers, contact-order-matters, two-said-blue.

So the defects recorded on 10-14 are not present in today's build. Production was not checked here. This is not filed with `company qa-record` because that command labels every record qa-tester (AMD-010 part 3); the qa-tester should record the attested runs (board item).

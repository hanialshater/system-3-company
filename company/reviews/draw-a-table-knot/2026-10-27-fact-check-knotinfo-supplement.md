# KnotInfo supplement: held claim c7

Fact-checker · 2026-10-27 · lesson v4 · address `math.draw-a-table-knot.c7`.

This supplements, and does not replace or silently revise, `2026-10-27-fact-check-checks-first.md`. The previous review had independently counted the selected kit diagrams but had not established their authoritative identity/minimality. This follow-up establishes those individual facts with newly opened support. The full original claim remains **unverified**; no claim metadata changes are made. Probability c5 is outside this follow-up and remains held.

## Sources actually opened

- PyPI release metadata: https://pypi.org/pypi/database_knotinfo/2026.10.5/json (retrieved successfully over the inherited proxy with TLS verification, 2026-10-27). It identifies Sebastian Oehms, project https://github.com/soehms/database_knotinfo, package version 2026.10.5, GPL licence. Its README describes the package as a snapshot of the complete KnotInfo/LinkInfo spreadsheets, credits Chuck Livingston and Allison Moore, and explicitly cautions about extra spreadsheet columns not visible on the sites.
- The exact release sdist: https://files.pythonhosted.org/packages/6d/92/15497d01500b7f68878dc92677339f826dc3dd5349e98adafaf44d236f8a/database_knotinfo-2026.10.5.tar.gz . Downloaded bytes SHA256 `500b798562c74befa3aa4cdd92a2a6813bfa7b117e937b806ad1ba8947ee1d18`, matching PyPI's release digest. Read archive members directly without installation or execution. Relevant members: `README.md`, `create_knotinfo_csv.py`, `database_knotinfo/__init__.py`, `database_knotinfo/csv_data/knotinfo_data_complete.csv`, and the two tutorial Markdown files under `tutorials/`.
- The updater's actual source sets its upstream base to https://raw.githubusercontent.com/knotinfo-org/assets/main/ and constructs `knotinfo_data_complete.xls.zip`; the package reader defines the CSV delimiter as `|`. This identifies the snapshot's claimed upstream; it does **not** mean I opened the upstream spreadsheet or the original KnotInfo website.

The archive was consulted as a published snapshot oracle. No package code was executed, no package/table/diagram file was added to the repository or app, and no bulk dataset or diagram codes are redistributed here. The only retained source facts below are two knot names and crossing numbers; matching was done through an in-memory pipe into the existing repository's checker. The scratch archive is `/tmp/s3-facts-knotinfo.tar.gz`, outside the commit.

## Individual facts now established

The two named CSV rows have these values:

| Name | `crossing_number` | Kit base PD crossings | Diagram correspondence |
|---|---:|---:|---|
| 5_2 | 5 | 5 | Same oriented planar diagram up to crossing/edge relabelling |
| 6_1 | 6 | 6 | Same planar diagram with component orientation reversed |

I read the source rows' `pd_notation` in memory and compared them with `src/kit/knots/table.mjs` using `iso` in `src/lab/knots/provenance/derive.mjs`, after inspecting that function's graph-matching conditions. It checks the complete dart involution (edge connections), cyclic rotation at every crossing, a bijection of darts, consistent preservation of over/under status, and component orientation. For 5_2 it returned plane +1, crossings +1, no reversed components, crossing map `[0,3,2,1,4]`. For 6_1: plane +1, crossings +1, reversed component `[0]`, map `[2,4,0,5,1,3]`. These finite comparisons take only the two small diagrams, with no knot search or heavy invariant enumeration. Reversing a knot's component orientation does not change its unoriented knot type or crossing minimum.

Thus, on the evidence of this identified KnotInfo snapshot, the kit's selected base drawings represent the named knots and realize their recorded crossing numbers. The earlier observation of five/six drawn crossings is now tied to an independent named-knot source; it is no longer merely the kit's self-assigned label. This is stronger than the earlier record. It is still mediated snapshot evidence, not a claim that Rolfsen Appendix C was opened.

## Exact remaining predicate and disposition

The original c7 includes: “Knot tables name each knot with a number, and **the table draws each knot with the fewest crossings**,” and quotes the general learner-facing statement. Neither the opened package tutorials nor its README states that general rule about table pictures. A tabulation of crossing-number invariants and PD codes for two named knots does not establish a universal assertion about every picture in the referenced table. The supplement has not audited all table pictures and does not substitute the two selected examples for that broader quantified clause.

The precise remaining predicate is the general table-picture minimum assertion and its intended table scope. The cited original support is Rolfsen, *Knots and Links*, Appendix C, which remains unopened; the prior attempt to https://katlas.org/wiki/The_Rolfsen_Knot_Table received proxy CONNECT 403 (`curl` error56). The actual runtime is still enforced restricted despite a reported unrestricted configuration draft; this follow-up used allowed PyPI/files.pythonhosted.org access and made no bypass attempt. Package access succeeded, so “all outside access blocked” would be inaccurate.

Disposition: retain c7's complete original text/status/source/note unchanged. Next owner: claim owner can identify exactly which table the broad sentence quantifies over; a source-capable independent fact-checker then needs that table's actual documentation/pictures or another authoritative statement that establishes that predicate. Any wording/version change belongs to the builder's normal lane. No learner, QA or publication verdict is granted here.

Validation: `git diff --check` passes; `npm run check` remains red at796 errors/4 warnings, including the same two assigned open-claim gate lines. Log: `/tmp/s3-facts-knotinfo-check.log`. This follow-up changes only this supplement and its offboarding entry; no app, claim metadata, lesson status, version or test changes. No new lesson-content version was created or claimed.

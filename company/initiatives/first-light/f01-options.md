# F-01 options: sign-in, database, age floor

backend-engineer (Amara) · 2026-10-15 · due 10-23 · advice, not a decision · inputs: founder-inbox F-01/F-18/F-24/F-25, charter.md, privacy-gate.md, decisions/2026-10-15-first-light-release-1-scope.md, engineering/notes/2026-10-15-first-light-reestimate.md, decisions/2026-10-13-three-new-teams.md

**Fixed whatever you pick:** play stays anonymous. "Anonymous means **local**" (privacy gate 2.1): no server id and no cookie until sign-up, and history merges in only when the learner taps "Keep my history". Hosting stays on Vercel. Every package needs a decision record.

**Facts.** *Checked 10-15 on the npm registry:* `@vercel/postgres` is **deprecated**, and Vercel says old Vercel Postgres databases "should have been migrated to Neon". So "Vercel Postgres" now means Neon, bought through Vercel. Auth.js for Next 16 is still a beta (`next-auth` 5.0.0-beta.32); the stable line is 4.24.15. Better Auth 1.7.10 is stable (MIT). *From memory (vercel.com, neon.com, clerk.com and supabase.com were blocked here):* **every price, free limit and region marked \*.** Re-check those before adding a card.

## Sign-in (magic link by email)

| | **Better Auth** | Auth.js v5 | Clerk |
|---|---|---|---|
| Cost at launch / 10k | $0 / $0. Email sender: free tier\*, then about $20/mo\* | same as Better Auth | free to about 10k monthly users\*, then about $25/mo plus per user\* |
| Setup | about 3 days | about 4 days (beta) | about 4 days (custom age screen) |
| Where data lives | our database. The sender sees the email address only | same | Clerk's servers (US\*), with session IP and device logs\* |
| Deletion | one SQL transaction | same | two systems: Clerk API plus ours |
| Privacy-gate fit | good | good | weak: its script and cookies are a new origin on sign-up (P7.1 allows our origin only) |
| Exit | low: no passwords, tables are ours | low | medium: Clerk user ids, SDK in every page |
| You must | open an email-sender account, paste one API key into Vercel, add DNS once the domain exists (F-23) | same | open a Clerk account and app; card past the free tier\* |

## Database (Postgres, one `pg` driver, plain SQL migrations)

| | **Neon via Vercel Marketplace** | Neon direct | Supabase |
|---|---|---|---|
| Cost at launch / 10k | $0 free tier\*. 10k learners is about 60 MB, inside 0.5 GB\*. Compute $0 to about $20/mo\* | same, billed by Neon | free projects pause when idle\*, so Pro about $25/mo\* |
| Setup | about 1 day | about 1 day | about 1.5 days |
| Residency | region picked once at install. I propose EU (Frankfurt\*) and Vercel functions in `fra1` | same | region picked once |
| Deletion and backups | rows are gone at once. Backups roll off inside the gate's **35 days** | same | same |
| Exit | low: `pg_dump`. Billing is tied to the Vercel team | low | low |
| You must | Vercel → Storage → add Neon, pick the region. No new card on free | open a Neon account, paste the connection string | open an account; card for Pro |

Watch-out: preview branches must not copy production learner rows. I will set preview to branch from a seed branch.

## Age floor (from privacy-gate.md §3)

| Option | Legal work | Engineering work |
|---|---|---|
| **A. 13+, teen mode 13–15, under-13 anonymous only** (F-24) | lawyer on GDPR Art. 8 and "directed to children"; one policy sentence (P2.6) | birth-year screen, store the band only ("the year is never written down"), teen-mode switches. Inside EDD-008 |
| B. 16+ everywhere, 13–15 anonymous | fewer questions | "costs one table row, not a redesign". This is the fallback if counsel reads Art. 8 strictly |
| C. Under-13 accounts with parental consent | COPPA, verifiable consent, parent-side deletion | P2.5 "**fails** until a consent flow has its own review": "at least 5 more review runs". Too big for 11-30 |

The gate's test for any provider: "it can delete a user by API, it exports user data, it offers a DPA, and it does not require more fields than the table above. If a provider insists on a name or phone, that is a reason to reject it."

## Recommendation

**Better Auth + Neon via the Vercel Marketplace, 13+ with teen mode.** This differs from the inbox's Auth.js: v5 is still a beta, and the principal engineer leans the same way (re-estimate §2). Neon is the inbox's choice, and "Vercel Postgres" now means Neon anyway. The total is $0 at launch and about $0–40/mo\* at 10k learners. It adds two packages (`better-auth`, `pg`) and one new processor (the email sender).

How sure I am: about 65% on sign-in, 85% on the database, and 80% on the age floor. These would change it:
- The 10-22 spike fails on Next 16.4: Auth.js v5.
- You will not open an email-sender account: Clerk, if the privacy reviewer extends P7.1.
- Counsel reads Art. 8 strictly: option B.

## Reply with one line

> **F-01: Better Auth + Neon via Vercel, 13+ with teen mode (also accepts F-24).**

Any other pick works the same way, for example "F-01: Auth.js + Neon direct, 16+".

## The 5 working days after you reply

1. **D+1** (you): add Neon in Vercel, open the email-sender account, paste its key. (me): the spike on a preview, plus ADR-008 (auth), ADR-009 (DB) and the dependency records.
2. **D+2** (me): the EDD-008 data-model section names the provider, the processors (P1.7), the tables in gate 2.2, the merge, deletion, export and retention. It goes to the privacy reviewer (W-965) and the principal engineer at the same time.
3. **D+3** (me): the first migration on a preview branch only. The age-screen spec with growth-designer (E5).
4. **D+4** (me): fix what the reviews find.
5. **D+5:** target for EDD-008 approval (principal engineer, plan date 10-28). I draft the readiness record for principal-engineer-ops. Nothing reaches production, and deploys stay with the release manager and need your approval.

Still yours, separately: the lawyer by 10-30 (F-25), Vercel Pro before any commercial use (F-18), the domain (F-23).

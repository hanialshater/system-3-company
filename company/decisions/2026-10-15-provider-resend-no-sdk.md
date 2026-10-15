# Provider: Resend as the one transactional email sender, called by plain `fetch` (no SDK)

owner: backend-engineer (Amara), proposes · acknowledgement owed by: principal-engineer (Kenji); processor entry read by: privacy-reviewer (Elif)
date: 2026-10-15
class: engineering + privacy (new processor; **no new dependency**)
route: backend-engineer → principal-engineer (ADR-008) → privacy-reviewer (P1.7 processor entry, P1.8 email use, EDD-008 §10) → founder (DPA via counsel, F-25; own domain, F-23)
recorded by: backend-engineer
status: proposed. Revisit when the principal engineer and the privacy reviewer have read it, or when F-23 (domain) lands.
decision it serves: [founder F-01](2026-10-15-founder-f01-accounts.md), item 4 ("Proposed provider: Resend")

## Context
Magic-link sign-in needs one sender. The founder proposed Resend and is opening the account now. The founder record says it is a new processor that must be in the P1.7 inventory with its DPA. The open question for me was whether the code needs Resend's SDK.

## What I checked (2026-10-15)
- `resend` SDK on npm: 6.33.0, MIT, 7 files, 0.38 MB, depends on `postal-mime` and `standardwebhooks`, optional peer `@react-email/render`. We need none of that for one plain-text email.
- The SDK source on GitHub (`resend/resend-node`, `src/resend.ts`, `src/emails/emails.ts`): base URL `https://api.resend.com`, `POST /emails`, header `Authorization: Bearer <key>`, and the default key variable is `RESEND_API_KEY`. So plain `fetch` can do the same, and we keep the SDK's variable name.
- Not checked (resend.com was blocked by the proxy): Resend's sending region, how long it keeps email logs and bodies, whether its API can delete a logged email, the DPA text, the free-tier quota, and the exact variable name the Vercel–Resend integration creates. Every one of these goes to the founder and counsel (below).

## Options considered
| Option | For | Against |
|---|---|---|
| **A. Resend via `fetch`, about 30 lines in `src/lib/server/email.ts`** | 0 dependencies; one endpoint; easy to swap for another sender | We maintain error handling and retry ourselves (small) |
| B. Resend SDK `resend` 6.33.0 | Typed | A dependency (and a record) for one call |
| C. Another sender (Postmark, AWS SES, Brevo) | SES has EU regions for certain | Not what the founder is setting up today; SES needs an AWS account and a sandbox exit |

## Decision (proposed)
A. Resend, with **no SDK**. Rules that make P1.8 true by construction:
- One function, `sendSignInLink(email, url)`, is the only caller of the API. A grep test fails if `api.resend.com` appears anywhere else.
- Plain-text body (plus a minimal HTML twin), no images, no remote content. **Open and click tracking off** for the sending domain. Click tracking rewrites links through Resend's redirector, which would put the sign-in link and a tracking hop in their logs.
- Sender: `EMAIL_FROM`. Until F-23, Resend's shared test sender can only deliver to the account owner's own address. That is enough for the spike and matches the founder record's accepted objection.
- The API key is created with **sending access only**, not full access, and lives only in Vercel (Production, plus a separate key for Preview if the spike needs it).
- Nothing about the learner except the address and the link is sent: no name, no age band, no lesson data. Request and response bodies are never logged by us.

## Rests on
Founder F-01 item 4; privacy gate P1.7 and P1.8; the SDK source read above.

## Revisit if
- Counsel's DPA reading (F-25) rejects Resend, or Resend cannot send from the EU or keeps bodies beyond what the privacy reviewer accepts. Option C then.
- A second email purpose is proposed (for example the 24-month inactivity notice in privacy gate P1.6, see EDD-008 open question Q3). That needs its own P1.8 review first.

## Objections
| Objection | Raised by | Kind | Status |
|---|---|---|---|
| The sign-in link is a credential, and the sender keeps a copy of every email it sends | backend-engineer | evidence | Open, mitigated: the link is single-use, lasts 300 s, and only its hash is stored by us. Resend's log retention is unverified (proxy). The founder can read it on the Resend dashboard |
| Sending region and international transfer are unknown | backend-engineer | evidence | Open: counsel (F-25). P1.7 fails on "unknown" until then |
| An email sender without our own domain (F-23) can only send test mail | chief-of-staff (founder record) | evidence | Accepted for the spike, as in the founder record |

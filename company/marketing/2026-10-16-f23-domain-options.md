# F-23: domain and brand options for First Light

owner: vp-marketing (Celeste) · date: 2026-10-16 · class: proposal (brand and spend, founder decides) · status: proposed, nothing bought
route: vp-marketing (this shortlist) → founder (F-23: pick a name, read the real price on the Vercel screen, approve the purchase) → release-manager / platform-engineer (DNS, after purchase) → backend-engineer (Resend sending domain, G2) → privacy-reviewer and counsel (F-25: legal pages name it)
recorded by: vp-marketing
board: W-916 · batch: first-light/2026-10-16-round-1#6 · budget: `[project:first-light]`, tranche 1

## Read this first: nothing here was checked live

Every availability and price below is **unverified, from memory**. From this host, the proxy refused
every lookup I tried on 2026-10-16: Verisign and Google registry RDAP, rdap.org, the Vercel domains
price API, Namecheap, Porkbun, Google and Cloudflare DNS-over-HTTPS, and plain DNS (no resolver).
I have no Vercel tool in this session, so W-916's `get_purchase_quote` did not run. Nothing was bought,
no account was signed in to, and nothing was sent.

**Before deciding:** the founder, or a session with the Vercel MCP and the founder's approval, runs
`get_purchase_quote` (a read-only quote, which buys nothing) for the five names below and pastes the real
price and availability into this file. No trademark search was possible either (USPTO and EUIPO are not
reachable from here). That search belongs to counsel (F-25) before we buy.

## What the name has to fit

There is no `company/marketing/positioning.md` yet. That gap is mine, and this shortlist does not fill it.
I checked each name against what is on disk:
- the vision line: "A minute a day that leaves you able to ask a better question" (company/product/vision.md)
- the mechanic: "predict → explore → reveal", about sixty seconds (company/product/demo-standard.md)
- the one product promise head-of-product allows now: "every claim checked, no ads, no tracking" (Ruling 3, roadmap note). Once the ad slot ships, "no ads" stops being true for the public feed, so it can't go in a name or tagline.
- the refuse rules: no outcome claim (nothing like "smarter", "master" or "remember", with no data before EXP-002), no engagement framing ("daily", "streak", "addictive"), and no fake scarcity

Every name also has to work as an email sender for sign-in mail ("sign in to X"), because production
sign-in mail needs our own domain (company/decisions/2026-10-15-founder-f01-accounts.md).

## The shortlist

Price bands are from memory of typical registrar list prices (Vercel included). They are not quotes.
.com: about $10 to $20 a year. .app: about $12 to $20 a year (Google registry; HTTPS-only by HSTS preload, which is fine on Vercel). Renewal can be higher than the first year.

| # | Name | Domain to quote first (fallback) | Availability | Price, first year | Fits positioning? |
|---|---|---|---|---|---|
| 1 | **Guess First** | guessfirst.app (guessfirst.com) | unverified, from memory. A short two-word .com is often registered or parked; the .app is more likely free | ~$12-20 (.app) / ~$10-20 (.com), unverified, from memory | **Yes.** It names the one thing every lesson asks first, and it is checkable on any card. It promises no outcome. Risk: "guess" can read as trivia, so the tagline has to say "then see why" |
| 2 | **Guess, Then See** | guessthensee.com (guessthensee.app) | unverified, from memory. A long phrase, so it is likely free | ~$10-20, unverified, from memory | **Yes, the most literal.** It describes predict and reveal. Clunky as a sender name ("Sign in to Guess, Then See"), and the comma gets lost in a URL |
| 3 | **Predict & See** | predictandsee.com (predictandsee.app) | unverified, from memory. Likely free | ~$10-20, unverified, from memory | **Yes, but it reads like a description, not a name.** "Predict" sounds like school, which may help with the school-licence discovery and hurt with adults |
| 4 | **One Minute Why** | oneminutewhy.com (oneminutewhy.app) | unverified, from memory. Likely free | ~$10-20, unverified, from memory | **Partly.** "Why" matches the reveal and the vision's "better question". But "one minute" is a factual claim a learner sees: it has to go into company/marketing/claims.md and be checked against real lesson times, and long sequences may break it |
| 5 | **First Light** (keep the codename) | firstlight.app (getfirstlight.com) | unverified, from memory. "First Light" is a crowded name (other companies and products use it), so firstlight.com is almost certainly taken and the .app may be | ~$12-20 if free at list price; a short dictionary .app may be **premium priced** (hundreds of dollars or more), unverified | **Weak.** It says nothing about predicting or checking, it carries trademark crowding risk, and the team already uses it as the internal project name, which blurs "the project" and "the product" in records |

## My pick, and why

**Guess First, on guessfirst.app**, or on guessfirst.com if the quote shows it free at list price
(I would take the .com at list price over the .app, because people type .com by habit). Confidence: medium on
the name, low on availability, which nobody has checked.

- It is the only name on the list that states the method in two words and stays true for every lesson
  we ship, including revisits (a revisit is a single question you answer before you see).
- It makes no claim about time or outcome, and none about ads, so nothing in it can go stale or false.
- It reads cleanly as a sign-in sender ("Your Guess First sign-in link").
- **Fallback, in order:** Guess, Then See (guessthensee.com), then Predict & See (predictandsee.com).
- **Not recommended:** First Light as the public name (crowded, weak fit, and likely premium as a .app),
  and One Minute Why unless the analytics steward and the fact-checker can support "one minute" on every lesson.

## What each answer unblocks

Founder picks a name → quote confirmed → founder approves the purchase (spend approved in principle,
company/decisions/2026-10-15-founder-first-light.md item 8) → DNS → Resend sending domain and G2 evidence →
production sign-in mail from our own domain. The legal pages and the launch narrative then name it.
Tech lead's date: bought and pointed by about 2026-11-06. F-23 proposed for 2026-10-30.

## Objections

| Objection | Raised by | Status |
|---|---|---|
| No price or availability here is a quote. W-916 asked for priced quotes. | vp-marketing (self) | **Open.** Every lookup was blocked by the proxy. The founder or a Vercel-MCP session runs `get_purchase_quote` per name before deciding. Nothing is bought on these figures. |
| There is no positioning document, so "fits positioning" is checked against the vision, the demo standard and Ruling 3, not against a positioning we have agreed. | vp-marketing (self) | **Open.** company/marketing/positioning.md is mine to draft next, and the name the founder picks goes into it. |
| No trademark search was run. A crowded name (First Light especially) could draw a dispute after launch. | vp-marketing (self) | **Routed** to counsel under F-25, before purchase. |
| "Guess" may sound unserious to schools and parents. | vp-marketing (anticipated, school-licence discovery) | **Held.** The tagline carries "then see why", and Predict & See stays the fallback if the school discovery says otherwise. |

## What would make this wrong

- The quotes show guessfirst.com and guessfirst.app both taken or premium. Then take fallback 2.
- Counsel finds a conflicting mark in education or apps. Then drop that name.
- The founder wants the public brand to stay "First Light". Then we quote firstlight.app and getfirstlight.com, and the crowding risk goes to counsel.

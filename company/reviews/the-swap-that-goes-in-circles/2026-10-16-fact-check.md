# Fact-check: the-swap-that-goes-in-circles

Date: 2026-10-16. Checker: fact-checker (did not write these claims). Board W-1562, lane = the 4 NCM gap slugs named in the dispatch. Base: main ccr-4c6c7654-ew9ko1 at f1568498.

Method: read meta.json and every learner-visible string in Demo.tsx (hook, predict, arrow labels in both modes, legend, holding line, log strip, Seen row, reveal, recall) before reading company/reviews/the-swap-that-goes-in-circles/build.md. Re-ran the swaps and the voter majorities in my own Python; compared with rejudged-four.mjs J16 (agrees). Sources opened through PMC full text (OAI API) and Crossref. No walkthrough transcript exists and I did not start a server.

Result: 6 claims, 6 verified, 0 disputed, 0 withdrawn. No unrecorded claim.

## Claims

| id | status | basis |
|---|---|---|
| c1 | verified | Circle: banana over cherry, apple over banana, cherry over apple, so every offer round the route is taken. Own run from the cherry: cherry, banana, apple, cherry, banana, apple, cherry. 3 swaps = cherry, 30¢; 6 swaps = cherry, 60¢. Predict answer "Cherry, 60¢ poorer" correct. |
| c2 | verified | Ranked apple 3 > banana 2 > cherry 1, offers in route order: cherry to banana accepted, banana to apple accepted, apple to cherry refused. 2 swaps, 20¢, holding apple (the favourite). Stage draws apple-to-cherry dashed with "refused". The claim states the offer order, which the arrows show. |
| c3 | verified | Opened: Chater et al. (2018), "Mind, rationality, and cognition: an interdisciplinary debate", Psychonomic Bulletin and Review, doi 10.3758/s13423-017-1333-5, PMC5902517: utility in modern economics organises preferences, and "completeness and transitivity" ensure a utility function can be defined; the same passage gives the money pump as a reason to keep preferences coherent. Park, Davis-Stober et al. (2019), "Cognitive Aging and Tests of Rationality", Spanish Journal of Psychology, doi 10.1017/sjp.2019.52, PMC6994187: "transitivity is often considered a basic tenet of consistent, rational preference. For example, as described in the well-known 'money pump' argument ...". The card's sentence is a causal one ("That is why choice models assume preferences are transitive"); both sources present the money pump as a reason for the assumption, so the rendered claim is supported. Easley and Kleinberg ch. 23 NOT opened (host blocked); search results only (third-party notes on 23.2 requiring complete, transitive preferences). |
| c4 | verified | Not a sentence on the card. Crossref confirms the citation: Davidson, McKinsey and Suppes, "Outlines of a Formal Theory of Value, I", Philosophy of Science 22(2): 140-160, April 1955, doi 10.1086/287412. Attribution opened in a secondary source: Hornsby and Love (2020), Cognition, doi 10.1016/j.cognition.2020.104244, PMC7315129: "When preferences are not transitive, people can become liable to manipulation (or 'dutch booking') (Davidson, McKinsey, and Suppes, 1955)", followed by a three-beer cycle "tricked into paying for a series of costly trades in which the drinker ended with his original beer". The 1955 paper itself was not opened. |
| c5 | verified | Own count, voters A>B>C, B>C>A, C>A>B: A over B 2 to 1, B over C 2 to 1, C over A 2 to 1. Card sentence "A group's majority can still go round in a circle even when every voter's preferences are ranked" is this example. |
| c6 | verified | Convention: Max, the fruit and 10¢ are a toy; no real person or market is named. |

## Rendered text checked with no separate claim

- Holding line, log strip and Seen row ("6: cherry 60¢ · 3: cherry 30¢ · ranked: apple 20¢"): c1 and c2.
- Recall (Sam, tea, coffee, juice, 5p) and its why: c1 and c2 restated with other goods.

## Non-blocking notes (wording, for cm-math; no status depends on them)

- Recall why: "Ranked (transitive) preferences would stop at his favourite." Transitivity guarantees the swaps stop; they stop at the favourite only if the favourite is offered, as in this lesson's route. "would stop the swaps" would be exact. True as written in the lesson's offer pattern.
- Card: "That is why" reads as the only reason. The sources also give utility representation as a reason. "That is one reason" would be more exact; both sources support the sentence as written.
- c3 and c4 sources name the book and the 1955 paper; adding the opened PMC sources above would make the trail match this record.

## After reading build.md

Nothing in it changes a status. Its QA-path reveal text matches the reveal I read from Demo.tsx.

## 2026-10-16 W-1570..W-1573 re-check (W-1570 fix round): c3, c7

Checker: fact-checker (did not write these claims). Base: main ccr-4c6c7654-ew9ko1 at 975a4851. Lane as written in the dispatch: this slug c3 and c7 only (with same-picture-two-histories c2 to c5, price-tag-or-auction c1, worth-something-alone c7 c8).

Method: git diff of the lesson directory since f1568498: Demo.tsx changes only the reveal's second paragraph (the voting-cycle sentence is gone; c5 is withdrawn in meta.json, outside this lane). Read the current reveal and Stage() before build.md. Swaps re-run by hand: ranked apple 3 > banana 2 > cherry 1, route cherry to banana to apple to cherry: two accepted, apple to cherry refused, stop at apple after 2 swaps, 20 cents. Sources re-opened this run through the PMC OAI API.

| id | status | basis |
|---|---|---|
| c3 | verified | Rendered: "That is why choice models assume preferences are ranked (transitive): ...". Chater et al. (2018), PMC5902517: "Some rather mild constraints on the structure of preferences (e.g., most notably, completeness and transitivity) will ensure that such a utility function can be defined", followed by the money pump as a reason to keep preferences coherent. Park, Davis-Stober et al. (2019), PMC6994187: "transitivity of preference is a necessary assumption for nearly all modern utility theories, including expected utility theory and prospect theory". "Ranked" for a complete transitive order is a fair plain-word gloss. Caveat carried from the first check: "That is why" reads as the only reason; the sources give the money pump as one reason beside utility representation. Not a dispute. Easley and Kleinberg ch. 23 still not opened. |
| c7 | verified | Definition: Park, Davis-Stober et al. (2019), PMC6994187: "A decision maker is transitive in her preferences if, and only if, for any triple a,b,c, whenever she prefers a to b and prefers b to c then she also prefers a to c." The card's apple, banana, cherry sentence is that definition instantiated. "No circle to sell him": with a strict transitive order, some swap in any cycle trades a fruit for one he ranks lower, so a full circle is never accepted; on the stage, ranked mode draws apple to cherry dashed with "✕ refused" and the replay stops at the apple after 2 swaps. |

Non-blocking (demo-builder, optional): c7's source names Easley and Kleinberg (unopened); PMC6994187 above is an opened source for the same definition.

After reading build.md (W-1570 section): quotes the same old and new reveal text; nothing changes a status.

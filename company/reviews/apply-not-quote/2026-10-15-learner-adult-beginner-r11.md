*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): apply-not-quote
lesson version: v3
boundary: adult-beginner (from meta.json learner: knows reading short labels and comparing simple counts; does not know to apply a stated sorting rule to visible values rather than repeat its wording)
Screenshots seen: yes (artifacts/walkthroughs/apply-not-quote/sheet.png, recorded 2026-10-15T22:21, phone viewport)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "0 of 3"; tapped A · Any order, B · Rule: ascending, Swap 1↔2, Swap 2↔3; opened reveal.

1. **Where understanding first broke: the "A · Any order" column.** The hook says a checker *passes* 9, 2, 5 because all three numbers are there. That lax checker is the foil, the thing I should see being wrong. But pressing A shows "Match: not checked", not "passes". So the contrast the hook sets up (the lax check says pass, the rule says 0/3) never appears. I am left wondering what A is for, and why a column that checks nothing is a plan I could choose.
2. **What the prediction felt like.** Sorting three single-digit numbers and counting which sit in place. Any adult gets "0 of 3" in a few seconds. "All 3: none missing" is the hook's mistake spelled out, so it reads as a decoy rather than a belief I hold. I committed without any tension.
3. **What the explore added.** The swaps to reach 3/3 are a sorting exercise. It doesn't show anything new about "apply, don't quote". Once B uncovers the rule's order 2, 5, 9, the swaps just copy it.
4. **Did the reveal answer my question?** My question after the hook was "so what is wrong with a checker that only checks the numbers are present?" The reveal says "Matching it requires applying the rule to the numbers shown". That is true, but it restates the rule. It never names the everyday situation this hack is for, such as following instructions, checking a form, or reviewing work against a spec. So I leave with "sort ascending", not a habit.

Verdict reason: A shows "not checked" instead of the pass the hook promises, so the lesson never puts the quoting check and the applying check side by side, and the reveal gives no everyday use for the idea.

## After reading meta.json

- Walked build: a9ea371 (server on 3591). meta.json version there matches branch HEAD. The misconception text below is from branch HEAD (rewritten in 0fe98dd after the build was made, meta only; the walked build had template placeholder text).
- Objective ("apply a stated sorting rule to visible values rather than repeat its wording") is delivered as a sorting exercise. The "repeat its wording" half (the lax checker) is not visible on stage, because A reads "not checked" (finding 1).
- Misconception ("if all the right numbers are there, the answer follows the rule") is the hook's checker. Only the option "All 3: none missing" targets it, and the stage never shows that checker passing.
- The recall question (order 0.25, 0.5, 0.125) is a good transfer test because decimals make a wrong answer more tempting than 9, 2, 5 did. Consider moving that difficulty into the main prediction. Owner: demo-builder / learning-designer.

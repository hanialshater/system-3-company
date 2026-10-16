### 2026-10-16 · books100-platform-precision · platform-engineer
- did: Changed compound operation captions to exact input-rate expressions; result and Seen rounding remain two decimals.
- learned: Rounding a displayed multiplier can falsely imply a different recurrence; retain rate/100 input literals (src/lib/books/model.ts)
- know: All ten compound consumer captions change; 12.5 percent over eight steps equals (9/8)^8 and displays 2.57, while 1.13^8 does not (tests/books/models.test.mjs)
- open: Coordinator must re-QA all ten compound consumers and expand independent family design review on final source (src/components/books/BookIdeaLesson.tsx)

# Build note: estimate-a-range

## Template change v2 (r11 fix plan, 2026-10-15, demo-builder)

- TP-4 (shared v1 schedule stage, `StudyLesson.tsx`): readouts in words ("Overlap 5 min", "Due at 40: finishes at 50", slider "minute 12"); an overlapping layout reports "no valid finish" instead of a normal finish; the reveal's first sentence reads the final layout and names each overlapping pair with its minutes. The explore hint no longer says "fixture". The lesson's own text (title, hook, question, options, principle) is unchanged.
- **Claims:** c3 (displayed results and the reveal) reset to unverified, because the shared stage text changed. No other claim changed. Version → 2.
- **Checks:** QA contract phone and desktop passed on the dev server (`QA_BASE_URL=http://localhost:3711`); `npm run test:lifehacks`, `npm run check`, `npx tsc --noEmit` green.

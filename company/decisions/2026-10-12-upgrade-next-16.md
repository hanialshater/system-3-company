# Upgrade to Next.js 16.4 before scaling

owner: platform-engineer
date: 2026-10-12
status: decided

## Context
`npm audit` reported a critical advisory affecting every Next.js release up to 16.3.0-preview, plus
high-severity advisories in postcss and sharp (transitive). We are about to grow from 17 to
hundreds of lessons and deploy to Vercel, so upgrading gets more expensive every day we wait.

## Decision
Next 16.4.0 with React 19.2. `npm audit`: 0 vulnerabilities. Build (Turbopack) and the full QA
suite (44/44) pass unchanged. tsconfig.json is committed in the form Next writes it, so builds
stop leaving it dirty. Worktree and per-builder output dirs are excluded from type-checking.

## Rests on
`npm audit` output on 2026-10-12; QA run after the upgrade.

## Revisit if
A lesson needs an API removed in 16.

## Objections
none raised

# Production account resources

Date: 2026-10-19 · source: founder requested setup of production sign-in resources in this chat.
Project: system-3-company, Vercel team hanis-projects-2e2b67f6.
Status: infrastructure provisioned; email setup and sign-in activation incomplete. No go-live or privacy acceptance implied.

- Provisioned Neon resource `first-light-production` (`store_XRYL8V98HvidkD21`) on the Free plan, Frankfurt (`fra1`, connection host eu-central-1).
- Connected only to Vercel Production. Existing development/preview database is unchanged. Neon Auth and realtime explicitly disabled.
- Read PostgreSQL server version: 18.6. Public tables before initialization: zero.
- Applied and verified migrations 001_accounts and 002_likes_saves using the repository's direct-connection migration tool.
- Generated a production-only random auth secret and stored it as a sensitive Vercel variable; no value is recorded here.
- Configured BETTER_AUTH_URL to https://system-3-company.vercel.app.
- Set deployment region configuration to fra1 for the next deployment, matching the production database and the existing account route preference.
- Kept ACCOUNTS_ENABLED, LIKES_SAVES_ENABLED and LIKE_COUNTS_PUBLIC off/unset.

## Pending

Resend provisioning requires a sender domain the founder controls and DNS verification. A personal Gmail address can receive a restricted test; it cannot serve as the app's verified sending domain. Sender-domain choice is pending. Production still needs its sending-only RESEND_API_KEY and EMAIL_FROM. No development/preview key was copied to production.

After email setup: satisfy the existing production readiness conditions (including published policy version), complete a sign-in / return / sign-out smoke test, then enable accounts in a founder-authorized release. A resource setup is not evidence that authentication works.

Neon resource provisioning succeeded; automatic optional provider-skill installation failed. Do not rerun provisioning. CLI recovery suggestions were `npx skills add https://github.com/neondatabase/agent-skills --skill neon-postgres` and `--skill neon`; these were not run as part of provisioning.

Validation: account suite 21 passed, 45 skipped (database/built-server prerequisites); no failures. The test suite was not pointed at production. Separate read-only production checks found zero learner/auth rows, two applied schema migrations and zero expired auth records. No email or end-to-end authentication test has passed yet.

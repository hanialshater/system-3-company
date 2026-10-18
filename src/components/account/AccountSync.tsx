"use client";

// Mounted once in the root layout. Renders nothing. If accounts are on and the learner is signed in, it starts the
// device <-> account progress sync for this page load (src/lib/account-client.ts). With accounts off, the only
// effect is one GET /api/account/me, answered 404 (and cacheable for 5 minutes, account-api.ts me()).
// The account client is loaded as its own chunk after first paint, so no account code or route string is in any
// first-load script (principal review C9 as reworded 2026-10-16).
import { useEffect } from "react";

export default function AccountSync() {
  useEffect(() => {
    void import("@/lib/account-client").then((m) => m.startAccountSync()).catch(() => {});
  }, []);
  return null;
}

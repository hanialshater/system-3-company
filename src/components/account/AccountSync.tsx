"use client";

// Mounted once in the root layout. Renders nothing. It is the only caller of startAccountSync (PC3): if accounts are
// on and the learner is signed in, that starts the device <-> account progress sync for this page load
// (src/lib/account-client.ts); the account page only reads the result. With accounts off, the only effects are one
// async chunk and one GET /api/account/me answered 404, which the browser keeps for 5 minutes (max-age=300; the
// first ask uses the HTTP cache, MC2), so a reload inside that window makes no request.
// The account client is loaded as its own chunk after first paint, so no account code or route string is in any
// first-load script (principal review C9 as reworded 2026-10-16).
import { useEffect } from "react";

export default function AccountSync() {
  useEffect(() => {
    void import("@/lib/account-client").then((m) => m.startAccountSync()).catch(() => {});
  }, []);
  return null;
}

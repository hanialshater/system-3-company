"use client";

// Mounted once in the root layout. Renders nothing. If accounts are on and the learner is signed in, it starts the
// device <-> account progress sync for this page load (src/lib/account-client.ts). With accounts off, the only
// effect is one GET /api/account/me, answered 404 (and cacheable for 5 minutes, account-api.ts me()).
import { useEffect } from "react";
import { startAccountSync } from "@/lib/account-client";

export default function AccountSync() {
  useEffect(() => {
    void startAccountSync();
  }, []);
  return null;
}

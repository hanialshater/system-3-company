// GET /api/likes/counts?slugs=a,b: step labels or null (privacy ruling 2026-10-17 C2). 404 unless LIKE_COUNTS_PUBLIC.
// Outside /api/account on purpose: the session cookie never reaches it, so the answer cannot vary by viewer.
import { accountApi } from "@/lib/server/account-route";

export const runtime = "nodejs";
export const preferredRegion = "fra1";
export const dynamic = "force-dynamic";

export const GET = (req: Request) => accountApi().counts(req);

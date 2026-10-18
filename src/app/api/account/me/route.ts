// GET /api/account/me: 404 when accounts are off (the UI hides itself), else who is signed in (M4: anonymous sets no cookie).
import { accountApi } from "@/lib/server/account-route";

export const runtime = "nodejs";
export const preferredRegion = "fra1";
export const dynamic = "force-dynamic";

export const GET = (req: Request) => accountApi().me(req);

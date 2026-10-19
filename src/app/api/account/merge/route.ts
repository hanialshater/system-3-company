// POST /api/account/merge: "Keep my history" (EDD-008 §8).
import { accountApi } from "@/lib/server/account-route";

export const runtime = "nodejs";
export const preferredRegion = "fra1";
export const dynamic = "force-dynamic";

export const POST = (req: Request) => accountApi().merge(req);

// GET /api/account/export: system3-history.json (EDD-008 §9).
import { accountApi } from "@/lib/server/account-route";

export const runtime = "nodejs";
export const preferredRegion = "fra1";
export const dynamic = "force-dynamic";

export const GET = (req: Request) => accountApi().exportFile(req);

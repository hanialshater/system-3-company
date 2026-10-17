// GET /api/account/saves: the account's own list, newest first (PRD-005; behind LIKES_SAVES_ENABLED).
import { accountApi } from "@/lib/server/account-route";

export const runtime = "nodejs";
export const preferredRegion = "fra1";
export const dynamic = "force-dynamic";

export const GET = (req: Request) => accountApi().listMarks(req, "lesson_save");

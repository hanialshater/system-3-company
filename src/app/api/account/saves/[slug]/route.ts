// PUT / DELETE /api/account/saves/<slug>: idempotent (PRD-005; behind LIKES_SAVES_ENABLED).
import { accountApi } from "@/lib/server/account-route";

export const runtime = "nodejs";
export const preferredRegion = "fra1";
export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ slug: string }> };
export const PUT = async (req: Request, ctx: Ctx) => accountApi().mark(req, "lesson_save", (await ctx.params).slug, true);
export const DELETE = async (req: Request, ctx: Ctx) => accountApi().mark(req, "lesson_save", (await ctx.params).slug, false);

import { Router } from "express";
import { db } from "@workspace/db";
import { pageVisitsTable } from "@workspace/db/schema";
import { desc, sql, gte, and } from "drizzle-orm";

const router = Router();

router.post("/analytics/visit", async (req, res) => {
  try {
    const { page, referrer, userAgent } = req.body;
    await db.insert(pageVisitsTable).values({ page, referrer, userAgent });
    res.json({ success: true });
  } catch (err) {
    req.log.error({ err }, "Failed to record visit");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/analytics/summary", async (req, res) => {
  try {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

    const allVisits = await db.select().from(pageVisitsTable).orderBy(desc(pageVisitsTable.visitedAt));

    const totalVisits = allVisits.length;
    const todayVisits = allVisits.filter((v) => v.visitedAt >= today).length;
    const weekVisits = allVisits.filter((v) => v.visitedAt >= weekAgo).length;
    const monthVisits = allVisits.filter((v) => v.visitedAt >= monthAgo).length;

    const pageCount: Record<string, number> = {};
    for (const v of allVisits) {
      pageCount[v.page] = (pageCount[v.page] || 0) + 1;
    }
    const topPages = Object.entries(pageCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([page, visits]) => ({ page, visits }));

    const dailyCount: Record<string, number> = {};
    for (const v of allVisits) {
      const day = v.visitedAt.toISOString().split("T")[0];
      dailyCount[day] = (dailyCount[day] || 0) + 1;
    }
    const dailyVisits = Object.entries(dailyCount)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .slice(-30)
      .map(([date, visits]) => ({ date, visits }));

    res.json({ totalVisits, todayVisits, weekVisits, monthVisits, topPages, dailyVisits });
  } catch (err) {
    req.log.error({ err }, "Failed to get analytics");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;

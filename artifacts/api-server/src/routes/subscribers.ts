import { Router } from "express";
import { db } from "@workspace/db";
import { subscribersTable } from "@workspace/db/schema";
import { desc } from "drizzle-orm";
import { sendTelegramMessage } from "../lib/telegram.js";

const router = Router();

router.get("/subscribers", async (req, res) => {
  try {
    const subscribers = await db.select().from(subscribersTable).orderBy(desc(subscribersTable.subscribedAt));
    res.json(subscribers);
  } catch (err) {
    req.log.error({ err }, "Failed to list subscribers");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/subscribers", async (req, res) => {
  try {
    const { email, name } = req.body;
    const [subscriber] = await db.insert(subscribersTable)
      .values({ email, name })
      .onConflictDoNothing()
      .returning();

    if (!subscriber) {
      return res.status(409).json({ error: "Email already subscribed" });
    }

    await sendTelegramMessage(
      `📧 <b>New Subscriber!</b>\n\n` +
      `👤 Name: ${name || "Anonymous"}\n` +
      `📧 Email: ${email}`
    );

    res.status(201).json(subscriber);
  } catch (err) {
    req.log.error({ err }, "Failed to subscribe");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/subscribers/broadcast", async (req, res) => {
  try {
    const { subject, message } = req.body;
    const subscribers = await db.select().from(subscribersTable);

    await sendTelegramMessage(
      `📢 <b>Broadcast Sent!</b>\n\n` +
      `📋 Subject: ${subject}\n` +
      `👥 Recipients: ${subscribers.length}\n\n` +
      `💬 Message:\n${message}`
    );

    res.json({
      success: true,
      recipientCount: subscribers.length,
      message: `Broadcast sent to ${subscribers.length} subscribers`,
    });
  } catch (err) {
    req.log.error({ err }, "Failed to broadcast");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;

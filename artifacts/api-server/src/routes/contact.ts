import { Router } from "express";
import { db } from "@workspace/db";
import { contactMessagesTable } from "@workspace/db/schema";
import { desc } from "drizzle-orm";
import { sendTelegramMessage } from "../lib/telegram.js";

const router = Router();

router.get("/contact/messages", async (req, res) => {
  try {
    const messages = await db.select().from(contactMessagesTable).orderBy(desc(contactMessagesTable.createdAt));
    res.json(messages);
  } catch (err) {
    req.log.error({ err }, "Failed to list contact messages");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/contact", async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    const [msg] = await db.insert(contactMessagesTable)
      .values({ name, email, phone, subject, message })
      .returning();

    await sendTelegramMessage(
      `✉️ <b>New Contact Message!</b>\n\n` +
      `👤 Name: ${name}\n` +
      `📧 Email: ${email}\n` +
      `📱 Phone: ${phone || "Not provided"}\n` +
      `📋 Subject: ${subject || "Not provided"}\n\n` +
      `💬 Message:\n${message}`
    );

    res.status(201).json(msg);
  } catch (err) {
    req.log.error({ err }, "Failed to save contact message");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;

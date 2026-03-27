import { Router } from "express";
import { db } from "@workspace/db";
import { wholesaleInquiriesTable } from "@workspace/db/schema";
import { desc } from "drizzle-orm";
import { sendTelegramMessage } from "../lib/telegram.js";

const router = Router();

router.get("/wholesale", async (req, res) => {
  try {
    const inquiries = await db.select().from(wholesaleInquiriesTable).orderBy(desc(wholesaleInquiriesTable.createdAt));
    res.json(inquiries);
  } catch (err) {
    req.log.error({ err }, "Failed to list wholesale inquiries");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/wholesale", async (req, res) => {
  try {
    const { businessName, contactName, email, phone, location, productsInterested, estimatedVolume, message } = req.body;

    const [inquiry] = await db.insert(wholesaleInquiriesTable)
      .values({ businessName, contactName, email, phone, location, productsInterested, estimatedVolume, message })
      .returning();

    await sendTelegramMessage(
      `🏪 <b>New Wholesale Inquiry!</b>\n\n` +
      `🏢 Business: ${businessName}\n` +
      `👤 Contact: ${contactName}\n` +
      `📧 Email: ${email}\n` +
      `📱 Phone: ${phone}\n` +
      `📍 Location: ${location || "Not provided"}\n` +
      `🥜 Products: ${productsInterested || "Not specified"}\n` +
      `📦 Est. Volume: ${estimatedVolume || "Not specified"}\n\n` +
      `💬 Message: ${message || "None"}`
    );

    res.status(201).json(inquiry);
  } catch (err) {
    req.log.error({ err }, "Failed to create wholesale inquiry");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;

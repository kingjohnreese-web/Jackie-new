import { Router } from "express";
import { db } from "@workspace/db";
import { ordersTable } from "@workspace/db/schema";
import { eq, desc } from "drizzle-orm";
import { sendTelegramMessage } from "../lib/telegram.js";

const router = Router();

router.get("/orders", async (req, res) => {
  try {
    const orders = await db.select().from(ordersTable).orderBy(desc(ordersTable.createdAt));
    res.json(orders.map((o) => ({ ...o, totalAmount: parseFloat(o.totalAmount) })));
  } catch (err) {
    req.log.error({ err }, "Failed to list orders");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/orders", async (req, res) => {
  try {
    const { customerName, customerEmail, customerPhone, deliveryAddress, items, totalAmount, paymentMethod, notes } = req.body;

    const [order] = await db.insert(ordersTable).values({
      customerName,
      customerEmail,
      customerPhone,
      deliveryAddress: deliveryAddress || "",
      items,
      totalAmount: String(totalAmount),
      paymentMethod,
      notes,
      status: "pending",
      paymentStatus: "pending",
    }).returning();

    const itemsList = (items as Array<{ productName: string; quantity: number; price: number; weight?: string }>)
      .map((i) => `• ${i.productName}${i.weight ? ` (${i.weight})` : ""} x${i.quantity} = KES ${i.price * i.quantity}`)
      .join("\n");

    await sendTelegramMessage(
      `🛒 <b>New Order #${order.id}!</b>\n\n` +
      `👤 <b>Customer:</b> ${customerName}\n` +
      `📧 Email: ${customerEmail}\n` +
      `📱 Phone: ${customerPhone}\n` +
      `📍 Address: ${deliveryAddress || "Not provided"}\n\n` +
      `<b>Items:</b>\n${itemsList}\n\n` +
      `💰 <b>Total: KES ${totalAmount}</b>\n` +
      `💳 Payment: ${paymentMethod}\n` +
      `📝 Notes: ${notes || "None"}`
    );

    res.status(201).json({ ...order, totalAmount: parseFloat(order.totalAmount) });
  } catch (err) {
    req.log.error({ err }, "Failed to create order");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/orders/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const [order] = await db.select().from(ordersTable).where(eq(ordersTable.id, id));
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json({ ...order, totalAmount: parseFloat(order.totalAmount) });
  } catch (err) {
    req.log.error({ err }, "Failed to get order");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.patch("/orders/:id/status", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { status, paymentStatus } = req.body;
    const updateData: Record<string, string> = { status };
    if (paymentStatus) updateData.paymentStatus = paymentStatus;

    const [updated] = await db.update(ordersTable)
      .set(updateData)
      .where(eq(ordersTable.id, id))
      .returning();

    if (!updated) return res.status(404).json({ error: "Order not found" });
    res.json({ ...updated, totalAmount: parseFloat(updated.totalAmount) });
  } catch (err) {
    req.log.error({ err }, "Failed to update order status");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/orders/:id/message", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { message, subject } = req.body;
    const [order] = await db.select().from(ordersTable).where(eq(ordersTable.id, id));
    if (!order) return res.status(404).json({ error: "Order not found" });

    await sendTelegramMessage(
      `📨 <b>Admin Message Sent to Customer</b>\n\n` +
      `📦 Order #${id}\n` +
      `👤 Customer: ${order.customerName} (${order.customerEmail})\n` +
      `📝 Subject: ${subject}\n\n` +
      `💬 Message:\n${message}`
    );

    res.json({ success: true, message: "Message sent via notification" });
  } catch (err) {
    req.log.error({ err }, "Failed to send order message");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;

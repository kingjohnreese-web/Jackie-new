import { Router } from "express";
import { db } from "@workspace/db";
import { productsTable, productVariantsTable } from "@workspace/db/schema";
import { eq } from "drizzle-orm";

const router = Router();

router.get("/products", async (req, res) => {
  try {
    const products = await db.select().from(productsTable);
    const variants = await db.select().from(productVariantsTable);

    const result = products.map((p) => ({
      ...p,
      price: parseFloat(p.price),
      variants: variants
        .filter((v) => v.productId === p.id)
        .map((v) => ({ ...v, price: parseFloat(v.price) })),
    }));

    res.json(result);
  } catch (err) {
    req.log.error({ err }, "Failed to list products");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/products/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const [product] = await db.select().from(productsTable).where(eq(productsTable.id, id));
    if (!product) return res.status(404).json({ error: "Product not found" });

    const variants = await db.select().from(productVariantsTable).where(eq(productVariantsTable.productId, id));

    res.json({
      ...product,
      price: parseFloat(product.price),
      variants: variants.map((v) => ({ ...v, price: parseFloat(v.price) })),
    });
  } catch (err) {
    req.log.error({ err }, "Failed to get product");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;

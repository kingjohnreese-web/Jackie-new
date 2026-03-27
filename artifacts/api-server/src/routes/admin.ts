import { Router } from "express";

const ADMIN_EMAIL = "jackiepeanutske@gmail.com";
const ADMIN_PASSWORD = "Peanuts12??";
const ADMIN_TOKEN = "jp-admin-secret-token-2024";

const router = Router();

router.post("/admin/login", (req, res) => {
  const { email, password } = req.body;
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    res.json({ success: true, token: ADMIN_TOKEN, message: "Login successful" });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});

router.post("/admin/logout", (_req, res) => {
  res.json({ success: true });
});

router.get("/admin/me", (req, res) => {
  const auth = req.headers.authorization;
  if (auth === `Bearer ${ADMIN_TOKEN}`) {
    res.json({ authenticated: true, email: ADMIN_EMAIL });
  } else {
    res.status(401).json({ authenticated: false });
  }
});

export default router;

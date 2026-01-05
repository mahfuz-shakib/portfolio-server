// src/routes/contact.routes.js
import express from "express";
import { sendContactEmail } from "./sendEmail.js"; // path to above

const router = express.Router();

router.post("/contact", async (req, res) => {
  const { name, email,subject, message } = req.body || {};
  if (!name || !email ||!subject || !message) return res.status(400).json({ error: "Please provide name, email, message" });

  try {
    await sendContactEmail({ name, email,subject, message });
    return res.json({ ok: true, message: "Email sent" });
  } catch (err) {
    console.error("Send email error:", err);
    return res.status(500).json({ error: "Failed to send email" });
  }
});

export default router;

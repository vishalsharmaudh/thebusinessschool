import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import sendEmail from "./utils/mailer.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// In-memory store for OTP codes
const codeStore = new Map(); // { email: { code: "123456", expiresAt: timestamp } }

/**
 * Step 1: Request OTP Code
 */
app.post("/auth/request-reset", async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ error: "Email is required" });

  try {
    const { data: { users }, error } = await supabase.auth.admin.listUsers();
    if (error) throw error;

    const user = users.find((u) => u.email === email);
    if (!user) return res.status(404).json({ error: "User not found" });

    const code = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit
    const expiresAt = Date.now() + 10 * 60 * 1000; // expires in 10 mins

    codeStore.set(email, { code, expiresAt });

    await sendEmail({
      to: email,
      subject: "Your Password Reset Code",
      text: `Your verification code is: ${code}\n\nIt will expire in 10 minutes.`
    });

    return res.json({ message: "Code sent successfully" });
  } catch (err) {
    return res.status(500).json({ error: err.message || "Failed to send code" });
  }
});

/**
 * Step 2: Verify Code
 */
app.post("/auth/verify-code", (req, res) => {
  const { email, code } = req.body;

  const entry = codeStore.get(email);
  console.log("Incoming verify request:", { email, code });
  console.log("Stored code:", entry);
  if (!entry || Date.now() > entry.expiresAt || entry.code !== code) {
    return res.status(400).json({ error: "Invalid or expired code" });
  }

  return res.json({ message: "Code verified" });
});

/**
 * Step 3: Update Password
 */
app.post("/auth/update-password", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    // Step 1: Find the user by email
    const { data: { users }, error: listError } = await supabase.auth.admin.listUsers();
    if (listError) throw listError;

    const user = users.find((u) => u.email === email);
    if (!user) return res.status(404).json({ error: "User not found" });

    // Step 2: Update password using user ID
    const { error: updateError } = await supabase.auth.admin.updateUser(user.id, {
      password
    });

    if (updateError) throw updateError;


    await sendEmail({
      to: email,
      subject: "Password Changed Successfully",
      text: "Your password has been updated successfully. If you did not request this, contact support."
    });

    codeStore.delete(email);
    return res.json({ message: "Password updated successfully" });

  } catch (err) {
    return res.status(500).json({ error: err.message || "Failed to update password" });
  }
});

/**
 * Server Start
 */
app.listen(4000, () => {
  console.log("✅ Backend running at http://localhost:4000");
});

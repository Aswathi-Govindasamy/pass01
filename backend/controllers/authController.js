import User from "../models/User.js";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import { sendResetEmail } from "../utils/sendEmail.js";

/* FORGOT PASSWORD */
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.json({ message: "User not found" });
  }

  const token = crypto.randomBytes(32).toString("hex");

  user.resetToken = token;
  user.resetTokenExpiry = Date.now() + 15 * 60 * 1000;
  await user.save();

  const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;
  await sendResetEmail(email, resetLink);

  res.json({ message: "Reset email sent" });
};

/* VERIFY TOKEN */
export const verifyToken = async (req, res) => {
  const { token } = req.params;

  const user = await User.findOne({
    resetToken: token,
    resetTokenExpiry: { $gt: Date.now() }
  });

  if (!user)
    return res.status(400).json({ message: "Invalid or expired token" });

  res.json({ message: "Token valid" });
};

/* RESET PASSWORD */
export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const user = await User.findOne({
    resetToken: token,
    resetTokenExpiry: { $gt: Date.now() }
  });

  if (!user)
    return res.status(400).json({ message: "Invalid or expired token" });

  user.password = await bcrypt.hash(password, 10);
  user.resetToken = undefined;
  user.resetTokenExpiry = undefined;

  await user.save();

  res.json({ message: "Password reset successful" });
};

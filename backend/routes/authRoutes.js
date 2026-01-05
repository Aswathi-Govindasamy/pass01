import express from "express";
import {
  forgotPassword,
  verifyToken,
  resetPassword
} from "../controllers/authController.js";
console.log("✅ authRoutes loaded");

const router = express.Router();

router.post("/forgot-password", forgotPassword);
router.get("/verify-token/:token", verifyToken);
router.post("/reset-password/:token", resetPassword);

export default router;

import express from "express";
const router = express.Router();

// auth controllers
import {
  register_with_mail_password,
  sign_in_with_gmail_password,
} from "../../controllers/auth/auth.controller.js";

// auth routes
router.post("/register_with_gmail_password", register_with_mail_password);
router.post("/sign_in_with_gmail_password", sign_in_with_gmail_password);

export default router;

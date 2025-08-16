import { Router } from "express";
import { login, registerUser } from "../controllers/authController.js";

const router = Router();

// POST /api/auth/register
router.post("/register", registerUser);

// POST /api/auth/login
router.post("/login", login);

export default router;

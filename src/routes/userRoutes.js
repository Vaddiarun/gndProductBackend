import { Router } from "express";
import { requireAuth, requireAdmin, attachCurrentUser } from "../middleware/auth.js";
import { createUser, listUsers, getMe } from "../controllers/userController.js";

const router = Router();

router.get("/me", requireAuth, attachCurrentUser, getMe);
router.get("/", requireAuth, requireAdmin, listUsers);
router.post("/", requireAuth, requireAdmin, createUser);

export default router;

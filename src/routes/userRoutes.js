import { Router } from "express";
import { requireAuth, requireAdmin, attachCurrentUser } from "../middleware/auth.js";
import { createUser, listUsers, getMe } from "../controllers/userController.js";
import { requireAdminOrStatusOnly } from "../middleware/roles.js";
import { updateTask } from "../controllers/taskController.js";
 
const router = Router();
 
router.get("/me", requireAuth, attachCurrentUser, getMe);
router.get("/", requireAuth, requireAdmin, listUsers);
router.post("/", requireAuth, requireAdmin, createUser);
router.put("/api/tasks/:id", requireAuth, requireAdminOrStatusOnly, updateTask);
 
export default router;
 
 
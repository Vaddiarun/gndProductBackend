// import { Router } from "express";
// import { requireAuth, requireAdmin } from "../middleware/auth.js";
// import { createTask, updateTask, deleteTask, getTask, listTasks } from "../controllers/taskController.js";

// const router = Router();

// router.get("/", requireAuth, listTasks);
// router.get("/:id", requireAuth, getTask);

// router.post("/", requireAuth, requireAdmin, createTask);
// router.put("/:id", requireAuth, requireAdmin, updateTask);
// router.delete("/:id", requireAuth, requireAdmin, deleteTask);

// export default router;
import { Router } from "express";
import { requireAuth, requireAdmin } from "../middleware/auth.js";
import { createTask, updateTask, deleteTask, getTask, listTasks } from "../controllers/taskController.js";

const router = Router();

// ── List all tasks or tasks filtered by product & category ──
router.get("/", requireAuth, listTasks);

// ── List tasks by product ID (optional category filter via query param) ──
router.get("/product/:productId", requireAuth, listTasks);

// ── Get single task by ID ──
router.get("/:id", requireAuth, getTask);

// ── Admin-only: create task ──
router.post("/", requireAuth, requireAdmin, createTask);

// ── Admin-only: update task ──
router.put("/:id", requireAuth, requireAdmin, updateTask);

// ── Admin-only: delete task ──
router.delete("/:id", requireAuth, requireAdmin, deleteTask);

export default router;

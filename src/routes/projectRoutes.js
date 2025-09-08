import { Router } from "express";
import { requireAuth, requireAdmin } from "../middleware/auth.js";
import {
  createProject,
  listProjects,
  getProject,
  updateProject,
  deleteProject,
  addMilestone,
  updateMilestone,
} from "../controllers/projectController.js";
 
const router = Router();
 
// Projects
router.post("/", requireAuth, requireAdmin, createProject);
router.get("/", requireAuth, listProjects);
router.get("/:id", requireAuth, getProject);
router.put("/:id", requireAuth, requireAdmin, updateProject);
router.delete("/:id", requireAuth, requireAdmin, deleteProject);
 
// Milestones
router.post("/:id/milestones", requireAuth, requireAdmin, addMilestone);
router.put(
  "/:projectId/milestones/:milestoneId",
  requireAuth,
  requireAdmin,
  updateMilestone
);
 
export default router;
 
 